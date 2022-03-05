import React from 'react'
import styles from "../styles/Footer.module.css"
import Link from "next/link"
const Footer = () => {
  return (
    <footer className={styles.footer} >
        <p>Copyright &copy; Music Events 2022</p>
        <p>
        <Link href="/about">About This Project </Link>
        </p>
        
    </footer>
  )
}

export default Footer