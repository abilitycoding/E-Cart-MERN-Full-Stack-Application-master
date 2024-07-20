import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Col, Row, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Dropzone from "react-dropzone";

const ProductForm = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("laptop"); // Default category
  const [productQuantity, setProductQuantity] = useState("");
  const [image, setImage] = useState(null);

  const handleDrop = (acceptedFiles) => {
    // console.log(acceptedFiles);
    const imageFile = acceptedFiles[0];
    setImage(imageFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "E-Cart");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dhc18npny/image/upload",
        formData
      );

      const imageURL = response.data.secure_url;

      // Send product data including imageURL to backend
      const productData = {
        productName,
        productPrice,
        productDescription,
        productImage: imageURL,
        productCategory,
        productQuantity
      };

      // Function to get the JWT token from local storage
      const getToken = () => {
        return localStorage.getItem("token"); // or sessionStorage.getItem("token")
      };

      await axios.post("http://localhost:5000/api/product/post", productData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });

      // Clear form after submission
      setProductName("");
      setProductPrice("");
      setProductDescription("");
      setProductCategory("laptop");
      setProductQuantity("");
      setImage(null);

      alert("Product submitted successfully!");
    } catch (error) {
      console.error("Error submitting product: ", error);
      alert("Failed to submit product.");
    }
  };

  return (
    <Container>
      <h2 className="mt-4 mb-3">Add a New Product</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="productPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="productDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="productCategory">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              required
            >
              <option value="laptop">Laptop</option>
              <option value="mobile">Mobile</option>
              <option value="desktop">Desktop</option>
              <option value="tablet">Tablet</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="productQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
              required
            />
          </Form.Group>
        </Row>
        <Form.Group
          className="mb-3 border rounded-3 p-3"
          controlId="productImage"
        >
          <Form.Label>Upload Image</Form.Label>
          <Dropzone onDrop={handleDrop} accept="image/*">
            {({ getRootProps, getInputProps }) => (
              <div className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                <FontAwesomeIcon icon={faUpload} className="me-2" />
                <p>Drag 'n' drop an image here, or click to select image</p>
              </div>
            )}
          </Dropzone>
          {image && (
            <div className="mt-3">
              <h2>Selected Image:</h2>
              <Image src={URL.createObjectURL(image)} alt="Uploaded" fluid />
            </div>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default ProductForm;
