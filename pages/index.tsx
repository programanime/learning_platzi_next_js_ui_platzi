import React, { useState, useEffect } from 'react'
import Layout from '@components/Layout/Layout'
import KawaiiHeader from '@components/KawaiiHeader/KawaiiHeader'
import ProductList from '@components/ProductList/ProductList'
import fetch from "isomorphic-unfetch"

export const getServerSideProps = async () => {
// export const getStaticProps = async () => {
    console.log("getServerSideProps")
    debugger;
    const response  = await fetch("https://platzi-nextjs-dusky.vercel.app/api/avo")
    const {data} : TAPIAvoResponse = await response.json() 
    return {
        props:{
            productList : data
        }
    }
}

const HomePage = ({productList}:{productList:TProduct[]}) => {
  return (
    <Layout>
      <KawaiiHeader />
      <ProductList products={productList} />
    </Layout>
  )
}

export default HomePage
