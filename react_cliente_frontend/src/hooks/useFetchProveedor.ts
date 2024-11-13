import { ChangeEvent, useState, FormEvent, Dispatch } from "react"
import { Proveedores, SignProv } from "../types"
import { allRoutesComponents } from "../data/db"

const initionalProv: Proveedores = { prov_id: 0, prov_nombre: '', prov_numero: '', prov_correo: '', prov_contrasenia: '', prov_direccion: '' }

export const useFetchProveedor = (setPage: Dispatch<React.SetStateAction<string>>) => {

    const url_api = 'http://localhost:8001'

    const [proveedor, setProveedor] = useState(initionalProv)

    const handleChangeProv = (e: ChangeEvent<HTMLInputElement>) => {
        setProveedor({
            ...proveedor,
            [e.target.id]: e.target.value
        })
    }
    const isValidFormProv = () => {
        const { prov_correo, prov_contrasenia} = proveedor;

        return prov_correo.trim() !== '' && prov_contrasenia !== ''        
        
    }

    const handleSubmitProv = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        proveedor.prov_nombre ? signUp() : loginProv()
    }

    const loginProv = async () => {
        try {
            const sign = proveedor as SignProv
            const res = await fetch(`${url_api}/login_proveedores/`,  {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sign)
            })

            if (!res.ok) throw new Error(`Error: ${res.statusText}`);

            const data = await res.json()
            
            if(data.status === 'error') throw new Error(data.message)

            
            const logProv: Proveedores = {
                prov_id: data.prov_id,
                prov_correo: data.prov_correo,
                prov_nombre: data.prov_nombre,
                prov_direccion: data.prov_direccion,
                prov_numero: data.prov_numero,
                prov_contrasenia: '',
            }

            setProveedor(logProv)
            setPage(allRoutesComponents.providerProducts)
        } catch (error) {
            console.log(error)
        }
    }

    const signUp = async () => {
        try {
            const res = await fetch(`${url_api}/add_proveedor/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(proveedor)
            })

            if (!res.ok) throw new Error(`Error: ${res.statusText}`);


            setPage(allRoutesComponents.providerProducts)
        } catch (error) {
            console.log(error)
        }
    }


    return {
        proveedor,
        handleChangeProv,
        handleSubmitProv,
        isValidFormProv
    }
}