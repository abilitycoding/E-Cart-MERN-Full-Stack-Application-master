import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductUpdate = () => {
  const Location = useLocation().state;
  const navigate = useNavigate();
  //   console.log(Location);

  const [productName, setProductName] = useState(Location.productName);
  const [productPrice, setProductPrice] = useState(Location.productPrice);
  const [productDescription, setProductDescription] = useState(
    Location.productDescription
  );
  const [productImage, setProductImage] = useState(Location.productImage);
  const [productCategory, setProductCategory] = useState(
    Location.productCategory
  );
  const [productQuantity, setProductQuantity] = useState(
    Location.productQuantity
  );

  const dataToSendBackend = {
    _id: Location._id,
    productName,
    productPrice,
    productDescription,
    productImage,
    productCategory,
    productQuantity
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Function to get the JWT token from local storage
    const getToken = () => {
      return localStorage.getItem("token"); // or sessionStorage.getItem("token")
    };

    await axios
      .put("http://localhost:5000/api/product/put", dataToSendBackend, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      .then((res) => {
        console.log(res.data.message);
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
        setTimeout(() => {
          navigate("/");
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   console.log(dataToSendBackend);
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <Form onSubmit={handleUpdate} className=" shadow-lg p-5 rounded-3">
        <h4 className="pb-3 text-center">Update Product</h4>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Enter Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="number"
            placeholder="Product Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="text"
            as="textarea"
            rows={3}
            placeholder="Product Description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <img src={productImage} alt="" width={100} className="pb-3" />
          <Form.Control
            type="text"
            as="textarea"
            rows={4}
            placeholder="Product Image"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="text"
            placeholder="Product Category"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="number"
            placeholder="Product Quantity"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default ProductUpdate;
