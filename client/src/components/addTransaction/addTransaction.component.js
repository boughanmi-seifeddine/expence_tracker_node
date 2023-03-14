import React, {Component, Fragment} from 'react';
import TransactionInput from './transactionInput/transactionInput.component'
class AddTransaction extends Component{

    render() {
        return <Fragment>
            <form onSubmit={this.props.onFormSubmit} id="form">
                <TransactionInput   titleProp={'Text'} idProp={'text'} typeProp={'text'} placeHolderProp={'Enter text...'} actionProp={this.props.onTextInputChange} valueProp={this.props.textInput} ></TransactionInput>
                <TransactionInput   titleProp={'Amount'} idProp={'amount'} typeProp={'number'} placeHolderProp={'Enter amount...'} actionProp={this.props.onAmountInputChange} valueProp={this.props.amountInput} ></TransactionInput>
                <button type="submit" className="btn">Add transaction</button>
            </form>
        </Fragment>
    }
}
export default AddTransaction