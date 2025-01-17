import React, { useState } from 'react';
import './App.css';

function App() {
  const [detergents, setDetergents] = useState([
    { id: 1, price: '', weight: '', pricePerGram: 0 },
    { id: 2, price: '', weight: '', pricePerGram: 0 },
    { id: 3, price: '', weight: '', pricePerGram: 0 },
  ]);

  const calculatePricePerGram = (price, weight) => {
    if (!price || !weight) return 0;
    return price / weight;
  };

  const handleInputChange = (id, field, value) => {
    setDetergents(prevDetergents => {
      return prevDetergents.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          updatedItem.pricePerGram = calculatePricePerGram(
            Number(updatedItem.price),
            Number(updatedItem.weight)
          );
          return updatedItem;
        }
        return item;
      });
    });
  };

  const addNewRow = () => {
    const newId = Math.max(...detergents.map(d => d.id)) + 1;
    setDetergents([...detergents, { id: newId, price: '', weight: '', pricePerGram: 0 }]);
  };

  const getLowestPrice = () => {
    const validPrices = detergents.filter(d => d.pricePerGram > 0);
    if (validPrices.length === 0) return 0;
    return Math.min(...validPrices.map(d => d.pricePerGram));
  };

  return (
    <div className="App">
      <h1>洗剤価格比較</h1>
      <table>
        <thead>
          <tr>
            <th>価格 (円)</th>
            <th>内容量 (g)</th>
            <th>1gあたりの価格 (円)</th>
          </tr>
        </thead>
        <tbody>
          {detergents.map(item => (
            <tr key={item.id} className={item.pricePerGram === getLowestPrice() && item.pricePerGram > 0 ? 'lowest-price' : ''}>
              <td>
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => handleInputChange(item.id, 'price', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.weight}
                  onChange={(e) => handleInputChange(item.id, 'weight', e.target.value)}
                />
              </td>
              <td>
                {item.pricePerGram > 0 ? item.pricePerGram.toFixed(2) : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addNewRow}>行を追加</button>
    </div>
  );
}

export default App; 