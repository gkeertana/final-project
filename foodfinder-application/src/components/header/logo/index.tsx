import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/next.svg";
import styles from "./index.module.css";

export default function Logo() {
  return (
    <Link href="/" className={styles.root}>
      <Image src={logo} alt="Logo: Food Finder" fill priority sizes="100vw"/>
    </Link>
  );
}
