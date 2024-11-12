
import { useEffect, useState } from "react"
import { Categorias, Productos } from "../types"

export const useFetchProductos = () => {
    
    //TODO: cambiar el puerto al momento de Dockerizar
    const url_api = 'http://localhost:8001'
    const productosIniciales: Productos[] = []

    const [productos, setProducto] = useState(productosIniciales)

    const fetchAllProductos = async () => {
        
        try {
            const response = await fetch(`${url_api}/productos/`)
            if (!response.ok) throw new Error('Error al obtener todos los productos')
            const products: Productos[] = await response.json()
            setProducto(products)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchProductosByCategoria = async (categoriaId: Categorias['cat_id']) => {
        
        try {
            const response = await fetch(`${url_api}/list_productos_by_categoria/${categoriaId}/`)
            if (!response.ok) throw new Error(`Error al obtener productos de la categoría ${categoriaId}`)
            const products: Productos[] = await response.json()
            setProducto(products)
        } catch (error) {
            
        } 
    }

    return {
        productos,
        fetchAllProductos,
        fetchProductosByCategoria
    }
}
