import SelectUser from "../SelectUser/SelectUser.jsx";
import styles from "./Header.module.css";

const logo = ["/logo.svg", "/vite.svg"];
function Header() {
  return (
    <>
      <img className={styles.logo} src={logo[0]} alt="Лого"></img>
      <SelectUser />
    </>
  );
}

export default Header;
