import { CartItem, Productos } from "../types"


type HeaderProps = {
    cart: CartItem[]
    isEmpty: boolean
    cartTotal: number
    removeProductCart: (id: Productos["pro_id"]) => void
    increaseProduct: (id: Productos["pro_id"]) => void
    decreaseProduct: (id: Productos["pro_id"]) => void
    removeCart: () => void

}

export default function Header({ cart, isEmpty, cartTotal, removeProductCart, increaseProduct, decreaseProduct, removeCart }: HeaderProps) {


    return (
        <header className="header">
            <div className="cont--h">
                <div className="cont--header">
                    <div className="title">
                        <a href="index.html">
                            <h1>Tienda Para Todos</h1>
                        </a>
                    </div>
                    <nav>
                        <div className="carrito">
                            <img src="/img/carrito.png" alt="carrito" />

                            <div id="carrito">
                                {isEmpty ? (<p className="cart__empty-message">El carrito esta vacio</p>) : (
                                    <>
                                        <table className="cart__table">
                                            <thead>
                                                <tr className="cart__header-row">
                                                    <th className="" >Imagen</th>
                                                    <th className="" >Nombre</th>
                                                    <th className="" >Precio</th>
                                                    <th className="" >Cantidad</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map(product => (
                                                    <tr className="cart__row" key={product.pro_id}>
                                                        <td className="cart__image-cell">
                                                            <img className="cart__image" src={`/img/${product.pro_imagen}.jpg`} alt="imagen_producto" />
                                                        </td>
                                                        <td className="cart__name">{product.pro_descripcion}</td>
                                                        <td className="cart__price">{product.pro_precio_unitario}</td>
                                                        <td className="cart__quantity">
                                                            <button className="cart__button cart__button--decrease" type="button" onClick={() => decreaseProduct(product.pro_id)}>
                                                                -
                                                            </button>                                                            
                                                                {product.cantidad}
                                                            
                                                            <button type="button" className="cart__button cart__button--increase" onClick={() => increaseProduct(product.pro_id)}>
                                                                +
                                                            </button>
                                                        </td>
                                                        <td className="cart__remove-cell">
                                                            <button className="cart__button cart__button--remove" type="button" onClick={() => removeProductCart(product.pro_id)}>
                                                                X
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                                }
                                            </tbody>
                                        </table>

                                        <p className="text-end">Total pagar: <span className="fw-bold">${cartTotal}</span></p>
                                    </>
                                )}

                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}