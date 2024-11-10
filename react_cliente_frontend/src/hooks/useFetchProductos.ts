
import { useEffect, useState } from "react"
import { Productos } from "../types"

export const useFetchProductos = () => {

    const url_api = 'http://127.0.0.1:8000/'
    const productosIniciales: Productos[] = []

    const [productos, setProducto] = useState(productosIniciales)

    useEffect(() => {

        fetch(`${url_api}/productos/`)
            .then((response) => response.json())
            .then((product) => {
                console.log(product)
                setProducto([...productos, product])
            })
            .catch((error) => 
                console.error(error)
            )

    }, [])

    return {
        productos
    }
}
