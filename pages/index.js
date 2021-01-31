import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="/">Kokila Expense Tracker</a>
        </h1>

        <p className={styles.description}>
          Please <Link href="/login"> Login </Link>
          {" / "}
          <Link href="/register"> Register </Link>
        </p>
      </main>
    </div>
  );
}
