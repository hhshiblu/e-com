import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../Redux/Action/category';

function Category() {
    const dispatch = useDispatch();
    const { category } = useSelector((state) => state.category);
  
    useEffect(() => {
      dispatch(getAllCategory());
    }, [dispatch]);

    const renderCategory=(categories)=>{

      let myCaregories=[];
      for( let cate of categories){
        myCaregories.push(
          <li className=' ' key={cate.name}>
            {cate.name}
            {cate.children.length>0? ( <ul>{renderCategory(cate.children)}</ul>):null }
          </li>
        )
      }
      return myCaregories;
    }

    console.log(category);
  return (

<div className="w-full flex justify-center pt-5">
      <div className="w-[97%] pl-12">
      <div className='flex justify-between items-center md:px-12 sm:px-2 mt-4'>
  <h1 className='font-semibold '> All Category</h1>
  <h1 className='font-semibold '>add Category</h1>

    </div>
    
    {
        category && <ul>
      
        {renderCategory(category)}
    
       </ul>
      }
      </div>
 
 
    </div>
  )
}

export default Category