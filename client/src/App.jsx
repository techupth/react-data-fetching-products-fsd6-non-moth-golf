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
      // console.log(result);
      setProduct(result.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      {loading ? (
        <div>"Loading..."</div>
      ) : (
        product.map((data) => {
          return (
            <div className="product-list" key={data.id}>
              <div className="product">
                <div className="product-preview">
                  <img
                    src={data.image}
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
                  onClick={async () => {
                    await axios.delete(`http://localhost:4001/products/${data.id}`)
                    getProduct()
                  }
                  }
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
