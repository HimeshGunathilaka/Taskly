import { useState } from "react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

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
            <div className="login-form-container flex-grow-1">
              {isLogin ? (
                <form className="mt-4">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    className="m-0 my-2 px-2 py-1"
                    placeholder="Enter your username"
                  />
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    className="m-0 my-2 px-2 py-1"
                    placeholder="Enter your password"
                  />
                  <button className="submit-btn mt-4 mb-1" type="button">
                    Submit
                  </button>
                </form>
              ) : (
                <form className="mt-4">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    className="m-0 my-2 px-2 py-1"
                    placeholder="Enter your username"
                  />
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    className="m-0 my-2 px-2 py-1"
                    placeholder="Enter your password"
                  />
                  <label htmlFor="confirm_password">Re-enter password</label>
                  <input
                    id="confirm_password"
                    className="m-0 mt-2 px-2 py-1"
                    placeholder="Re-enter your password"
                  />

                  <button className="submit-btn mt-4 mb-1" type="button">
                    Submit
                  </button>
                </form>
              )}
            </div>

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
                <img src="/images/8104.jpg" />
                <img src="/images/2148375505.jpg" />
                <img src="/images/6384-copy.jpg" />
                <img src="/images/255.jpg" />
                <img src="/images/2148648911.jpg" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
