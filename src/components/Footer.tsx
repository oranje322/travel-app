import React from "react";

const Footer = () => {
	return (
		<footer className={"footer"}>
			<div className={"footer-content"}>
				<div className="git-block">
					<a href="https://github.com/oranje322" target="_blank" rel="noreferrer"> &#9996; @oranje322</a>
					<a href="https://github.com/kristinand" target="_blank" rel="noreferrer">&#129310; @kristinand</a>
					<a href="https://github.com/ya-stefaniya" target="_blank" rel="noreferrer"> &#128588; @ya-stefaniya</a>
					<a href="https://github.com/Jears017" target="_blank" rel="noreferrer">&#129311; @Jears017</a>
				</div>
				<div className="course-block">
					<a className={'course-link'} href={'https://rs.school/js/'} target="_blank" rel="noreferrer">
						<img className={"footer-img"} src="https://rs.school/images/rs_school_js.svg" alt="rsschhol"/>
						<span className="footer-text">/2021</span>
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
