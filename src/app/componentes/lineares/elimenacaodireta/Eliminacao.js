import React, { useState } from 'react';


const MatrixInput = () => {
    const [matrix, setMatrix] = useState([
        [1, 2, 3],
        [4, 5, 6],
      ]);

  // Função para manipular a entrada da matriz
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
    console.log(matrix)
  };

  const removeRowAndColumn = () => {
    if (matrix.length < 3 || matrix[0].length < 2) {
      return; // Não pode remover se a matriz já está no tamanho mínimo
    }

    const newMatrix = matrix.slice(0, -1).map((row) => row.slice(0, -1));
    setMatrix(newMatrix);
  };


  return (
    <div className="bg-white flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  
            <h2 className="border-t-2 border-x-orange-900 mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Triangularizao
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
                <button className="mx-5 w-50 justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Resolver Sistema Linear</button>
                
            </div>
        </div>
    </div>
  );
};

export default MatrixInput;
