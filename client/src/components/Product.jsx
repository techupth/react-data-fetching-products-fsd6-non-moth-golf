import { useState, useEffect } from "react";
import axios from "axios";

function Product() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = "http://localhost:4001/products";

  async function getProducts() {
    try {
      const response = await axios.get(baseUrl);
      setProduct(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  }

  async function handleProductRemove(productId) {
    try {
      setIsLoading(true);
      await axios.delete(`${baseUrl}/${productId}`);
      await getProducts();
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          product.map((item, index) => (
            <div className="product">
              <div className="product-preview">
                <img
                  src="https://via.placeholder.com/350/350"
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail" key={index}>
                <h1># {item.id}</h1>
                <h1>{item.name}</h1>
                <h2>{item.price} Baht</h2>
                <p>Description: {item.description}</p>
              </div>
              <button
                className="delete-button"
                onClick={async () => {
                  await handleProductRemove(item.id);
                }}
              >
                x
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default Product;
