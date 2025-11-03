import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

import { useEffect, useState } from 'react';

const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'popularity',
    sortProperty: 'rating',
  });
  const [sortOrder, setSortOrder] = useState('desc');

  const category = categoryId !== 0 ? `category=${categoryId}` : '';

  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items
    .filter((pizzaTitle) => pizzaTitle.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj) => (
      <PizzaBlock
        key={obj.id}
        {...obj}
      />
    ));

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://68ee2739df2025af78029379.mockapi.io/items?${category}&sortBy=${sortType.sortProperty}&order=${sortOrder}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, sortOrder, category]);

  return (
    <div className="container">
      <div className="container__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id) => setCategoryId(id)}
        />
        <Sort
          value={sortType}
          onChangeSort={(id) => setSortType(id)}
          sortOrder={sortOrder}
          onChangeOrder={setSortOrder}
        />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="container__items">{isLoading ? skeleton : pizzas}</div>
    </div>
  );
};

export default Home;
