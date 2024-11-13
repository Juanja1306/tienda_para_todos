
import { v4 as uuidv4 } from 'uuid'
import ProductosComponent from "../components/ProductosComponent"
import { Categorias, Productos } from "../types"


type StoreProductsProps = {
  addToCart: (item: Productos) => void
  categorias: Categorias[]
  productos: Productos[]
  fetchAllProductos: () => Promise<void>
  fetchProductosByCategoria: (categoriaId: Categorias["cat_id"]) => Promise<void>
}

export default function StoreProducts({ addToCart, categorias, productos = [], fetchAllProductos, fetchProductosByCategoria }: StoreProductsProps) {

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = event.target.value;
    if (selectedCategoryId === "0") {
      fetchAllProductos(); // Si selecciona "Todos", trae todos los productos
    } else {
      fetchProductosByCategoria(Number(selectedCategoryId)); // Si selecciona una categoría, trae los productos de esa categoría
    }
  };

  return (
    <>
      <main className="main-container">
        <div>
          <h2 className="main-container__title">Nuestros Productos</h2>
          <div>
            <select name="" id="" onChange={handleSelectChange}>
              <option value="0">Todos</option>
              {categorias.map((categoria: Categorias) => (
                <option key={uuidv4()} value={categoria.cat_id} >{categoria.cat_descripcion}</option>
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