
import PropTypes from "prop-types";
import AxiosService from '../commen/ApiService'

export default function ElementComponent({
  onElement,
  iconElement,
  classElement,
  classAura,
}) {
  return (
    <div className={classAura}>
      <div className={classElement} onClick={onElement}>
        <div className="container">
          <img src={iconElement} alt="element" />
        </div>
      </div>
    </div>
  );
}

ElementComponent.propTypes = {
  onElement: PropTypes.func.isRequired,
  iconElement: PropTypes.string.isRequired,
  classElement: PropTypes.string.isRequired,
  classAura: PropTypes.string,
};