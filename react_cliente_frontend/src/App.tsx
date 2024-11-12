import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import { allRoutesComponents } from "./data/db"
import { useCart } from "./hooks/useCart"
import { useClient } from "./hooks/useClient"
import { useFetchCategorias } from "./hooks/useFetchCategorias"
import { useFetchProductos } from "./hooks/useFetchProductos"
import { useFetchOrdenes } from "./hooks/useFetchOrdenes";
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import StoreProducts from "./pages/StoreProducts"



function App() {
                                                            //!Borrar esto
  const { cliente, handleChange, handleSubmit, isValidForm, setCliente } = useClient()
  const { cart, addToCart, removeProductCart, increaseProduct, decreaseProduct, removeCart, isEmpty, cartTotal } = useCart()
  const { categorias } = useFetchCategorias()
  const { productos, fetchAllProductos, fetchProductosByCategoria } = useFetchProductos()
  const { postOrder } = useFetchOrdenes();

  return (
    <div>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Header
          cart={cart}
          isEmpty={isEmpty}
          cartTotal={cartTotal}
          removeProductCart={removeProductCart}
          increaseProduct={increaseProduct}
          decreaseProduct={decreaseProduct}
          removeCart={removeCart}
          cliente={cliente}
          setCliente={setCliente}
          postOrder={postOrder}
        />

        <Routes>
          <Route path={`/${allRoutesComponents.login}`}
            element={
              <Login
                cliente={cliente}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isValidForm={isValidForm}                
              />
            }>
          </Route>

          <Route path={`/${allRoutesComponents.signUp}`}
            element={
              <SignUp
                cliente={cliente}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isValidForm={isValidForm}
              />
            }
          >
          </Route>

          <Route path={`/${allRoutesComponents.storeProducts}`}
            element={
              <StoreProducts
                addToCart={addToCart}
                categorias={categorias}
                productos={productos}      
                fetchAllProductos={fetchAllProductos}
                fetchProductosByCategoria={fetchProductosByCategoria}          
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>


    </div>
  )
}

export default App