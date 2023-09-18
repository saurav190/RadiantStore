import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { updateUserDetails } from "../redux/slices/useAuth/userAuth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface FormState {
  email: string;
  name: string;
  gender: string;
  phoneNumber: string;
  dateOfBirth: string;
}

const genderOptions = ["Male", "Female", "Others"];

const Profile: React.FC = () => {
  const user: any = useSelector((state: RootState) => state.userAuth.login);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    name: Yup.string().required("Username is required"),
    gender: Yup.string().required("Gender is required"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    dateOfBirth: Yup.date()
      .max(new Date(), "Date of Birth cannot be in the future")
      .required("Date of Birth is required"),
  });
  const initialValues: FormState = {
    email: user?.email || "",
    name: user?.name || "",
    gender: user?.gender || "",
    phoneNumber: user?.phoneNumber || "",
    dateOfBirth: user?.dateOfBirth || "",
  };

  const handleSubmit = (values: FormState) => {
    dispatch(updateUserDetails(values));
    toggleEdit();
  };

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        {isEditing ? (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-gray-700 text-sm font-bold mb-1">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 text-sm font-bold mb-1">Username</label>
                  <Field
                    type="text"
                    name="name"
                    className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
              
              <div className="flex flex-col">
                <label className="text-gray-700 text-sm font-bold mb-1">Gender</label>
                <Field
                  as="select"
                  name="gender"
                  className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Gender</option>
                  {genderOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 text-sm font-bold mb-1">Phone Number</label>
                <Field
                  type="text"
                  name="phoneNumber"
                  className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 text-sm font-bold mb-1">Date of Birth</label>
                <Field
                  type="date"
                  name="dateOfBirth"
                  className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="flex items-center justify-center space-x-4">
                <button
                  type="submit"
                  className="py-2 px-6 bg-[#385A64] text-white font-semibold rounded-lg hover:bg-[#304C57]"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={toggleEdit}
                  className="py-2 px-6 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </Form>
          </Formik>
        ) : (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="space-y-2">
                <div className="text-lg font-semibold">Account Information</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-gray-700 text-sm font-bold mb-1">Email</label>
                    <span className="px-2 py-1 border rounded-md">{user?.email}</span>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700 text-sm font-bold mb-1">Username</label>
                    <span className="px-2 py-1 border rounded-md">{user?.name}</span>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700 text-sm font-bold mb-1">Gender</label>
                    <span className="px-2 py-1 border rounded-md">
                      {user?.gender || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700 text-sm font-bold mb-1">Phone Number</label>
                    <span className="px-2 py-1 border rounded-md">
                      {user?.phoneNumber || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700 text-sm font-bold mb-1">Date of Birth</label>
                    <span className="px-2 py-1 border rounded-md">
                      {user?.dateOfBirth || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={toggleEdit}
                  className="py-2 px-8 bg-[#385A64] text-white font-semibold rounded-lg hover:bg-[#304C57]"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
