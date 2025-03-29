import React, { useState } from 'react';
import QuadraticEquation from './QuadraticEquation';
import TwoEquations from './TwoEquations';

export default function App() {
  const [currentPage, setCurrentPage] = useState('quadratic'); // Default page is Quadratic Equation hhhh

  return (
    <div>
      {/* Header */}
      <div className="bg-blue-500 text-white p-4 flex justify-between">
        <h1 className="text-2xl">Equation Solver</h1>
        <div>
          <button
            className={`px-4 py-2 ${currentPage === 'quadratic' ? 'bg-blue-700' : 'bg-blue-500'} text-white rounded mr-2`}
            onClick={() => setCurrentPage('quadratic')}
          >
            Quadratic Equation
          </button>
          <button
            className={`px-4 py-2 ${currentPage === 'twoequations' ? 'bg-blue-700' : 'bg-blue-500'} text-white rounded`}
            onClick={() => setCurrentPage('twoequations')}
          >
            Two Equations
          </button>
        </div>
      </div>

      {/* Render Page Based on Selected Menu */}
      {currentPage === 'quadratic' && <QuadraticEquation />}
      {currentPage === 'twoequations' && <TwoEquations />}
    </div>
  );
}
