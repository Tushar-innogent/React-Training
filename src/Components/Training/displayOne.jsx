import { Button, Card } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import Spinner from 'react-bootstrap/Spinner';
import { motion } from "framer-motion"

const caroselStyle = {
    maxHeight: '500px',
    minHeight: '500px'
}

const imageStyle = {
    width: "100%",
    margin: "auto",
    height: "100%",
    minHeight: "450px",
    maxHeight: "450px",
    ObjectFit: "fill",
}

const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
}

const DisplayOne = (() => {
    const [product, setProduct] = useState(undefined);
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);

    function getData(id) {
        axios.get(`https://dummyjson.com/products/${id}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }
    useEffect(() => {
        getData(id);
        setTimeout(() => {
            setIsOpen(true);
        }, 300);
        return;
    }, [id]);
    console.log(product);

    return (
        <>

            {/* <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#1677ff",
                    },
                }}
            > */}
                {(product == undefined) ?
                    <div className="col d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                        <Spinner className="text-center" animation="grow" size="sm" />
                        <Spinner className="text-center" animation="grow" />
                    </div>
                    :
                    <>
                        <motion.nav
                            animate={isOpen ? "open" : "closed"}
                            variants={variants}
                        >
                            <div>
                                <h1 className="bg-body-secondary text-center p-2">Cart</h1>
                            </div>
                            <div className="container">
                                <h2 className='mt-4 p-1 text-dark'>{product?.brand}</h2>
                                <div className="row flex">
                                    <div className="col-6">
                                        <Carousel interval={755} style={caroselStyle} data-bs-theme="dark" fade>
                                            {product.images.map((item) => (
                                                <Carousel.Item>
                                                    <img style={imageStyle}
                                                        className="d-block w-100"
                                                        src={item}
                                                        alt="First slide"
                                                    />
                                                </Carousel.Item>
                                            ))}
                                        </Carousel>
                                    </div>
                                    <div className="col-6">
                                        <Card
                                            style={{
                                                width: 500,
                                                height: 450,
                                                padding: 1,
                                                alignItems: "center",
                                                overflow: "auto"
                                            }}
                                            hoverable={true}
                                        >
                                            <h1>{product?.title}</h1>
                                            <h4 className='mt-4'>{product?.description}</h4>
                                            <h5 className="btn btn-danger p-0 mt-4">{product?.discountPercentage}% off</h5>
                                            <div className="d-flex justify-content-xxl-between mt-2">
                                                <p className="mt-1 text-danger"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-rupee" viewBox="0 0 16 16">
                                                    <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
                                                </svg>{product?.price} </p>
                                                <h5 className="m-1"> Rating : {product?.rating}</h5>
                                            </div>
                                            <div className="text-sm">
                                                <h6 className="text-danger m-0">Available offers</h6><br></br>
                                                Special PriceGet extra 19% off (price inclusive of cashback/coupon)T&C
                                                Bank Offer5% Cashback on Flipkart Axis Bank CardT&C
                                            </div>
                                            <Button className="btn btn-warning btn-lg m-1" onClick={() => alert(`${product.category.toUpperCase()} Added To Your Cart`)}><h5 className=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                            </svg> Add To Cart</h5></Button>
                                            <Button className="btn btn-danger btn-lg m-1" onClick={() => alert(`${product.category.toUpperCase()} is your's now!`)}><h5 className="">Buy Now</h5></Button>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </motion.nav>
                    </>
                }
            {/* </ConfigProvider> */}
        </>
    );
});
export default DisplayOne;
