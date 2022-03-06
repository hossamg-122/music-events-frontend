import React from "react";
import styles from "../styles/Layout.module.css";
import Meta from "./Meta";
import Header from "./Header";
import Footer from "./Footer";
import ShowCase from "./ShowCase";
import { useRouter } from "next/router";
const Layout = ({ title, description, keywords, children }) => {
    const router = useRouter()
  return (
    <div>
      <Meta title={title} description={description} keywords={keywords} />
      <Header />
      
      <div className={styles.container}>
          {router.pathname === "/"&&<ShowCase />}
      
        <main>{children}</main>
        <Footer />
      </div>
     
    </div>
  );
};

export default Layout;
