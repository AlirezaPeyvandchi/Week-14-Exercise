import { useState } from "react";
import { v4 } from "uuid";

import ContactsList from "./ContactsList";
import inputs from "../constants/inputs";

import styles from "./Contacts.module.css";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [alert, setAlert] = useState("");
  const [contact, setContact] = useState({
    id: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    contactId: null,
  });
  const [errors, setErrors] = useState({});

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setContact((contact) => ({ ...contact, [name]: value }));
    setErrors((errors) => ({
      ...errors,
      [name]: "",
    }));
  };

  const validateHandler = () => {
    const newErrors = {};

    if (contact.name.trim().length < 7) {
      newErrors.name = "Name must be at least 7 characters";
    }

    if (contact.lastName.trim().length < 7) {
      newErrors.lastName = "Last name must be at least 7 characters";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!/^09\d{9}$/.test(contact.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const addHandler = () => {
    if (!validateHandler()) {
      return;
    }
    if (
      !contact.name ||
      !contact.lastName ||
      !contact.email ||
      !contact.phone
    ) {
      setAlert("Please enter valid data!");
      return;
    }
    setAlert("");
    const newContact = { ...contact, id: v4() };
    setContacts((contacts) => [...contacts, newContact]);
    setContact({
      name: "",
      lastName: "",
      email: "",
      phone: "",
    });
  };

  const deleteHandler = (id) => {
    const newContacts = contacts.filter((contact) => contact.id !== id);

    setContacts(newContacts);

    setSelectedContacts((selectedContacts) =>
      selectedContacts.filter((contactId) => contactId !== id),
    );

    if (newContacts.length <= 2) {
      setIsSelecting(false);
      setSelectedContacts([]);
    }
  };

  const selectHandler = (id) => {
    setSelectedContacts((selectedContacts) => {
      if (selectedContacts.includes(id)) {
        return selectedContacts.filter((contactId) => contactId !== id);
      } else {
        return [...selectedContacts, id];
      }
    });
  };

  const startSelectingHandler = () => {
    setIsSelecting(true);
  };

  const cancelSelectingHandler = () => {
    setIsSelecting(false);
    setSelectedContacts([]);
  };

  const openDeleteModalHandler = (id = null) => {
    setDeleteModal({
      isOpen: true,
      contactId: id,
    });
  };

  const closeDeleteModalHandler = () => {
    setDeleteModal({
      isOpen: false,
      contactId: null,
    });
  };

  const confirmDeleteHandler = () => {
    if (deleteModal.contactId) {
      deleteHandler(deleteModal.contactId);
    } else {
      const newContacts = contacts.filter(
        (contact) => !selectedContacts.includes(contact.id),
      );

      setContacts(newContacts);
      setSelectedContacts([]);
      setIsSelecting(false);
    }

    closeDeleteModalHandler();
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        {inputs.map((input, index) => (
          <div className={styles.inputGroup} key={index}>
            <input
              type={input.type}
              placeholder={input.placeholder}
              name={input.name}
              value={contact[input.name]}
              onChange={changeHandler}
            />

            {errors[input.name] && (
              <p className={styles.error}>{errors[input.name]}</p>
            )}
          </div>
        ))}

        <button onClick={addHandler}>Add Contact</button>
      </div>
      <div className={styles.alert}>{alert && <p>{alert}</p>}</div>
      {contacts.length > 1 && (
        <div className={styles.selectActions}>
          {!isSelecting ? (
            <button
              className={styles.selectButton}
              onClick={startSelectingHandler}
            >
              Select Contacts
            </button>
          ) : (
            <>
              <button
                className={styles.deleteSelectedButton}
                onClick={() => openDeleteModalHandler()}
                disabled={selectedContacts.length === 0}
              >
                Delete Selected ({selectedContacts.length})
              </button>

              <button
                className={styles.cancelButton}
                onClick={cancelSelectingHandler}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      )}
      <ContactsList
        contacts={contacts}
        deleteHandler={deleteHandler}
        selectHandler={selectHandler}
        selectedContacts={selectedContacts}
        isSelecting={isSelecting}
        openDeleteModalHandler={openDeleteModalHandler}
      />
      {deleteModal.isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Delete Contacts</h3>

            <p>
              {deleteModal.contactId
                ? "Are you sure you want to delete this contact?"
                : `Are you sure you want to delete ${selectedContacts.length} selected contacts?`}
            </p>

            <div className={styles.modalActions}>
              <button onClick={closeDeleteModalHandler}>Cancel</button>

              <button onClick={confirmDeleteHandler}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contacts;
