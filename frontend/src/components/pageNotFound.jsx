import React, { Component } from "react";

class PageNotFound extends Component {
  state = {};
  render() {
    return (
      <>
        <h1>Invalid!!! Page Does Not Exists </h1>
        <a href={"/expenses"}> Click here to for home screen</a>
      </>
    );
  }
}

export default PageNotFound;
