import { useFetchOrdenes } from "../hooks/useFetchOrdenes"
import { Proveedores } from "../types"


type DetalleOrdenProps = {
    proveedor_id: Proveedores['prov_id']
}

export default function DetalleOrden({proveedor_id}:DetalleOrdenProps) {
    const { detalleOrden, getDetallaOrdenPorProveedor } = useFetchOrdenes()

    return (
        <>
            <h3>Detalle de ventas</h3>
            <button onClick={() => getDetallaOrdenPorProveedor(proveedor_id)}>Refrescar</button>
            <table className="algorithm__table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio unitario</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody className="table__body">
                    {detalleOrden.productos_vendidos.map(producto => (
                        <tr key={producto.prod_id}>
                            <td>{producto.prod_descripcion}</td>
                            <td>{producto.prod_precio_unitario}</td>
                            <td>{producto.detalle_cantidad}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}