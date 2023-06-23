import React from 'react'
import { Link } from 'react-router-dom'
function Head() {
    return (
        <>
          <section className=  'hidden md:block bg-[#041C32] py-[2px] px-4 text-white'>
            <div className='container flex'>
              <div className='float-left flex items-center mx-16'>
                <i className='fa fa-phone mr-4'></i>
                <label className='mr-8 text-center text-sm'> CUSTOMER CARE </label>
                <label className='mr-8 text-center text-sm'>h</label>
                {/* <i className='fa fa-envelope'></i> */}
                {/* <span className='mr-8 text-center text-md'> support@ui-lib.com</span> */}
              </div>
              <div className='ml-auto flex items-center'>
                <Link to="faq"><label className='mr-8 text-center text-sm'> FAQ"s</label></Link>
                
                <label className='mr-8 text-center text-sm'>Need Help?</label>
                <span ></span>
                {/* <label className='mr-8 text-center text-sm'>BN</label> */}
                {/* <span>🇧🇩</span> */}
                {/* <label className='mr-8 text-center text-sm'>USD</label> */}
              </div>
            </div>
          </section>
        </>
      )
}

export default Head
