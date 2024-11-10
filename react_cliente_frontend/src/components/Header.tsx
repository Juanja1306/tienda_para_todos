
export default function Header() {
    return (
        <header className="header">
            <div className="cont--h">
                <div className="cont--header">
                    <div className="title">
                        <a href="index.html">
                            <h1>Tienda Para Todos</h1>
                        </a>
                    </div>
                    <nav>
                        <div className="carrito">
                            <img src="/img/carrito.png" alt="carrito" />

                            <div id="carrito">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Imagen</th>
                                            <th>Nombre</th>
                                            <th>Precio</th>
                                            <th>Cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <img src="" alt="imagen_producto" />
                                            </td>
                                            <td>Nombre Producto</td>
                                            <td className="precio"></td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}