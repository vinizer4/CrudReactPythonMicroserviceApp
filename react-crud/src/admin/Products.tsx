import React, {useEffect, useState} from 'react';
import Wrapper                      from "./Wrapper";
import {Product}                    from "../interfaces/product";
import {Link, Navigate}             from "react-router-dom";
import Nav                          from "./components/Nav";

const Products = () => {
    const [products, setProducts] = useState([] as Product[]);
    const [redirect, setRedirect] = useState(false);
    const [productsNotFiltered, setProductsNotFiltered] = useState([] as any);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/api/products');

                const data = await response.json();

                setProductsNotFiltered(data)
                setProducts(data);
            }
        )();
    }, []);

    useEffect(() => {
        handleSearchChange(searchTerm)
    }, [searchTerm]);

    const handleSearchChange = (value: string) => {
        const filteredProducts = products.filter(product =>
            product.title.toLowerCase().includes(value.toLowerCase())
        );
        console.log(filteredProducts)
        console.log(value)
        setSearchTerm(value)
        setProducts(filteredProducts);

        if (value === "") {
            setProducts(productsNotFiltered)
        }
    };

    const del = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await fetch(`http://localhost:8000/api/products/${id}`, {
                method: 'DELETE'
            });

            setProducts(products.filter((p: Product) => p.id !== id));
            setRedirect(true);
        }

        if (redirect) {
            return <Navigate to={'/admin/products'}/>
        }
    }

    return (
        <Wrapper>
            <Nav handleSearchChange={handleSearchChange}/>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Link to='/admin/products/create' className="btn btn-sm btn-outline-secondary" style={{marginLeft: '20px'}}>Add</Link>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Likes</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(
                        (p: Product) => {
                            return (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td><img src={p.image} height="180" alt={p.title}/></td>
                                    <td>{p.title}</td>
                                    <td>{p.likes}</td>
                                    <td>
                                        <div className="btn-group mr-2">
                                            <Link to={`/admin/products/${p.id}/edit`}
                                                  className="btn btn-sm btn-outline-secondary">Edit</Link>
                                            <a href="/" className="btn btn-sm btn-outline-secondary"
                                               onClick={() => del(p.id)}
                                            >Delete</a>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </Wrapper>
    );
};

export default Products;
