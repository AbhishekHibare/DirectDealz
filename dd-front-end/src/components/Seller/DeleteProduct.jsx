import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material';
import Cookies from 'js-cookie';

const DeleteProduct = () => {
  const nav = useNavigate();
  const { productId } = useParams();

  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    productStatus: '',
    productcity: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/api/GetProductById`, {
          headers: {
            token: Cookies.get('token'),
            productId: productId,
          },
        });
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8090/api/products/DeleteProductById`, {
        headers: {
          token: Cookies.get('token'),
          productId : productId
        },
      });
      toast.success('Product deleted successfully!');
      setTimeout(() => {
        nav('/Seller/AllProducts');
      }, 2000);

    } catch (error) {
      console.error('Error Deleting product:', error);
    }
    finally {
      setLoading(false);
    }
  };

  const confirmDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      handleDelete();
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Delete Product</h1>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div>
      {/* <p> <img src={product.imageURL} alt="" srcset="" /></p> */}
        <p>Product Title: {product.title}</p>
        <p>Description: {product.description}</p>
        <p>Price: {product.price}</p>
        <p>Status: {product.productStatus}</p>
        <p>City: {product.productcity}</p>
      </div>
      <button 
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={confirmDelete}
      >
        Delete Product
      </button>
      {loading && (
        <div className="flex justify-center my-4">
          <CircularProgress size={60} />
        </div>
      )}
    </div>
  );
};

export default DeleteProduct;