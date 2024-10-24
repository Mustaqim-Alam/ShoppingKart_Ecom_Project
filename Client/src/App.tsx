import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Loader from "./components/Loader";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const Search = lazy(() => import("./pages/Search"));
const BarChart = lazy(() => import("./pages/AdminPages/Charts/BarChart"));
const LineCharts = lazy(() => import("./pages/AdminPages/Charts/LineChart"));
const PieChart = lazy(() => import("./pages/AdminPages/Charts/PieChart"));

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
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
          <Route path="/shipping" element={<ShippingAddress />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<OrderList />} />

          {/* Admin-Route */}
          <Route>
            <Route
              path="/"
              element={
                <Link to="/admin/dashboard">
                  <button>Visit to Admin Dashboarrd</button>
                </Link>
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
