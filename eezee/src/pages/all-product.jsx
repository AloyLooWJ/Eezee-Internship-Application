import useSWR from 'swr';
import { useState } from 'react';
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function AllProduct(){
    const [selectedButton, setSelectedButton] = useState('relevance');
    const { data: products, error: productError } = useSWR('/api/product-data', fetcher);
    const [sortedProducts, setSortedProducts] = useState([]);
    function handleButtonClick(event) {
        setSelectedButton(event.target.value);
        switch (event.target.value) {
            case 'relevance':
                // Reset sorted products to default order
                setSortedProducts([]);
                break;
            case 'high-to-low':
                // Sorts products based on low price in descending order
                setSortedProducts([...products].sort((a, b) => b.lowPrice - a.lowPrice));
                break;
            case 'low-to-high':
                // Sorts products based on low price in ascending order
                setSortedProducts([...products].sort((a, b) => a.lowPrice - b.lowPrice));
                break;
            default:
                break;
        }
    }
    
    const displayedProducts = sortedProducts.length > 0 ? sortedProducts : products;
    if (productError) return <div>Failed to load</div>;
    if (!products) return <div>Loading...</div>;

    return (
    <div>
        <div className="col-container">
            <div className="col">
                <h1><b>Products</b></h1>
                <p>{displayedProducts.length} results</p>
            </div>
            <div className="col2">
                <h2>Page 1 of about {displayedProducts.length} results</h2>
                {/* Sort products buttons */}
                <div className="btn-group">
                    <button
                        className={selectedButton === 'relevance' ? 'selected' : ''}
                        value="relevance"
                        onClick={handleButtonClick}
                    >
                        Relavance
                    </button>
                    <button
                        className={selectedButton === 'high-to-low' ? 'selected' : ''}
                        value="high-to-low"
                        onClick={handleButtonClick}
                    >
                        Price: High to Low
                    </button>
                    <button
                        className={selectedButton === 'low-to-high' ? 'selected' : ''}
                        value="low-to-high"
                        onClick={handleButtonClick}
                    >
                        Price: Low to High
                    </button>
                </div>
                {/* Start of product catalog */}
                <div className='productCatalog'>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'left', textAlign: 'center' }}>
                        {displayedProducts.map(product => (
                        <a href={`/product/${product.id}`} key={product.id} className="product-card" style={{ width: '300px'}}>
                            <div style={{ position: 'relative' }}>
                            <center><img src={product.images[0].url} alt={product.title} style={{ width: '70%', height: 'auto'}} /></center>

                            {/* Product Tags */}
                            <span className='moq'>
                                <b>MOQ: {product.moq}</b>
                            </span>

                            {product.vipPriceFlag && 
                            <span className='vip'>
                                <b>VIP Price</b>
                            </span>}

                            {product.bulkDiscountFlag && 
                            <span className='bulk'>
                                <b>Bulk Discount</b>
                            </span>}

                            </div>
                            <p><s>{product.highPricePretty}</s></p>
                            <p>{product.lowPricePretty}</p>
                            <p>{product.title}</p>
                        </a>
                        ))}
                    </div>
                </div>
                {/* End of product catalog */}
            </div>
        </div>
        <style jsx>{`
            .col-container {
                display: flex;
                width: 100%;
                background: #E5E5E5;
                padding-top: 40px;
            }
            .col {
                flex: 0.5;
                padding: 16px;
                padding-left:90px;
            }
            .col2 {
                flex: 3;
                padding: 16px;
            }
            .productCatalog{
                padding-top:40px;
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
            .btn-group button {
                background-color: white;
                border: 1px solid grey;
                color: grey;
                padding: 5px 10px;
                cursor: pointer;
                float: left;
                font-size: 13px;
            }
            .btn-group button:not(:last-child) {
                border-right: none;
            }
            .btn-group:after {
                content: "";
                clear: both;
                display: table;
            }
            .btn-group button:hover {
                background-color: #919494;
                color: white;
            }
            .moq {
                position: absolute;
                bottom: 0px;
                left: 5px;
                z-index: 1;
                background-color: #EFEFF0;
                color: #242528;
                font-size: 13px;
                padding:2px;
                border: 1px solid #ccc;
              }
              .vip {
                position: absolute;
                bottom: 50px;
                left: 5px;
                z-index: 1;
                background-color: #DBE5FA;
                color: #1E4DAF;
                font-size: 13px;
                padding:2px;
                border: 1px solid #ccc;
              }
              .bulk {
                position: absolute;
                bottom: 25px;
                left: 5px;
                z-index: 1;
                background-color: #FFE69C;
                color: #6A5001;
                font-size: 13px;
                padding:2px;
                border: 1px solid #ccc;
              }
        `}</style>
    </div>
    )
}