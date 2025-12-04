import { Routes, Route, Navigate } from "react-router";
import { ProductList } from "./pages/ProductList";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="/products" element={<ProductList />} />
    </Routes>
  );
};

export default App;
