import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { useCallback, useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCategoryId, setFilters } from '../redux/slices/filterSlice';
import { searchContext } from '../App';
import qs from 'qs';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMounted = useRef(false);

  const {
    categoryId,
    sort: { sortProperty: sortType },
    order,
    currentPage,
  } = useSelector((state) => state.filter);
  const { items, status } = useSelector((state) => state.pizzas);

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

  const getPizzas = useCallback(async () => {
    const category = categoryId !== 0 ? `category=${categoryId}&` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        currentPage,
        category,
        sortType,
        order,
        search,
      }),
    );

    window.scrollTo(0, 0);
  }, [categoryId, searchValue, currentPage, sortType, order, dispatch]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.sortProperty === params.sortType) || sortList[0];

      dispatch(
        setFilters({
          categoryId: Number(params.categoryId) || 0,
          sort,
          currentPage: Number(params.currentPage) || 1,
        }),
      );
    } else isMounted.current = true;
  }, [dispatch]);

  useEffect(() => {
    if (isMounted.current) {
      getPizzas();
    } else isMounted.current = true;
  }, [getPizzas]);

  useEffect(() => {
    const params = {};

    if (categoryId !== 0) params.categoryId = categoryId;
    if (sortType !== 'rating') params.sortType = sortType;
    if (currentPage !== 1) params.currentPage = currentPage;

    const qsString = qs.stringify(params);

    navigate(qsString ? `?${qsString}` : '');
  }, [categoryId, sortType, currentPage, navigate]);

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
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Oops! Something went wrong.</h2>
          <p>We couldn't load the pizzas. Please try again later.</p>
        </div>
      ) : (
        <div className="container__items">{status === 'loading' ? skeleton : pizzas}</div>
      )}
      <Pagination />
    </div>
  );
};

export default Home;
