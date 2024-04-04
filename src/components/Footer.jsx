
import PropTypes from "prop-types";

export default function Footer({ onModal }) {
  return (
    <footer>
      <button onClick={onModal} className="rules-button">
        RULES
      </button>
    </footer>
  );
}

Footer.propTypes = {
  onModal: PropTypes.func.isRequired,
};