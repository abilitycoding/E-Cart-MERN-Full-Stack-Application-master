import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();
  //   console.log(Location);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const dataToSendBackend = {
    userEmail,
    userPassword
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/api/auth/signIn", dataToSendBackend)
      .then((res) => {
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
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
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   console.log(dataToSendBackend);
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <Form className=" shadow-lg p-5 rounded-3">
        <h4 className="pb-3 text-center">Sign In</h4>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="User Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="text"
            placeholder="User Password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button href="/signup" variant="primary" type="submit">
            SignUp
          </Button>
          <Button
            onClick={handleSignIn}
            href="/signin"
            variant="primary"
            type="submit"
          >
            Login
          </Button>
        </div>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
