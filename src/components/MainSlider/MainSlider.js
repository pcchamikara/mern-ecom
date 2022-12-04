import React, { useEffect, useState } from 'react';
import { Alert, Carousel, Image, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BACKEND_BASE } from '../../constants/backendConstants';
import { imageUrl } from '../../helpers/imageHelper';
import { topRated } from '../../slice/productSlice';
import Loader from '../Loader';
import Rating from '../Rating';
import './MainSlider.scss';

const excerpt = (str) => {
  if (str?.length > 100) {
    str = str.substring(0, 100) + '...';
  }
  return str;
};

export default function MainSlider() {
  const dispatch = useDispatch();
  const {
    topRatedProducts,
    mainSliderStatus: status,
    error,
  } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(topRated());
  }, [dispatch]);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  let content = '';
  if (status === 'loading') {
    content = <Loader />;
  } else if (status === 'faild') {
    content = <Alert variant="danger">{error}</Alert>;
  } else if (status === 'scceeded') {
    content = (
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        className="main-slider"
      >
        {Array.isArray(topRatedProducts) &&
          topRatedProducts.map((slide) => (
            <Carousel.Item key={slide._id}>
              <Row>
                <Col md={12} lg={6} className="left p-0 m-0">
                  <Image src={`${imageUrl(slide.image)}`} fluid />
                </Col>
                <Col md={12} lg={6} className="right">
                  <div className=" p-5  section">
                    <h2>
                      <Link to={`/product/${slide._id}`}>{slide.name}</Link>
                    </h2>
                    <p>{excerpt(slide.description)}</p>

                    <div className="rating">
                      <Rating
                        value={slide.totalRating}
                        text={`from ${slide.numOfReviews} ${
                          slide.numOfReviews > 1 ? 'reviews' : 'review'
                        }`}
                      />
                    </div>
                    <div className="mt-5">
                      <Button
                        as={Link}
                        to={`/product/${slide._id}`}
                        variant="warning"
                      >
                        see more
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Carousel.Item>
          ))}
      </Carousel>
    );
  }

  console.log(topRatedProducts);
  return <div style={{ position: 'relative' }}>{content}</div>;
}
