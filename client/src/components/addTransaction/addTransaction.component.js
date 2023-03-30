import React, {useContext, useState} from 'react';
import { GlobalContext } from '../../context/GlobalState'
import TransactionInput from './transactionInput/transactionInput.component'
function AddTransaction() {
    const { addTransaction } = useContext(GlobalContext);
    const [textInput, setTextInput] = useState("");
    const [amountInput, setAmountInput] = useState(0);
    function onTextInputChange (e) {
        e.preventDefault()
        setTextInput(e.target.value)
    }

    function onAmountInputChange (e) {
        e.preventDefault()
        setAmountInput(e.target.value * 1)
    }
    function onFormSubmit (e)  {
        e.preventDefault()
        console.log(textInput, amountInput)
        addTransaction({text: textInput, amount: amountInput * 1})
    }

    return <>
        <form onSubmit={onFormSubmit} id="form">
            <TransactionInput   titleProp={'Text'} idProp={'text'} typeProp={'text'} placeHolderProp={'Enter text...'} actionProp={onTextInputChange} valueProp={textInput} ></TransactionInput>
            <TransactionInput   titleProp={'Amount'} idProp={'amount'} typeProp={'number'} placeHolderProp={'Enter amount...'} actionProp={onAmountInputChange} valueProp={amountInput} ></TransactionInput>
            <button type="submit" className="btn">Add transaction</button>
        </form>
    </>
}
export default AddTransaction