
import { useEffect, useMemo, useState } from "react";
import { CartItem, Productos } from "../types";


export const useCart = () => {
    const inicialCart = (): CartItem[] => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    }
    const [cart, setCart] = useState(inicialCart);
    const maxProductos = 35;
    const minProductos = 1

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])


    function addToCart(item: Productos) {
        const itemExists = cart.findIndex(searchProduct => searchProduct.prod_id === item.prod_id);

        if (itemExists == -1) {
            const newItem: CartItem = { ...item, cantidad: 1 }
            setCart([...cart, newItem])

            console.log(`Agregando item ${item.prod_descripcion}`)
        } else {
            if (cart[itemExists].cantidad === maxProductos) return
            const updateItemn = [...cart]
            updateItemn[itemExists].cantidad++
            setCart(updateItemn)
        }

    }

    function removeProductCart(id: Productos['prod_id']) {
        setCart(prevCart => prevCart.filter(product => product.prod_id !== id))
    }

    function increaseProduct(id: Productos['prod_id']) {

        const incrementProduct = cart.map(item => {
            (item.prod_id === id && item.cantidad <= maxProductos) && item.cantidad++
            return item
        })
        setCart(incrementProduct)
    }

    function decreaseProduct(id: Productos['prod_id']) {
        const decrementProduct = cart.map(item => {
            (item.prod_id === id && item.cantidad > minProductos) && item.cantidad--
            return item
        })
        setCart(decrementProduct)
    }

    function removeCart() {
        setCart([])
    }


    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce( (total, item) => total + (item.cantidad * item.prod_precio_unitario),0 ),[cart])

    return {
        cart,        
        addToCart,
        removeProductCart,
        increaseProduct,
        decreaseProduct,
        removeCart,
        isEmpty,
        cartTotal
    }

}