import EventItem from "../../components/EventItem";
import Layout from "../../components/Layout";
import { API_URL } from "../config";

export default function EventsPage({ events = [] }) {
  // this console log is at client side
  // console.log(events)
  return (
    <Layout>
      <div>
        <h1>Events</h1>
        {events.length === 0 && <h3>No Events to show</h3>}
       
        {events.map((event) => (
          <EventItem key={event.id} event={event} />
        ))}
      </div>
    </Layout>
  );
}

// this code runs on build time and fetch data so we could make static page
// but there is a side back for this thats if there is any change in data it won't appear in the page as the pase already fetched the exists data during build
// so to get around this we add revalidate option to props and set it to a specific number of seconds so it will check every that time for any changes in DB and if there
// any change it will re-fetch the data

export const getStaticProps = async () => {
  const response = await fetch(`${API_URL}/api/events`);
  const events = await response.json();
  // this console log is on server
  // console.log(events)
  return {
    props: {
      events,
      revalidate: 1,
    },
  };
};

// this code runs on server each time we request this page

// export const getServerSideProps =async () =>{
//   const response = await fetch(`${API_URL}/api/events`)
//   const events = await response.json()
//   this console log is on server
//  console.log(events)
//   return {
//     props:{
//       events
//     }
//   }
// }
