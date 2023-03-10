import React, {SyntheticEvent, useState} from 'react';
import Wrapper                           from "./Wrapper";
import {Navigate}                        from 'react-router-dom';
import Nav                               from "./components/Nav";

const ProductsCreate = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        console.log(e)

        const res = await fetch('http://localhost:8000/api/products', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title,
                image
            })
        });

        console.log(res)

        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to={'/admin/products'}/>
    }

    return (
        <Wrapper>
            <Nav />
            <form onSubmit={submit} style={{margin: '50px'}}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" name="title"
                           onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input type="text" className="form-control" name="image"
                           onChange={e => setImage(e.target.value)}
                    />
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default ProductsCreate;
