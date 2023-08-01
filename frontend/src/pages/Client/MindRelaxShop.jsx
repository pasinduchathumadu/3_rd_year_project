import React from 'react'

export const Product=(props) => {
    const {id,productName,productImages,price} = props.data;


        return <div className='product'>
                    <img src={productImages}/>
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

