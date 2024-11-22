import { useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import { useCategoriesQuery } from "../redux/api/productAPI";
import { CustomError } from "../types/apiTypes";

const Search = () => {

  const { data: CategoriesResponse, isLoading: LoadingCategories, error, isError, } = useCategoriesQuery("")
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setmaxPrice] = useState(10000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const addToCartHandler = () => { };

  const isPrev = false;
  const isNext = true;

  if (isError) {
    const err = error as CustomError
    toast.error(err.data.message)
  }




  return (
    <div className="search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input
            type="range"
            value={maxPrice}
            min={100}
            max={200000}
            onChange={(e) => setmaxPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {
              !LoadingCategories && CategoriesResponse?.categories.map((category) => (<option key={category} value={category}>{category}</option>))
            }
            {/* <option value="all">All</option>
            <option value="camera">Camera</option>
            <option value="footwear">Footwear</option>
            <option value="menswear">Men's wear</option>
            <option value="womenswear">Women's wear</option>
            <option value="laptop">Laptop</option>
            <option value="Jeans">Jeans</option>
            <option value="mobile">Mobile</option> */}
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by name...."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="search-product-list">
          <ProductCard
            productId="fgshydjh"
            photo="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804"
            name="Laptop"
            price={54214}
            stock={455}
            handler={() => addToCartHandler()}
          />

        </div>
        <article>
          <button
            disabled={!isPrev}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Prev
          </button>
          <span>
            {page} of {4}
          </span>
          <button
            disabled={!isNext}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </article>
      </main>
    </div>
  );
};

export default Search;
