import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import io from "socket.io-client";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  componentDidMount() {
    this.socket = io();
    this.socket.on("now", (data) => {
      this.setState({
        message: data.message
      });
    });
  }

  componentWillUnmount() {}

  render() {
    return (
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="/">{this.state.message} Expense Tracker</a>
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
}
