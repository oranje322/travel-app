import React from "react";

const Footer = () => {
  return (
    <footer className={"footer"}>
      <div className={"footer-content"}>
        <div className="git-block">
          <a href="https://github.com/oranje322"> &#9996; @oranje322</a>
          <a href="https://github.com/kristinand">&#129310; @kristinand</a>
          <a href="https://github.com/ya-stefaniya"> &#128588; @ya-stefaniya</a>
          <a href="https://github.com/Jears017">&#129311; @Jears017</a>
        </div>
        <div className="course-block">
          <img className={"footer-img"} src="https://rs.school/images/rs_school_js.svg" alt="rsschhol" />
          <span className="footer-text">/2021</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
