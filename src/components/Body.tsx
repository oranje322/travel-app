import React from "react";
import CountryCard from "./CountryCard";

const Body = () => {
  return (
    <div className="container body">
      <main className={"body"}>
        <div className="body-title">
          <h1 className="title">Как прекрасен этот мир, посмотри</h1>
          <h2 className="subtitle">Узнавай. Путешествуй. Делись.</h2>
        </div>
        <div className="countries">
          <h3 className="countries-title">
            КУДА ПОЕДЕМ?
          </h3>
          <div className="countries-grid">
            <CountryCard />
            <CountryCard />
            <CountryCard />
            <CountryCard />
            <CountryCard />
            <CountryCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Body;