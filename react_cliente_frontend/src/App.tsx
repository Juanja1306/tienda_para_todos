import Header from "./components/Header"
import ProductosComponent from "./components/ProductosComponent"
import { dbProductos } from "./data/db"

function App() {

  return (
    <>
      <Header />
      <main>
        <h2>Nuestros Productos</h2>
        <div>
          {dbProductos.map(producto => (
            <>
              <ProductosComponent
                key={producto.pro_id}
                producto={producto}
              />
            </>
          ))}
        </div>
      </main>
    </>
  )
}

export default App
