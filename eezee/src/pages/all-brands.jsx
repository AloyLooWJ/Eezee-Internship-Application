import Header from "@/components/header-bar";
import useSWR from 'swr';

export default function AllBrands(){
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data: brands, error: brandError } = useSWR('/api/brands-data', fetcher);
    if (brandError) return <div>Failed to load</div>;
    if (!brands) return <div>Loading...</div>;
    return (<div>
    <Header></Header>
    <div className='content'>
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
    <style jsx>{`
            .content {
              background-color: #E5E5E5;
              width: 100%;
            }
        `}</style>
    </div>
    )
}