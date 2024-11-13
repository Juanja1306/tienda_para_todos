
import { v4 as uuidv4 } from 'uuid'
import ProductosComponent from "../components/ProductosComponent"
import { Categorias, Productos } from "../types"
import { useEffect } from 'react'
import { useFetchCategorias } from '../hooks/useFetchCategorias'


type StoreProductsProps = {
  addToCart: (item: Productos) => void
  categorias: Categorias[]
  productos: Productos[]
  fetchAllProductos: () => Promise<void>
  fetchProductosByCategoria: (categoriaId: Categorias["cat_id"]) => Promise<void>
}

export default function StoreProducts({ addToCart, categorias, productos = [], fetchAllProductos, fetchProductosByCategoria }: StoreProductsProps) {

  const { filterCat, handleSelectChangeCategory } = useFetchCategorias()
  /*
    useEffect(() => {
      filterCat === 0 ? 
        fetchAllProductos() : fetchProductosByCategoria(filterCat)
    }, [filterCat,,fetchAllProductos, fetchProductosByCategoria])
  */

  useEffect(() => {filterCat === 0 ? fetchAllProductos() : fetchProductosByCategoria(filterCat)}, [filterCat]);


  return (
    <>
      <main className="main-container">
        <div>
          <h2 className="main-container__title">Nuestros Productos</h2>
          <div>
            <select
              id="cat_id"
              onChange={handleSelectChangeCategory}
              value={filterCat}
            >
              <option value={0}>Todos</option>
              {categorias.map((categoria: Categorias) => (
                <option
                  key={uuidv4()}
                  value={categoria.cat_id}
                >
                  {categoria.cat_descripcion}
                </option>
              ))
              }
            </select>
          </div>
        </div>
        <div className="main-container__grid">
          {productos.map((producto) => (
            <ProductosComponent
              key={uuidv4()}
              producto={producto}
              addToCart={addToCart}
            />
          ))
          }
        </div>
      </main>

      <footer className="footer">
        <div className="footer__container">
          <p className="footer__text">Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}