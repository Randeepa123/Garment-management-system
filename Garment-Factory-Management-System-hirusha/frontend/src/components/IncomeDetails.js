import React, { Component } from 'react'
import axios from 'axios';
import FinanceSideMenu from './FinanceSideMenu';
export default class IncomeDetails extends Component {
    
  constructor(props){
    super(props);

    this.state={
        refund:{}
    };
  }

  componentDidMount(){

    const id = this.props.match.params.id;

    axios.get(`/refund/update/${id}`).then((res) =>{
        if(res.data.success){
            this.setState({
                refund:res.data.refund
            });

            console.log(this.state.refund);
        }
    });

  }

  render(){
    const {RefundID, CustomerID, OrderID, RequestedDate, Quantity, Amount_LKR} = this.state.refund;

    return (
      <div>
        <FinanceSideMenu/>
        <div className='container' style={{marginTop:'20px'}}>
          <br></br><br></br><br></br>
          <h4>Income ID : {RefundID}</h4>
          <hr></hr>
          <dl className='row'>
            <dt className='col-sm-3'>CustomerID</dt>
            <dd className='col-sm-9'>{CustomerID}</dd>
            <dt className='col-sm-3'>OrderID</dt>
            <dd className='col-sm-9'>{OrderID}</dd>
            <dt className='col-sm-3'>RequestedDate</dt>
            <dd className='col-sm-9'>{RequestedDate}</dd>
            <dt className='col-sm-3'>Quantity</dt>
            <dd className='col-sm-9'>{Quantity}</dd>
            <dt className='col-sm-3'>Amount (LKR)</dt>
            <dd className='col-sm-9'>{Amount_LKR}</dd>
          </dl>
        </div>
      </div>
    )
  }
} 