import { Provider } from "react-redux";
import { store } from "./redux/store";
import HomePage from "./pages/HomePage";
import Login from "./pages/login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import AddAnimal from "./pages/AddAnimal";
import EditAnimal from "./pages/EditAnimal";
import AnimalDetails from "./pages/AnimalDetails";
import MyAds from "./pages/MyAds";
import DeliveryOrdersAdmin from "./pages/DeliveryOrdersAdmin";
import MyDeliveryOrders from "./pages/MyDeliveryOrders";
import AfterSales from "./pages/AfterSales";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { DarkModeProvider } from "./context/darkMode";
import RouteProtect from "./components/RouteProtect";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

function AppContent() {
  const location = useLocation();
  const hideNavAndFooter =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgetPassword";

  return (
    <div dir="rtl" style={{ textAlign: "right", minHeight: "100vh" }}>
      {!hideNavAndFooter && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <RouteProtect>
              <HomePage />
            </RouteProtect>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route
          path="/addAnimal"
          element={
            <RouteProtect>
              <AddAnimal />
            </RouteProtect>
          }
        />
        <Route
          path="/editAnimal/:id"
          element={
            <RouteProtect>
              <EditAnimal />
            </RouteProtect>
          }
        />
        <Route
          path="/animal/:id"
          element={
            <RouteProtect>
              <AnimalDetails />
            </RouteProtect>
          }
        />
        <Route
          path="/myAds"
          element={
            <RouteProtect>
              <MyAds />
            </RouteProtect>
          }
        />

        <Route
          path="/deliveryOrdersAdmin"
          element={
            <RouteProtect>
              <DeliveryOrdersAdmin />
            </RouteProtect>
          }
        />
        <Route
          path="/myDeliveryOrders"
          element={
            <RouteProtect>
              <MyDeliveryOrders />
            </RouteProtect>
          }
        />
        <Route
          path="/afterSales"
          element={
            <RouteProtect>
              <AfterSales />
            </RouteProtect>
          }
        />
      </Routes>
      {!hideNavAndFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <DarkModeProvider>
        <Router>
          <AppContent />
        </Router>
      </DarkModeProvider>
    </Provider>
  );
}

export default App;
