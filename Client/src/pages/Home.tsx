import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { Skeleton } from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { cartItem } from '../types/types';

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");
  if (isError) toast.error("Products cannot be fetched");

  const dispatch = useDispatch()

  const addToCartHandler = (cartItem: cartItem) => {
    if (cartItem.stock < 1) return toast.error("Item Out of Stock ")

    dispatch(addToCart(cartItem))
    toast.success("Item Added to Cart")
  };


  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products
        <Link to="/search" className="findMore">
          More
        </Link>
      </h1>

      <main>
        {isLoading ? (
          <Skeleton />
        ) : (
          data?.products.map((i) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              photo={i.photo}
              name={i.name}
              price={i.price}
              stock={i.stock}
              handler={addToCartHandler}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Home;
