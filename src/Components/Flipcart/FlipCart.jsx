import { useState, useEffect } from "react";

export function Flipcart() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json(); // Don't forget to await here
            setProducts(data);
        } catch (error) {
            console.error('There was a problem with fetch operation ', error);
        }
    }

    return (
        <div className="">
            <div>
                <h1 className="text-center bg-info p-2">Fake Store Products</h1>
            </div><hr></hr>
            <div className="container">
                <div className="row justify-content-center">
                    {products.map(product => ( // Use map instead of forEach
                        <div className="col-md-4 mb-4 w-200 h-200 " key={product.id}> {/* Add key prop */}
                            <div className="card p-2 flipcart">
                                <img className="card-img-top mx-auto w-50 h-50" src={product.image} alt='product'></img>
                                <div className="card-body">
                                    <h5 className="card-title"><b>Title</b> : {product.title}</h5>
                                    <h6><b>Price : </b>{product.price}</h6>
                                    <p className="card-text"><b>About :</b> {product.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
