import React from 'react'

function Head() {
    return (
        <>
          <section className=  'hidden lg:block bg-blue-900 py-[2px] px-4 text-white'>
            <div className='container flex'>
              <div className='float-left flex items-center mx-16'>
                <i className='fa fa-phone mr-4'></i>
                <label className='mr-8 text-center text-sm'> +88012 3456 7894</label>
                <label className='mr-8 text-center text-sm'> supportcart@gmai.com</label>
                {/* <i className='fa fa-envelope'></i> */}
                {/* <span className='mr-8 text-center text-md'> support@ui-lib.com</span> */}
              </div>
              <div className='ml-auto flex items-center'>
                <label className='mr-8 text-center text-sm'> FAQ"s</label>
                <label className='mr-8 text-center text-sm'>Need Help?</label>
                <span ></span>
                <label className='mr-8 text-center text-sm'>BN</label>
                <span>🇧🇩</span>
                <label className='mr-8 text-center text-sm'>USD</label>
              </div>
            </div>
          </section>
        </>
      )
}

export default Head
