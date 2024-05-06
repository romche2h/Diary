import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import Input from "../Input/Input.jsx";
import { useContext, useEffect, useReducer, useRef } from "react";
import { INITIAL_STATE, formReducer } from "./JournalForm.state.js";
import classNames from "classnames";
import { UserContext } from "../../context/user.context.jsx";

function JournalForm({ onSubmit, data, onDel }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const tagRef = useRef();
  const textRef = useRef();
  const { userId } = useContext(UserContext);

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.tag:
        tageRef.current.focus();
        break;
      case !isValid.text:
        textRef.current.focus();
    }
  };

  useEffect(() => {
    if (!data) {
      dispatchForm({ type: "CLEAR" });
      dispatchForm({
        type: "SET_VALUE",
        payload: { userId },
      });
    }
    dispatchForm({ type: "SET_VALUE", payload: { ...data } });
  }, [data]);

  useEffect(() => {
    let timerID;
    if (!isValid.title || !isValid.date || !isValid.tag || !isValid.text) {
      focusError(isValid);
      timerID = setTimeout(() => {
        dispatchForm({ type: "RESET_VALIDITY" });
      }, 2000);
    }
    return () => {
      clearTimeout(timerID);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({ type: "CLEAR" });
      dispatchForm({
        type: "SET_VALUE",
        payload: { userId },
      });
    }
  }, [isFormReadyToSubmit, values, onSubmit, userId]);

  useEffect(() => {
    dispatchForm({
      type: "SET_VALUE",
      payload: { userId },
    });
  }, [userId]);

  const onChange = (e) => {
    dispatchForm({
      type: "SET_VALUE",
      payload: { [e.target.name]: e.target.value },
    });
  };

  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: "SUBMIT" });
  };

  const deleteJournalItem = () => {
    onDel(data.id);
    dispatchForm({ type: "CLEAR" });
    dispatchForm({ type: "SET_VALUE", payload: { userId } });
  };

  return (
    <form className={styles["journal-form"]} onSubmit={addJournalItem}>
      <div className={styles["form-row"]}>
        <Input
          type="text"
          ref={titleRef}
          onChange={onChange}
          name="title"
          value={values.title}
          isValid={isValid.title}
          appearence="title"
        />
        {data?.id && (
          <button
            className={styles["del"]}
            type="button"
            onClick={deleteJournalItem}
          >
            <img src="/archive.svg" alt="del" />
          </button>
        )}
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="date" className={styles["form-lablel"]}>
          <img src="/date.svg" alt="Иконка календаря" />
          <span>Дата</span>
        </label>
        <Input
          type="date"
          name="date"
          id="date"
          ref={dateRef}
          onChange={onChange}
          value={
            values.date ? new Date(values.date).toISOString().slice(0, 10) : ""
          }
          isValid={isValid.date}
        />
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="tag" className={styles["form-lablel"]}>
          <img src="/tags.svg" alt="Иконка папки"></img>
          <span>Метки</span>
        </label>
        <Input
          type="text"
          name="tag"
          id="tag"
          ref={tagRef}
          onChange={onChange}
          value={values.tag}
          isValid={isValid.tag}
        />
      </div>
      <textarea
        name="text"
        ref={textRef}
        value={values.text}
        onChange={onChange}
        className={classNames(styles["input"], {
          [styles["invalid"]]: !isValid.text,
        })}
      ></textarea>
      <Button>Сохранить</Button>
    </form>
  );
}

export default JournalForm;
