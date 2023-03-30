import  {Fragment} from "react";
function IncomeExpenseComponent (props){
        return <Fragment>
            <div>
                <h4>Income</h4>
                <p id="money-plus" className="money plus">+${props.income}</p>
            </div>
            <div>
                <h4>Expense</h4>
                <p id="money-minus" className="money minus">-${props.expense}</p>
            </div>
        </Fragment>

}
export default IncomeExpenseComponent