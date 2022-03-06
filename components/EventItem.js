import React from "react";
import Link from "next/link"
// we use image tag to optimize image to be displayed
import Image from "next/image";
import styles from "../styles/EventItem.module.css"
const EventItem = ({ event }) => {

  return <div className={styles.event} >
  <div className={styles.img}>
      <Image src={event.img?event.img:"./images/event-default.png"} width={170} height={100}/>
      
  </div>
  <div className={styles.info} >
      <span>{event.date} at {event.time} </span>
      <h3>{event.name}</h3>
      </div>
      <div className={styles.link} ><Link href="/events/[slug]" as={`/events/${event.slug}`}> <a className="btn" >Details</a> {event.title}</Link></div>
  </div>
};

export default EventItem;
