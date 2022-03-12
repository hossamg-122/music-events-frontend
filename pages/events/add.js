import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../components/Layout";
import { API_URL } from "../config";
import styles from "../../styles/Form.module.css";
import { Formik, Form } from "formik";
import * as yup from "yup";
import InputHandler from "../../components/InputHandler";
const add = () => {
  const router = useRouter();
  const initialValues = {
    name: "",
    performers: "",
    venu: "",
    address: "",
    date: "",
    time: "",
    description: "",
  };

  const validation = yup.object().shape({
    name: yup.string().required("required"),
    performers: yup.string().required("required"),
    venu: yup.string().required("required"),
    address: yup.string().required("required"),
    date: yup.string().required("required"),
    time: yup.string().required("required"),
    description: yup.string().required("required"),
  });
  const handleSubmit = async (values) => {
    
    const res = await fetch(`${API_URL}/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    //    Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({data:values}),
    })

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error('No token included')
        return
      }
      toast.error('Something Went Wrong')
    } else {
      const evt = await res.json()
      console.log(evt)
      router.push(`/events/${evt.data.attributes.slug}`)
    }
  };
  return (
    <Layout title="Add New Event">
      <Link href="/events">Go Back</Link>

      <h1>Add Event</h1>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={(values) => handleSubmit(values)}
      >
        {(formValues) => (
          <Form   >
            <div className={styles.grid}>
            <InputHandler
              type="text"
              id="name"
              name="name"
              label="Event Name"
            />
            <InputHandler
              type="text"
              id="performers"
              name="performers"
              label="Performers"
            />
            <InputHandler type='text'
              name='venu'
              id='venu' label="Venue" />
            <InputHandler type='text'
              name='address'
              id='address' label="Address" />
            <InputHandler type='date'
              name='date'
              id='date' label="Date" />
            <InputHandler type='text'
              name='time'
              id='time' label="Time" />
            
            </div>
            <InputHandler   type='text'
            name='description'
            id='description' label="Event Description" />
           <input type="submit" value="Add Event" className={`btn ${styles.submit}`} />
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default add;
