import {Formik , ErrorMessage} from  'formik';
import {useState , useEffect} from 'react'
import axios from 'axios';
import * as Yup from 'yup'
import './App.css';

function App() {
  const [transactions, setTransactions ] = useState([])

  useEffect(()=> {
    (async()=>{
      const {data} = await fetchTransactions()
      setTransactions(data.transactions)
    })()
  }, [])

  return (
    <div className="App">
      <div className="submit-transaction-container">
        <h2>
          Submit transaction
        </h2>
        <Formik
          className='submit-transaction'
          validationSchema={
            Yup.object().shape({
              amount : Yup.number().required("Amount is required"),
              accountId : Yup.string().required("Account id is required")
            })
          }
          initialValues={
            {
              accountId : "",
              amount : ""
            }
          }
          onSubmit={async(values, formikBag)=> {
            try {
              console.log("values",values);
              let {data} = await recordTransaction(values);
              console.log("response data", data);
              formikBag.resetForm()
            } catch(err){
              console.log(err)
            }

          }}
        >
          {
            (formik)=>{
              return (
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <label htmlFor="accountId">Account ID:</label>
                    <input
                      data-type="account-id"
                      value={formik.values.accountId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      id="accountId"
                      name="accountId"
                      type="text"
                    />
                    <ErrorMessage name='accountId' />
                  </div>
                  <div>
                    <br/>
                    <label htmlFor="amount">Amount:</label>
                    <input
                      data-type="amount"
                      value={formik.values.amount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      id="amount"
                      name="amount"
                      type="number" />
                    <ErrorMessage name='amount' />
                  </div>
                  <br/>
                  <input data-type="transaction-submit"  type="submit" />
                </form>
              )
            }
          }

        </Formik>
      </div>
      <section className='transaction-history'>
        <h2>
          Transactions
        </h2>
        {
          transactions.slice(0).reverse().map(transaction => {
            if (transactions.slice().reverse()[0].transaction_id === transaction.transaction_id) {

              let amountArray = []
              const filtered = transactions.filter(transactionNew => transactionNew.account_id === transaction.account_id)
              filtered.map(transaction => {
                return amountArray.push(transaction.amount)
              })

              const sumWithInitial = amountArray.reduce(
                (accumulator, currentValue) => accumulator + currentValue, 0 );
                return(
                  <div className='transaction'>
                    <TransactionCard transaction={transaction} />
                    <p>The current account balance is {sumWithInitial}</p>
                  </div>

                )
            }
              return(<div className="transaction">
                      <TransactionCard transaction={transaction} />
                    </div>)
            })
        }
      </section>

    </div>
  );
}

const TransactionCard = ({transaction})=>{
  const label = transaction.amount > 0 ? "Deposit" : "Withdrawal"
  const positiveTransactionAmount = Math.abs(transaction.amount)

  return<div>
          <div>{label} Transaction</div>
          <p>Transfered {positiveTransactionAmount} {label === "Deposit" ? "to" :"from"} {transaction.account_id}</p>
        </div>
}

const requestHandler = axios.create({
  baseURL : "http://localhost:5001/api",
  headers : {
    "Content-Type" : "application/json",
    "Accept" : "application/json"
  }
})

const  fetchTransactions = ()=> requestHandler.get("/transaction");

const recordTransaction = (data)=> requestHandler.post("/transaction", data)

export default App;
