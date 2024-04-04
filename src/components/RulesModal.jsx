
import iconClose from "../assets/icon-close.svg";
import rules from "../assets/image-rules.svg";
import PropTypes from "prop-types";
import AxiosService from '../commen/ApiService'

export default function RulesModal({ modalClass, onCloseModal }) {
  return (
    <section className={modalClass}>
      <h1 className="title-modal">RULES</h1>
      <img src={rules} alt="rules" />
      <button className="close-button" onClick={onCloseModal}>
        <img src={iconClose} alt="close" />
      </button>
    </section>
  );
}

RulesModal.propTypes = {
  modalClass: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};