import { v4 as uuidv4 } from 'uuid'
import FormProducts from "../components/FormProducts"
import ProductosComponent from "../components/ProductosComponent"
import { Categorias, Proveedores } from "../types"
import DetalleOrden from '../components/DetalleOrden'
import { useFetchProductos } from '../hooks/useFetchProductos'
import { useEffect } from 'react'
type ProviderProps = {
    categorias: Categorias[]
    fetchAllProductos: () => Promise<void>
    fetchProductosByCategoria: (categoriaId: Categorias["cat_id"]) => Promise<void>
    proveedor_id: Proveedores['prov_id']
}

export default function Provider({ categorias, fetchAllProductos, fetchProductosByCategoria, proveedor_id }: ProviderProps) {


    const { productos, fetchProductosByProvider } = useFetchProductos()

    useEffect(() => { fetchProductosByProvider(proveedor_id) }, [productos])

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategoryId = event.target.value;
        if (selectedCategoryId === "0") {
            fetchAllProductos();
        } else {
            fetchProductosByCategoria(+selectedCategoryId);
        }
    };
    return (
        <>
            <main className="main-container">
                <div>
                    <h2 className="main-container__title">Tus Productos</h2>
                    <select name="" onChange={handleSelectChange}>
                        <option key={uuidv4()} value="0">Todos</option>
                        {categorias.map((categoria: Categorias) => (
                            <option key={uuidv4()} value={categoria.cat_id}>{categoria.cat_descripcion}</option>
                        ))
                        }
                    </select>
                </div>
                <div className="main-container__grid">
                    {productos.map((producto) => (
                        <ProductosComponent
                            key={uuidv4()}
                            producto={producto}
                            addToCart={null}

                        />
                    ))
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