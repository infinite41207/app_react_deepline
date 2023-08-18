import Nav from '../nav/Nav';
import './notfound404.css';
import { Outlet, Link } from 'react-router-dom';

import Icon404 from '../../assets/images/errorscreens/404.svg';
import Gobackarrow from '../../assets/images/errorscreens/goback-arrow.svg';

const Notfound404 = () => {
  return (
    <div className='error-section'>
        <div className='container-fluid p-0'>
            <Nav transparent={true}/>
        </div>
        <div className='container text-center page-404-container'>
            <div>
                <img src={Icon404} alt="" className='my-5 img-fluid' />
                <div className='mt-5 flash-text'>
                    Oooops! <span style={{fontWeight: '300'}}>There is nothing found</span> 
                </div>
                <div className='d-flex justify-content-center gap-4 mt-5 flex-wrap'>
                    <Link className='btn border border-0 links text-nowrap' to="/">
                        <img src={Gobackarrow} alt="" height="18" className='me-2'/>
                        Go Back To Homepage
                    </Link>
                    <Link className='btn border border-0 links' to="#">Contact Us</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Notfound404