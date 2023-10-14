import React, { useState } from 'react';
import axios from 'axios';
import MathMLMatrix from '../../matriz/Matrix';
import { TiArrowDownThick } from 'react-icons/ti';
import Modal from '../../modals/ModalJordan'

const MatrixInput = () => {
  const initialMatrix = [
        [2, 3, 5, 23],
        [-4, 1, -8, -26],
        [6, -12, 12, 18],
  
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const [matrix, setMatrix] = useState(initialMatrix);
  const [steps, setSteps] = useState('');
  const [resultMatrix, setResultMatrix] = useState([]);
  const [matrices, setMatrices] = useState([]);

  const handleMatrixChange = (e, row, col) => {
    const newMatrix = [...matrix];
    newMatrix[row][col] = parseFloat(e.target.value);
    setMatrix(newMatrix);
  };

  const addRowAndColumn = () => {
    const newMatrix = matrix.map((row) => [...row, 0]);
    const newRow = Array(newMatrix[0].length).fill(0);
    newMatrix.push(newRow);
    setMatrix(newMatrix);
  };

  const removeRowAndColumn = () => {
    if (matrix.length < 3 || matrix[0].length < 2) {
      return;
    }

    const newMatrix = matrix.slice(0, -1).map((row) => row.slice(0, -1));
    setMatrix(newMatrix);
  };

  const handleTriangularize = () => {
    const matrixData = {
      data: matrix,
    };

    axios
      .post('http://127.0.0.1:8000/api/matrix/elimination_jordan/', matrixData)
      .then((response) => {
        const { matrices, steps } = response.data;
        setMatrices(matrices);
        setSteps(steps);
      })
      .catch((error) => {
        console.error('Erro ao triangularizar a matriz:', error);
      });
  };

  return (
    <div className="bg-white flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div>
                <button className="mt-1 w-50 justify-center rounded-md bg-slate-800 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleOpenModal}>Ver Tutorial</button>

                <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
              </div>  
            
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="border-t-2 border-x-orange-900 mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Jordan
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full">
        <div className="flex justify-center mt-5">
          <div className="mx-auto p-5 border-2 border-x-orange-900 text-center inline-block">
            {matrix.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {row.map((value, colIndex) => (
                  <div key={colIndex}>
                    <input
                      className={`w-20 border-2 m-0.5 border-x-slate-700 ${
                        colIndex === matrix[0].length - 1 ? 'bg-slate-300 ml-3' : ''
                      }`}
                      type="number"
                      value={value}
                      onChange={(e) => handleMatrixChange(e, rowIndex, colIndex)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <button
            className="w-50 justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={removeRowAndColumn}
          >
            Remover coluna e linha
          </button>
          <button
            className="mx-5 w-50 justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={addRowAndColumn}
          >
            Adicionar Coluna e linha
          </button>
        </div>

        <div className="flex justify-center mt-5">
          <button
            className="mx-5 w-50 justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleTriangularize}
          >
            Resolver Sistema Linear
          </button>
        </div>
      </div>
{/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/ }

      <div className="mt-5 sm:mx-auto sm:w-full">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Matriz Resultante
        </h2>

        <div className="flex justify-center mt-5">
          <div className="mx-auto p-5 border-2 border-x-orange-900 text-center">
            {matrices.map((matrix, index) => (
              <div key={index}>
                <div className={`mb-5 border-b-2 border-orange-900 p-4 flex ${index === matrices.length - 1 ? '' : 'mb-5'}`}>
                  {index === matrices.length - 1 ? (
                    <div className="p-4 flex">
                      <MathMLMatrix matrix={matrix} />
                      <div className="border-l-2 pl-6 border-orange-900 flex ml-6 flex-col justify-items-start items-start">
                        Matrix escalonada reduzida por linhas.
                      </div>
                    </div>
                  ) : (
                    <>
                      <MathMLMatrix matrix={matrix} />
                      <div className="border-l-2 pl-6 border-orange-900 flex ml-6 flex-col justify-items-start items-start">
                        <span>Passo: {index+1}</span>
                        {steps[index].pivot ? <span>Pivô: {steps[index]?.pivot}</span>: <></>}
                        <span>Factor: {steps[index]?.factor}</span>
                        <span>{steps[index]?.operation}</span>
                      </div>
                    </>
                  )}
                </div>
                {index !== matrices.length - 1 && <TiArrowDownThick className="mx-3 w-6 h-6 scale-500" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatrixInput;
