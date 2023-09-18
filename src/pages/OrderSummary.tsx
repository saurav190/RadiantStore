
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import EWayBill from './EWayBill'

const OrderSummary = () => {
 const{ billingFirstName,
 billingLastName,
 billingEmail,
 billingPhoneNumber,
 billingAddressLine1,
 billingAddressLine2,
 billingCity,
 billingState,
 billingPostalCode,
 billingCountry,
 }= useSelector((state:RootState)=>state.checkout)
const {totalQuantity,items} =useSelector((state:RootState)=>state.cart);
  return (
    <>
      <EWayBill />
    </>
  )
}

export default OrderSummary