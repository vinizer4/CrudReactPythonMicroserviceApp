import React, {useEffect, useState} from 'react';
import {Product}                    from "../interfaces/product";
import Wrapper                      from "../admin/Wrapper";
import Nav                          from "../admin/components/Nav";
import {inspect}                    from "util";

const Main = () => {
    const [products, setProducts] = useState([] as Product[]);
    const [productsNotFiltered, setProductsNotFiltered] = useState([] as Product[]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8001/api/products');

                const data = await response.json();

                console.log(data)

                setProducts(data);
                setProductsNotFiltered(data)
            }
        )();
    }, []);

    const handleSearchChange = (value: string) => {
        const filteredProducts = products.filter(product =>
            product.title.toLowerCase().includes(value.toLowerCase())
        );
        console.log(filteredProducts)
        console.log(value)
        setProducts(filteredProducts);

        if (value === "") {
            setProducts(productsNotFiltered)
        }
    };

    useEffect(() => {
        handleSearchChange(searchTerm)
    }, [searchTerm]);


    const like = async (id: number) => {
        await fetch(`http://localhost:8001/api/products/${id}/like`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        });


        setProducts(products.map(
            (p: Product) => {
                if (p.id === id) {
                    p.likes++;
                }

                return p;
            }
        ));
    }

    return (
        <div>
            <Wrapper handleSearchChange={handleSearchChange}/>
                <Nav handleSearchChange={handleSearchChange}/>
                <div style={{display: 'flex', flexWrap: 'wrap', margin: '5rem'}}>
                    {products.map(
                        (p: Product) => {
                            return (
                                <div key={p.id} className="card" style={{width: "18rem", height: "20rem", margin: '2rem', border: '1px solid black', padding: '5px', justifyContent: 'space-between'}}>
                                    <img src={p.image} className="card-img-top mx-auto" style={{width: "50%", height: "50%", justifyContent: 'space-between', alignItems: 'center'}} alt={p.title}/>
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <h5 className="card-title">{p.title}</h5>
                                    </div>
                                    <div className="card-body">
                                        <button type="button"
                                                className="btn btn-sm btn-outline-secondary align-self-end"
                                                onClick={() => like(p.id)}
                                        >
                                            Like
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    )}
                </div>
        </div>

    );
};

export default Main;
