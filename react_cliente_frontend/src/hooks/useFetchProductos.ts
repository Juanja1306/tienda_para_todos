
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Categorias, CreateProduct, Productos, Proveedores } from "../types"

export const useFetchProductos = () => {

    //TODO: cambiar el puerto al momento de Dockerizar
    const url_api = 'http://localhost:8001'

    const imageNotSelected = '/img/selectImage.jpg'
    const productosIniciales: Productos[] = []
    const initialProduct: Productos = { prod_id: 0, prod_descripcion: '', prod_precio_unitario: 0, prod_stock: 0, fk_cat_id: 0, imagen: '', fk_pro_provid: 0 }

    const [productos, setProducto] = useState(productosIniciales)
    const [imgSrc, setImgSrc] = useState<string>(imageNotSelected);
    const [newProduct, setNewProduct] = useState(initialProduct)

    
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

    const fetchProductosByProvider = async (proveedor_id: Proveedores['prov_id']) => {

        try {
            const response = await fetch(`${url_api}/list_productos_by_proveedor/${proveedor_id}`)
            if (!response.ok) throw new Error('Error al obtener todos los productos')
            const products: Productos[] = await response.json()
            setProducto(products)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { fetchAllProductos() }, [])

    const fetchProductosByCategoria = async (categoriaId: Categorias['cat_id']) => {

        try {
            const response = await fetch(`${url_api}/list_productos_by_categoria/${categoriaId}/`)
            if (!response.ok) throw new Error(`Error al obtener productos de la categoría ${categoriaId}`)
            const products: Productos[] = await response.json()
            setProducto(products)
        } catch (error) {

        }
    }

    //Formulario

    const handleChangeProduct = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { id, value } = e.target;
        const isNumber = ['prod_precio_unitario', 'prod_stock', 'fk_cat_id'].includes(id);


        setNewProduct({
            ...newProduct,
            [id]: isNumber ? +value : value,
        });

        console.log(newProduct)
    };
    const isValidProduct = () => {
        const { prod_descripcion, prod_precio_unitario, prod_stock, imagen } = newProduct

        return (
            prod_descripcion.trim() !== '' &&
            prod_precio_unitario > 0 &&
            prod_stock > 0 &&
            imagen.trim() !== '' &&
            imagen.trim() !== imageNotSelected
        )
    }

    const handleSubmitProduct = async (e: FormEvent<HTMLFormElement>, fk_pro_provid: number) => {
        e.preventDefault();

        setNewProduct({ ...newProduct, ['fk_pro_provid']: fk_pro_provid })
        //setNewProduct({ ...newProduct, ['fk_cat_id']: 1 })

        console.log
        const createProduct: CreateProduct = {
            prod_id: 0,
            prod_descripcion: newProduct.prod_descripcion,
            prod_precio_unitario: newProduct.prod_precio_unitario,
            prod_stock: newProduct.prod_precio_unitario,
            fk_categoria_id: newProduct.fk_cat_id,
            prod_imagen: newProduct.imagen,
            fk_prov_id: fk_pro_provid
        }

        try {
            console.log(createProduct)
            
            const response = await fetch(`${url_api}/create_producto/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },                
                body: JSON.stringify(createProduct)
            })

            if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        } catch (error) {
            console.log(error)
        }

        setNewProduct(initialProduct)
    }

    const selectImg = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target;

        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(input.files[0]);
            reader.onload = () => {
                setImgSrc(reader.result as string);
                setNewProduct({ ...newProduct, ['imagen']: reader.result as string })

            }

        } else {
            setImgSrc(imageNotSelected);
            return
        }


    }

    return {
        productos,
        fetchAllProductos,
        fetchProductosByCategoria,
        fetchProductosByProvider,
        selectImg,
        handleChangeProduct,
        handleSubmitProduct,
        isValidProduct,
        newProduct,
        imgSrc
    }
}
