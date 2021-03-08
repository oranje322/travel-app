import React from "react";
import Header from "../components/Header";
import Body from "../components/Body";
import Footer from "../components/Footer";

const Main = () => {
  return (
    <div className={"app"}>
      <Header inputVisible/>
      <Body/>
      <Footer/>
    </div>
  );
};

export default Main;