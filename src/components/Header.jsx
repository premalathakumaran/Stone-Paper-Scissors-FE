
import logo from "../assets/logo.svg";
import PropTypes from "prop-types";

export default function Header({ score }) {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="logo" />
      <div className="score">
        <small>SCORE</small>
        <span>{score}</span>
      </div>
    </header>
  );
}

Header.propTypes = {
  score: PropTypes.number.isRequired,
};