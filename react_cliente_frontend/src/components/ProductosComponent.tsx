import { Productos } from "../types"

type ProductosProps = {
    producto: Productos
}

export default function ProductosComponent({ producto }: ProductosProps) {

    const addToCart = (producto: Productos) => {
        console.log(producto)
    }

    const { pro_descripcion, pro_imagen, pro_precio_unitario } = producto

    return (
        <>
            <div className="col-md-6 col-lg-4 my-4 row align-items-center">
                <div className="col-4">
                    <img className="img-fluid" src={`/img/${pro_imagen}.jpg`} alt="imagen guitarra" />
                </div>
                <div className="col-8">
                    <h3 className="text-black fs-4 fw-bold text-uppercase">{pro_descripcion}</h3>
                    <p className="fw-black text-primary fs-3">{`$ ${pro_precio_unitario}`}</p>
                    <button
                        type="button"
                        className="btn btn-dark w-100"
                        onClick={() => addToCart(producto)}
                    >Agregar al Carrito</button>
                </div>
            </div>
        </>
    )
}