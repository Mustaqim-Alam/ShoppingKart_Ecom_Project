import { ChangeEvent, FormEvent, useState } from "react";
import Sidebar from "../../../components/AdminComponents/Sidebar";
import { useNewProductMutation } from "../../../redux/api/productAPI";
import toast from 'react-hot-toast';
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../../../types/reducerTypes";
import { resToast } from '../../../../Utils/features';
import { useNavigate } from "react-router-dom";

const AddNewProducts = () => {

  const { user } = useSelector((state: { userReducer: userReducerInitialState }) => state.userReducer);

  const [name, setName] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [stock, setStock] = useState<number>();
  const [photo, setPhoto] = useState<string>();
  const [category, setCategory] = useState<string>();

  const [newProduct] = useNewProductMutation()
  const navigate = useNavigate()

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") setPhoto(reader.result);
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!name || !photo || !price || !category || !stock) toast.error("All fields are required!")

    const formData = new FormData()

    formData.set("name", name)
    formData.set("price", price?.toString())
    formData.set("stock", stock?.toString())
    formData.set("category", category)
    formData.set("photo", photo)

    const res = await newProduct({ id: user?._id!, formData })
    resToast(res, navigate, "/admin/product")
  }

  return (
    <div className="admin-container">
      <Sidebar />
      <main className="product-management">
        <article>
          <form onSubmit={submitHandler}>
            <h2>New Product</h2>
            <div>
              <label>Name</label>
              <input
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                required
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                required
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Category</label>
              <input
                required
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(String(e.target.value))}
              />
            </div>
            <div>
              <label>Photo</label>
              <input type="file" onChange={changeImageHandler} />
            </div>
            {photo && <img src={photo} alt="New Product Image" />}
            <button>Create Product</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default AddNewProducts;
