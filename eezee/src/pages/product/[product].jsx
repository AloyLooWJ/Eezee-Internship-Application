import { useRouter } from 'next/router'

const Product = () => {
  const router = useRouter()
  const {product} = router.query
  console.log(product)

  return <p>Product: {product}</p>
}

export default Product