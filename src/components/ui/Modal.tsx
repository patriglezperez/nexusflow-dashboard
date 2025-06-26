import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa'; 

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string; 
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto"
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
          onClose();
        }
      }}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl relative z-10 w-full max-w-sm md:max-w-lg mx-auto p-6 md:p-8 transform transition-all duration-300 ease-out scale-100 opacity-100 min-h-min"
        onClick={(e) => e.stopPropagation()} 
      >

        {title && (
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">
              <FaTimes />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;