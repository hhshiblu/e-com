import React from 'react'
import { Link } from 'react-router-dom';
import { backend_URL } from '../../../serverUrl';

function JustCateImageCard({p}) {
  return (
    <div className="min-w-[210px] pb-4   max-w[211px] ">
      <Link to={`${`/product/${p._id}`} `}>
        <div className=" p-2 h-[200px] w-[210px] rounded-md">
          <img
            src={`${backend_URL}upload/${p && p.images[0]}`}
            alt={p?.name}
            className="w-[100%] h-[100%] mx-auto"
          />
        </div>
      </Link>
     
    </div>
  );
}

export default JustCateImageCard