import { useState } from "react";
import { CartItem, OrderProduct, OrderRequest, GetOrderRequest, Proveedores } from "../types"
import { CreateOrderError, DefaultError } from "../errors/errors";
import { succesfullAlert } from "../alerts/alerts";


export const useFetchOrdenes = () => {
    const url_api = 'http://localhost:8001';

    const detalleOrdenInicial: GetOrderRequest = { prov_id: 0, productos_vendidos: [] }
    const [detalleOrden, setDetalleOrden] = useState<GetOrderRequest>(detalleOrdenInicial)

    const postOrder = async (cedula: string, cart: CartItem[], removeCart: () => void) => {
        const myProducts: OrderProduct[] = cart.map(item => ({
            prod_id: item.prod_id,
            prod_stock: item.cantidad,
        }));

        const newOrder: OrderRequest = {
            cli_cedula: cedula,
            productos: myProducts,
        };

        try {
            const res = await fetch(`${url_api}/create_order/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newOrder),
            });

            if (!res.ok) throw new Error(`Error: ${res.statusText}`);
            const data = await res.json()
            console.log(data)

            if (data.statusText !== 'succes') throw new CreateOrderError(data.message)

            succesfullAlert('Se ha creado la compra correctamente')
            removeCart()
        } catch (error) {
            error instanceof CreateOrderError ? error.alert() : DefaultError.alert()            
        }
    };

    const getDetallaOrdenPorProveedor = async (id: Proveedores['prov_id']) => {
        try {
            const res = await fetch(`${url_api}/productos_vendidos_por_proveedor/${id}`)
            const response = await res.json()
            setDetalleOrden(response)
        } catch (error) {
            setDetalleOrden(detalleOrdenInicial)
        }
    }

    return {
        postOrder,
        getDetallaOrdenPorProveedor,
        detalleOrden,
        detalleOrdenInicial
    };


}