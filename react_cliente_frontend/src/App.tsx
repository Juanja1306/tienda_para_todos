
import Header from "./components/Header"
import ProductosComponent from "./components/ProductosComponent"
import { useFetchProductos } from "./hooks/useFetchProductos"




function App() { 

  const {productos} = useFetchProductos()
  

  return (
    <>
      <Header />
      <main>
        <h2>Nuestros Productos</h2>
        <div className="cont--productos">
          {productos.map(producto => (
            <div className="producto">
              <ProductosComponent
                key={producto.pro_id}
                producto={producto}
              />
            </div>

          ))
          }
        </div>

      </main>
    </>
  )
}

export default App
