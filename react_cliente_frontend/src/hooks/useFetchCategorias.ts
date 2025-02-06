import { useEffect, useState } from "react"
import { Categorias } from "../types"


export const useFetchCategorias = () => {
    const url_api = 'http://localhost:8000'

    const categoriaInicial: Categorias[] = []

    const [categorias, setCategorias] = useState(categoriaInicial)

    useEffect(() => {
        fetch(`${url_api}/categorias/`)
            .then((response) => response.json())
            .then((cat: Categorias[]) => setCategorias(cat))
            .catch((error) =>
                console.error(error)
            )
    }, [])

    return {
        categorias
    }
}