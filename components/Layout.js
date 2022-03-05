import React from "react";
import styles from "../styles/Layout.module.css";
import Meta from "./Meta";
import Header from "./Header";
import Footer from "./Footer";
const Layout = ({ title, description, keywords, children }) => {
  return (
    <div>
      <Meta title={title} description={description} keywords={keywords} />
      <Header />
      <div className={styles.container}>
        <main>{children}</main>
        <Footer />
      </div>
     
    </div>
  );
};

export default Layout;
