/* upooad */
import axios from 'axios';

/* upooad */

import React, { useEffect, useState } from 'react';
import {
  FormGroup,
  Form,
  FormLabel,
  FormControl,
  Button,
  Alert,
  Row,
  Col,
  Container,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../components/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUserById } from '../../slice/userSlice';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  addProduct,
  editProduct,
  fetchProductbyId,
} from '../../slice/productSlice';
import { BACKEND_BASE } from '../../constants/backendConstants';
import DashboardWrapper from '../../components/DashboardWrapper';

export default function ProductAddEdit() {
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const { product, status, error } = useSelector((state) => state.product);
  const { userInfo } = useSelector((state) => state.user);
  const token = userInfo.token;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, seCategory] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [brand, setBrand] = useState('');

  const navigate = useNavigate();
  const productData = {
    name,
    price,
    category,
    image,
    description,
    brand,
    countInStock,
  };
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      dispatch(fetchProductbyId({ id, token }));
      navigate();
      //setName(editUser.name ? editUser.name : '');
    }
  }, [id]);
  useEffect(() => {
    if (id) {
      setName(product.name ? product.name : '');
      setPrice(product.price ? product.price : '');
      seCategory(product.category ? product.category : '');
      setImage(product.image ? product.image : '');
      setDescription(product.description ? product.description : '');

      setCountInStock(product.countInStock ? product.countInStock : '');
      setBrand(product.brand ? product.brand : '');
    }
  }, [product, id]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (id) {
      dispatch(
        editProduct({ productData, token, productId: id, toast, navigate })
      );
    } else {
      // alert();
      dispatch(addProduct({ productData, token, toast, navigate }));
    }
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading('true');
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post(
        `${BACKEND_BASE}/uploads/`,
        formData,
        config
      );

      setImage(data);
      setUploading(false);
    } catch (err) {
      console.log('err', err);
    }
  };
  return (
    <DashboardWrapper className="mb-5">
      <Link to="/admin/product-list" className="btn btn-light my-3">
        Go back
      </Link>

      {status === 'loading' ? (
        <Loader />
      ) : status === 'faild' ? (
        <Alert varient="danger">{error} </Alert>
      ) : (
        <FormContainer>
          <Col>
            <h3 className="text-center">
              {id ? product.name : 'Add new product'}
            </h3>
            <Form onSubmit={submitHandler}>
              <FormGroup>
                <FormLabel> Name</FormLabel>
                <FormControl
                  type="text"
                  name="image"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel> Category</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Name"
                  value={category}
                  onChange={(e) => seCategory(e.target.value)}
                ></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel> Description</FormLabel>
                {description}
                <FormControl
                  as="textarea"
                  placeholder="Enter Discription"
                  rows={10}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel> Image</FormLabel>
                <Form.Control
                  type="file"
                  size="sm"
                  onChange={uploadFileHandler}
                />
                {uploading && <Loader />}
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col>
                    <FormLabel> Price</FormLabel>
                    <FormControl
                      type="text"
                      placeholder="Enter Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormLabel> Count In Stock</FormLabel>
                    <FormControl
                      type="text"
                      placeholder="Enter Name"
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    ></FormControl>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <FormLabel> Brand</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></FormControl>
              </FormGroup>

              <Button type="submit" variant="primary" className="mt-3">
                {id ? 'Update Product' : 'Add Product'}
              </Button>
            </Form>
          </Col>
        </FormContainer>
      )}
    </DashboardWrapper>
  );
}
