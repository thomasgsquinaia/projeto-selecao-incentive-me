import './style.css';
interface PopupProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
}

export default function Popup ({ isOpen, message, onClose, onConfirm }:PopupProps) {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };
  return (
    <>
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-content">
              <span className="close-btn" onClick={handleConfirm}>&times;</span>
              <p>{message}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
