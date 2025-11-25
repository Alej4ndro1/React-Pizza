import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCategoryId, setFilters } from '../redux/slices/filterSlice';
import { searchContext } from '../App';
import axios from 'axios';
import qs from 'qs';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);

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

  const fetchPizzas = useCallback(() => {
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
  }, [categoryId, currentPage, order, searchValue, sortType]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.sortProperty === params.sortType);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, searchValue, currentPage, sortType, order, fetchPizzas]);

  useEffect(() => {
    const queryString = qs.stringify({
      categoryId,
      sortType,
      currentPage,
    });

    navigate(`?${queryString}`);
  }, [categoryId, searchValue, currentPage, sortType, order, navigate]);

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
