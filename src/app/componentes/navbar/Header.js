'use client'
import Link from 'next/link';
import * as React from 'react';
import './styles.css'
import Dropdowns from '../dropdowns/Dropdowns'
import { useState, useEffect, useRef } from 'react';



function ResponsiveAppBar() {

  const dropdownOptionsL = [
    { label: 'Triangularizacao', descricao: 'teste' ,link: '/lineares/triangularizacao' },
    { label: 'Eliminação Gaussiana', descricao: 'Metodo Não-Interativo' ,link: '/lineares/eliminacaoGaussiana' },
    { label: 'Eliminação de Gauss-Jordan', descricao: 'Metodo Não-Interativo' ,link: '/lineares/eliminacaoGaussJordan' },
    { label: 'Eliminação LU', descricao: 'Metodo Não-Interativo' ,link: '/lineares/eliminacaoLU' },
    { label: 'Eliminação Jacobiana', descricao: 'Metodo Interativo' ,link: '/lineares/eliminacaoJacobiana' },
  ];
  
  const dropdownOptionsNL = [
    { label: 'Eliminação de Newton', descricao: 'Eliminação de Newton nao linear' ,link: '/lineares/eliminacao-direta' },
  ];

  return (
    <header className="bg-white">
    <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div className="flex lg:flex-1">
        <a href="#" className="-m-1.5 p-1.5">
      
          <img
              className="h-8 w-auto" src="/next.svg" alt=""
            />
        </a>
      </div>
    
      <div className="hidden lg:flex lg:gap-x-12">

        <Dropdowns title='Sistemas Linerar' options={dropdownOptionsL}/>
        <Dropdowns title='Sistemas Não Linerar' options={dropdownOptionsNL}/>
  
        
        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Triangularizao</a>
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">GitHub <span aria-hidden="true">&rarr;</span></a>
      </div>
    </nav>
    
  </header>
  
  );
}
export default ResponsiveAppBar;
