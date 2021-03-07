import React from "react";

const Footer = () => {
  return (
    <footer className={"footer"}>
      <div className="git-block">
        <a href="https://github.com/oranje322">@oranje322</a>
        <a href="https://github.com/kristinand">@kristinand</a>
        <a href="https://github.com/ya-stefaniya">@ya-stefaniya</a>
        <a href="https://github.com/Jears017">@Jears017</a>
      </div>
      <div className="course-block">
        <img className={"footer-img"} src="https://rs.school/images/rs_school_js.svg" alt="rsschhol"/>
        <span className="footer-text">/2021</span>
      </div>
    </footer>
  );
};

export default Footer;