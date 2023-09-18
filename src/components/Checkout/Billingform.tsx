// BillingInformation.tsx
import React from 'react';
import { Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface BillingInformationProps {
  initialValues: any; // Pass the initial values for billing here
}

const BillingInformation: React.FC<BillingInformationProps> = ({ initialValues }) => {
  const billingSchema = Yup.object().shape({
    billingFirstName: Yup.string()
      .matches(/^[A-Za-z]+( [A-Za-z]+)*$/, 'First Name should only contain letters and spaces')
      .required('First Name must be required'),

    billingLastName: Yup.string()
      .matches(/^[A-Za-z]+( [A-Za-z]+)*$/, 'Last Name should only contain letters')
      .required('Last Name must be required'),

    billingEmail: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Invalid email address'
      )
      .required('Email must be required'),

    billingPhoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone number must be required'),

    billingAddressLine1: Yup.string().required('Address must be required'),

    billingAddressLine2: Yup.string().required('Address must be required'),

    billingCity: Yup.string().required('City must be required'),

    billingState: Yup.string().required('State must be required'),

    billingPostalCode: Yup.string()
      .matches(/^[0-9]{6}$/, 'Postal code must be 6 digits')
      .required('Postal code must be required'),

    billingCountry: Yup.string().required('Country must be required'),
  });

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Billing Information</h2>
      <div className="mb-4 flex">

        <div className="w-1/2 mr-2">
          <div className='flex'>
            <img width="30" height="30" src="https://img.icons8.com/color/30/name--v1.png" alt="name--v1" />
            <label htmlFor="billingFirstName">First Name</label>
          </div>
          <Field
            type="text"
            name="billingFirstName"
            id="billingFirstName"
            placeholder="First Name"
            className="border rounded-md p-2 w-full"
          />
          <ErrorMessage name="billingFirstName" component="div" className="text-red-500" />
        </div>


        <div className="w-1/2 ml-2">
          <div className='flex'>
            <img width="30" height="30" src="https://img.icons8.com/color/30/name--v1.png" alt="name--v1" />
            <label htmlFor="billingLastName">Last Name</label>
          </div>
          <Field
            type="text"
            name="billingLastName"
            id="billingLastName"
            placeholder="Last Name"
            className="border rounded-md p-2 w-full"
          />
          <ErrorMessage name="billingLastName" component="div" className="text-red-500" />
        </div>
      </div>

      <div className="flex mb-4">

        <div className="w-1/2 mr-2">
          <div className='flex'>
            <img width="30" height="30" src="https://img.icons8.com/bubbles/30/new-post.png" alt="new-post" />
            <label htmlFor="billingEmail">Email</label>
          </div>
          <Field
            type="text"
            name="billingEmail"
            id="billingEmail"
            placeholder="abc@gmail.com"
            className="border rounded-md p-2 w-full"
          />
          <ErrorMessage name="billingEmail" component="div" className="text-red-500" />
        </div>


        <div className="w-1/2 ml-2">
          <div className='flex'>
            <img width="30" height="30" src="https://img.icons8.com/fluency/30/phone.png" alt="phone" />
            <label htmlFor="billingPhoneNumber">Phone Number</label>
          </div>
          <Field
            type="text"
            name="billingPhoneNumber"
            id="billingPhoneNumber"
            placeholder="123 456 789"
            className="border rounded-md p-2 w-full"
          />
          <ErrorMessage
            name="billingPhoneNumber"
            component="div"
            className="text-red-500"
          />
        </div>
      </div>


      <div className="w-full mb-2">
        <div className='flex'>
          <img width="30" height="30" src="https://img.icons8.com/color/30/address--v1.png" alt="address--v1" />
          <label htmlFor="billingAddressLine1">Address Line 1</label></div>
        <Field
          type="text"
          name="billingAddressLine1"
          id="billingAddressLine1"
          placeholder="Enter address..."
          className="border rounded-md p-2 w-full"
        />
        <ErrorMessage
          name="billingAddressLine1"
          component="div"
          className="text-red-500"
        />
      </div>


      <div className="w-full mb-2">
        <div className='flex'>
          <img width="30" height="30" src="https://img.icons8.com/color/30/address--v1.png" alt="address--v1" />
          <label htmlFor="billingAddressLine2">Address Line 2</label></div>
        <Field
          type="text"
          name="billingAddressLine2"
          id="billingAddressLine2"
          placeholder="Enter address..."
          className="border rounded-md p-2 w-full"
        />
        <ErrorMessage
          name="billingAddressLine2"
          component="div"
          className="text-red-500"
        />
      </div>

      <div className="flex flex-wrap mb-2">

        <div className="w-full md:w-1/2 pr-2">
          <div className='flex'>
            <img width="30" height="30" src="https://img.icons8.com/office/30/new-york.png" alt="new-york" />
            <label htmlFor="billingCity">City</label>
          </div>
          <Field
            type="text"
            name="billingCity"
            id="billingCity"
            placeholder="Enter City..."
            className="border rounded-md p-2 w-full"
          />
          <ErrorMessage
            name="billingCity"
            component="div"
            className="text-red-500"
          />
        </div>


        <div className="w-full md:w-1/2 pl-2">
          <div className='flex'>
            <img width="30" height="30" src="https://img.icons8.com/color/30/new-york.png" alt="new-york" />
            <label htmlFor="billingState">State</label>
          </div>
          <Field
            type="text"
            name="billingState"
            id="billingState"
            placeholder="Enter State..."
            className="border rounded-md p-2 w-full"
          />
          <ErrorMessage
            name="billingState"
            component="div"
            className="text-red-500"
          />
        </div>
      </div>

      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 pr-2 mb-2">
          <div className="flex items-center mb-2">
            <img width="30" height="30" src="https://img.icons8.com/color/30/india-circular.png" alt="india-circular" />
            <label htmlFor="billingCountry" className="ml-2">Country</label>
          </div>
          <Field
            type="text"
            name="billingCountry"
            id="billingCountry"
            placeholder="Country"
            className="border rounded-md p-2 w-full"
          />
          <ErrorMessage
            name="billingCountry"
            component="div"
            className="text-red-500"
          />
        </div>

        <div className="w-full md:w-1/2 pl-2 mb-2">
          <div className="flex items-center mb-2">
            <img width="30" height="30" src="https://img.icons8.com/fluency/30/mailbox-with-letter.png" alt="mailbox-with-letter" />
            <label htmlFor="billingPostalCode" className="ml-2">Postal Code</label>
          </div>
          <Field
            type="text"
            name="billingPostalCode"
            id="billingPostalCode"
            placeholder="Postal Code"
            className="border rounded-md p-2 w-full"
          />
          <ErrorMessage
            name="billingPostalCode"
            component="div"
            className="text-red-500"
          />
        </div>
      </div>

    </div>
  );
};

export default BillingInformation;
