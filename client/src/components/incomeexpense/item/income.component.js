import React from 'react';
import {IncomeStyledComponent} from "./income.style.component";

const IncomeComponent = (props) => {
    return   <IncomeStyledComponent typeProp={props.type}>
        <h4>{props.title}</h4>
        <p >+${props.income}</p>
    </IncomeStyledComponent>
}

export default IncomeComponent;