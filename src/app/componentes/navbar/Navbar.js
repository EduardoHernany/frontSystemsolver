'use client'
import Link from 'next/link';
import * as React from 'react';
import './styles.css'
import Dropdowns from '../dropdowns/Dropdowns'



function ResponsiveAppBar() {

  const dropdownOptionsL = [
    { label: 'Eliminação Gaussiana', link: '#' },
    { label: 'Eliminação de Gauss-Jordan', link: '#' },
    { label: 'Eliminação LU', link: '#' },
    { label: 'Eliminação Jacobiana', link: '#' },
  ];

  const dropdownOptionsNL = [
    { label: 'Eliminação de Newton', link: '#' },
    
  ];

  return (
    <nav className="navbar">
      <div className="logo">
        
        <Link href="/home">LOGO</Link>
        <span className='text-white mx-2'>SystemSolver</span>
      </div>
      <div className="menu">
        <div className="menu-links">
          

          <Link href="/lineares/triangularizacao">Triangularizao</Link>
          <Link href="/lineares/eliminacao-direta">Eliminação direta</Link>
          <Dropdowns options={dropdownOptionsNL} title='Lineares'/>
          <Dropdowns options={dropdownOptionsL} title='Não Lineares'/>
          
        </div>
        <button className="log-in">GitHub</button>
      </div>
      <div className="menu-btn">
        
      </div>
    </nav>
  );
}
export default ResponsiveAppBar;
