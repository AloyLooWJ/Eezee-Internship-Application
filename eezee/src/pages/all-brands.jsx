import Header from "@/components/header-bar";
import useSWR from 'swr';
import React from 'react';

export default function AllBrands(){
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data: brands, error: brandError } = useSWR('/api/brands-data', fetcher);
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    if (brandError) return <div>Failed to load</div>;
    if (!brands) return <div>Loading...</div>;
    return (<div>
    <Header/>
    <div className='content'>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {alphabet.map((letter) => {
          const letterBrands = brands.filter((brand) => brand.name[0] === letter);
          if (letterBrands.length === 0) {
            return null;
          }
          return (
            <div key={letter}>
              <h1><b>{letter.toUpperCase()}</b></h1>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: '20px' }}>
                {letterBrands.map((brand) => (
                  <div key={brand.id} className="brand-card">
                    <img
                      src={brand.image ? brand.image.url : "https://via.placeholder.com/200"}
                      alt={brand.name}
                      style={{ maxWidth: "150px", maxHeight: "150px", width: "auto", height: "auto" }}
                    />
                    <div className="brand-details">
                      <h3>{brand.name}</h3>
                      <p>{brand.productCount ? brand.productCount : "?"} Products</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
    <style jsx>{`
            .content {
              background-color: #E5E5E5;
              width: 100%;
              padding-left:90px;
            }
            h1 {
              font-size: 20px;
            }
            .brand-card {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin-right: 20px;
              margin-bottom: 20px;
              width: 200px;
              background: white;
              height: 200px;
            }
            .brand-card img {
              width: 100%;
              height: 200px;
              object-fit: cover;
              object-position: center;
              padding-top: 50px;
            }
            
            .brand-details {
              padding: 10px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              text-align: center;
              height: 100%;
            }
            
        `}</style>
    </div>
    )
}