import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [products, setProduct] = useState([]);

  const getProduct = async () => {
    const product = await axios.get("http://localhost:4001/products");
    console.log(product.data.data[0]);
    setProduct(product.data.data);
  };

  const removeProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/products/${id}`);
    } catch {
      console.log("Can't delete data!");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleRemove = (index, id) => {
    const newProduct = [...products];
    newProduct.splice(index, 1);
    setProduct(newProduct);
    removeProduct(id);
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {products.map((pro, index) => {
          return (
            <div className="product" key={index}>
              <div className="product-preview">
                <img
                  src={pro.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {pro.name}</h1>
                <h2>Product price: {pro.price} Baht</h2>
                <p>Product description: {pro.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => {
                  handleRemove(index, pro.id);
                }}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
