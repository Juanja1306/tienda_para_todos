import { v4 as uuidv4 } from 'uuid'
import { Categorias, Proveedores } from "../types"
import { useFetchProductos } from '../hooks/useFetchProductos'

type FormProductsProps = {
    categorias: Categorias[]
    proveedor_id: Proveedores['prov_id']
}

export default function FormProducts({ categorias, proveedor_id }: FormProductsProps) {

    const { newProduct, selectImg, handleChangeProduct, handleSubmitProduct, isValidProduct, imgSrc } = useFetchProductos()
    return (
        <>
            <form onSubmit={(e) => handleSubmitProduct(e, proveedor_id)}>
                <fieldset>
                    <div className="cont__camp">
                        <div className="camp__cont__img">
                            <img id='imagen' className="camp__img" src={imgSrc} alt="" />

                        </div>

                        <div className="camp__inputs">

                            <section className="camp__text">
                                <h3 className="camp__title">Añadir Producto</h3>
                            </section>
                            <div className="camp">
                                <label htmlFor="prod_descripcion">Nombre</label>
                                <input className="camp__txt" type="text" name="text" id="prod_descripcion" placeholder='Ej: Parlante stereo'
                                    value={newProduct.prod_descripcion}
                                    onChange={handleChangeProduct}
                                />
                            </div>
                            <div className="camp">
                                <label htmlFor="prod_precio_unitario">Precio unitario</label>
                                <input className="camp__txt" type="number" name="stock" id="prod_precio_unitario" placeholder='Ej: 152'
                                    value={newProduct.prod_precio_unitario}
                                    onChange={handleChangeProduct}
                                />
                            </div>

                            <div className="camp">
                                <label htmlFor="prod_stock">Stock</label>
                                <input className="camp__txt" type="number" name="text" id="prod_stock" placeholder='Ej: 563'
                                    value={newProduct.prod_stock}
                                    onChange={handleChangeProduct}
                                />
                            </div>

                            <div>
                                <label className="lb--selec" htmlFor="selectImg">Subir imagen</label>
                                <input
                                    className="selec"
                                    onChange={selectImg}
                                    type="file"
                                    name="photo"
                                    id="selectImg"
                                    accept="image/*"
                                />
                            </div>

                            <div>
                                <select
                                    id='fk_cat_id'
                                    onChange={handleChangeProduct}
                                    value={newProduct.fk_cat_id}
                                >
                                    {categorias.map((categoria) => (
                                        <option key={uuidv4()} value={categoria.cat_id}>
                                            {categoria.cat_descripcion}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="camp camp__button">
                                <button className="button" type="submit" disabled={!isValidProduct()}>Registrar producto</button>
                            </div>

                        </div>
                    </div>
                </fieldset>
            </form >
        </>
    )
}