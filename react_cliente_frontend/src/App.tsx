
import { useState } from "react"
import Header from "./components/Header"
import ProductosComponent from "./components/ProductosComponent"
import { allRoutesComponents, dbProductos } from "./data/db"
import { useCart } from "./hooks/useCart"
import StoreProducts from "./pages/StoreProducts"
import Login from "./pages/Login"
import { useClient } from "./hooks/useClient"
//import { useFetchProductos } from "./hooks/useFetchProductos"


//const Home = () => <StoreProducts />

//const Login = () => <h1>Form</h1>

function App() {

  const { cliente, handleChange, handleSubmit, isValidForm } = useClient()
  const { cart, addToCart, removeProductCart, increaseProduct, decreaseProduct, removeCart, isEmpty, cartTotal } = useCart()
  const [page, setPage] = useState('login')

  const getContent = () => {
    if (page === allRoutesComponents.storeProducts) return <StoreProducts
      addToCart={addToCart}
    />
    else if (page === allRoutesComponents.login || page === allRoutesComponents.signUp) {
      return <Login
        cliente={cliente}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isValidForm={isValidForm}
        page={page}
      />
    }
  }


  return (
    <div>
      <Header
        cart={cart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
        removeProductCart={removeProductCart}
        increaseProduct={increaseProduct}
        decreaseProduct={decreaseProduct}
        removeCart={removeCart}
        cliente={cliente}
        setPage={setPage}
      />
      {getContent()}
    </div>
  )
}

export default App
