import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Sidebar from "../../../components/AdminComponents/Sidebar";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../../../types/reducerTypes";
import { useDeleteProductMutation, useProductDetailsQuery, useUpdateProductMutation } from "../../../redux/api/productAPI";
import { NavigateProps, useNavigate, useParams } from "react-router-dom";
import { server } from "../../../redux/store";
import { Skeleton } from "../../../components/Loader";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../../../types/apiTypes";
import { resToast } from "../../../../Utils/features";
import { FaTrash } from "react-icons/fa";

const ProductManagement = () => {

  const { user } = useSelector((state: {
    userReducer: userReducerInitialState
  }) => state.userReducer);

  const params = useParams()
  const navigate = useNavigate()

  const { data, isLoading } = useProductDetailsQuery(params.id!)


  const { name, category, price, stock, photo, } = data?.product || {
    name: "",
    category: "",
    price: 0,
    stock: 0,
    photo: "",
  }

  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [photoUpdate, setPhotoUpdate] = useState<string>("");
  const [photoFile, setPhotoFile] = useState<File>();

  const [updateProduct] = useUpdateProductMutation()
  const [deleteProduct] = useDeleteProductMutation()

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();
    if (file) {
      reader.readAsDataURL(file)
      reader.onload = () => {
        if (typeof reader.result == "string") {
          setPhotoUpdate(reader.result)
          setPhotoFile(file)
        }
      }
    }

    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") setPhotoUpdate(reader.result);
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData()
    if (nameUpdate) formData.set("name", nameUpdate)
    if (stockUpdate !== undefined) formData.set("stock", stockUpdate.toString())
    if (priceUpdate) formData.set("price", priceUpdate.toString())
    if (photoFile) formData.set("photo", photoFile)
    if (categoryUpdate) formData.set("category", categoryUpdate)

    const res = await updateProduct({
      formData,
      userId: user?._id!,
      productId: data?.product._id!
    })

    resToast(res, navigate, "/admin/product")
  };
  const deleteHandler = async () => {
    const res = await deleteProduct({
      userId: user?._id!,
      productId: data?.product._id!
    })

    resToast(res, navigate, "/admin/product")
  };



  useEffect(() => {
    if (data) {
      setNameUpdate(data.product.name)
      setStockUpdate(data.product.stock)
      setPriceUpdate(data.product.price)
    }
  }, [data])

  return (
    <div className="admin-container">
      <Sidebar />
      <main className="product-management">
        {
          isLoading ? <Skeleton length={20} /> : (
            <>
              <section>
                <strong>ID : {`${data?.product._id}`}</strong>
                <img src={`${server}/${photo}`} alt="" />
                <p>{name}</p>
                {stock > 0 ? (
                  <span className="green">{`${stock} Available`}</span>
                ) : (
                  <span className="red">Not Available</span>
                )}
                <h2>${price}</h2>
              </section>
              <article>
                <button className="product-delete-btn" onClick={deleteHandler}>
                  <FaTrash />
                </button>
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
            </>
          )
        }
      </main>
    </div>
  );
};

export default ProductManagement;
function responseToast(res: { data: MessageResponse; error?: undefined; } | { data?: undefined; error: FetchBaseQueryError | SerializedError; }, Navigate: ({ to, replace, state, relative, }: NavigateProps) => null) {
  throw new Error("Function not implemented.");
}

