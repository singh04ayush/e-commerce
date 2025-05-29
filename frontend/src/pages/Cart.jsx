import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate, token } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              platform: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData);
    }

  }, [cartItems,products])

  return (
    <div className='border-t pt-14'>

      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.length > 0 ? (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);

            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.platform}</p>
                    </div>
                  </div>
                </div>
                <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.platform, Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} />
                <img onClick={() => updateQuantity(item._id, item.platform, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" />
              </div>
            )
          })
        ) : (
          <div className="py-20 flex flex-col items-center justify-center border-t border-b">
            <img src={assets.cart_icon} className="w-16 h-16 opacity-30 mb-4" alt="Empty cart" />
            <h2 className="text-2xl font-medium text-gray-700 mb-2">Your Cart is Empty</h2>
            <p className="text-gray-500 mb-6">Add some games to your cart and come back!</p>
            <button 
              onClick={() => navigate('/collection')} 
              className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              BROWSE GAMES
            </button>
          </div>
        )}
      </div>

      {cartData.length > 0 && (
        <div className='flex justify-end my-20'>
          <div className='w-full sm:w-[450px]'>
            <CartTotal />
            <div className='w-full text-end'>
              {token ? (
                <button 
                  onClick={() => navigate('/place-order')} 
                  className='bg-black text-white text-sm my-8 px-8 py-3 cursor-pointer'
                >
                  PROCEED TO CHECKOUT
                </button>
              ) : (
                <div className="flex flex-col items-end">
                  <button 
                    onClick={() => navigate('/login')} 
                    className='bg-black text-white text-sm mt-6 px-8 py-3 cursor-pointer'
                  >
                    SIGN IN TO CHECKOUT
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Cart