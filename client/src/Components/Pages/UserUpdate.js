import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserUpdate = () => {
  const Location = useLocation().state;
  const navigate = useNavigate();
  //   console.log(Location);

  const [userName, setUserName] = useState(Location.userName);
  const [userEmail, setUserEmail] = useState(Location.userEmail);
  const [userImage, setUserImage] = useState(Location.userImage);
  const [userRole, setUserRole] = useState(Location.userRole);

  const dataToSendBackend = {
    _id: Location._id,
    userName,
    userEmail,
    userImage,
    userRole
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Function to get the JWT token from local storage
    const getToken = () => {
      return localStorage.getItem("token"); // or sessionStorage.getItem("token")
    };

    await axios
      .put("http://localhost:5000/api/user/put", dataToSendBackend, {
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
          navigate("/admin/user");
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
        <h4 className="pb-3 text-center">User User</h4>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Control
            type="text"
            placeholder="Enter User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="User Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <img src={userImage} alt="" width={100} className="pb-3" />
          <Form.Control
            type="text"
            as="textarea"
            rows={4}
            placeholder="User Image"
            value={userImage}
            onChange={(e) => setUserImage(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="text"
            placeholder="User Category"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
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

export default UserUpdate;
