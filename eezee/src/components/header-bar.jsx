import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from './cart-context';

const Header = () => {
    const { cartData } = useContext(CartContext);
    // Keep track of quantity of items in the cart
    const totalQuantity = cartData.reduce((total, item) => total + item.quantity, 0);
    // Keep track of total price of items in the cart
    const totalPrice = cartData.reduce((total, item) => total + Number(item.totalPrice), 0);   
    const { updateCartData  } = useContext(CartContext);
    
    // Function to remove specific item from cart
    const removeItemFromCart = (index) => {
      const updatedCartData = [...cartData];
      updatedCartData.splice(index, 1);
      updateCartData(updatedCartData);
    };
      
  return (
    <div>
        {/* Start of top nav bar */}
        <div className='topBar'>
        <img className ='barImg' src="https://storage.googleapis.com/eezee-storage/flags/SG.png"></img>
        Singapore
        <img className ='barImg' src="https://storage.googleapis.com/imgez/icons/phone-icon-grey-secondary.svg"></img>
        +65 6797 9688
        </div>
        {/* End of top nav bar */}

        {/* Start of 2nd top nav bar */}
        <div style={{'display': 'flex', 'justifyContent': 'space-between', 'alignItems': 'center', 'borderBottomWidth': '2px'}}>
            <div style={{'flexDirection': 'column', 'justifyContent': 'space-between', 'alignItems': 'center', 'height': '100px', 'padding-left':'80px'}}>
                <div style={{'display': 'flex', 'alignItems': 'center'}}>
                    <Link href='/'>
                        <img className='icon' src='https://storage.googleapis.com/imgez/eezee-logos/logo-on-white-nopadding.svg' alt='Eezee logo' />
                    </Link>
                </div>
                <div style={{'display': 'flex', 'alignItems': 'center'}}>
                    <Link style={{'color': 'blue', 'fontSize': '12px', 'textAlign': 'center', 'padding-left': '5%', 'padding-top':'5%'}} href='/all-brands'>
                        View All Brands
                    </Link>
                </div>
            </div>
            
            {/* Start of shopping cart */}
            <div style={{'display': 'flex', 'alignItems': 'center', 'padding-right':'80px'}}>
                <div className="dropdown">
                    <button className="dropbtn">
                        <img className='cartIcon' src='https://storage.googleapis.com/imgez/icons/cart-icon.svg' alt='Shopping cart icon' />
                        <span className="cartCount">{cartData ? totalQuantity : 0}</span>
                    </button>
                    <div className="dropdown-content">
                        {cartData && cartData.length > 0 ? (
                        <ul>
                          <li>
                              <button className='clearCart' onClick={() => updateCartData([])}><u>Clear Cart</u></button>
                          </li>
                          <div className='itemSegment'>
                          {cartData.map((item, index) => (
                          <li className='cartItem' key={index}>
                              <img className="itemImg" src={item.productImg} />
                              <div className="itemDetails">
                              <div className="productName">{item.product}</div>
                              <div className="price">
                                  {item.quantity} x {parseFloat(item.unitPrice).toFixed(2)} = {item.totalPrice}
                              </div>
                              <button onClick={() => removeItemFromCart(index)}><img className="removeBtn" src="https://cdn-icons-png.flaticon.com/512/401/401036.png" alt="Remove item"/></button>
                              </div>
                          </li>
                          ))}
                          </div>
                          <li className='totalPrice'>
                              Total Price: ${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </li>
                          <div><center><button className='checkOut'>Checkout</button></center></div>
                        </ul>
                        ) : (
                        <center><p>Your shopping cart is empty.</p></center>
                        )}
                    </div>
                </div>
            </div>
            {/* End of shopping cart */}
          {/* End of 2nd top nav bar */}
        </div>

        <style jsx>{`
            .barImg {
                height: 15px;
                width: 30px;
                padding-right:5px;
                padding-left:5px;
            }
            .topBar {
                display: flex;
                justify-content: left;
                background: #EFEFF0;
                height: 38px;
                padding-left: 5%;
                align-items: center;
            }
            .icon {
                padding-top: 15px;
                padding-left: 5%;
                height: 50%;
                width: 50%;
            }
            .dropdown {
                position: relative;
                display: inline-block;
              }
              .dropbtn {
                color: black;
                padding: 10px;
                font-size: 16px;
                border: none;
                cursor: pointer;
              }
              .dropdown-content {
                display: none;
                position: absolute;
                z-index: 1;
                top: 40px;
                right: 0;
                background-color: #f9f9f9;
                min-width: 160px;
                box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                padding: 12px 16px;
                width:450px;
              }
              .dropdown:hover .dropdown-content {
                display: block;
                border: 1px solid #ccc;
              }
              .item-count {
                font-weight: bold;
              }
              .cartIcon {
                position: relative;
              }
              .cartCount {
                position: absolute;
                top: 1px;
                right: 2px;
                width: 20px;
                height: 20px;
                background-color: #2A64DB;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                font-size: 12px;
                font-weight: bold;
              }
              li {
                display: flex;
                align-items: center;
              }
              .itemImg {
                max-height:100px;
                max-width:100px;
                margin-right: 20px;
              }
              .itemDetails {
                display: flex;
                flex-direction: column;
              }
              
              .productName {
                font-weight: bold;
              }
              
              .price {
                font-size: 14px;
                color: #666;
              }
              .totalPrice {
                float: right;
                font-size:20px;
                color: #2A64DB;
                border-bottom: 1px solid #2A64DB;
              }
              .clearCart{
                color: red;
                margin-left: 340px;
                margin-bottom: 10px;
              }
              .cartItem{
                border: 1px solid #ccc;
                margin-bottom:10px;
              }
              .itemSegment{
                max-height: 300px;
                overflow-y: auto;
                border: 1px solid #ccc;
                padding:10px;
              }
              .itemSegment::-webkit-scrollbar {
                width: 0;
                background-color: transparent;
              }
              .removeBtn{
                height:20px;
                width:20px;
                display: inline-block; 
                float: right; 
                margin-right: 10px;
                border: 1px solid red;
              }
              .checkOut {
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
        `}</style>
    </div>
  );
};

export default Header;