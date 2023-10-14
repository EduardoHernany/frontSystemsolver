import React, { useState } from 'react';
import axios from 'axios';
import MathMLMatrix from '../../matriz/Matrix'
import MatrixY from '../../matriz/matrixY'
import { TiArrowDownThick } from 'react-icons/ti';
import Modal from '../../modals/ModalLU'
const MatrixInput = () => {
  const [matrix, setMatrix] = useState([
        [2, 3, 5, 23],
        [-4, 1, -8, -26],
        [6, -12, 12, 18],
      ]);
    
  const [matrixL, setMatrixL] = useState(null);
  const [matrixU, setMatrixU] = useState(null);
  const [vetorX, setVetorX] = useState(null);
  const [vetorY, setVetorY] = useState(null);
  const [steps, setSteps] = useState('');

  const [stepsX, setStepsX] = useState('');
  const [stepsY, setStepsY] = useState('');
  
  const [resultMatrix, setResultMatrix] = useState([]); 
  
  const [matricesL, setMatricesL] = useState([]);
  const [matricesU, setMatricesU] = useState([]);
  const [num, setNum] = useState(0);
  // Função para manipular a entrada da matriz
  const handleMatrixChange = (e, row, col) => {
    const newMatrix = [...matrix];
    newMatrix[row][col] = parseFloat(e.target.value);
    setMatrix(newMatrix);
    console.log(matrix)
  };

  const addRowAndColumn = () => {
    const newMatrix = matrix.map((row) => [...row, 0]);
    const newRow = Array(newMatrix[0].length).fill(0);
    newMatrix.push(newRow);
    setMatrix(newMatrix);
    console.log(matrix)
  };

  const removeRowAndColumn = () => {
    if (matrix.length < 3 || matrix[0].length < 2) {
      return; // Não pode remover se a matriz já está no tamanho mínimo
    }

    const newMatrix = matrix.slice(0, -1).map((row) => row.slice(0, -1));
    setMatrix(newMatrix);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const triangularizeMatrix = () => {
    // Crie um objeto que representa a matriz para enviar para a API
    const matrixData = {
      data: matrix,
    };

    // Faça uma solicitação POST para a API Django
    axios.post('http://127.0.0.1:8000/api/matrix/elimination_LU/', matrixData)
      .then((response) => {
        console.log('Matriz triangularizada com sucesso:', response.data);
        setMatricesL(response.data.matricesL)
        setMatricesU(response.data.matricesU)
        setSteps(response.data.steps)
        setNum(matricesU.length)

        setMatrixL(response.data.L)
        setMatrixU(response.data.U)
        setVetorX(response.data.x)
        setVetorY(response.data.y)

        setStepsX(response.data.stepX)
        setStepsY(response.data.stepY)

        console.log(num)
        // Faça algo com a resposta, se necessário
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
              Fatoração LU
            </h2>
        </div>

        <br/>
        <div className="mt-5 sm:mx-auto sm:w-full  ">
            <div className="flex justify-center mt-5">
                <div className="mx-auto p-5 border-2 border-x-orange-900 text-center inline-block">
                    {matrix.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex">
                            {row.map((value, colIndex) => (
                                <div key={colIndex}>
                                    <input
                                        className={`w-20 border-2 m-0.5 border-x-slate-700 ${
                                            colIndex === matrix[0].length - 1
                                            ? "bg-slate-300 ml-3"
                                            : ""
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
                <button className="w-50 justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
                onClick={removeRowAndColumn}>Remover coluna e linha</button>
                <button className="mx-5 w-50 justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
                onClick={addRowAndColumn}>Adicionar Coluna e linha</button>
            </div>

            <div className="flex justify-center mt-5">
                <button className="mx-5 w-50 justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={triangularizeMatrix} >Resolver Sistema Linear</button>
                
            </div>
        </div>

{/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/ }
{ matrixL &&
      <div className="mt-5 sm:mx-auto sm:w-full">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Matriz Resultante
        </h2>

          <div className="flex justify-center mt-5">
            <div className="mx-auto p-5 border-2 border-x-orange-900 text-center">

            {/*inicio Matrix U */}

              {matricesU.map((matrix, index) => (
                <div key={index}>
                  <div className={`mb-5 border-b-2 border-orange-900 p-4 flex ${index === matricesU.length - 1 ? '' : 'mb-5'}`}>
                    {index === matricesU.length - 1 ? (

                      <div className="p-4 flex  ">
                        <div className='border-r-2 border-orange-900 px-6 flex flex-col'>
                          <span className='mb-4'>matrix U = A triangurizada </span>
                          <MathMLMatrix matrix={matrix} div={false} />
                        </div>

                        

                        <div className='flex px-6 flex-col'>
                          <span className='mb-4'>matriz L contendo os multiplicadores (Fatores)</span>
                          <MathMLMatrix matrix={matrixL} div={false} />
                        </div>
                      </div>

                      

                    ) : (
                      <>
                        <div className='flex flex-row items-center justify-center'>
                          <span className='pr-2'>A =</span>
                          <MathMLMatrix matrix={matrix} div={false} />
                        </div>
                        <div className="border-l-2 border-orange-900 pl-6 flex ml-6 flex-col justify-items-start items-start">
                          <span>Passo: {index+1}</span>
                          {steps[index].pivot ? <span>Pivô: {steps[index]?.pivot}</span>: <></>}
                          <span>Fator: {steps[index]?.factor}</span>
                          <span>{steps[index]?.operation}</span>
                        </div>
                      </>
                    )}
                  </div>
                  {index !== matricesU.length - 1 && <TiArrowDownThick className="mx-3 w-6 h-6 scale-500" />}
                </div>
              ))}
              {/*Fim Matrix U */}

              <div className={`mb-5 border-b-2 border-orange-900 p-4 flex flex-col `}>
              <TiArrowDownThick className="mx-3 w-6 h-6 scale-500" />
                <span className='mb-4'>Vericação se a fatora de LU esta correta. LU tem que ser = A</span>
                <div className='flex px-6 flex-row items-center justify-center'>
                    <span>LU = </span>
                    <MathMLMatrix matrix={matrixL} div={false} />
                    <span className='mx-2'></span>
                    <MathMLMatrix className='ml-4' matrix={matrixU} div={false} />
                    <span className='mx-2'> = </span>
                    <MathMLMatrix className='ml-4' matrix={matrix} div={false} />
                    <span className='mx-2'> = A</span>
                </div>
              </div>


              <div className={`mb-5 border-b-2 border-orange-900 p-4 flex flex-row `}>
                <TiArrowDownThick className="mx-3 w-6 h-6 scale-500" />
                <div className='flex flex-col '>
                  <span className='mb-4'>Resolvendo LY = b</span>

                  <div className='flex border-r-2 border-orange-900 px-6 flex-row items-center justify-center'>
                      <span>Ly = b =  </span>
                      <MathMLMatrix matrix={matrixL} div={false} />

                      <span className='mx-2'></span>

                      <MatrixY l={"y"}/>

                      <span className='mx-2'> = </span>
                      <MatrixY vector={vetorY} />
                      
                  </div>
                </div>


                <div className='flex flex-col items-start pl-4 pt-4 justify-center'>
                  {stepsY.map((step, index) => (
                    <span key={index}> {step.operation}  </span>
                  ))}
                </div>
              

              </div>

              <div className={`mb-5 border-b-2 border-orange-900 p-4 flex flex-row `}>
                <TiArrowDownThick className="mx-3 w-6 h-6 scale-500" />
                <div className='flex flex-col '>
                  <span className='mb-4'>Resolvendo Ux = y</span>

                  <div className='border-r-2 border-orange-900 flex px-6 flex-row items-center justify-center '>
                      <span>Ux = y =  </span>
                      <MathMLMatrix matrix={matrixU} div={false} />

                      <span className='mx-2'></span>

                      <MatrixY l={"x"}/>

                      <span className='mx-2'> = </span>
                      <MatrixY vector={vetorX}  />
                      
                  </div>
                </div>

                <div className='flex flex-col items-start pl-4 pt-4 justify-center'>
                  {stepsX.map((step, index) => (
                    <span key={index}> {step.operation}  </span>
                  ))}
                </div>
              </div>


              
                
            </div>
          </div>
      </div>

}
      </div>
    
    
  );
};

export default MatrixInput;
