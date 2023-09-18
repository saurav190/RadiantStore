import React from 'react';
import { Formik, Form, Field, ErrorMessage,FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AddContactSupport } from '../redux/slices/support/supportSlice';
import { AppDispatch, RootState } from '../redux/store';
import { useSnackbar } from "notistack";
import SupportpageDisplay from './SupportpageDisplay';
const SupportPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { enqueueSnackbar } = useSnackbar();
   const supportContact= useSelector((state:RootState)=>state.support.supportContact)

  const initialValues = {
    name: '',
    email: '',
    message: '',
    helpWith:'',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3,"Minimum three character required")
    .matches(/^[A-Za-z]+( [A-Za-z]+)*$/, 'Name should only contain letters and spaces')
    .required('Name is required'),
    email: Yup.string()
    .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Invalid email address'
    ).email('Invalid email').required('Email is required'),
    helpWith: Yup.string().required('Please select an option'),
    message: Yup.string().min(10,"Minimum 10 charactere required").required('Message is required'),
  });
  const generateRandomToken=()=>{
    const character='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const tokenLength=10;
    let token='';
    for(let i=0;i<tokenLength;i++){
        const randomIndex = Math.floor(Math.random() * character.length)
        token += character.charAt(randomIndex)
    }
    return token;
  }

  const handleSubmit = (values:any,{ resetForm }: FormikHelpers<any>) => {
    const reandomtoken = generateRandomToken();
    const supporuvalue={
      name: values.name,
      email: values.email,
      helpWith:values.helpWith,
      message: values.message,
      token:reandomtoken
    }
    dispatch(AddContactSupport({supportContact:supporuvalue }));
    
    enqueueSnackbar("sortly your complaint resolved", { variant: "success" });
    setTimeout(() => {
      resetForm();
    }, 1000);
  };
  return (
    <>
    <div className="flex justify-center items-center py-10 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Contact Support</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-600 text-xs mt-1"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600 text-xs mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                What can we help you with today?
              </label>
              <div>
                <label className="inline-flex items-center">
                  <Field type="radio" name="helpWith" value="billing" />
                  <span className="ml-2">Billing</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <Field type="radio" name="helpWith" value="technical" />
                  <span className="ml-2">Technical</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <Field type="radio" name="helpWith" value="sales" />
                  <span className="ml-2">Sales</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <Field type="radio" name="helpWith" value="others" />
                  <span className="ml-2">Others</span>
                </label>
                </div>
              <ErrorMessage
                name="helpWith"
                component="div"
                className="text-red-600 text-xs mt-1"
                />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <Field
                as="textarea"
                id="message"
                name="message"
                className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
              />
              <ErrorMessage
                name="message"
                component="div"
                className="text-red-600 text-xs mt-1"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white rounded-md py-2 px-4 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
    {supportContact &&<SupportpageDisplay/>}
    </>
  );
};

export default SupportPage;
