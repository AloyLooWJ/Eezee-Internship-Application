import Link from 'next/link';

const Header = () => {
  return (
    <div>
        <div className='topBar'>
        <img className ='barImg' src="https://storage.googleapis.com/eezee-storage/flags/SG.png"></img>
        Singapore
        <img className ='barImg' src="https://storage.googleapis.com/imgez/icons/phone-icon-grey-secondary.svg"></img>
        +65 6797 9688
        </div>
        <div style={{'display': 'flex', 'justifyContent': 'space-between', 'alignItems': 'center', 'borderBottomWidth': '2px'}}>
            <div style={{'display': 'flex', 'alignItems': 'center'}}>
            <Link href='/'>
                <img className='icon' src='https://storage.googleapis.com/imgez/eezee-logos/logo-on-white-nopadding.svg' alt='Eezee logo' />
            </Link>
            <Link style={{'paddingLeft': '5%', 'color': 'blue', 'fontSize': '12px'}} href='/all-brands'>
                View All Brands
            </Link>
            </div>
            <div style={{'display': 'flex', 'alignItems': 'center'}}>
            <Link href='/shopping-cart'>
                <img className='cartIcon' src='https://storage.googleapis.com/imgez/icons/cart-icon.svg' alt='Shopping cart icon' />
            </Link>
            <span style={{'paddingLeft': '10px'}}>0 items</span>
            </div>
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
        `}</style>
    </div>
  );
};

export default Header;