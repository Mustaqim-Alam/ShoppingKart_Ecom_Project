import { onAuthStateChanged } from "firebase/auth";
import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Loader from "./components/Loader";
import { auth } from "./Firebase";
import { getUser } from "./redux/api/userAPI";
import { userExists, userNotExists } from "./redux/reducer/userReducer";
import { userReducerInitialState } from "./types/reducerTypes";
const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const Search = lazy(() => import("./pages/Search"));
const BarCharts = lazy(() => import("./pages/AdminPages/Charts/BarChart"));
const LineCharts = lazy(() => import("./pages/AdminPages/Charts/LineChart"));
const PieCharts = lazy(() => import("./pages/AdminPages/Charts/PieChart"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

const Dashboard = lazy(() => import("./pages/AdminPages/Dashboard"));
const Customer = lazy(() => import("./pages/AdminPages/Customer"));
const Product = lazy(() => import("./pages/AdminPages/Product"));
const Transaction = lazy(() => import("./pages/AdminPages/Transaction"));

const AddNewProduct = lazy(
  () => import("./pages/AdminPages/Management/AddNewProducts")
);
const ProductManagement = lazy(
  () => import("./pages/AdminPages/Management/ProductManagement")
);
const TransactionManagement = lazy(
  () => import("./pages/AdminPages/Management/TransactionManagement")
);

const Stopwatch = lazy(() => import("./pages/AdminPages/apps/Stopwatch"));
const Coupon = lazy(() => import("./pages/AdminPages/apps/Coupon"));
const Toss = lazy(() => import("./pages/AdminPages/apps/Toss"));

const ShippingAddress = lazy(() => import("./pages/Shipping"));
const Login = lazy(() => import("./pages/Login"));
const OrderList = lazy(() => import("./pages/OrdersList"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));

const App = () => {
  const { user, loading } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );

  const dispatch = useDispatch();
  //Checking user loggedin or not logged in 
  useEffect(() => {
    // const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged In");
        const data = await getUser(user.uid);
        dispatch(userExists(data.user));
      } else {
        console.log("!Logged In");
        dispatch(userNotExists());
      }
    });
  }, []);

  return loading ? (
    <Loader />

  ) : (
    <Router>
      {/* Header */}
      <Header user={user} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          {/* Not logged In Route */}
          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={user ? false : true}>
                <Login />
              </ProtectedRoute>
            }
          />
          {/* Logged In User Routes */}
          <Route
            element={<ProtectedRoute isAuthenticated={user ? true : false} />}
          >
            <Route path="/shipping" element={<ShippingAddress />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            {/* <Route path="/pay" element={<Checkout />} /> */}
          </Route>
          {/* Admin Routes */}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={true}
                adminOnly={true}
                admin={user?.role === "admin" ? true : false}
              />
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/product" element={<Product />} />
            <Route path="/admin/customer" element={<Customer />} />
            <Route path="/admin/transaction" element={<Transaction />} />
            {/* <Route path="/admin/discount" element={<D />} /> */}

            {/* Charts */}
            <Route path="/admin/chart/bar" element={<BarCharts />} />
            <Route path="/admin/chart/pie" element={<PieCharts />} />
            <Route path="/admin/chart/line" element={<LineCharts />} />
            {/* Apps */}
            <Route path="/admin/app/coupon" element={<Coupon />} />
            <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
            <Route path="/admin/app/toss" element={<Toss />} />

            {/* Management */}
            <Route path="/admin/product/new" element={<AddNewProduct />} />

            <Route path="/admin/product/:id" element={<ProductManagement />} />

            <Route
              path="/admin/transaction/:id"
              element={<TransactionManagement />}
            />

            {/* <Route path="/admin/discount/new" element={<NewDiscount />} /> */}

            {/* <Route
              path="/admin/discount/:id"
              element={<DiscountManagement />}
            /> */}
          </Route>

          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Suspense>
      <footer />
      <Toaster position="bottom-center" />
    </Router>
  );
};

export default App;
