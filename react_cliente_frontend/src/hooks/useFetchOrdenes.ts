import { CartItem, OrderProduct, OrderRequest } from "../types"


export const useFetchOrdenes = () => {
    const url_api = 'http://localhost:8000';

    const postOrder = async (cedula: string, cart: CartItem[]) => {
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
        } catch (error) {
            console.error(error);
        }
    };

    return {
        postOrder,
    };


}