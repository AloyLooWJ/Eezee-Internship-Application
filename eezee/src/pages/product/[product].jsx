import Header from "@/components/header-bar";
import QuantityCounter from "@/components/quantity-counter";
import { useRouter } from 'next/router'
import useSWR from 'swr';
import { Slide, Indicators } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Product(){
  const router = useRouter()
  const {product} = router.query
  const { data: products, error: productError } = useSWR('/api/product-data', fetcher);
  
  if (productError) return <div>Failed to load</div>;
  if (!products) return <div>Loading...</div>;
  
  const productData = products.find(p => p.id === product);
  console.log(productData);

  return (
    <div>
      <Header></Header>
      <div className="content">
        {productData && (
          <div className="cards-wrapper">
            <div className="card">
              <p className="productTitle"><b>{productData.title}</b></p>
              <div className="product-info">
                <div className="brand-img-container">
                  <img className="brandImg" src={productData.metadata.brandImage} alt={`Brand Image`} />
                </div>
                <div className="product-details">
                  <p>Model: {productData.metadata.model}</p>
                  <p>Brand: {productData.metadata.brand}</p>
                </div>
              </div>
              <div>
              {productData.images.length === 1 ? (
                <img src={productData.images[0].url} alt={`Product Image 0`} />
              ) : (
                <Slide duration={100000}>
                  {productData.images.map((image, index) => (
                    <div className="each-slide" key={`slide-${index}`}>
                      <img src={image.url} alt={`Product Image ${index}`} />
                    </div>
                  ))}
                </Slide>
              )}

              </div>
              <p className="productDescription"><b>Product Description:</b></p>
              <span dangerouslySetInnerHTML={{__html: productData.descriptionHtml}}></span>
            </div>
            <div className="card2">
                <div className="productPrice"><b>{productData.lowPricePretty}</b></div>
                {/* <li>VIP Price: {productData.vipPriceFlag ? 'Yes' : 'No'}</li>
                <li>Bulk Discount: {productData.bulkDiscountFlag ? 'Yes' : 'No'}</li>
                <li>MOQ: {productData.moq}</li>
                <li>High Price: {productData.highPricePretty}</li> */}
                <div>Quantity:</div>
                <QuantityCounter/>
                <button className="add-to-cart-btn">Add to Cart</button>
                <button className="add-to-favourites-btn">Add to Favourites</button>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
            .content {
              background: #E5E5E5;
              width: 100%;
              padding-top:30px;
            }
            .cards-wrapper {
              display: flex;
              justify-content: space-between;
              margin: 0 230px;
            }
            .card {
              background: white;
              height: auto;
              width: 800px;
              padding: 30px;
              margin-left:120px;
              border: 1px solid #ccc;
              border-radius: 5px;
              margin-bottom: 30px;
            }
            .card2 {
              background: white;
              height: 270px;
              width: 439px;
              padding: 30px;
              border: 1px solid #ccc;
              border-radius: 5px;
            }
            .productTitle {
              font-size: 24px;
            }
            .brandImg {
              max-height: 120px;
              max-width: 120px;
              padding-bottom: 20px;
              padding-top: 5px;
            }
            .product-info {
              display: grid;
              grid-template-columns: auto 1fr;
              grid-gap: 1rem;
            }
            .brand-img-container {
              width: 100%;
            }
            .productDescription {
              font-size: 20px;
              padding-top: 20px;
              padding-bottom: 10px;
            }
            .productImg {
              border-top: 1px solid #ccc;
              border-bottom: 1px solid #ccc;
            }
            .productPrice {
              font-size:30px;
              color: #2A64DB;
              border-bottom: 1px solid #ccc;
              border-style: dashed;
            }
            .add-to-cart-btn {
              background-color: #2A64DB;
              width: 391px;
              color: white;
              border: none;
              padding: 10px 20px;
              font-size: 16px;
              cursor: pointer;
              border: 1px solid #ccc;
              margin-top: 10px;
              margin-bottom: 10px;
            }
            .add-to-favourites-btn {
              background-color: white;
              width: 391px;
              color: #2A64DB;
              border: none;
              padding: 10px 20px;
              font-size: 16px;
              cursor: pointer;
              border: 1px solid #ccc;
            }
            .each-slide > img {
              display: block;
              width: 100%;
              height: auto;
            }

            .react-slideshow-container {
              width: 100%;
              max-width: 500px;
              position: relative;
              margin: auto;
            }

            .react-slideshow-slide {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
            }

            .react-slideshow-slide > div {
              padding: 20px;
              background-color: #f5f5f5;
              border-radius: 5px;
              box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
            }

            .react-slideshow-slide > div > h3 {
              margin: 0 0 10px;
              font-size: 20px;
            }

            .react-slideshow-pagination {
              display: flex;
              justify-content: center;
              margin-top: 20px;
            }

            .react-slideshow-pagination > div {
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background-color: #bbb;
              margin: 0 10px;
              cursor: pointer;
              transition: background-color 0.3s ease-in-out;
            }

            .react-slideshow-pagination > div.active {
              background-color: #0052cc;
            }
        `}</style>
    </div>
  )
}
