import ContactItem from "./ContactItem";

import styles from "./ContactsList.module.css";

function ContactsList({
  contacts,
  deleteHandler,
  selectHandler,
  selectedContacts,
  isSelecting,
  openDeleteModalHandler
}) {
  return (
    <div className={styles.container}>
      <h3>ContactsList</h3>
      {contacts.length ? (
        <ul className={styles.contacts}>
          {contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              data={contact}
              deleteHandler={deleteHandler}
              selectHandler={selectHandler}
              selectedContacts={selectedContacts}
              isSelecting={isSelecting}
              openDeleteModalHandler={openDeleteModalHandler}
            />
          ))}
        </ul>
      ) : (
        <p className={styles.message}>No Contacts Yet !</p>
      )}
    </div>
  );
}

export default ContactsList;
