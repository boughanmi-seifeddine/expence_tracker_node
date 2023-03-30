import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalState';
function ListComponent() {
    const { transactions, getTransactions, deleteTransaction } = useContext(GlobalContext);
    useEffect(() => {
        getTransactions();
    }, []);
    function renderTransaction(){
        return transactions.map(transaction=>{
            return <div key={transaction.id}>
                <li className={transaction.amount >= 0 ? 'plus' : 'minus'}>
                    {transaction.text} <span>{transaction.amount}</span>
                    <button onClick={()=>{deleteTransaction(transaction.id)}}  className="delete-btn">x</button>
                </li>
            </div>
        })
    }
    return  (
        <ul id="list" className="list">
            {renderTransaction()}
        </ul>
    )
}
export default ListComponent