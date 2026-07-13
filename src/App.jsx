import { useState, useEffect } from "react";
import { ProductCard } from "./components/ProductCard";
export default function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    try {
      const data = await fetch("https://dummyjson.com/products?limit=500");
      const result = await data.json();
      setProducts(result.products);
    } catch (error) {
      console.log("error in fetching response !", error);
      alert("Cannot load data !");
    }
  };
  const PAGE_SIZE = 10;
  const totalProducts = products?.length;
  const no_of_pages = Math.ceil(totalProducts / PAGE_SIZE);

  const start = currentPage * PAGE_SIZE;
  const end = currentPage * 10 + PAGE_SIZE;

  useEffect(() => {
    fetchData();
  }, []);

  function getPreviousPage() {
    setCurrentPage((prev) => prev - 1);
  }

  function getNextPage() {
    setCurrentPage((prev) => prev + 1);
  }

  return products.length === 0 ? (
    <h1>No Products Founded !</h1>
  ) : (
    <div className="App px-20 py-10">
      <p className="text-center font-bold text-3xl">Pagination basics !</p>
      <div className="pagination-controls w-full font-bold my-5 flex gap-3 justify-center">
        <button
          onClick={getPreviousPage}
          disabled={currentPage === 1}
          className="disabled:opacity-50 disabled:cursor-not-allowed border py-1 px-2 rounded-md cursor-pointer">
          ▶️
        </button>{" "}
        {[...Array(no_of_pages)].map((_, index) => (
          <button
            onClick={() => setCurrentPage(index + 1)}
            className={`border py-1 px-2 rounded-md cursor-pointer ${currentPage == index + 1 ? "bg-green-200" : ""}`}
            key={index}>
            {index + 1}
          </button>
        ))}
        <button
          onClick={getNextPage}
          disabled={currentPage === no_of_pages}
          className="disabled:opacity-50 disabled:cursor-not-allowed border py-1 px-2 rounded-md cursor-pointer">
          ▶️
        </button>
      </div>
      <div className="products-wrapper grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-3">
        {products.slice(start, end).map((product) => {
          return (
            <ProductCard
              key={product.id}
              image={product.images[0]}
              title={product.title}
              price={product.price}
            />
          );
        })}
      </div>
    </div>
  );
}
