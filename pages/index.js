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
          Welcome to <a href="/">Personal Expense Tracker</a>
        </h1>

        <p className={styles.description}>
          Please Register/Login <Link href="/login"> here </Link>
        </p>
      </main>
    </div>
  );
}
