import React from 'react'
import {FaExclamationTriangle} from "react-icons/fa"
import Layout from '../components/Layout'
import styles from "../styles/404.module.css"
import Link from "next/link"
const NotFoundPage = () => {
  return (
      <Layout >
<div className={styles.error} >
    <h1> <FaExclamationTriangle/> 404</h1>
    <h4>Sorry, There Is Nothing Here</h4>
    <Link href="/" >
    Go Back
    </Link>
</div>
      </Layout>
    
  )
}

export default NotFoundPage