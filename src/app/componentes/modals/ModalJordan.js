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
              Eliminação de Gauss-Jordan
A Eliminação de Gauss-Jordan consiste em operar transformações elementares sobre as equações do sistema linear até que seja encontrado um sistema diagonal equivalente. Para usar o método de Jordan em uma matriz 3x3 por exemplo, primeiro precisaremos eliminar os elementos a21 e a31.
Passo 1: para eliminar esses elementos usaremos as fórmulas:
L2 = L2 - L1 * a21/pivô
L3 = L3 - L1 * a31/pivô
Passo 2: eliminar os elementos a12 e a32 para isso usaremos:
L1 = L1 - L2 * a12/pivô
L3 = L3 - L2 * a32/pivô
Passo 3: eliminar os elementos a13 e a23 com:
L1 = L1 - L3 * a13/pivô
L2 = L2 - L3 * a23/pivô
Passo 4: dividir os elementos da diagonal principal para que todos virem um.
O método de Gauss-Jordan é de fácil entendimento e implementação, garante a solução exata do sistema e pode ser utilizado para sistemas grandes, porém ele possui algumas desvantagens, por exemplo ele pode ser computacionalmente ineficiente para sistemas muito grandes e também pode haver problemas de arredondamento em computadores com uma precisão limitada
               </div>
               </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default Modal;
