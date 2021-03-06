import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logo } from "../../imports/image";
import {
  MetaData,
  useRequireInput,
  useTogglePassword,
} from "../../imports/index";
import { clearErrors, RegisterInitiate } from "../../Redux/Action/ActionAuth";
import { AuthenticationStyle } from "../../Style/AuthenticationStyle/AuthenticationStyle";
import LoadingSmall from "../Loading/LoadingSmall";

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    getValues,
    reset,
  } = useForm();
  const passwords = useRef({});
  passwords.current = watch("password");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleIsLock, isLock, isLockConfirm, handleIsLockConfirm } =
    useTogglePassword();
  const { authRegister, loading } = useSelector((state) => state.auth);
  const { emailRequire, passwordRegisterRequire, usernameRequire } =
    useRequireInput();

  const handleSubmitForm = (data) => {
    const { email, fullname, password } = data;
    dispatch(RegisterInitiate(fullname, email, password));
  };

  useEffect(() => {
    if (authRegister.success === true) {
      reset();
      toast.success(`${authRegister.msg}`);
      navigate("/login");
      dispatch(clearErrors());
    } else if (authRegister.success === false) {
      toast.error(`${authRegister.msg}`);
    }
  }, [authRegister]);
  return (
    <>
      <AuthenticationStyle />
      <MetaData title="Register-Movie" />
      <div className="login">
        <div className="top">
          <div className="wrapper">
            <img className="logo" src={logo} alt="" />
          </div>
        </div>
        <div className="auth__container">
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <h1>Register</h1>
            <input
              {...register("fullname", usernameRequire)}
              type="text"
              placeholder="Username"
              name="fullname"
              id="fullname"
            />
            <span style={{ color: "red" }}>
              {errors.fullname?.type === "required" &&
                "M???i b???n nh???p ?????y ????? t??n v??o!"}
              {errors?.fullname?.type === "maxLength" &&
                "T??n c???a b???n kh??ng ???????c qu?? 20 k?? t???"}
            </span>
            <input
              {...register("email", emailRequire)}
              type="email"
              placeholder="Email Address"
              name="email"
              id="email"
            />
            <span style={{ color: "red" }}>
              {errors.email?.type === "required" &&
                "M???i b???n nh???p Email ?????y ?????! "}
              {errors?.email?.type === "pattern" &&
                "Email c???a ban kh??ng h???p l???!"}
            </span>
            <div className="pwd-input">
              <input
                className="registerInput"
                {...register("password", passwordRegisterRequire)}
                type={isLock ? "type" : "password"}
                placeholder="Password"
                name="password"
                id="password"
              />
              {isLock ? (
                <i
                  className="fa fa-eye-slash"
                  onClick={handleIsLock}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <i
                  className="fa fa-eye"
                  onClick={handleIsLock}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>

            <span style={{ color: "red" }}>
              {errors.password?.type === "required" &&
                "M???i b???n nh???p ?????y ????? m???t kh???u. "}
              {errors?.password?.type === "minLength" &&
                "M???t kh???u c???a b???n ph???i 6 k?? t??? tr??? l??n !!"}
              {errors?.password?.type === "pattern" &&
                "M???t kh???u c?? k?? t??? in hoa,s??? v?? k?? t??? ?????t bi???t !"}
            </span>

            <div className="pwd-input">
              <input
                {...register("passwordConfirm", {
                  required: true,
                  validate: (value) =>
                    value === getValues("password") ||
                    "The passwords do not match",
                })}
                type={isLockConfirm ? "type" : "password"}
                placeholder="Confirm Password"
                name="passwordConfirm"
                id="passwordConfirm"
              />
              {isLockConfirm ? (
                <i
                  className="fa fa-eye-slash"
                  onClick={handleIsLockConfirm}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <i
                  className="fa fa-eye"
                  onClick={handleIsLockConfirm}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
            <span style={{ color: "red" }}>
              {errors.passwordConfirm?.type === "required" &&
                "M???i b???n nh???p l???i m???t kh???u."}
              {errors.passwordConfirm?.type === "validate" &&
                "M???t kh???u nh???p l???i kh??ng kh???p!   "}
            </span>
            {loading ? (
              <span className="loginButton1">
                <LoadingSmall />
              </span>
            ) : (
              <button className="loginButton">Sign Up</button>
            )}

            <footer>
              <span>
                Had a netflix account yet ?{" "}
                <b
                  onClick={() => navigate("/login")}
                  style={{ cursor: "pointer" }}
                >
                  Login now.
                </b>
              </span>
              <small>
                This page is protected by Google reCAPTCHA to ensure you're not
                a bot. <b style={{ cursor: "pointer" }}>Learn more</b>.
              </small>
            </footer>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
