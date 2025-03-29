import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TwoEquations() {
  const [a1, setA1] = useState('');
  const [b1, setB1] = useState('');
  const [c1, setC1] = useState('');
  const [a2, setA2] = useState('');
  const [b2, setB2] = useState('');
  const [c2, setC2] = useState('');
  const [result, setResult] = useState(null);
  const [records, setRecords] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  const fetchRecords = async () => {
    const res = await axios.get(`${API_URL}/twoequations/records`);
    setRecords(res.data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleSolve = async () => {
    if ([a1, b1, c1, a2, b2, c2].some(val => val === '')) {
      alert("Please fill in all parameters.");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/twoequations/solve`, { a1, b1, c1, a2, b2, c2 });
      setResult(res.data);
      fetchRecords();
    } catch (error) {
      alert("Error solving equations. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Solve Two Equations</h2>
      <input placeholder="a1" value={a1} onChange={e => setA1(e.target.value)} className="input" />
      <input placeholder="b1" value={b1} onChange={e => setB1(e.target.value)} className="input" />
      <input placeholder="c1" value={c1} onChange={e => setC1(e.target.value)} className="input" />
      <input placeholder="a2" value={a2} onChange={e => setA2(e.target.value)} className="input" />
      <input placeholder="b2" value={b2} onChange={e => setB2(e.target.value)} className="input" />
      <input placeholder="c2" value={c2} onChange={e => setC2(e.target.value)} className="input" />

      <button onClick={handleSolve} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Solve</button>

      {result && (
        <div className="mt-4">
          <p>X: {result.x}</p>
          <p>Y: {result.y}</p>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-bold">Records</h2>
        <table className="w-full border text-sm mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2">a1</th>
              <th className="border px-2">b1</th>
              <th className="border px-2">c1</th>
              <th className="border px-2">a2</th>
              <th className="border px-2">b2</th>
              <th className="border px-2">c2</th>
              <th className="border px-2">x</th>
              <th className="border px-2">y</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec, i) => (
              <tr key={i}>
                <td className="border px-2">{rec.a1}</td>
                <td className="border px-2">{rec.b1}</td>
                <td className="border px-2">{rec.c1}</td>
                <td className="border px-2">{rec.a2}</td>
                <td className="border px-2">{rec.b2}</td>
                <td className="border px-2">{rec.c2}</td>
                <td className="border px-2">{rec.x}</td>
                <td className="border px-2">{rec.y}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
