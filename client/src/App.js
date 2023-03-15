import {useState, useEffect} from "react";

import axios from "axios";
import './components/list/list.component'
import ListComponent from "./components/list/list.component";
import IncomeExpense from "./components/incomeexpense/incomeexpence.component";
import AddTransaction from "./components/addTransaction/addTransaction.component";

function App() {
    const [textInput, setTextInput] = useState("");
    const [amountInput, setAmountInput] = useState(0);
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        getTransactions().then((transactions) => {
            setTransactions(transactions)
            setIncome(transactions.reduce((cum, transaction) => {
                return cum += transaction.amount > 0 ? transaction.amount : 0
            }, 0))
            setExpense(transactions.reduce((cum, transaction) => {
                return cum += transaction.amount < 0 ? transaction.amount : 0
            }, 0))
        })
    }, []);

    const getTransactions = async () => {
        const response = await axios.get(
            `api/v1/transactions`
        );
        return response.data.data
    }

    const onTextInputChangeHandler = (e) => {
        e.preventDefault()
        setTextInput(e.target.value)
    }

    const onAmountInputChangeHandler = (e) => {
        e.preventDefault()
        setAmountInput(e.target.value * 1)
    }

    const onDeleteButtonClickHandler = (id) => {
        axios.delete(`api/v1/transactions/${id}`).then((response) => {
            const deletedTransaction = [...response.data.data].shift()
            setTransactions(transactions.filter(element => element.id !== deletedTransaction.id))
            setIncome(deletedTransaction.amount > 0 ? income - deletedTransaction.amount : income)
            setExpense(deletedTransaction.amount < 0 ? expense - deletedTransaction.amount : expense)
        })
    }

    const onFormSubmitHandler = (e) => {
        e.preventDefault()
        if (textInput && amountInput) {
            axios.post('api/v1/transactions', {text: textInput, amount: amountInput}).then((response) => {
                setTransactions([...transactions, {
                    id: response.data.data[0].id,
                    text: textInput,
                    amount: amountInput
                }])
                setTextInput('')
                setAmountInput(0)
                setIncome(amountInput > 0 ? income + amountInput : income)
                setExpense(amountInput < 0 ? expense - amountInput : expense)
            })
        }
    }

    return (
        <div className="App">
            <div className="App-container">
                <h2>Expense Tracker</h2>
                <div className="container">
                    <h4>Your Balance</h4>
                    <h1 id="balance">${((income + expense) * 1).toFixed(2)}</h1>

                    <div className="inc-exp-container">
                        <IncomeExpense income={income} expense={expense}></IncomeExpense>
                    </div>
                </div>
                <h3>History</h3>
                <ListComponent transactions={transactions}
                               onDeleteButtonClick={onDeleteButtonClickHandler}></ListComponent>
                <h3>Add new transaction</h3>
                <AddTransaction onFormSubmit={onFormSubmitHandler.bind(this)}
                                onTextInputChange={onTextInputChangeHandler.bind(this)}
                                onAmountInputChange={onAmountInputChangeHandler.bind(this)}
                                textInput={textInput} amountInput={amountInput}>

                </AddTransaction>
            </div>
        </div>
    );
}

export default App;

