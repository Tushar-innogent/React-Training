import React, { useState, useEffect } from "react";
import 'antd/dist/reset.css';
import axios from "axios";
import { Avatar, Card, Spin, Row, Col } from 'antd';

const { Meta } = Card;

export default function NasaComponent() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(`Error fetching data : ${error} `);
            })
    }, []);
    console.log(data);

    return (
        <div style={{ padding: 20 }}>
            <h1 className="  p-2 text-danger text-center">Products</h1><hr></hr>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
            <Row justify="space-between" gutter={[50, 50]}>
            {loading ? (
                <Spin size="large" className="text-center"/>
            ) : (
                data.map(product => (
                    <Col  span={6}>
                    <div key={product.id} className="w-75 h-50">
                    <Card
                        size="small"
                        cover={
                            <img
                                alt="product"
                                src={product.image}
                                // size="small"
                            />
                        }
                        actions={[
                            <h6>Price : {product.price}</h6>,
                            <h6>Rating : {product.rating.rate}</h6>,
                        ]}   
                    >
                        <Meta
                            avatar={<Avatar src={product.image}/>}
                            title={product.title}
                        />
                        <p style={{ height: '100px', overflow: 'auto' }}>description={product.description}</p>
                    </Card>
                    </div>
                    </Col>
            ))
            )}
            </Row>
            </div>
        </div >
    );
}