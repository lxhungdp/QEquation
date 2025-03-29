import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function QuadraticEquation() {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');
    const [result, setResult] = useState(null);
    const [records, setRecords] = useState([]);
  
    const API_URL = process.env.REACT_APP_API_URL; // change to live server later
  
    const fetchRecords = async () => {
      const res = await axios.get(`${API_URL}/records`);
      setRecords(res.data);
    };
  
    useEffect(() => {
      fetchRecords();
    }, []);
  
    const handleSolve = async () => {
      // Validation check
      if (a === '' || b === '' || c === '') {
        alert("Please enter values for all parameters: a, b, and c.");
        return; // Stop the function from continuing
      }
    
      // Check if 'a' is zero, which is invalid for a quadratic equation
      if (Number(a) === 0) {
        alert("The value of 'a' cannot be zero. Please enter a valid number.");
        return;
      }
    
      try {
        const res = await axios.post(`${API_URL}/solve`, { a, b, c });
        setResult(res.data);
        fetchRecords(); // Refresh table
      } catch (error) {
        alert("Error solving the equation. Please try again.");
      }
    };
  
    return (
      <div className="flex h-screen p-4 space-x-4">
      {/*<div className="text-3xl font-bold text-blue-500">Tailwind CSS is Working!</div>*/}
  
        {/* Left Panel */}
        <div className="w-1/2 p-4 bg-gray-100 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Solve Quadratic Equation</h2>
          <input type="number" placeholder="a" value={a} onChange={(e) => setA(e.target.value)} className="input" />
          <input type="number" placeholder="b" value={b} onChange={(e) => setB(e.target.value)} className="input" />
          <input type="number" placeholder="c" value={c} onChange={(e) => setC(e.target.value)} className="input" />
          <button onClick={handleSolve} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Solve</button>
  
          {result && (
            <div className="mt-4">
              <p>X1: {result.x1}</p>
              <p>X2: {result.x2}</p>
            </div>
          )}
        </div>
  
        {/* Right Panel */}
        <div className="w-1/2 p-4 bg-white border rounded-xl overflow-auto">
          <h2 className="text-xl font-bold bg-blue-500 mb-4 text-white rounded">Quadratic Equation Record</h2>
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-2">a</th>
                <th className="border px-2">b</th>
                <th className="border px-2">c</th>
                <th className="border px-2">x1</th>
                <th className="border px-2">x2</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec, i) => (
                <tr key={i}>
                  <td className="border px-2">{rec.a}</td>
                  <td className="border px-2">{rec.b}</td>
                  <td className="border px-2">{rec.c}</td>
                  <td className="border px-2">{rec.x1}</td>
                  <td className="border px-2">{rec.x2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }