import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useQuery,useMutation } from "react-query";
import { LoginUser } from "../Services/Autentication";
//Actions
//Images
// import { useNavigate } from "react-router-dom";
import { SiteLogo } from "../assets/pathConstant";
import { AddUser } from "../store/reducer/authSlice";

const Login =() => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const mutation=useMutation(async(LoginInfo)=>{
    return LoginUser(LoginInfo)
  },{
    onSuccess:async (response,variables)=>{
    if(response.status='success'){
      dispatch(AddUser(response.data))
    }
    navigate('/dashboard')
        console.log(response)
    }
  }
)

  return (
    <section className="login__section section">
      <div className="container">
        <div className="form__container">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values) => {
                mutation.mutate(values)
                console.log(values);
            }}
          >
              <Form>
                <img src={SiteLogo} alt="" className="login__logo" />
                <Field type="text" name="email" id="" placeholder="E-mail" />
                <Field
                  type="password"
                  name="password"
                  id=""
                  placeholder="Password"
                />
                <Link to="forgot-password">Forgot Password?</Link>
                <button type="submit" className="btn">Login</button>
                <div className="form__footer">
                  <p>
                    Don't have an account <Link to="signup">Sign up</Link>
                  </p>
                  <p>
                    By signing in to your account, you agree to JOBSTER Terms of
                    Services and consent to our Cookie Policy and Privacy
                    Policy.
                  </p>
                </div>
              </Form>
            
          </Formik>
        {mutation.isLoading?<div>Loading......</div>:null}
        {mutation.isSuccess?<div>Success</div>:null}
        {mutation.isError?<div>{mutation.error.message}</div>:null}
        </div>
      </div>
    
    </section>
  );
};

export default Login;
