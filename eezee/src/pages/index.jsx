import Header from '../components/header-bar';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data: brands, error: brandError } = useSWR('/api/brands-data', fetcher);
  const { data: products, error: productError } = useSWR('/api/product-data', fetcher);
  if (brandError||productError) return <div>Failed to load</div>;
  if (!brands||!products) return <div>Loading...</div>;
  return (
    <div>
      <Header />
      <div className='content'>
        <img style={{'display': 'block','margin-left': 'auto','margin-right': 'auto', 'padding-top': '30px'}} src="https://api.eezee.sg/image/resize?height=385&width=984&url=https://storage.googleapis.com/eezee-banner-images/4lIFLboZl0EEIGm1t3W25m.jpg&resizeStrategy=cover"></img>
        
        {/* Start of featured Brands catalog */}
        <div className='FeaturedBrands'>
          <div className='BrandsList'>
            <b>Featured Brands</b>
            <h3>Browse the full catalog of brands today
              <div className='ViewMore'>
                <a href='/all-brands'>View More &gt;</a>
              </div>
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'left', textAlign: 'center' }}>
              {brands.map((brand) => (
                brand.featured && (
                  <div key={brand.id} className="brand-card">
                    <div className="card-content">
                      <img src={brand.image.url} alt={brand.name} />
                      <div className="brand-details">
                        <p><b>{brand.name}</b></p>
                        <p>{brand.productCount ? `${brand.productCount} Products` : 'Unknown'}</p>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>

        {/* Start of product catalog */}
        <div className='productCatalog'>
          <b>Our Products</b>
          <h3>Trusted by the best companies in Asia
            <div className='ViewMore'>
              <a href='/all-product'>View More &gt;</a>
            </div>
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'left', textAlign: 'center' }}>
            {products.map(product => (
              <a href={`/product/${product.id}`} key={product.id} className="product-card" style={{ width: '300px'}}>
                <div style={{ position: 'relative' }}>
                  <center><img src={product.images[0].url} alt={product.title} style={{ width: '70%', height: 'auto'}} /></center>
                  <span style={{ position: 'absolute', bottom: '5px', left: '5px', zIndex: '1', backgroundColor: '#EFEFF0', color:'#242528' }}><b>MOQ: {product.moq}</b></span>
                  {product.vipPriceFlag && <span style={{ position: 'absolute', bottom: '55px', left: '5px', zIndex: '1', backgroundColor: '#DBE5FA', color:'#1E4DAF' }}><b>VIP Price</b></span>}
                  {product.bulkDiscountFlag && <span style={{ position: 'absolute', bottom: '30px', left: '5px', zIndex: '1', backgroundColor: '#FFE69C', color:'#6A5001' }}><b>Bulk Discount</b></span>}
                </div>
                <p><s>{product.highPricePretty}</s></p>
                <p>{product.lowPricePretty}</p>
                <p>{product.title}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
            .content {
              background-color: #E5E5E5;
              width: 100%;
            }
            .FeaturedBrands {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-left:80px;
              padding-top:40px;
            }
            h3 {
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 90vw;
              padding-right:160px;
              padding-bottom:20px;
            }
            .brand-card {
              width: 200px;
              height: 250px;
              margin-right: 10px;
              margin-bottom: 10px;
              padding: 10px;
              border: 1px solid #ccc;
              border-radius: 5px;
              background: white;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            
            .brand-card .card-content {
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              height: 100%;
            }
            
            .brand-card img {
              max-width: 100%;
              max-height: 100%;
              object-fit: contain;
              margin-bottom: 10px;
            }
            
            .brand-card .brand-details {
              text-align: center;
            }
            
            .ViewMore {
              margin-left: 10px;
            }
            .ViewMore a {
              font-size: 14px;
              color: blue;
            }
            .productCatalog{
              padding-left:80px;
              padding-top:40px;
              padding-bottom: 10px;
            }
            .product-card {
              width: 200px;
              height: 330px;
              margin-right: 10px;
              margin-bottom: 10px;
              padding: 10px;
              border: 1px solid #ccc;
              border-radius: 5px;
              text-align: left;
              position: relative;
              display: inline-block;
              background: white;
            }
        `}</style>
    </div>
  )
}
