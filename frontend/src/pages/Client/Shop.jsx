import React from 'react'
import { PRODUCTS } from './Produc'
import { Product } from './MindRelaxShop'
import "../../styles/Client/Shop.css"





export const Shop = () => {
  return (
    <>
    <div className='smooth-scroll'>
    <div className='shop'>
      <div className='shopTitle'>
        <h2>Happy <span style={{color:"orange"}}>tails shop</span></h2>
      </div>
      <div className='products'>
        {PRODUCTS.map((product) => (
          <Product data={product} />))}
      </div>
    </div>
    </div></>
  )
}
