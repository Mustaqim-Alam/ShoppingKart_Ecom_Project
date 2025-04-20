import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Sidebar from "../../../components/AdminComponents/Sidebar";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../../../types/reducerTypes";
import { useProductDetailsQuery } from "../../../redux/api/productAPI";
import { useParams } from "react-router-dom";

const ProductManagement = () => {
  const img =
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

  const { user } = useSelector((state: {
    userReducer: userReducerInitialState
  }) => state.userReducer);
  const params = useParams()

  const { data } = useProductDetailsQuery(params.id!)

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    photo: "",
  });

  const { name, category, price, stock, photo, } = product

  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [photoUpdate, setPhotoUpdate] = useState<string>(photo);
  const [photoFile, setPhotoFile] = useState<File>();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") setPhotoUpdate(reader.result);
      };
    }
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName(nameUpdate);
    setPrice(priceUpdate);
    setStock(stockUpdate);
    setPhoto(photoUpdate);
  };



  useEffect(() => {
    if (data) {
      setProduct(data.product)
    }
  }, [data])

  return (
    <div className="admin-container">
      <Sidebar />
      <main className="product-management">
        <section>
          <strong>ID : gjhdsfvhvasdj</strong>
          <img src={photo} alt="" />
          <p>{name}</p>
          {stock > 0 ? (
            <span className="green">{`${stock} Available`}</span>
          ) : (
            <span className="red">Not Available</span>
          )}
          <h2>${price}</h2>
        </section>
        <article>
          <form onSubmit={submitHandler}>
            <h2>Manage</h2>
            <div>
              <label>Name</label>
              <input
                required
                type="text"
                placeholder="Name"
                value={nameUpdate}
                onChange={(e) => setNameUpdate(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                required
                type="number"
                placeholder="Price"
                value={priceUpdate}
                onChange={(e) => setPriceUpdate(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                required
                type="number"
                placeholder="Stock"
                value={stockUpdate}
                onChange={(e) => setStockUpdate(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Photo</label>
              <input type="file" onChange={changeImageHandler} />
            </div>
            {photoUpdate && <img src={photoUpdate} alt="New Product Image" />}
            <button>Update Product</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default ProductManagement;
