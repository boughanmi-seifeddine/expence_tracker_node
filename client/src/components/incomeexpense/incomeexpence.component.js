import React, {Component, Fragment} from 'react';

class IncomeExpenseComponent extends Component{

    render() {
        return <Fragment>
            <div>
                <h4>Income</h4>
                <p id="money-plus" className="money plus">+${this.props.income}</p>
            </div>
            <div>
                <h4>Expense</h4>
                <p id="money-minus" className="money minus">-${this.props.expense}</p>
            </div>
        </Fragment>
    }
}
export default IncomeExpenseComponent