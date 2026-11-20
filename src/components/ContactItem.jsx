import styles from "./ContactItem.module.css";

function ContactItem({
  data: { id, name, lastName, email, phone },
  selectHandler,
  selectedContacts,
  isSelecting,
  openDeleteModalHandler,
}) {
  return (
    <li className={styles.item}>
      {isSelecting && (
        <input
          type="checkbox"
          checked={selectedContacts.includes(id)}
          onChange={() => selectHandler(id)}
        />
      )}
      <p>
        {name} {lastName}
      </p>
      <p>
        <span>📪</span> {email}
      </p>
      <p>
        <span>📞</span> {phone}
      </p>
      <button onClick={() => openDeleteModalHandler(id)}>🗑</button>
    </li>
  );
}

export default ContactItem;
