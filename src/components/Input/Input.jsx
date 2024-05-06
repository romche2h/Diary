import classNames from "classnames";
import styles from "./Input.module.css";
import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { className, isValid = true, appearence, ...props },
  ref
) {
  return (
    <input
      {...props}
      ref={ref}
      className={classNames(className, styles["input"], {
        [styles["invalid"]]: !isValid,
        [styles["input-title"]]: appearence === "title",
      })}
    />
  );
});

export default Input;
