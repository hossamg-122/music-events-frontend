import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify'
import {FaImage} from "react-icons/fa"
import "react-toastify/dist/ReactToastify.css"
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image"
import Layout from "../../../components/Layout";
import { API_URL } from "../../config";
import styles from "../../../styles/Form.module.css";
import { Formik, Form } from "formik";
import * as yup from "yup";
import moment from "moment"
import InputHandler from "../../../components/InputHandler";
import Modal from "../../../components/modal";
import  ImageUpload  from "../../../components/ImageUpload";
const Edit = ({event}) => {
  const router = useRouter();
 const [ imagePreview,setImagePreview ] = useState(
    event?.attributes?.image?.data?event.attributes.image.data.attributes.formats.medium.url:null
 )
 const [showModal,setShowModal] = useState(false)

  const handleModalClose = () => {
      setShowModal(false)
  }
  const imageUploaded =async () =>{
     const res = await fetch(`${API_URL}/events/${event.id}`)
     const data = await res.json()
     setImagePreview(data.attributes.image.data.attributes.formats.medium.url)
     handleModalClose()
  }
  const initialValues = {
    name: event?.attributes?.name,
    performers: event?.attributes?.performers,
    venu: event?.attributes?.venu,
    address: event?.attributes?.address,
    date:moment(event?.attributes?.date).format('yyyy-MM-DD'),
    time: event?.attributes?.time,
    description:event?.attributes?.description,
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
    
    const res = await fetch(`${API_URL}/api/events/${event.id}`, {
      method: 'PUT',
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
    <Layout title="Edit New Event">
      <Link href="/events">Go Back</Link>

      <h1>Edit Event</h1>
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
           <input type="submit" value="Edit Event" className={`btn ${styles.submit}`} />
          </Form>
        )}
      </Formik>
      <h2>Event Image</h2>
      {imagePreview?
      (<Image src={imagePreview} height={100} width={170} />):
<div>
    <p>No image uploaded</p>
</div>
    }
    <div>
       <button className="btn-secondary" onClick={()=>setShowModal(true)}>
           <FaImage /> Set Image
           </button> 
    </div>
    <Modal show={showModal} onClose={handleModalClose}>
      <ImageUpload id={event.id} imageUploaded={imageUploaded} />
    </Modal>
    </Layout>
  );
};

export default Edit;

export const getServerSideProps = async (context) => {
  console.log(context.req.headers.cookie)
    const response = await fetch(
      `${API_URL}/api/events/${context.params.id}?populate=*`
    );
    const event = await response.json();

    return {
      props: {
        event: event.data,
      },
    
    };
  };
  