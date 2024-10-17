import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const addToCartHandler = () => {};
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
        <ProductCard
          productId="fgshydjh"
          photo="https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg"
          name="Laptop"
          price={54214}
          stock={455}
          handler={() => addToCartHandler()}
        />
        <ProductCard
          productId="fgshydjh"
          photo="https://images.unsplash.com/photo-1622428051717-dcd8412959de?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          name="Laptop"
          price={54214}
          stock={455}
          handler={() => addToCartHandler()}
        />
      </main>
    </div>
  );
};

export default Home;
