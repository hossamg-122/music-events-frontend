import React from "react";
import Link from "next/link"
// we use image tag to optimize image to be displayed
import Image from "next/image";
import styles from "../styles/EventItem.module.css"
import defaultImage from "../public/images/event-default.png"
const EventItem = ({ event }) => {
console.log(event)
  return <div className={styles.event} >
  <div className={styles.img}>
      <Image src={event.image.data?event.image.data.attributes.formats.small.url:defaultImage} width={170} height={100}/>
      
  </div>
  <div className={styles.info} >
      <span>{new Date(event.date).toLocaleDateString('en-US')} at {event.time} </span>
      <h3>{event.name}</h3>
      </div>
      <div className={styles.link} >
        <Link href="/events/[slug]" as={`/events/${event.slug}`}> 
      <a className="btn" >Details</a> 
     
      </Link>
      </div>
  </div>
};

export default EventItem;
