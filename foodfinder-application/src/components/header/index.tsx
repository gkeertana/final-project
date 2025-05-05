import styles from "./index.module.css";
import Logo from "./logo";

export default function Header() {
  return (
    <header className={styles.root}>
      <div className="layout-grid">
        <Logo />
        <span>food finder</span>
      </div>
    </header>
  );
}
