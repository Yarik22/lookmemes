"use client";
import checkCircle from "../public/img/check-circle.png";
import Category from "@/components/Category/Category";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import Image from "next/image";
const mockups = [{ id: 1, name: "Other", checked: true }];
export default function Home() {
  const [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem("categories")) || mockups
  );
  const [string, setString] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const addCategory = () => {
    setShowConfirm(true);
    setCategories((prev) => [
      ...prev,
      {
        id:
          categories.reduce(
            (max, current) => (current.id > max ? current.id : max),
            0
          ) + 1,
        name: "Category",
        checked: true,
      },
    ]);
  };
  useEffect(() => {
    localStorage.setItem(
      "categories",
      JSON.stringify(categories.map((c) => ({ ...c, name: c.name.trim() })))
    );
  }, []);
  const saveChanges = () => {
    if (categories.some((c) => c.name.trim().length == 0)) {
      console.log(123);
      return null;
    }
    setShowConfirm(false);
    localStorage.setItem(
      "categories",
      JSON.stringify(categories.map((c) => ({ ...c, name: c.name.trim() })))
    );
  };
  const cancelChanges = () => {
    setCategories(JSON.parse(localStorage.getItem("categories")));
    setShowConfirm(false);
  };
  return (
    <>
      <Header string={string} setString={setString} />
      <main className={styles.main}>
        <button className={styles.button} onClick={addCategory}>
          + Create category
        </button>
        <ul className={styles.list}>
          {categories
            .filter((cat) =>
              cat.name.toLowerCase().includes(string.toLowerCase())
            )
            .map((c) => {
              return (
                <li key={c.id}>
                  <Category
                    category={c}
                    setCategories={setCategories}
                    setShowConfirm={setShowConfirm}
                    saveChanges={saveChanges}
                  />
                </li>
              );
            })}
        </ul>
        {showConfirm ? (
          <footer className={styles.footer}>
            <button className={styles.confirmButton} onClick={saveChanges}>
              <Image src={checkCircle} alt="LOOKMEMES" placeholder="blur" />
              Save Changes
            </button>
            <button className={styles.cancelButton} onClick={cancelChanges}>
              Cancel
            </button>
          </footer>
        ) : null}
      </main>
    </>
  );
}
