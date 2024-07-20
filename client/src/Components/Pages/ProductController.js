import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button } from "react-bootstrap";
import { MdSystemUpdateAlt, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductController = () => {
  const [Product, setProduct] = useState([]);
  const navigate = useNavigate();
  // Function to get the JWT token from local storage
  const getToken = () => {
    return localStorage.getItem("token"); // or sessionStorage.getItem("token")
  };

  const getProduct = () => {
    axios
      .get("http://localhost:5000/api/product/get", {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
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

  const handleUpdate = (data) => {
    console.log(data);
    navigate("/product-update", { state: data });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/product/delete/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      .then((res) => {
        console.log(res.data.products);
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
        setProduct(res.data.updatedProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center pb-3">
        <h3 className="m-0">Product Controller</h3>
        <Button href="/product-add" variant="dark">
          Add Product
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>productName</th>
            <th>productPrice</th>
            <th>productDescription</th>
            <th>productImage</th>
            <th>productCategory</th>
            <th>productQuantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Product.map((data, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{data.productName}</td>
              <td>{data.productPrice}</td>
              <td>{data.productDescription}</td>
              <td>
                <img src={data.productImage} alt="" width={100} />
              </td>
              <td>{data.productCategory}</td>
              <td>{data.productQuantity}</td>
              <td className=" d-flex gap-3">
                <MdSystemUpdateAlt
                  onClick={() => handleUpdate(data)}
                  className="fs-3"
                />
                <MdDelete
                  onClick={() => handleDelete(data._id)}
                  className="fs-3"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer />
    </Container>
  );
};

export default ProductController;
