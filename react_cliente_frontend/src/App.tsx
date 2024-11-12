
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import Header from "./components/Header"
//import ProductosComponent from "./components/ProductosComponent"
import { allRoutesComponents, dbProductos } from "./data/db"
import { useCart } from "./hooks/useCart"
import { useClient } from "./hooks/useClient"
//import { useFetchProductos } from "./hooks/useFetchProductos"
import StoreProducts from "./pages/StoreProducts"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"


function App() {

  const { cliente, handleChange, handleSubmit, isValidForm } = useClient()
  const { cart, addToCart, removeProductCart, increaseProduct, decreaseProduct, removeCart, isEmpty, cartTotal } = useCart()

  const navigate = useNavigate()
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
              />
            }
          ></Route>

        </Routes>

      </BrowserRouter>


    </div>
  )
}

export default App
