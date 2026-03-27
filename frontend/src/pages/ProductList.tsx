import { useEffect, useReducer, useState } from "react";
import { productReducer } from "../services/reducers/ProductReducer";
import { getProducts, getCategories } from "../services/api";
import type { Product, Category } from "../types/ProductTypes";
import { ProductCard } from "../components/ProductCard";
import { ProductForm } from "../components/ProductForm";

export const ProductList = () => {
  const [productsState, dispatch] = useReducer(productReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState(false);

  const fetchProducts = async () => {
    dispatch({ type: "PRODUCT_FETCH_INIT" });
    try {
      const res = await getProducts();
      dispatch({ type: "PRODUCT_FETCH_SUCCESS", payload: res.data });
    } catch {
      dispatch({ type: "PRODUCT_FETCH_FAILURE" });
    }
  };

  const fetchCategories = async () => {
    setCategoriesLoading(true);
    setCategoriesError(false);
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch {
      setCategoriesError(true);
    } finally {
      setCategoriesLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleProductCreated = (product: Product) => {
    dispatch({ type: "PRODUCT_FETCH_SUCCESS", payload: [product, ...productsState.data] });

    setCategories((prevCategories) => {
      if (prevCategories.find((c) => c.id === product.category.id)) return prevCategories;
      return [...prevCategories, product.category];
    });
  };

  return (
    <main className="p-4 max-w-5xl mx-auto">
      {/* Loading / Error for categories */}
      {categoriesLoading && <p className="text-gray-500 mb-2">Carregando categorias...</p>}
      {categoriesError && <p className="text-red-500 mb-2">Erro ao carregar categorias.</p>}

      {/* Form */}
      <ProductForm categories={categories} onProductCreated={handleProductCreated} />

      {/* Loading / Error for products */}
      {productsState.isError && <p className="text-red-500 mb-4">Erro ao carregar produtos.</p>}
      {productsState.isLoading ? (
        <p>Carregando produtos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {productsState.data.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
};
