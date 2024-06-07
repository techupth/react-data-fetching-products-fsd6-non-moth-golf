import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProduct = async () => {
    try {
      setLoading(true);
      const result = await axios.get("http://localhost:4001/products");
      console.log(result);
      setProduct(result.data.data);
      setLoading(false);
    } catch (error) {
      console.log("Fetching Error...");
    }
  };
  const removeProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/products/${id}`);
    } catch (err) {
      console.log("Can't delete data!");
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  const handleRemove = (productIndex, id) => {
    const newProduct = [...product];
    newProduct.splice(productIndex, 1);
    setProduct(newProduct);
    removeProduct(id);
  };
  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      {loading ? (
        <div>"Loading..."</div>
      ) : (
        product.map((data, index) => {
          return (
            <div className="product-list">
              <div className="product">
                <div className="product-preview">
                  <img
                    src="https://via.placeholder.com/350/350"
                    alt="some product"
                    width="350"
                    height="350"
                  />
                </div>
                <div className="product-detail">
                  <h1>Product name: {data.name}</h1>
                  <h2>Product price: {data.price} Baht</h2>
                  <p>Product description: {data.description}</p>
                </div>
                <button
                  className="delete-button"
                  onClick={() => {
                    handleRemove(index, data.id);
                  }}
                >
                  x
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default App;
