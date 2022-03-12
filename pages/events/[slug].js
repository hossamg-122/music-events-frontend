import React from "react";
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Layout from "../../components/Layout";
import { API_URL } from "../config";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Event.module.css";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";
const EventPage = ({ event }) => {
  const router = useRouter();
  const deleteEvent = async () => {
    if(confirm('Are You Sure You Want To Delete This Event?')){
      const res = await fetch(`${API_URL}/api/events/${event.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
      //    Authorization: `Bearer ${token}`,
        },
      //  body: JSON.stringify({data:values}),
      })
  
      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          toast.error('No token included')
          return
        }
        toast.error('Something Went Wrong')
      } else {
        const evt = await res.json()
       
        toast.success("Event Deleted Successfully")
        router.push(`/events`)
      }
    }
    else{
      return
    }
    
  };
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
        <ToastContainer />
          <Link href="/events/edit/[id]" as={`/events/edit/${event.attributes.slug}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>

          <a className={styles.delete} href="#" onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>
        <span>
        {new Date(event.attributes.date).toLocaleDateString('en-US')} at {event.attributes.time}
        </span>
        <h1>{event.attributes.name}</h1>
        {event?.image?.data && (
          <div className={styles.image}>
            <Image
              src={event?.attributes?.image?.data?.attributes?.formats?.medium?.url}
              width={960}
              height={600}
            />
          </div>
        )}
        <h3>Performance : </h3>
        <p> {event.attributes.performers} </p>
        <h3>Description : </h3>
        <p> {event.attributes.description} </p>
        <h3>Venue : {event.attributes.venu} </h3>
        <p> {event.address} </p>
        <Link href="/events">
          <a className={styles.back}>{"<"}Go Back</a>
        </Link>
      </div>
    </Layout>
  );
};

export default EventPage;

export const getStaticPaths = async () => {
  const response = await fetch(`${API_URL}/api/events`);
  const events = await response.json();

  const slugs = events?.data?.map(({ attributes, id }) => attributes.slug);
  const paths = slugs.map((slug) => ({
    params: {
      slug: slug,
    },
  }));
  return {
    paths,

    fallback: false,
    // false to display 404 if path is not exist
    // we will set it true if we want to look for it If the path it's not found and make a new request
  };
};
export const getStaticProps = async (context) => {
  const response = await fetch(
    `${API_URL}/api/events?filters[slug]=${context.params.slug}&populate=*`
  );
  const event = await response.json();
  return {
    props: {
      event: event.data[0],
    },
    revalidate: 1,
  };
};
