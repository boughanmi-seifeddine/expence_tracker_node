import { GlobalContext } from '../../context/GlobalState';
import {useContext, useState, useEffect} from "react";
function IncomeExpenseComponent (props){
    const {transactions} = useContext(GlobalContext);
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    useEffect(() => {
        setIncome(transactions.reduce((cum, transaction) => {
            return cum += transaction.amount > 0 ? transaction.amount : 0
        }, 0))
        setExpense(transactions.reduce((cum, transaction) => {
            return cum += transaction.amount < 0 ? transaction.amount : 0
        }, 0))
    }, [transactions]);

        return <>
            <h4>Your Balance</h4>
            <h1 id="balance">${((income + expense) * 1).toFixed(2)}</h1>
            <div className="inc-exp-container">
                <div>
                    <h4>Income</h4>
                    <p id="money-plus" className="money plus">+${income}</p>
                </div>
                <div>
                    <h4>Expense</h4>
                    <p id="money-minus" className="money minus">-${Math.abs(expense)}</p>
                </div>
            </div>

        </>

}
export default IncomeExpenseComponent