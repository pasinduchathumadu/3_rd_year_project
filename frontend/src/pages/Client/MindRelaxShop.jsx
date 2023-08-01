import React from 'react'

export const Product=(props) => {
    const {id,productName,productImages,price} = props.data;


        return <div className='product'>
                    <img src={productImages} style={{width:"40vh",height:"40vh"}}/>
                    <div className='description'>
                        <p>
                            <b>{productName}</b>
                        </p>
                        <p>
                            ${price}
                        </p>
                        <button className='addToCartBttn'>Add to cart</button>
                    </div>


              </div> ;
            
 }

