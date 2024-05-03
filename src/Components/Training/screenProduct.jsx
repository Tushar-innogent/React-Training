import React, { useEffect } from 'react';
import { ConfigProvider, theme } from 'antd';
import { useSelector } from 'react-redux';
import { Carousel } from 'antd';
import { Card, Space } from 'antd';
import { CaretLeftFilled, CaretRightFilled } from '@ant-design/icons';
import Display from './display';
import { defaultTheme } from 'antd/es/theme/context';

const contentStyle = {
    height: '500px',
    width: '600px',
    color: '#fff',
    lineHeight: '160px',
    background: '#fff',
};
export default function Screen() {
    const product = useSelector((state) => state.product.value);

    // useEffect(()=>{
    //     product===null &&  <Display/>
    // },[]);
    // console.log(product);
    return (<>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#1677ff",
                },
            }}
        >
            <div className='container row p-2'>
                <h1 className='text-lg-start m-2'>{product.title}</h1>
                <div className="col-9">
                    <Carousel autoplay>

                        {product.images.map((image) => (
                            <div>
                                <img src={image} style={contentStyle} alt='imageOfProduct' />
                            </div>
                        ))
                        }
                    </Carousel>
                    <Space>
                        <CaretLeftFilled />
                        <CaretRightFilled />
                    </Space>
                </div>
                <div className="col">
                    <Card
                        style={{
                            width: 300,
                            height: 500,
                            padding: 1,
                            alignItems: "center"
                        }}
                        hoverable={true}
                    >
                        <h1>{product.title}</h1>
                        <h5 className='mt-4 bg-success-subtle p-1 text-dark'>{product.brand}</h5>
                        <h4 className='mt-4'>{product.description}</h4>
                        <h5 className="btn btn-danger p-0 mt-4">{product.discountPercentage}% off</h5>
                        <div className="d-flex justify-content-xxl-between mt-2">
                            <p className="mt-1 text-danger"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-rupee" viewBox="0 0 16 16">
                                <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
                            </svg>{product.price} </p>
                            <h5 className="m-1"> Rating : {product.rating}</h5>
                        </div>
                    </Card>
                </div>
            </div>
        </ConfigProvider>
    </>);
}