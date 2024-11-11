
import Header from "./components/Header"
import ProductosComponent from "./components/ProductosComponent"
import { dbProductos } from "./data/db"
import { useCart } from "./hooks/useCart"
//import { useFetchProductos } from "./hooks/useFetchProductos"




function App() {

  //const { productos } = useFetchProductos()
  const { cart, addToCart, removeProductCart, increaseProduct, decreaseProduct, removeCart, isEmpty, cartTotal } = useCart()

  return (
    <>
      <Header 
        cart={cart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
        removeProductCart={removeProductCart}
        increaseProduct={increaseProduct}
        decreaseProduct={decreaseProduct}
        removeCart={removeCart}
      />
      <main className="main-container">
        <h2 className="main-container__title">Nuestros Productos</h2>

        <div className="main-container__grid">
          {
            /*productos.map(producto => (

              <ProductosComponent
                key={producto.pro_id}
                producto={producto}
              />

            ))*/

            dbProductos.map((producto) => (
              <ProductosComponent
                key={producto.pro_id}
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

export default App
