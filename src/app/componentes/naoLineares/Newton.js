import { useState } from 'react';
import axios from 'axios';

export default function Home() {
    


  const [equationsF, setEquationsF] = useState('x^2+y^2-4,x*y-1');
  const [equationsJ, setEquationsJ] = useState('2*x,2*y,1,1');

  const handleEquationsFChange = (e) => {
    setEquationsF(e.target.value);
  };

  const handleEquationsJChange = (e) => {
    setEquationsJ(e.target.value);
  };

 

  const handleSolveJ = async () => {
    const matrixDataJ = {
        equationsJ: equationsJ,
        equationsF: equationsF
    };

    axios
      .post('http://127.0.0.1:8000/api/matrix/elimination_newton/', matrixDataJ)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Erro ao resolver J(x):', error);
      });
  };

  return (
    <>
      <div className="bg-white flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="border-t-2 border-x-orange-900 mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Newton
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full">
          <div className="flex justify-center mt-5">
            <div className="mx-auto p-5 border-2 border-x-orange-900 text-center inline-block">
              <textarea
                placeholder="Insira as equações F do sistema (por exemplo, 'x^2 + y^2 - 4, x * y - 1')"
                value={equationsF}
                onChange={handleEquationsFChange}
                rows={2}
              />
            </div>
          </div>

          

          <div className="flex justify-center mt-5">
            <div className="mx-auto p-5 border-2 border-x-orange-900 text-center inline-block">
              <textarea
                placeholder="Insira as equações J do sistema (por exemplo, '2 * x + y, x + 3 * y')"
                value={equationsJ}
                onChange={handleEquationsJChange}
                rows={2}
              />
            </div>
          </div>

          <div className="flex justify-center mt-5">
            <button
              className="mx-5 w-50 justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSolveJ}
            >
              Resolver sistema
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
