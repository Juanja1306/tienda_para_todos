import { Productos } from "../types"

type ProductosProps = {
    producto: Productos
    addToCart: (item:Productos) => void
}

export default function ProductosComponent({ producto, addToCart }: ProductosProps) {

    

    const { prod_descripcion, prod_imagen, prod_precio_unitario } = producto

    return (
        <>
            <div className="productos-card">
                <div className="productos-card__image-container">
                    <img className="productos-card__image" src={prod_imagen} alt="imagen producto" />
                </div>
                <div className="productos-card__details">
                    <h3 className="productos-card__title">{prod_descripcion}</h3>
                    <p className="productos-card__price">{`$ ${prod_precio_unitario}`}</p>
                    <button
                        type="button"
                        className="productos-card__button"
                        onClick={() => addToCart(producto)}
                    >Agregar al Carrito</button>
                </div>
            </div>
        </>
    )
}