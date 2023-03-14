import React, {Component} from 'react';
import axios from "axios";
import './components/list/list.component'
import ListComponent from "./components/list/list.component";
import IncomeExpense from "./components/incomeexpense/incomeexpence.component";
import AddTransaction from "./components/addTransaction/addTransaction.component";

const dummyTransactions = [];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amountInput: '',
            textInput: '',
            income: 0,
            expense: 0,
            transactions: []
        }
    }

    generateId() {
        return Date.now();
    }

    getTransactions = async () => {
        const response = await axios.get(
            `api/v1/transactions`
        );
        return response.data.data
    }

    componentDidMount() {
        this.getTransactions().then((transactions) => {
            this.setState(() => {
                return {transactions: transactions}
            }, () => {
                this.setState(() => {
                    return {
                        income: this.state.transactions.reduce((cum, transaction) => {
                            return cum += transaction.amount > 0 ? transaction.amount : 0
                        }, 0),
                        expense: this.state.transactions.reduce((cum, transaction) => {
                            return cum += transaction.amount < 0 ? transaction.amount : 0
                        }, 0)
                    }
                })
            })
        })
    }

    onTextInputChangeHandler(e) {
        e.preventDefault()
        this.setState(() => {
            return {textInput: e.target.value}
        })
    }

    onAmountInputChangeHandler(e) {
        e.preventDefault()
        this.setState(() => {
            return {amountInput: e.target.value * 1}
        })
    }

    onFormSubmitHandler(e) {
        e.preventDefault()
        if (this.state.textInput && this.state.amountInput) {
            axios.post('api/v1/transactions', {text: this.state.textInput, amount: this.state.amountInput}).then((response) => {
                this.setState(() => {
                    return {
                        transactions: [...this.state.transactions, {
                            id: response.data.data[0].id,
                            text: this.state.textInput,
                            amount: this.state.amountInput
                        }],
                        income: this.state.amountInput > 0 ? this.state.income + this.state.amountInput : this.state.income,
                        expense: this.state.amountInput < 0 ? this.state.expense - this.state.amountInput : this.state.expense,
                        amountInput: '',
                        textInput: ''
                    }
                })
            })
        }
    }

    onDeleteButtonClickHandler = (id) => {
        axios.delete(`api/v1/transactions/${id}`).then((response) => {
            const deletedTransaction = [...response.data.data].shift()
            this.setState(() => {
                return {
                    transactions: this.state.transactions.filter(element => element.id !== deletedTransaction.id),
                    income: deletedTransaction.amount > 0 ? this.state.income - deletedTransaction.amount : this.state.income,
                    expense: deletedTransaction.amount < 0 ? this.state.expense - deletedTransaction.amount : this.state.expense,
                }
            })
        })
    }

    renderTransaction() {
        return this.state.transactions.map(transaction => {
            return <div key={transaction.id}>
                <li className={transaction.amount >= 0 ? 'plus' : 'minus'}>
                    {transaction.text} <span>{transaction.amount}</span>
                    <button className="delete-btn">x</button>
                </li>
            </div>
        })
    }

    render() {
        return (
            <div className="App">
                <div className="App-container">
                    <h2>Expense Tracker</h2>

                    <div className="container">
                        <h4>Your Balance</h4>
                        <h1 id="balance">${((this.state.income + this.state.expense) * 1).toFixed(2)}</h1>

                        <div className="inc-exp-container">
                            <IncomeExpense income={this.state.income} expense={this.state.expense}></IncomeExpense>
                        </div>

                        <h3>History</h3>
                        <ListComponent transactions={this.state.transactions}
                                       onDeleteButtonClick={this.onDeleteButtonClickHandler}></ListComponent>

                        <h3>Add new transaction</h3>
                        <AddTransaction onFormSubmit={this.onFormSubmitHandler.bind(this)}
                                        onTextInputChange={this.onTextInputChangeHandler.bind(this)}
                                        onAmountInputChange={this.onAmountInputChangeHandler.bind(this)}
                                        textInput={this.state.textInput} amountInput={this.state.amountInput}>

                        </AddTransaction>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
