import EventItem from "../../components/EventItem";
import Layout from "../../components/Layout";
import { API_URL,PER_PAGE } from "../config";
import Pagination from "../../components/Pagination";
export default function EventsPage({ events = [], page, total }) {

  // this console log is at client side
  
  return (
    <Layout>
      <div>
        <h1>Events</h1>
        {events.length === 0 && <h3>No Events to show</h3>}

        {events.map(({ attributes, id }) => (
          <EventItem key={id} event={attributes} />
        ))}
      </div>
      <Pagination page={page} total={total} perPage={PER_PAGE} />
    </Layout>
  );
}

// this code runs on build time and fetch data so we could make static page
// but there is a side back for this thats if there is any change in data it won't appear in the page as the pase already fetched the exists data during build
// so to get around this we add revalidate option to props and set it to a specific number of seconds so it will check every that time for any changes in DB and if there
// any change it will re-fetch the data

export const getServerSideProps = async ({ query: { page = 1 } }) => {

  const start = page == 1 ? 0 : (page - 1) * PER_PAGE;

  const response = await fetch(
    `${API_URL}/api/events?pagination[limit]=${PER_PAGE}&pagination[start]=${start}&pagination[withCount]=true&populate=*`
  );
  const events = await response.json();
  
  // const totalResponse = await fetch(`${API_URL}/api/events?pagination[withCount]=true`);
  // const total = await totalResponse.json();
  // console.log("total",total)
  // this console log is on server

  return {
    props: {
      events: events.data,
      page:parseInt(page),
      total: events.meta.pagination.total,
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
