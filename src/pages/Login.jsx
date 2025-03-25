import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import service from "../services/service";
import { usePublicContext } from "../context/Context";

const loginSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const signupSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { setIsUserLoggedIn, alert, setUser, setNavigation } =
    usePublicContext();

  const initialValues = {
    username: "",
    password: "",
    confirm_password: "",
  };

  const handleSubmit = async (values, setSubmitting, resetForm) => {
    let result = {};
    try {
      if (isLogin) {
        result = await service.signIn({
          username: values.username,
          password: values.password,
        });

        if (result.status === 200) {
          localStorage.setItem("user-id", result.data?.id);
          localStorage.setItem("user-name", result.data?.username);
          localStorage.setItem("user-role", result.data?.role);
          alert(false, result?.message);
          setIsUserLoggedIn(true);
          setUser(result?.data);
          setNavigation("/");
        } else {
          alert(true, result?.message);
        }
      } else {
        result = await service.signUp({
          username: values.username,
          password: values.password,
          role: "User",
        });

        if (result.status === 200) {
          console.log(result.message);
          alert(false, result?.message);
        } else {
          alert(true, result?.message);
        }
      }
      console.log(result);
      setSubmitting(false);
    } catch (error) {
      alert(
        true,
        "Sorry, server is busy or not available right now. Please try again later !"
      );
      localStorage.setItem("user-id", "");
      localStorage.setItem("user-name", "");
      localStorage.setItem("user-role", "");
      console.log(error);
    } finally {
      resetForm();
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="login-form p-3 row">
        <div className="col-6 login-left-container d-flex flex-column align-items-start p-0 pe-3">
          <div className="d-flex flex-row align-items-center justify-content-start w-100 mb-4">
            <img
              src="/images/check.png"
              className="brand-logo"
              alt="brand-logo"
            />
            <h1 className="brand-name ms-2">Taskly</h1>
          </div>

          <div className="d-flex flex-column flex-grow-1">
            <h1 className="login-form-heading">
              {isLogin ? "Sign in" : "Sign up"}
            </h1>
            <p className="login-form-subheading">
              {isLogin
                ? "Sign in to your account"
                : "Create a new account for you"}
            </p>

            <Formik
              initialValues={initialValues}
              validationSchema={isLogin ? loginSchema : signupSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                handleSubmit(values, setSubmitting, resetForm);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="mt-4">
                  <label htmlFor="username">Username</label>
                  <Field
                    id="username"
                    name="username"
                    className="m-0 my-2 px-2 py-1"
                    placeholder="Enter your username"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="error-text"
                  />

                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="m-0 my-2 px-2 py-1"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-text"
                  />

                  {!isLogin && (
                    <>
                      <label htmlFor="confirm_password">
                        Re-enter password
                      </label>
                      <Field
                        type="password"
                        id="confirm_password"
                        name="confirm_password"
                        className="m-0 mt-2 px-2 py-1"
                        placeholder="Re-enter your password"
                      />
                      <ErrorMessage
                        name="confirm_password"
                        component="div"
                        className="error-text"
                      />
                    </>
                  )}

                  <button
                    type="submit"
                    className="submit-btn mt-4 mb-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Please wait..." : "Submit"}
                  </button>
                </Form>
              )}
            </Formik>

            <span className="mt-auto login-navigator-section">
              <p>
                {isLogin
                  ? "Don't have an account ?"
                  : "Already have an account ?"}
                <a className="ms-2" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? "Sign up" : "Sign in"}
                </a>
              </p>
            </span>
          </div>
        </div>

        <div className="col-6 login-right-container p-0">
          <div className="w-100 h-100 login-right-image d-flex position-relative">
            <div className="login-intro-box d-flex flex-column align-items-start rounded-4 mt-auto me-auto p-2 py-3">
              <h1>Your Productivity Partner</h1>
              <p className="mt-1">
                Streamline tasks, boost efficiency effortlessly.
              </p>
            </div>
            <div className="login-intro-box-2 d-flex flex-column align-items-start rounded-4 p-2 py-3">
              <h1>300+</h1>
              <p className="mt-1">World wide users.</p>
              <span className="d-flex flex-row align-items-center w-100 mt-2">
                <img src="/images/8104.jpg" alt="user1" />
                <img src="/images/2148375505.jpg" alt="user2" />
                <img src="/images/6384-copy.jpg" alt="user3" />
                <img src="/images/255.jpg" alt="user4" />
                <img src="/images/2148648911.jpg" alt="user5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
