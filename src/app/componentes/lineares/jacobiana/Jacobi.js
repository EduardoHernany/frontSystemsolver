import React, { useState } from 'react';
import axios from 'axios';
import MathMLMatrix from '../../matriz/Matrix';
import { TiArrowDownThick } from 'react-icons/ti';
import MatrixY from '../../matriz/matrixY'
import Erro from '../../matriz/Erro'

const MatrixInput = () => {
  const initialMatrix = [
        [2, 1, 1],
        [3, 4, -1],
  ];

  const [matrix, setMatrix] = useState(initialMatrix);
  const [steps, setSteps] = useState(null);
  const [solucao, setSolucao] = useState(null);
  


  const [numIterations, setNumIterations] = useState(50); // Novo estado para o número de iterações
  const [tolerance, setTolerance] = useState(0.0001);


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
      numIterations: numIterations, // Adicione numIterations ao objeto matrixData
      tolerance: tolerance,         // Adicione tolerance ao objeto matrixData
    };

    axios
      .post('http://127.0.0.1:8000/api/matrix/elimination_jacobi/', matrixData)
      .then((response) => {
        const { matrix, steps, matrices } = response.data;
        setSteps(response.data.steps)
        setSolucao(response.data.solution)
        
      })
      .catch((error) => {
        console.error('Erro ao triangularizar a matriz:', error);
      });
  };

  return (
    <div className="bg-white flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="border-t-2 border-x-orange-900 mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Gauss-Seidel
        </h2>
      </div>
      

      <div className="mt-5 sm:mx-auto sm:w-full">

      <div className="flex justify-center ">
          <label className="block text-sm ml-14 font-medium leading-6 text-gray-900">
            Número de Iterações:
            <input
              type="number"
              value={numIterations}
              className="block w-[80%]  p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setNumIterations(e.target.value)}
            />
          </label>
          <label>
            Tolerância:
            <input
              type="number"
              className="block w-[80%] p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={tolerance}
              onChange={(e) => setTolerance(e.target.value)}
            />
          </label>
        </div>

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
      
      {steps &&
        <>
        <div className="mt-5 sm:mx-auto sm:w-full">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Gauss Seide Resultante
        </h2>

        <div className="flex justify-center mt-5">
          <div className="mx-auto p-5 border-2 border-x-orange-900 text-center ">
            {steps?.map((step, index) => (
              
              <div key={index}>
                <div className={`mb-5 border-b-2 border-orange-900 p-4 flex ${index === steps.length - 1 ? '' : 'mb-5'}`}>
                  {index === steps.length - 1 ? (
                    <div key={index} className='flex flex-row'>
                    <div className='flex flex-row items-center justify-center'>
                      <span className='mr-2'>X{index}= </span>
                      <MatrixY vector={step.x} />
                    </div>

                    
                      
                    
                  </div>
                  ) : (
                    <>
                      <div key={index} className='flex flex-row'>
                        
                        <div className='flex flex-row items-center justify-center'>
                          <span className='mr-2'>K{index} = </span>
                          <MatrixY vector={step?.x} />
                        </div>

                        <div className="border-l-2 pl-6 border-orange-900 flex ml-6 flex-col justify-items-start items-start ">
                          {step?.equations.map((equation, indexx) => (
                            
                            <span key={indexx} className='py-2'> {equation} </span>
                          ))}
                         
                        </div>

                        <div className='flex pl-6  flex-col ml-6 border-orange-900 justify-items-start items-start border-l-2'>
                          <div className="  flex  flex-row  ">
                            <span className='mr-2'>e = </span>
                            <Erro  num={index+1} numm={index}/>
                            <span className='ml-2'> = {step?.residual}</span>
                          </div>
                          <span className='mt-2'>e {"<"} Tol : {step?.residual < tolerance ? "Verdadeiro" : "Falso" }</span>
                          <span className='mt-2'>{step?.residual < tolerance ? "Finaliza." : "Continua..." }</span>
                        </div>
                      </div>
                      
                    </>
                  )}
                </div>
                {index !== steps.length - 1 && <TiArrowDownThick className="mx-3 w-6 h-6 scale-500" />}
              </div>
            ))}
          </div>
        </div>
      </div>


        </>
      }
      


      
    </div>
  );
};

export default MatrixInput;
