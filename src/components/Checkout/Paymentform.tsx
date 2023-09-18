import React from 'react';
import { Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface PaymentInformationProps {
    initialValues: any; // Pass the initial values for payment here
}

const PaymentInformation: React.FC<PaymentInformationProps> = ({ initialValues }) => {
    const paymentSchema = Yup.object().shape({
        cardNumber: Yup.string()
            .matches(/^\d{16}$/, 'Card Number must be a 16-digit number')
            .required('Card number must be required'),

        cardHolderName: Yup.string()
            .matches(/^[A-Za-z ]+$/, 'Only letters and spaces are allowed')
            .required('Holder name must be required'),

        expirationDate: Yup.string()
            .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Use MM/YY format')
            .required('Expiration Date is required'),

        cvv: Yup.string()
            .matches(/^\d{3}$/, 'CVV must be exactly 3 digits')
            .required('CVV is required'),
    });

    
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Payment Information</h2>

            <div className="mb-4">
                <div className='flex'>
                    <img width="30" height="30" src="https://img.icons8.com/3d-fluency/30/credit-card-front.png" alt="credit-card-front" />
                    <label htmlFor="cardNumber">Card Number</label>   <span className="text-red-500">*</span></div>
                <Field
                    type="text"
                    name="cardNumber"
                    id="cardNumber"
                    placeholder="Card Number"
                    className="border rounded-md p-2 w-full"
                />
                <ErrorMessage name="cardNumber" component="div" className="text-red-500" />
            </div>

            <div className="mb-4">
                <div className='flex'>
                    <img width="30" height="30" src="https://img.icons8.com/fluency/30/credit-card-front.png" alt="credit-card-front" />
                    <label htmlFor="cardHolderName">Cardholder Name</label>   <span className="text-red-500">*</span></div>
                <Field
                    type="text"
                    name="cardHolderName"
                    id="cardHolderName"
                    placeholder="Cardholder Name"
                    className="border rounded-md p-2 w-full"
                />
                <ErrorMessage name="cardHolderName" component="div" className="text-red-500" />
            </div>

            <div className="flex flex-wrap mb-4">
                <div className="w-1/2 pr-2">
                    <div className='flex'>
                        <img width="30" height="30" src="https://img.icons8.com/emoji/30/credit-card-emoji.png" alt="credit-card-emoji" />
                        <label htmlFor="expirationDate">Expiration Date</label>   <span className="text-red-500">*</span></div>
                    <Field
                        type="text"
                        name="expirationDate"
                        id="expirationDate"
                        placeholder="MM/YY"
                        className="border rounded-md p-2 w-full"
                    />
                    <ErrorMessage name="expirationDate" component="div" className="text-red-500" />
                </div>

                <div className="w-1/2 pl-2">
                    <div className='flex'>
                        <img width="30" height="30" src="https://img.icons8.com/emoji/30/credit-card-emoji.png" alt="credit-card-emoji" />
                        <label htmlFor="cvv">CVV</label>   <span className="text-red-500">*</span></div>
                    <Field
                        type="text"
                        name="cvv"
                        id="cvv"
                        placeholder="CVV"
                        className="border rounded-md p-2 w-full"
                    />
                    <ErrorMessage name="cvv" component="div" className="text-red-500" />
                </div>
            </div>

            
        </div>
    );
};

export default PaymentInformation;
