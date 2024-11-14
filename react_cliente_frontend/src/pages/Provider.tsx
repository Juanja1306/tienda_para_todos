import { v4 as uuidv4 } from 'uuid'
import ProductosComponent from "../components/ProductosComponent"
import { Categorias, Productos, Proveedores } from "../types"
import DetalleOrden from '../components/DetalleOrden'
import { useEffect } from 'react'
import FormProducts from '../components/FormProducts'
//import { useFetchCategorias } from '../hooks/useFetchCategorias'
type ProviderProps = {
    categorias: Categorias[]
    fetchProductosByProvider: (proveedor_id: Proveedores["prov_id"]) => Promise<void>
    fetchProductosByCategoria: (categoriaId: Categorias["cat_id"]) => Promise<void>
    proveedor_id: Proveedores['prov_id']
    productosProv: Productos[]
    handleSubmitProduct: (e: React.FormEvent<HTMLFormElement>, fk_pro_provid: number) => Promise<void>
}

export default function Provider({ categorias, fetchProductosByProvider, proveedor_id, productosProv = [] }: ProviderProps) {



    useEffect(() => { fetchProductosByProvider(proveedor_id) }, []);
    useEffect(() => { fetchProductosByProvider(proveedor_id) }, [productosProv]);


    return (
        <>
            <main className="main-container">
                <div>
                    <h2 className="main-container__title">Tus Productos</h2>

                </div>
                <div className="main-container__grid">
                    {productosProv.length > 0 ? (productosProv.map((producto) => (
                        <ProductosComponent
                            key={uuidv4()}
                            producto={producto}
                            addToCart={null}

                        />
                    ))) : (
                        <p>Sin productos</p>
                    )
                    }
                </div>

                <FormProducts
                    categorias={categorias}
                    proveedor_id={proveedor_id}
                />




                <DetalleOrden
                    proveedor_id={proveedor_id}
                />


            </main>



            <footer className="footer">
                <div className="footer__container">
                    <p className="footer__text">Todos los derechos Reservados</p>
                </div>
            </footer>
        </>
    )
}