import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import fetch from "isomorphic-unfetch"
import Layout from '@components/Layout/Layout'
import ProductSummary from '@components/ProductSummary/ProductSummary'

export const getStaticPaths = async () => {
    return {
        paths:[
            {
                params:{id:"test"}
            },
            {
                params:{id:"test2"}
                
            }
        ],
        fallback:false
    }
}

export const getStaticProps = async () => {
    const response  = await fetch("https://platzi-nextjs-dusky.vercel.app/api/avo")
    // const response  = await fetch("/api/avo")
    //const response  = await fetch("api/avo")
    const {data} : TAPIAvoResponse = await response.json() 
    
    return {
        props:{
            productList : data
        }
    }
}


const ProductPage = () => {
  const { query } = useRouter()
  const [product, setProduct] = useState<TProduct | null>(null)

  useEffect(() => {
    if (query.id) {
        fetch(`/api/avo/${query.id}`)
        .then((response) => response.json())
        .then((data: TProduct) => {
          setProduct(data)
        })
    }
  }, [query.id])

  return (
    <Layout>
      {product == null ? null : <ProductSummary product={product} />}
    </Layout>
  )
}

export default ProductPage
