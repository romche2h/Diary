import "./JournalItem.css";

function JournalItem({ title, text, date }) {
  const formateDate = new Intl.DateTimeFormat("ru-RU").format(date);
  return (
    <>
      <h2 className="journal-item__header">{title}</h2>
      <h2 className="journal-item__body">
        <div className="journal-item__date">{formateDate}</div>
        <div className="journal-item__text">{text}</div>
      </h2>
    </>
  );
}

export default JournalItem;
