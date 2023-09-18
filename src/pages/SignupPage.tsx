import { AES } from "crypto-js";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import login from "../assets/images/loginsignupImg.jpg";
import { signUpInfo } from "../redux/slices/useAuth/userAuth";
import { signupSchema } from "../utils";
import { User } from "../utils/types";
import { convertFileToBase64 } from "../utils/functions";

const SignupPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [avatarBase64, setAvatarBase64] = useState<string | null>(null); 

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      gender: "male",
      dateOfBirth: "",
      avatar: null,
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      dispatch(signUpInfo(values));
      const existingUsers: User[] = JSON.parse(
        localStorage.getItem("usersData") || "[]"
      );
        const newUser = {
        username: values.username,
        email: values.email,
        password: encrypt(values.password),
        confirm_password: encrypt(values.confirm_password),
        gender: values.gender,
        dateOfBirth: values.dateOfBirth,
        avatar: values.avatar,
      };
      const emailExists = existingUsers.some(
        (user) => user.email === values.email
      );
      if (emailExists) {
        formik.setFieldError("email", "Email already exists");
      } else {
        existingUsers.push(newUser);
        localStorage.setItem("usersData", JSON.stringify(existingUsers));
        dispatch(signUpInfo(values));
        enqueueSnackbar("Sign up successful! You can now login.", {
          variant: "success",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    },
  });

  const encrypt = (data: string) => {
    return AES.encrypt(JSON.stringify(data), "secret_key").toString();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    formik.setFieldTouched(e.target.name, true, false);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.currentTarget.files?.[0];
    if (selectedFile) {
      // Convert the selected image file to a Base64 encoded string
      convertFileToBase64(selectedFile)
        .then((base64String) => {
          setAvatarBase64(base64String); // Update the avatarBase64 state
          formik.setFieldValue("avatar", base64String); // Update formik values
        })
        .catch((error) => {
          console.error("Error converting avatar:", error);
          setAvatarBase64(null);
          formik.setFieldValue("avatar", null);
        });
    } else {
      setAvatarBase64(null);
      formik.setFieldValue("avatar", null);
    }
  };

  return (
    <>
      <section className="bg-gray-50">
        <div className="grid grid-cols-1  sm:grid-cols-2 py-12 w-full">
          <div className="flex items-center justify-center">
            <div className="max-w-[450px] w-full flex flex-col justify-center">
              <form onSubmit={formik.handleSubmit} className="w-full p-6">
                <h2 className="text-2xl text-center font-bold mb-4">SignUp</h2>
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    className={`border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 w-full ${
                      formik.touched.username && formik.errors.username
                        ? "border-red-500"
                        : ""
                    }`}
                    onChange={handleChange}
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.username && formik.errors.username && (
                    <p className="text-red-500">{formik.errors.username}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email here"
                    className={`border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 w-full ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-500"
                        : ""
                    }`}
                    onChange={handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500">{formik.errors.email}</p>
                  )}
                </div>

                <div className="mb-4">
        <label
          htmlFor="gender"
          className="block text-gray-700 font-semibold mb-1"
        >
          Gender
        </label>
        <div className="flex space-x-4">
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formik.values.gender === "male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formik.values.gender === "female"}
              onChange={handleChange}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="other"
              checked={formik.values.gender === "other"}
              onChange={handleChange}
            />
            Other
          </label>
        </div>
                </div>
                <div className="mb-4">
        <label htmlFor="avatar" className="block text-gray-700 font-semibold mb-1">
          Avatar
        </label>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/*"
          onChange={handleAvatarChange}
          className={`border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 w-full ${
            formik.touched.avatar && formik.errors.avatar ? "border-red-500" : ""
          }`}
        />
        {formik.touched.avatar && formik.errors.avatar && (
          <p className="text-red-500">{formik.errors.avatar}</p>
        )}
        {avatarBase64 && (
          <img
            src={avatarBase64}
            alt="Avatar Preview"
            className="mt-2 max-h-40"
          />
        )}
      </div>
                <div className="mb-4">
  <label
    htmlFor="dateOfBirth"
    className="block text-gray-700 font-semibold mb-1"
  >
    Date of Birth
  </label>
  <input
    type="date"
    id="dateOfBirth"
    name="dateOfBirth"
    max={new Date().toISOString().split("T")[0]} // Prevent future dates
    className={`border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 w-full ${
      formik.touched.dateOfBirth && formik.errors.dateOfBirth
        ? "border-red-500"
        : ""
    }`}
    onChange={handleChange}
    value={formik.values.dateOfBirth}
    onBlur={formik.handleBlur}
  />
  {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
    <p className="text-red-500">{formik.errors.dateOfBirth}</p>
  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password here"
                    className={`border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 w-full ${
                      formik.touched.password && formik.errors.password
                        ? "border-red-500"
                        : ""
                    }`}
                    onChange={handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500">{formik.errors.password}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="confirm_password"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    placeholder="Enter your confirm password here"
                    className={`border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 w-full ${
                      formik.touched.confirm_password &&
                      formik.errors.confirm_password
                        ? "border-red-500"
                        : ""
                    }`}
                    onChange={handleChange}
                    value={formik.values.confirm_password}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.confirm_password &&
                    formik.errors.confirm_password && (
                      <p className="text-red-500">
                        {formik.errors.confirm_password}
                      </p>
                    )}
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="py-2 px-12 text-center bg-[#385A64] shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              <Link to="/login" className=" text-center text-gray-600">
                Already Have an Account? Login Here
              </Link>
            </div>
          </div>
          <div className="hidden sm:block">
            <img
              className="w-full h-full object-contain"
              src={login}
              alt="img"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupPage;
