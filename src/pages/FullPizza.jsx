import React from 'react';
import { useParams } from 'react-router-dom';

export const FullPizza = () => {
  const params = useParams();

  console.log(params);

  return (
    <div className="container">
      <img src="" />
      <h2>222</h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias quo totam numquam, nemo
        quod, reprehenderit rerum magni a fugit consectetur fuga molestiae atque expedita maiores.
        Aut illo sed nam veritatis.
      </p>
      <h4>250 $</h4>
    </div>
  );
};

export default FullPizza;
