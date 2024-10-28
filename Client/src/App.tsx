import { onAuthStateChanged } from "firebase/auth";
import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Loader from "./components/Loader";
import { auth } from "./Firebase";
import { userExists, userNotExists } from "./redux/reducer/userReducer";
import { getUser } from "./redux/api/userAPI";
import { userReducerInitialState } from "./types/reducerTypes";
const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const Search = lazy(() => import("./pages/Search"));
const BarChart = lazy(() => import("./pages/AdminPages/Charts/BarChart"));
const LineCharts = lazy(() => import("./pages/AdminPages/Charts/LineChart"));
const PieChart = lazy(() => import("./pages/AdminPages/Charts/PieChart"));
const ProtectedRoute = lazy(() => import("./components/protectedRoute"));

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

const App = () => {
  const { user, loading } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // console.log("Logged In");
        const data = await getUser(user.uid);
        dispatch(userExists(data.user));
      } else {
        // console.log("!Logged In");
        dispatch(userNotExists());
      }
    });
  }, []);

  return (
    <Router>
      <Suspense fallback={loading && <Loader />}>
        <Header user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
          {/* LoggedIn User Route */}
          <Route path="/shipping" element={<ShippingAddress />} />
          <Route path="/orders" element={<OrderList />} />
          {/* Not LoggedIn User Route */}
          <Route path="/login" element={<Login />} />

          {/* Admin-Route */}
          <Route>
            <Route
              path="/"
              element={
                // <Link to="/admin/dashboard">
                //   <button>Visit to Admin Dashboarrd</button>
                // </Link>
                <ProtectedRoute />
              }
            />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/customer" element={<Customer />} />
            <Route path="/admin/product" element={<Product />} />
            <Route path="/admin/transaction" element={<Transaction />} />

            {/* Charts */}
            <Route path="/admin/chart/bar" element={<BarChart />} />
            <Route path="/admin/chart/pie" element={<PieChart />} />
            <Route path="/admin/chart/line" element={<LineCharts />} />

            {/* Apps */}
            <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
            <Route path="/admin/app/toss" element={<Toss />} />
            <Route path="/admin/app/coupon" element={<Coupon />} />

            {/* Manegment */}

            <Route path="/admin/product/new" element={<AddNewProduct />} />
            <Route path="/admin/product/:id" element={<ProductManagement />} />
            <Route
              path="/admin/transaction/:id"
              element={<TransactionManagement />}
            />
          </Route>
        </Routes>
      </Suspense>
      <Toaster position="top-right" />
    </Router>
  );
};

export default App;
