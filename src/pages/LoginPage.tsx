import { AES, enc } from "crypto-js";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import login from "../assets/images/loginsignupImg.jpg";
import { loginInfo } from "../redux/slices/useAuth/userAuth";
import { loginSchema } from "../utils";
import { User } from "../utils/types";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  console.log(location);
  // let [searchParams, setSearchParams] = useSearchParams();
  // // console.log(searchParams.get('xyz'));

  // const getRedirect = searchParams.get('redirect');  
  

   const getRedirect = location.search.slice(1).split('&').find(el => el.includes('redirect'))?.split('=')[1];
   console.log(getRedirect);
  
   const redirect = getRedirect ? getRedirect : "/";
  // console.log(redirect);
  

  const formik = useFormik<User>({
    initialValues: {
      email: "",
      password: "",
      username: "",
      avatar: null,
      gender: "",
      dateOfBirth: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      const existingUsers = JSON.parse(
        localStorage.getItem("usersData") || "[]"
      ) as User[];
      const user = existingUsers.find((item) => item.email === values.email);

      if (user) {
        const decryptedPassword = decrypt(user.password);
        if (decryptedPassword === values.password) {
          const loginUser = {
            email: values.email,
            name: user.username,
            gender: user.gender,
            dateOfBirth: user.dateOfBirth,
            avatar: user.avatar,
            password: encrypt(values.password),
          };
          dispatch(loginInfo(loginUser));
          localStorage.setItem("loginuser", JSON.stringify(loginUser));
          enqueueSnackbar("Login successful!", { variant: "success" });
          setTimeout(() => {
            navigate(`${redirect}`)
          }, 1000);
        } else {
          formik.setFieldError("password", "Password does not match");
        }
      } else {
        formik.setFieldError("email", "User not found");
      }
    },
  });

  const encrypt = (data: string) => {
    return AES.encrypt(JSON.stringify(data), "secret_key").toString();
  };

  const decrypt = (encryptedData: string) => {
    const bytes = AES.decrypt(encryptedData, "secret_key");
    const decryptedData = bytes.toString(enc.Utf8);
    return JSON.parse(decryptedData);
  };

  return (
    <section className="bg-gray-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 w-full">
        <div className="hidden sm:block">
          <img className="w-full h-full object-contain" src={login} alt="img" />
        </div>
        <div className="flex items-center justify-center">
          <div className=" max-w-[450px] w-full flex flex-col justify-center">
            <h2 className="text-2xl text-center font-bold mb-4">Login</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={
                    formik.touched.email && formik.errors.email
                      ? "border-red-500 border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                      : "border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  placeholder="Please enter your email"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={
                    formik.touched.password && formik.errors.password
                      ? "border-red-500 border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                      : "border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder="Enter your Password here"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="py-2 px-12 text-center bg-[#385A64] shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
                >
                  Log In
                </button>
              </div>
            </form>

            <Link to="/signup" className="mt-4 text-center text-gray-600">
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
