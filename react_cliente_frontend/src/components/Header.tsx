import { Link } from 'react-router-dom'
import { CartItem, Clientes, Productos } from "../types"
import { allRoutesComponents, dbClientes } from "../data/db"
import { Dispatch } from 'react'


type HeaderProps = {
    cart: CartItem[]
    isEmpty: boolean
    cartTotal: number
    removeProductCart: (id: Productos["prod_id"]) => void
    increaseProduct: (id: Productos["prod_id"]) => void
    decreaseProduct: (id: Productos["prod_id"]) => void
    removeCart: () => void
    cliente: Clientes
    setCliente: Dispatch<React.SetStateAction<Clientes>>
    postOrder: (cedula: string, cart: CartItem[]) => void
}

export default function Header({ cart, isEmpty, cartTotal, removeProductCart, increaseProduct, decreaseProduct, removeCart, cliente, setCliente, postOrder }: HeaderProps) {

    const prototipo = () => {
        setCliente(dbClientes[0])
    }
    return (
        <header className="header">
            <div className="cont--h">
                <div className="cont--header">
                    <div className="title">
                        <a href="index.html">
                            <h1>Tienda Para Todos</h1>
                        </a>
                    </div>
                    <nav className={cliente.cli_cedula && "cont__nav__a"}>
                        {cliente.cli_cedula ? (
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
                                                        <tr className="cart__row" key={product.prod_id}>
                                                            <td className="cart__image-cell">
                                                                <img className="cart__image" src={`/img/${product.prod_imagen}.jpg`} alt="imagen_producto" />
                                                            </td>
                                                            <td className="cart__name">{product.prod_descripcion}</td>
                                                            <td className="cart__price">{product.prod_precio_unitario}</td>
                                                            <td className="cart__quantity">
                                                                <button className="cart__button cart__button--decrease" type="button" onClick={() => decreaseProduct(product.prod_id)}>
                                                                    -
                                                                </button>
                                                                {product.cantidad}

                                                                <button type="button" className="cart__button cart__button--increase" onClick={() => increaseProduct(product.prod_id)}>
                                                                    +
                                                                </button>
                                                            </td>
                                                            <td className="cart__remove-cell">
                                                                <button className="cart__button cart__button--remove" type="button" onClick={() => removeProductCart(product.prod_id)}>
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
                                    <div>
                                        {!isEmpty && (
                                            <>
                                                <button className="cart__button__total" onClick={removeCart}>Vaciar Carrito</button>
                                                <button className="cart__button__total bt__buy " onClick={() => postOrder(cliente.cli_cedula, cart)}>Comprar</button>
                                            </>
                                        )}

                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link className="nav__a" to={`/${allRoutesComponents.login}`}>Login</Link>
                                <Link className="nav__a" to={`/${allRoutesComponents.signUp}`}>Registrarse</Link>
                                <Link onClick={prototipo} className="nav__a" to={`/${allRoutesComponents.storeProducts}`}>Home</Link>
                            </>
                        )
                        }
                    </nav>
                </div>
            </div>
        </header>
    )
}