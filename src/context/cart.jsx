import { createContext, useReducer } from "react";


//1. Crear context
export const CartContext = createContext();

// Modificar el state inicial para guardar el del localstorage, osea, lo que hay en el carrito
const initialState  =JSON.parse(window.localStorage.getItem('cart')) || [];

export const updateLocalStorage = state => {
  window.localStorage.setItem('cart', JSON.stringify(state))
}

const reducer = (state, action)=>{
  const {type: actionType, payload: actionPayLoad}= action;

  switch (actionType){
    case 'ADD_TO_CART': {
      const {id} =actionPayLoad;
      //VERIFICAR SI PRODUCTO ESTA EN CARRITO
      const productInCartIndex = state.findIndex((item) => item.id === id);

      // Si sí esta el prod en el carrito
      if (productInCartIndex >= 0) {
        const newState = structuredClone(state);

        newState[productInCartIndex].quantity += 1;
        updateLocalStorage(newState);
        return newState;
      }

      //si el prod no esta en el carrito
      return[
        ...state,
        {
          ...actionPayLoad,
          quantity:1
        }
      ]
    }
    case 'REMOVE_FROM_CART': {
      const {id} = actionPayLoad;
      const newState = state.filter(item => item.id  != id);
      updateLocalStorage(newState);
      return newState;
    }
    case 'CLEAR_CART': {
      const newState = [];
      updateLocalStorage(newState);
      return newState;

    }

  }
  return state;
}




//2. Creamos el proveedor
export function CartProvider({ children }) {

  const [state, dispatch] = useReducer(reducer, initialState);

  // //3. Para añadir al carrito
  // const addToCart = (product) => {
  //   const productInCartIndex = cart.findIndex((item) => item.id === product.id);

  //   // Si sí esta el prod en el carrito
  //   if (productInCartIndex >= 0) {
  //     const newCart = structuredClone(cart);

  //     newCart[productInCartIndex].quantity += 1;
  //     return setCart(newCart);
  //   }

  //   setCart((prevState) => [
  //     ...prevState,
  //     {
  //       ...product,
  //       quantity: 1,
  //     },
  //   ]);
  // };

  // const removeFromCart = product => {
  //   setCart(prevState => prevState.filter(item => item.id != product.id))
  // }
  // const clearCart = () => {
  //   setCart([]); //Para limpiar el carrito, le pasamos un arreglo vacio
  // };

  const addToCart = product => dispatch({
    type: 'ADD_TO_CART',
    payload: product
  })
  const removeFromCart = product => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product
  })
  const clearCart = () => dispatch ({type: 'CLEAR_CART'})
  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
