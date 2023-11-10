import React from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import logo from "../../public/img/logo.png";
import search from "../../public/img/search.png";
export default function Header(props) {
  const handleString = (e) => {
    props.setString(e.target.value);
  };
  return (
    <header className={styles.headerContainer}>
      <Image src={logo} alt="LOOKMEMES" placeholder="blur" />
      <div className={styles.searchContainer}>
        <input
          className={styles.search}
          placeholder="Search"
          onChange={(e) => handleString(e)}
        />
        <div className={styles.searchIcon}>
          <Image src={search} width={20} height={20} alt="LOOKMEMES" />
        </div>
      </div>
    </header>
  );
}
