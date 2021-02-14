import React from "react";
import Link from "next/link";
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

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-12 col-xl-4 my-5">
              <h1 className="display-4 text-center mb-3">
                Personal Expense Tracker
              </h1>
              <div className="text-center">
                <small className="text-muted text-center">
                  {this.state.message}
                </small>
              </div>
              <div className="mt-2 text-center">
                <Link href={"/account/login"}>Log in / Register</Link>.
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
