import { Link } from 'react-router-dom';

import emptyCartImg from '../assets/img/empty-cart.png';

export const CartEmpty = () => {
  return (
    <div class="cart cart--empty">
      <h2>
        Cart is empty <icon>😕</icon>
      </h2>
      <p>
        Most likely, you haven't ordered pizza yet.
        <br />
        To order pizza, go to the main page.
      </p>
      <img
        src={emptyCartImg}
        alt="Empty cart"
      />
      <Link
        to="/"
        class="button button--black">
        <span>Go back</span>
      </Link>
    </div>
  );
};
