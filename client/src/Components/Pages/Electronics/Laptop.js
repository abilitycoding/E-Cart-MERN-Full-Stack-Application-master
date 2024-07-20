import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";

const Laptop = () => {
  const [Product, setProduct] = useState([]);

  const getToken = () => {
    return localStorage.getItem("token"); // or sessionStorage.getItem("token")
  };

  const dataToBackend = {
    productCategory: "laptop"
  };

  const getProduct = () => {
    axios
      .post(
        "http://localhost:5000/api/product/get-product-category",
        dataToBackend,
        {
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      )
      .then((res) => {
        console.log(res.data.products);
        setProduct(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div className="d-flex flex-wrap gap-4 p-5 justify-content-center">
      {Product.map((data) => (
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={data.productImage} />
          <Card.Body className="d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-between">
              <Card.Title>{data.productName}</Card.Title>
              <Card.Title>Stock: {data.productQuantity}</Card.Title>
            </div>
            <Card.Text>{data.productDescription}</Card.Text>
            <div className="d-flex justify-content-between">
              <Button variant="primary">Add To Cart</Button>
              <Card.Title className="text-danger">
                ₹ {data.productPrice}
              </Card.Title>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Laptop;
