import { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux'
// import { assign } from './productSlice'
import Spinner from "react-bootstrap/esm/Spinner";
import MyCart from "./Cart";

const { Meta } = Card;

const imageStyle = {
    maxHeight: '170px',
    minWeight: '200px'
};

const metaStyle = {
    maxHeight: '100px',
    minWeight: '200px'
};

const Display = () => {
    const [products, setProduct] = useState([]);

    // const dispatch = useDispatch();
    useEffect(() => {
        axios.get('https://dummyjson.com/products')
            .then(response => response.data)
            .then(item => setProduct(item.products))
            .catch(error => {
                console.log(error);
            })
        console.log(products);
    }, []);

    function AddToCart(product) {
        // setCart(product);
        // alert(`${product.category.toUpperCase()} Added To Your Cart`);
    }

    return (
        <>
            {(products.length == 0) ?
                <div className="col d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <Spinner className="text-center" animation="grow" />
                </div>
                :
                <>
                    <h1 className=" bg-body-secondary text-center p-2">Fake Store Products</h1>
                    <div className="container justify-content-between mt-2">
                        <Row>
                            <div className=" w-100 d-flex justify-content-end p-1 mb-2">
                                <Link to={{
                                    pathname: `/cart}`,
                                }}
                                    style={{
                                        textDecoration: "none"}}
                                            >
                                            <Button type="primary" danger><ShoppingCartOutlined style={{ fontSize: '22px' }} /> Cart</Button>
                                </Link>
                    </div>
                    <div className="w-100 d-flex flex-wrap justify-content-around">
                        {products.map(product => (
                            <Col className="" key={product.id}>
                                <Link to={{
                                    pathname: `/screen/${product.id}`,
                                }}
                                    style={{
                                        textDecoration: "none"
                                    }}>
                                    {/* <Link to={{
                        pathname:"/screen",
                        state: product,
                       }}                        
                       style = {{
                        textDecoration:"none"
                    }}> */}
                                    <div className="flex flex-wrap m-2 p-1" onClick={() => { }}>
                                        {/* <div className="flex flex-wrap m-2 p-1" onClick={()=>{dispatch(assign(product))}}> */}
                                        <Card
                                            style={{
                                                maxHeight: 495,
                                                width: 300,
                                                padding: 0,
                                                alignItems: "center"
                                            }}
                                            hoverable={true}
                                            cover={
                                                <img style={imageStyle} src={product.thumbnail} alt="productImg"></img>
                                            }
                                        >
                                            <Meta style={metaStyle} title={product.title} description={product.description}>
                                            </Meta>
                                            <div className="d-flex justify-content-xxl-between mt-1">
                                                <p className="mt-1 p-1 text-danger">₹{product.price} </p>
                                                <p className="text-danger-empasis mt-1">{product.discountPercentage}% off</p>
                                            </div>
                                            <div className="d-flex justify-content-xxl-between mt-0">
                                                <p className=""> Rating : {product.rating}</p>
                                                <p>In Stock : {product.stock}</p>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <Button className="btn btn-warning m-1" onClick={AddToCart(product)}><h6 className=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                                </svg> Add To Cart</h6></Button>
                                                <Button className="btn btn-danger m-1" onClick={() => alert(`${product.category.toUpperCase()} is your's now!`)}><h6 className="">Buy Now</h6></Button>
                                            </div>
                                        </Card>
                                    </div>
                                </Link>
                            </Col>
                        ))}
                    </div>
                </Row>
        </div >
                </>
            }
        </>
    );
}

export default Display;