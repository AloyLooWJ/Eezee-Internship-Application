import useSWR from 'swr';
import React from 'react';

export default function AllBrands(){
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data: brands, error: brandError } = useSWR('/api/brands-data', fetcher);
    // Array to contain all alphabets for reference when sorting brand names
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    if (brandError) return <div>Failed to load</div>;
    if (!brands) return <div>Loading...</div>;
    return (
    <div>
    <div className='content'>
    {/* Start of all brands display */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {alphabet.map((letter) => {
          // Compares the first letter of brand name to alphabet
          const letterBrands = brands.filter((brand) => brand.name[0] === letter);
          // If brand starting with letter doesnt exist, skip to next letter in alphabet array
          if (letterBrands.length === 0) {
            return null;
          }
          return (
            <div key={letter}>
              {/* Letter Header */}
              <h1><b>{letter.toUpperCase()}</b></h1>
              {/* Map brands to letter */}
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
      {/* End of all brands display */}
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