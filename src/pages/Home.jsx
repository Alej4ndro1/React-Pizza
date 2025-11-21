import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { useContext, useEffect, useState } from 'react';
import { searchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();

  const {
    categoryId,
    sort: { sortProperty: sortType },
    order,
    currentPage,
  } = useSelector((state) => state.filter);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchValue } = useContext(searchContext);

  const handleCategoryId = (id) => {
    dispatch(setCategoryId(id));
  };

  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzas = Array.isArray(items)
    ? items.map((obj) => (
        <PizzaBlock
          key={obj.id}
          {...obj}
        />
      ))
    : [];

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId !== 0 ? `category=${categoryId}&` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://68ee2739df2025af78029379.mockapi.io/items?page=${currentPage}&limit=4&${category}sortBy=${sortType}&order=${order}${search}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, searchValue, currentPage, sortType, order]);

  return (
    <div className="container">
      <div className="container__top">
        <Categories
          value={categoryId}
          onChangeCategory={handleCategoryId}
        />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="container__items">{isLoading ? skeleton : pizzas}</div>
      <Pagination />
    </div>
  );
};

export default Home;
