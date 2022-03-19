import React,{ useState, useEffect, useContext } from "react";
import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from '../../context/AuthContext'
import Link from "next/link";
import Layout from "../../components/Layout";
import styles from "../../styles/AuthForm.module.css";
import { Formik, Form } from "formik";
import * as yup from "yup";
import InputHandler from "../../components/InputHandler"
const login = () => {
  const { login, error } = useContext(AuthContext)
  useEffect(() => error && toast.error(error))
  
  const initialValues = {
    email: "",
    password: "",
  };
  const validate = yup.object().shape({
    email: yup.string().email().required("required"),
    password: yup.string().required("required"),
  });
  const handleSubmit=(values) => {
      
      login({ email:values.email, password:values.password })
  }
  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log In
        </h1>
        <ToastContainer />
        <Formik
          initialValues={initialValues}
          validationSchema={validate}
          onSubmit={(values) => handleSubmit(values)}
        >
          {(formValues) => <Form>
              <InputHandler
                name='email'
                label="Email Address"
                id='email'
                />
                <InputHandler
                name='password'
                label="Password"
                id='password'
                />
                <input type="submit" value="Login" className={`btn`} />
              </Form>}
        </Formik>
        <p>Don't have an account <Link href="/account/register" >Register</Link></p>
      </div>
    </Layout>
  );
};

export default login;
