import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Slider from "react-slick";
import Carousel from "react-bootstrap/Carousel";
const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const searchData = location.state?.searchData || [];

  const getToken = () => {
    return localStorage.getItem("token"); // or sessionStorage.getItem("token")
  };

  const fetchProducts = async () => {
    await axios
      .get("http://localhost:5000/api/product/get", {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      .then((res) => {
        console.log(res);
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const laptops = products.filter(
    (product) => product.productCategory === "laptop"
  );
  const mobiles = products.filter(
    (product) => product.productCategory === "mobile"
  );

  const MobileSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 10000,
    autoplaySpeed: 1000,
    pauseOnHover: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const LaptopSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 10000,
    autoplaySpeed: 1000,
    pauseOnHover: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  return (
    <Container className="mt-3">
      <Row>
        <h1>Home</h1>
        {searchData.length > 0
          ? searchData.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} className="mb-3">
                <Card style={{ minHeight: "490px" }}>
                  <Card.Img variant="top" src={product.productImage} />
                  <Card.Body>
                    <Card.Title>{product.productName}</Card.Title>
                    <Card.Text>{product.productDescription}</Card.Text>
                    <Card.Text>Price: ₹ {product.productPrice}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          : null}
      </Row>
      <Row>
        <Carousel data-bs-theme="dark">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/GW/Uber/Nov/D103625178_DesktopTallHero_3000x1200_V3._CB558389732_.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h5>First slide label</h5>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images-eu.ssl-images-amazon.com/images/G/31/CookwareDining/Aman/May/3000X1200_1._CB555953523_.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h5>Second slide label</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/march/brands/GW/Under_1499_Tallhero_3000x1200._CB561212093_.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h5>Third slide label</h5>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Row>
      <div className="slider-container mt-5">
        <h1 className="pb-3">Laptops</h1>
        <Slider {...LaptopSettings}>
          {laptops.map((product) => (
            <div key={product._id}>
              <Card className="me-3" style={{ minHeight: "490px" }}>
                <Card.Img variant="top" src={product.productImage} />
                <Card.Body>
                  <Card.Title>{product.productName}</Card.Title>
                  <Card.Text>{product.productDescription}</Card.Text>
                  <Card.Text>Price: ₹ {product.productPrice}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Slider>
      </div>

      <div className="slider-container mt-5">
        <h1 className="pb-3">Mobiles</h1>
        <Slider {...MobileSettings}>
          {mobiles.map((product) => (
            <div key={product._id}>
              <Card className="me-3" style={{ minHeight: "490px" }}>
                <Card.Img variant="top" src={product.productImage} />
                <Card.Body>
                  <Card.Title>{product.productName}</Card.Title>
                  <Card.Text>{product.productDescription}</Card.Text>
                  <Card.Text>Price: ₹ {product.productPrice}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </Container>
  );
};

export default Home;