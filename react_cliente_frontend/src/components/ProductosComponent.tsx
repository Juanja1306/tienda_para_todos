import { Productos } from "../types"

type ProductosProps = {
    producto: Productos
    addToCart: null | ((item: Productos) => void)
}

export default function ProductosComponent({ producto, addToCart }: ProductosProps) {



    return (

        <>
            <div className="productos-card">
                <div className="productos-card__image-container">
                    <img className="productos-card__image" src={producto.imagen} alt="imagen producto" />
                </div>
                <div className="productos-card__details">
                    <h3 className="productos-card__title">{producto.prod_descripcion}</h3>
                    <p className="productos-card__price">{`$ ${producto.prod_precio_unitario}`}</p>

                    {addToCart &&
                        <button
                            type="button"
                            className="productos-card__button"
                            onClick={() => addToCart!(producto)}
                        >Agregar al Carrito</button>
                    }
                </div>
            </div>
        </>
    )
}