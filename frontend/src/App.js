import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route element={<LoginScreen />} path="/login" />
            <Route element={<ProductScreen />} path="/products/:id" />
            <Route element={<CartScreen />} path="/cart/:id?" />
            <Route element={<HomeScreen />} path="/" />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
