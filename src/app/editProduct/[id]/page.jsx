"use client"
import React, { useEffect } from 'react'
import Product from '../../Components/Product/Product.jsx'
import { useDispatch, useSelector } from 'react-redux'
import Admin from '../../admin/page.jsx'
// import { Edit } from '@mui/icons-material'
import EditProduct from '../../Components/Product/EditProduct.jsx'
import { useParams, useRouter } from 'next/navigation.js'
import { getProductDetail } from '@/redux/action.js'

function page() {
  const dispatch= useDispatch()
  const router= useRouter()
  const param = useParams()
  const id = param.id
  useEffect(() => {
    dispatch(getProductDetail(id));
    if (!id){
      router.push('/product')
    }
    
  }, [id]);
  const admin = useSelector((state) => state.admin)
  const productId = useSelector((state) => state.details.product)||{}
  


// const [product, setProduct] = useState(null);


 


  return (
    <div >
    {admin.email ? (
      <EditProduct product={productId}/>
    )
     :<Admin />
    }
    </div>
  )
}

export default page