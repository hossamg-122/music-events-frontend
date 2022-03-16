import React from "react";
import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Layout from "../../components/Layout";
import styles from "../../styles/AuthForm.module.css";
import { Formik, Form } from "formik";
import * as yup from "yup";
import InputHandler from "../../components/InputHandler";
const Register = () => {
  const initialValues = {
    user_name: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  const validate = yup.object().shape({
    user_name: yup.string().required("required"),
    email: yup.string().email().required("required"),
    password: yup.string().required("required"),
    confirm_password: yup
      .string()
      .required("required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <Layout title="User Registration">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Register
        </h1>
        <ToastContainer />
        <Formik
          initialValues={initialValues}
          validationSchema={validate}
          onSubmit={(values) => handleSubmit(values)}
        >
          {(formValues) => (
            <Form>
              <InputHandler name="user_name" label="User Name" id="user_name" />
              <InputHandler name="email" label="Email Address" id="email" />
              <InputHandler name="password" label="Password" id="password" />
              <InputHandler
                name="confirm_password"
                label="Confirm Password"
                id="confirm_password"
              />
              <input type="submit" value="Register" className={`btn`} />
            </Form>
          )}
        </Formik>
        <p>
          Already have an account? <Link href="/account/login">Log in</Link>
        </p>
      </div>
    </Layout>
  );
};

export default Register;
