import EventItem from "../../components/EventItem";
import Layout from "../../components/Layout";
import { API_URL } from "../config";
import qs from "qs";
import {useRouter} from "next/router"
import Link from "next/Link"

export default function EventsPage({ events = [] }) {
  // this console log is at client side
 
  const router = useRouter()
  return (
    <Layout title='Search Results' >
        <Link href="/events" >Go Back</Link>
      <div>
        <h1>Search Results for {router.query.term}</h1>
        {events.length === 0 && <h3>No Events to show</h3>}

        {events.map(({ attributes, id }) => (
          <EventItem key={id} event={attributes} />
        ))}
      </div>
    </Layout>
  );
}

// we will use getServerSideProps in search process as we need to make search in DB
// when we send request to the server

export const getServerSideProps = async ({ query: { term } }) => {
  const query = qs.stringify(
    {
      filters: {
        $or: [
          {
            name: {
              $contains: term,
            },
          },
          {
            performers: {
              $contains: term,
            },
          },
          {
            description: {
              $contains: term,
            },
          },
          {
            venu: {
              $contains: term,
            },
          },
        ],
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await fetch(
    `${API_URL}/api/events?${query}&populate=*`
  );

  // this code if we want to search for a specific field
//   const response = await fetch(
//     `${API_URL}/api/events?filters[name][$contains]=${term}&populate=*`
//   );

  const events = await response.json();

  // this console log is on server

  return {
    props: {
      events: events.data,
    },
    // don't need to use revalidate with getServerSideProps
    // revalidate: 1,
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
