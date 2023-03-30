import React, {Component} from 'react';
import IncomeComponent from "./item/income.component";

class IncomeExpenseComponent extends Component{

    render() {
        return <>
            <IncomeComponent income={this.props.income} type={"plus"} title={"Income"}></IncomeComponent>
            <IncomeComponent income={this.props.expense} type={"minus"} title={"Expense"}></IncomeComponent>
          {/*  <div>
                <h4>Income</h4>
                <p  className="money plus">+${this.props.income}</p>
            </div>
            <div>
                <h4>Expense</h4>
                <p  className="money minus">-${this.props.expense}</p>
            </div>*/}
        </>
    }
}
export default IncomeExpenseComponent