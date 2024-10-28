import PropTypes from "prop-types";

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div className="p-4 rounded-xl">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div
          className="bg-white p-6 w-full max-w-4xl mx-auto overflow-y-auto"
          style={{ maxHeight: "80%" }}
        >
          {" "}
          <div className="mb-4">
            <button
              className="float-right text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              ✖
            </button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Modal;
