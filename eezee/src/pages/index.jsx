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
        <div className='FeaturedBrands'>
          <b>Featured Brands</b>
          <h3>Browse the full catalog of brands today</h3>
          <table>
            <tbody>
              <tr>
                {brands.map((brand) => (
                  brand.featured && (
                    <td key={brand.id}>
                      <div style={{ display: 'inline-block' }}>
                        <img src={brand.image.url} alt={brand.name} style={{ maxWidth: '200px', maxHeight: '200px', width: 'auto', height: 'auto' }} />
                        <p>{brand.name}</p>
                        <p>{brand.productCount} Products</p>
                      </div>
                    </td>
                  )
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div >
          <b>Our Products</b>
          <h3>Trusted by the best companies in Asia</h3>
          <table>
            <tbody>
              {products.reduce((rows, product, idx) => {
                if (idx % 6 === 0) rows.push([]);
                rows[rows.length - 1].push(
                  <td key={product.id}>
                    <div style={{ display: 'inline-block' }}>
                      <img src={product.images[0].url} alt={product.title} style={{ width: '200px', height: '200px' }} />
                      <p>{product.title}</p>
                      <p>{product.highPrice}</p>
                    </div>
                  </td>
                );
                return rows;
              }, []).map(row => <tr>{row}</tr>)}
            </tbody>
          </table>
        </div>

      </div>
      <style jsx>{`
            .content {
              background-color: #E5E5E5;
              width: 100%;
            }
        `}</style>
    </div>
  )
}
