import React, { useEffect, useState } from 'react';
import './styles.css';


function Modal({ isOpen, onClose }) {
  

  // Use useEffect para redefinir os estados quando o modal for fechado
  useEffect(() => {
    if (!isOpen) {
      
    }
  }, [isOpen]);

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  
  return isOpen ? (
    <div className="relative z-50 " aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={handleClickOutside}></div>

      <div className="fixed inset-0 mt-16 z-50 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-2xl"
            style={{ width: '95%' }}
          >
            <div className="bg-white px-4 pb-4  pt-5 sm:p-6 sm:pb-4">
              <div className="fixed top-5 left-5">
                <button onClick={onClose}>Fechar Modal</button>
              </div>
              <div className="mt-6">

               </div>
               </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default Modal;
