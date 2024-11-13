import Header from "./components/Header";
import { useCart } from "./hooks/useCart";
import { useClient } from "./hooks/useClient";
import { useFetchCategorias } from "./hooks/useFetchCategorias";
import { useFetchOrdenes } from "./hooks/useFetchOrdenes";
import { useFetchProductos } from "./hooks/useFetchProductos";
import { allRoutesComponents } from "./data/db";
import StoreProducts from "./pages/StoreProducts";
import { useState } from "react";
import LoginUsers from "./pages/LoginUsers";
import LoginProvider from "./pages/LoginProvider";
import { useFetchProveedor } from "./hooks/useFetchProveedor";
import Provider from "./pages/Provider";



function App() {

  const [page, setPage] = useState(allRoutesComponents['login'])

  const { cart, addToCart, removeProductCart, increaseProduct, decreaseProduct, removeCart, isEmpty, cartTotal } = useCart()
  const { cliente, handleChange, handleSubmit, isValidForm } = useClient(setPage)
  const { categorias } = useFetchCategorias()
  const { productos, fetchAllProductos, fetchProductosByCategoria } = useFetchProductos()
  const { postOrder } = useFetchOrdenes();
  const { proveedor, handleChangeProv, handleSubmitProv, isValidFormProv } = useFetchProveedor(setPage)



  const getContent = () => {
    if (page === allRoutesComponents.storeProducts) {
      return <StoreProducts
        addToCart={addToCart}
        categorias={categorias}
        productos={productos}
        fetchAllProductos={fetchAllProductos}
        fetchProductosByCategoria={fetchProductosByCategoria}
      />
    }
    else if (page === allRoutesComponents.login || page === allRoutesComponents.signUp) {
      return <LoginUsers
        cliente={cliente}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isValidForm={isValidForm}
        page={page}

      />
    }

    else if (page === allRoutesComponents.prov_login || page === allRoutesComponents.prov_signUp) {
      return <LoginProvider
        proveedor={proveedor}
        handleChangeProv={handleChangeProv}
        handleSubmitProv={handleSubmitProv}
        isValidFormProv={isValidFormProv}

        page={page}
      />
    }

    else if (page === allRoutesComponents.providerProducts) {
      return <Provider
        proveedor_id={proveedor.prov_id}
        categorias={categorias}
        fetchAllProductos={fetchAllProductos}
        fetchProductosByCategoria={fetchProductosByCategoria}
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
        postOrder={postOrder}
        setPage={setPage}
        page={page}
      />
      {getContent()}




    </div>
  )
}
export default App