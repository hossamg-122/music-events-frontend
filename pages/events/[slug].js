import React from 'react'
import Layout from '@components/Layout'
import { API_URL } from '../config'

const EventPage = ({event}) => {
  return (
      <Layout >
 <div>{event.name}</div>
      </Layout>
   
  )
}

export default EventPage

export const getStaticPaths =async () =>{
  const response = await fetch(`${API_URL}/api/events`)
  const events = await response.json()

const slugs = events.map((event)=> event.slug )
const paths = slugs.map((slug)=>{params:{slug:slug}})
return {
  paths,
  fallback:false
}
}
export const getStaticProps =async(context)=>{
  const response = await fetch(`${API_URL}/api/events/${context.query.slug}`)
  const event = await response.json()
  return {
    props:{
      event
    }
  }
}