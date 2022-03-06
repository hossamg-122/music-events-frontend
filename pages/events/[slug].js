import React from "react";
import Layout from "@components/Layout";
import { API_URL } from "../config";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Event.module.css";
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
const EventPage = ({ event }) => {
  const deleteEvent = (e) => {
    console.log(e);
  };
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href="/events/edit/[id]" as={`/events/edit/${event.id}`}>
            {" "}
            <a>
              {" "}
              <FaPencilAlt /> Edit Event{" "}
            </a>{" "}
          </Link>
          <Link href="#" onClick={deleteEvent}>
            {" "}
            <a>
              {" "}
              <FaTimes /> Delete Event
            </a>{" "}
          </Link>
        </div>
        <span>{event.data} at {event.time}</span>
        <h1>{event.name}</h1>
        {EveneventtsPage.image && (
          <div className={styles.image}>
            <Image
              src={event.image}
              width={960}
              height={600}
            />
          </div>
        )}
        <h3>Performance : </h3>
        <p> {event.description} </p>
        <h3>Venue : {event.venue}  </h3>
        <p> {event.address} </p>
        <Link href="/events"><a className={styles.back} >{"<"}Go Back</a></Link>
      </div>
     
     
      <h1>{event.name}</h1>
    </Layout>
  );
};

export default EventPage;

export const getStaticPaths = async () => {
  const response = await fetch(`${API_URL}/api/events`);
  const events = await response.json();

  const slugs = events.map((event) => event.slug);
  const paths = slugs.map((slug) => {
    params: {
      slug: slug;
    }
  });
  return {
    paths,

    fallback: false,
    // false to display 404 if path is not exist
    // we will set it true if we want to look for it If the path it's not found and make a new request
  };
};
export const getStaticProps = async (context) => {
  const response = await fetch(`${API_URL}/api/events/${context.params.slug}`);
  const event = await response.json();
  return {
    props: {
      event,
    },
    revalidate: 1,
  };
};
