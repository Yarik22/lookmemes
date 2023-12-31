"use client";
import checkCircle from "../public/img/check-circle.png";
import Category from "@/components/Category/Category";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header/Header";
import Image from "next/image";
const mockups = [{ id: 1, name: "Other", checked: false }];
export default function Home() {
  const [categories, setCategories] = useState([]);
  const [string, setString] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const dragItem = useRef();

  const handleDragStart = (index) => {
    setDraggedItem(categories[index]);
    dragItem.current = index;
  };

  const handleDragEnter = (index) => {
    if (dragItem.current !== index) {
      const newItems = [...categories];
      newItems.splice(index, 0, newItems.splice(dragItem.current, 1)[0]);
      setCategories(newItems);
      dragItem.current = index;
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    dragItem.current = null;
    setShowConfirm(true);
  };

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

  function hasDuplicateNames(array) {
    let encounteredNames = {};
    for (let obj of array) {
      if (encounteredNames[obj.name]) {
        return true;
      } else {
        encounteredNames[obj.name] = true;
      }
    }
    return false;
  }
  useEffect(() => {
    if (localStorage.getItem("categories")) {
      setCategories(JSON.parse(localStorage.getItem("categories")));
      return;
    }
    setCategories(mockups);
  }, []);
  const saveChanges = () => {
    if (
      categories.some((c) => c.name.trim().length == 0) ||
      hasDuplicateNames(categories)
    ) {
      return null;
    }
    setShowConfirm(false);
    localStorage.setItem(
      "categories",
      JSON.stringify(categories.map((c) => ({ ...c, name: c.name.trim() })))
    );
  };
  const cancelChanges = () => {
    setCategories(JSON.parse(localStorage.getItem("categories")) || mockups);
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
            .map((c, index) => {
              return (
                <li
                  key={c.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragEnter={() => handleDragEnter(index)}
                  onDragEnd={handleDragEnd}
                >
                  <Category
                    category={c}
                    setCategories={setCategories}
                    setShowConfirm={setShowConfirm}
                    saveChanges={saveChanges}
                    categories={categories}
                  />
                </li>
              );
            })}
        </ul>
      </main>
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
    </>
  );
}
