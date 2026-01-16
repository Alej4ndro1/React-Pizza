import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://68ee2739df2025af78029379.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert(error);
      }
    }

    fetchPizza();
  }, [id]);

  if (!pizza) {
    return 'Loading...';
  }

  return (
    <div className="container">
      <img
        src={pizza.imageUrl}
        alt="pizza"
      />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
};

export default FullPizza;
