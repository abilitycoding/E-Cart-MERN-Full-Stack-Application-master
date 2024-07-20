import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";
import { MdSystemUpdateAlt, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserController = () => {
  const [Product, setProduct] = useState([]);
  const navigate = useNavigate();

  // Function to get the JWT token from local storage
  const getToken = () => {
    return localStorage.getItem("token"); // or sessionStorage.getItem("token")
  };

  const getProduct = () => {
    axios
      .get("http://localhost:5000/api/user/get", {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      .then((res) => {
        console.log(res.data.users);
        setProduct(res.data.users);
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
    navigate("/user-update", { state: data });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/user/delete/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      .then((res) => {
        console.log(res.data.updatedUsers);
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
        setProduct(res.data.updatedUsers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className="py-5">
      <h3 className="pb-3">User Controller</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>userName</th>
            <th>userEmail</th>
            <th>userImage</th>
            <th>userRole</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Product.map((data, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{data.userName}</td>
              <td>{data.userEmail}</td>
              <td>
                <img
                  src={data.userImage}
                  alt=""
                  width={50}
                  className="rounded-circle"
                />
              </td>
              <td>{data.userRole}</td>
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

export default UserController;
