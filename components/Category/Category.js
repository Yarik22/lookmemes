"use client";

import dragIcon from "../../public/img/drag.png";
import deleteWhiteIcon from "../../public/img/deleteWhite.png";
import deleteIcon from "../../public/img/delete.png";
import React, { useState } from "react";
import styles from "./Category.module.css";
import Image from "next/image";
export default function Category(props) {
  const [checked, setChecked] = useState(props.category.checked);
  const [showModal, setShowModal] = useState(false);
  const handleTextChange = (e) => {
    props.setShowConfirm(true);
    props.setCategories((prev) =>
      prev.map((cat) =>
        cat.id === props.category.id ? { ...cat, name: e.target.value } : cat
      )
    );
    console.log(props.category);
  };
  const handleDelete = () => {
    setShowModal(true);
  };
  const confirmDelete = () => {
    props.setShowConfirm(true);
    props.setCategories((prevState) =>
      prevState.filter((item) => props.category.id !== item.id)
    );
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };
  const handleChecked = () => {
    props.setShowConfirm(true);
    props.setCategories((prev) =>
      prev.map((cat) =>
        cat.id === props.category.id ? { ...cat, checked: !checked } : cat
      )
    );
    setChecked(!checked);
  };
  return (
    <div
      className={styles.category}
      style={{ cursor: checked ? "not-allowed" : "default" }}
    >
      <div className={styles.name} color={checked ? "gray" : null}>
        <span
          style={{
            color: checked ? "gray" : "inherit",
            transition: "color 0.3s ease",
          }}
        >
          <input
            value={props.category.name}
            className={styles.input}
            style={{
              color: checked ? "gray" : "inherit",
              transition: "color 0.3s ease",
              background: "inherit",
              border: "none",
              width: "30vw",
            }}
            readOnly={checked || props.category.name === "Other"}
            onChange={(e) => handleTextChange(e)}
          />
          <span className={styles.error}>
            {props.category.name.trim().length === 0
              ? "Empty category"
              : props.categories.some(
                  (c) =>
                    c.name.toLowerCase() ===
                      props.category.name.toLowerCase() &&
                    c.id !== props.category.id
                )
              ? "This category already exists"
              : null}
          </span>
        </span>
      </div>
      <div className={styles.options}>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => handleChecked()}
          className={styles.toggleInput}
        />
        {props.category.id === 1 ? null : (
          <>
            <Image
              onClick={handleDelete}
              src={deleteIcon}
              alt="LOOKMEMES"
              placeholder="blur"
              className={styles.deleteIcon}
            />
            <Image
              src={dragIcon}
              alt="LOOKMEMES"
              placeholder="blur"
              className={styles.dragIcon}
            />
          </>
        )}
      </div>
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p className={styles.title}>Delete the Category?</p>
            <p className={styles.description}>
              All templates in the category will be moved to the category
              "Other"
            </p>
            <button className={styles.confirmDelete} onClick={confirmDelete}>
              <Image src={deleteWhiteIcon} alt="LOOKMEMES" placeholder="blur" />
              Delete
            </button>
            <button className={styles.cancelDelete} onClick={cancelDelete}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
