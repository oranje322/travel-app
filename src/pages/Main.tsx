import React from "react";
import Header from "../components/Header";
import Body from "../components/Body";
import Footer from "../components/Footer";

const Main = () => {
  return (
    <div className={"app"}>
      <Header inputVisible={true} />
      <Body />
      <Footer />
    </div>
  );
};

export default Main;