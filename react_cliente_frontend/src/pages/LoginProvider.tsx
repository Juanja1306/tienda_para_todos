import { ChangeEvent, FormEvent } from "react"
import { Proveedores } from "../types"
import { allRoutesComponents } from "../data/db"




type LoginProviderProps = {
    proveedor: Proveedores
    handleChangeProv: (e: ChangeEvent<HTMLInputElement>) => void
    handleSubmitProv: (e: FormEvent<HTMLFormElement>) => void
    isValidFormProv: () => boolean
    page: string
}


export default function LoginProvider({ proveedor, handleChangeProv, handleSubmitProv, isValidFormProv, page }: LoginProviderProps) {



    return (
        <>

            <main className="main__background__form">
                <div className="background__camp">
                    <form onSubmit={handleSubmitProv}>
                        <fieldset>
                            <div className="cont__camp">
                                <div className="camp__cont__img">
                                    <svg className="camp__img" xmlns="http://www.w3.org/2000/svg" width="274" height="568" fill="none" viewBox="0 0 274 568">
                                        <rect width="274" height="568" fill="#483EFF" rx="10" />
                                        <mask id="a" width="274" height="568" x="0" y="0" maskUnits="userSpaceOnUse">
                                            <rect width="274" height="568" fill="#fff" rx="10" />

                                        </mask>
                                        <g mask="url(#a)">
                                            <path fill="#6259FF" fillRule="evenodd" d="M-34.692 543.101C3.247 632.538 168.767 685.017 211.96 612.52c43.194-72.497-66.099-85.653-104.735-160.569-38.635-74.916-68.657-121.674-124.482-104.607-55.824 17.068-55.375 106.32-17.436 195.757Z" clipRule="evenodd" />
                                            <path fill="#F9818E" fillRule="evenodd" d="M233.095 601.153c60.679-28.278 92.839-143.526 41.875-171.528-50.965-28.003-57.397 47.579-108.059 75.987-50.662 28.408-82.14 50.207-69.044 88.241 13.096 38.034 74.549 35.578 135.228 7.3Z" clipRule="evenodd" />
                                            <path stroke="#fff" strokeLinecap="round" strokeLinejoin="bevel" strokeWidth="5" d="m165.305 469.097 10.607-10.806M209.461 474.581l-12.506-10.503M187.56 488.991l-6.908 14.798" />
                                            <path fill="#FFAF7E" d="M.305 546.891c37.003 0 67-29.997 67-67s-29.997-67-67-67-67 29.997-67 67 29.997 67 67 67Z" />
                                        </g>
                                    </svg>
                                </div>

                                <div className="camp__inputs">

                                    <section className="camp__text">
                                        <h3 className="camp__title">{page === allRoutesComponents.prov_login ? 'Proveedor' : 'Registrar proveedor'}</h3>
                                    </section>
                                    <div className="camp">
                                        <label htmlFor="prov_correo">Correo electrónico </label>
                                        <input className="camp__txt" type="text" name="email" id="prov_correo" placeholder='Ej: ejemplo@gmail.com'
                                            value={proveedor.prov_correo}
                                            onChange={handleChangeProv}
                                        />
                                    </div>

                                    <div className="camp">
                                        <label htmlFor="prov_contrasenia">Contraseña</label>
                                        <input className="camp__txt" type="password" name="password" id="prov_contrasenia" placeholder='mi contraseña'
                                            value={proveedor.prov_contrasenia}
                                            onChange={handleChangeProv} />
                                    </div>
                                    {!(page === allRoutesComponents.prov_login) &&
                                        <>
                                            <div className="camp">
                                                <label htmlFor="prov_nombre">Nombre </label>
                                                <input className="camp__txt" type="text" name="prov_nombre" id="prov_nombre" placeholder='Ej: Felipe'
                                                    value={proveedor.prov_nombre}
                                                    onChange={handleChangeProv}
                                                />
                                            </div>

                                            <div className="camp">
                                                <label htmlFor="prov_direccion">Direccion </label>
                                                <input className="camp__txt" type="text" name="prov_direccion" id="prov_direccion" placeholder='Ej: Av. Americas'
                                                    value={proveedor.prov_direccion}
                                                    onChange={handleChangeProv}
                                                />
                                            </div>

                                            <div className="camp">
                                                <label htmlFor="prov_numero">Celular </label>
                                                <input className="camp__txt" type="text" name="prov_numero" id="prov_numero" placeholder='Ej: 0985631'
                                                    value={proveedor.prov_numero}
                                                    onChange={handleChangeProv}
                                                />
                                            </div>
                                        </>
                                    }
                                    
                                    <div className="camp camp__button">
                                        <button className="button" type="submit" disabled={!isValidFormProv()}>{page === allRoutesComponents.prov_login ? 'Ingresar' : 'Registrarse'}</button>
                                    </div>

                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </main>
        </>



    )
}