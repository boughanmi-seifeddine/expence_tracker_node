import React, {Component, Fragment} from 'react';

class TransactionInput extends Component{

    render() {
        return <Fragment>
            <div className="form-control">
                <label htmlFor={this.props.idProp}>{this.props.titleProp}</label>
                <input type={this.props.typeProp} id={this.props.idProp}  onChange={this.props.actionProp}
                       value={this.props.valueProp  } placeholder={this.props.placeHolderProp}/>
            </div>
        </Fragment>
    }
}
export default TransactionInput