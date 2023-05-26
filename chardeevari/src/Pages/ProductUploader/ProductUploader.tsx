import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Button, Form } from 'react-bootstrap';
import style from './product.module.scss';
import FormData from 'form-data';

interface ProductUploaderProps { }

const ProductUploader: React.FC<ProductUploaderProps> = () => {
    const [productData, setProductData] = useState({
        id: uuidv4(),
        productName: 'exmaple',
        productSku: '2345',
        productPrice: 20,
        discount: 10,
        category: 'Book',
        rating: 5,
        description: ';lgksdlfgdlfgjd;lfg flkgn sdfg',
        brand: 'Puma',
        inventoryCount: 100,
    });
    const [selectedFile, setSelectedFile] = useState<any>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        console.log(file);
        setSelectedFile(file);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(productData);

        const formData = new FormData();
        formData.append('productName', productData.productName);
        formData.append('id', productData.id);
        formData.append('productSku', productData.productSku);
        formData.append('productPrice', productData.productPrice.toString());
        formData.append('discount', productData.discount.toString());
        formData.append('category', productData.category);
        formData.append('rating', productData.rating.toString());
        formData.append('description', productData.description);
        formData.append('brand', productData.brand);
        formData.append('inventoryCount', productData.inventoryCount.toString());
        formData.append('image', selectedFile);


        try {
            const response = await axios.post('http://localhost:3001/api/products', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            // Reset form data
            setProductData({
                id: uuidv4(),
                productName: '',
                productSku: '',
                productPrice: 0,
                discount: 0,
                category: '',
                rating: 0,
                description: '',
                brand: '',
                inventoryCount: 0,
            });
            setSelectedFile(undefined);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className={style.productMain}>
            <div>
                <h2>Product Uploader</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="productName"
                            value={productData.productName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Product SKU</Form.Label>
                        <Form.Control
                            type="text"
                            name="productSku"
                            value={productData.productSku}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="productPrice"
                            value={productData.productPrice}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Discount</Form.Label>
                        <Form.Control
                            type="number"
                            name="discount"
                            value={productData.discount}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            name="category"
                            value={productData.category}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                            type="number"
                            name="rating"
                            value={productData.rating}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={productData.description}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                            type="text"
                            name="brand"
                            value={productData.brand}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Inventory Count</Form.Label>
                        <Form.Control
                            type="number"
                            name="inventoryCount"
                            value={productData.inventoryCount}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Images</Form.Label>
                        <Form.Control
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={handleImageChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Upload Product
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default ProductUploader;


