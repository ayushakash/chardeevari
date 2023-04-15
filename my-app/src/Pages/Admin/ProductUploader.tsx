import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Button, Form } from 'react-bootstrap';
import style from './product.module.scss'

interface ProductUploaderProps { }

const ProductUploader: React.FC<ProductUploaderProps> = () => {
    const [productData, setProductData] = useState({
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
    const [selectedFile, setSelectedFile] = useState<any>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', selectedFile!);
        formData.append('upload_preset', 'your-cloudinary-upload-preset-here');

        try {
            // Upload image to Cloudinary
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/your-cloudinary-cloud-name-here/image/upload',
                formData
            );
            const imageURL = response.data.secure_url;

            // Add image URL to product data
            setProductData((prevData) => ({ ...prevData, images: imageURL }));

            // Post product data to server
            await axios.post('/api/products', productData);

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
    );
};

export default ProductUploader;


