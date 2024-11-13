import { ChangeEvent, Dispatch, FormEvent, useState } from "react"
import { Clientes, Sign } from "../types"
import { allRoutesComponents } from "../data/db"
//import { useNavigate } from 'react-router-dom';

const initialUser: Clientes = { cli_cedula: '', cli_nombre: '', cli_apellido: '', cli_correo: '', cli_celular: '', cli_direccion: '', cli_contrasenia: '' }


export const useClient = (setPage:Dispatch<React.SetStateAction<string>>) => {

    const url_api = 'http://localhost:8001'

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

        cliente.cli_nombre ? createClient() : loginClient()
    }

    const loginClient = async () => {
        try {
            const sign = cliente as Sign
            const response = await fetch(`${url_api}/login_clientes/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sign)
            })

            if (!response.ok) throw new Error(`Error: ${response.statusText}`);

            const data = await response.json();
            
            if(data.status === 'error') throw new Error(data.message)
            
            const logCliente: Clientes = {
                cli_cedula: data.cli_cedula,
                cli_nombre: data.cli_nombre,
                cli_apellido: data.cli_apellido,
                cli_correo: data.cli_correo,
                cli_celular: data.cli_celular,
                cli_direccion: data.cli_direccion,
                cli_contrasenia: ''
            }

            setCliente(logCliente);
            alert('Logeado correctamente')
            setPage(allRoutesComponents.storeProducts)
        } catch (error) {
            console.log(error)
        }
    }

    const createClient = async () => {

        try {
            const response = await fetch(`${url_api}/add_cliente/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cliente)
            })

            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            alert('Se ha registrado correctamente')
            setPage(allRoutesComponents.storeProducts)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        cliente,
        handleChange,
        handleSubmit,
        isValidForm,
        createClient,
    }
}