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
              Eliminação LU
 A fatoração de uma matriz A no produto de uma matriz triangular inferior L e uma matriz estritamente triangular superior U é chamada fatoração LU. Se uma matriz A, n x n, pode ser reduzida à forma estritamente triangular superior usando somente a operação sobre linhas (III), então é possível representar o processos de redução em termos de uma fatoração matricial. 
Por exemplo se A é uma matriz 3x3 iremos utilizar apenas a operação elementar III para obter a sua forma estritamente triangular.
Passo 1: eliminar os elementos a21 e a31, utilizaremos:
L2 = L2 - (l21* L1)
L3 = L3 - (l31* L1)
Para descobrirmos l31 e l21 faremos:
l21 = A21/pivô
l31 = A31/pivô
Passo 2: eliminar o elemento a32, para isso:
L3 = L3 - (l32* L2)
E para l32:
l32 = A32/pivô
Chamaremos de L a matriz contendo os valores dos multiplicadores l e chamaremos de U a matriz triangular superior resultante.
Passo 3: Dado o sistema linear Ax = b e a fatoração LU de A, temos:
Ax = b ⇔ (LU)x = b ⇔ L(Ux) = b
Chamando y = Ux, obteremos a solução do sistema original resolvendo os seguintes sistemas triangulares:
Ly = b
Ux = y
Passo 4: resolvendo o sistema Ly = b teremos y1, y2 e y3.
Passo 5: resolvendo o sistema Ux = y teremos x1, x2 e x3 que é a solução do sistema original.
Uma vantagem da fatoração LU é que ela depende somente da matriz A. Dessa forma, precisamos obter apenas uma vez a fatoração LU de A e assim resolver qualquer sistema que a tenha como matriz dos coeficientes, trocando apenas o vetor constante b.
               </div>
               </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default Modal;
