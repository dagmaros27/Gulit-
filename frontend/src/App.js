import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route element={<HomeScreen />} path="/" />
            <Route element={<ProductScreen />} path="/products/:id" />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
