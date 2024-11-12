import { ChangeEvent, FormEvent, useState } from "react"
import { Clientes } from "../types"
import { allRoutesComponents, dbClientes } from "../data/db"

const initialUser: Clientes = { cli_cedula: '', cli_nombre: '', cli_apellido: '', cli_correo: '', cli_celular: '', cli_direccion: '', cli_contrasenia: '' }


export const useClient = () => {

    

    const [cliente, setCliente] = useState(initialUser)


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCliente({
            ...cliente,
            [e.target.id]: e.target.value
        })

    }

    const isValidForm = () => {
        const { cli_correo, cli_contrasenia } = cliente;
        return cli_contrasenia.trim() !== '' && cli_correo.trim() !== ''
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //TODO: Buscar en la Api para setear al cliente 😁

        //! Cliente por defecto
        setCliente(dbClientes[0])
        //setPage(allRoutesComponents.storeProducts)
        //navigate(`/${allRoutesComponents.storeProducts}`)

    }

    return {
        cliente,
        handleChange,
        handleSubmit,
        isValidForm

    }
}