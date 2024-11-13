import { useEffect, useState } from "react"
import { Categorias } from "../types"


export const useFetchCategorias = () => {
    const url_api = 'http://localhost:8001'

    const categoriasIniciales: Categorias[] = []
    const categoriaInicial: Categorias = { cat_id: 0, cat_descripcion: '' }

    const [filterCat, setFilterCat] = useState(categoriaInicial.cat_id)
    const [categorias, setCategorias] = useState(categoriasIniciales)

    useEffect(() => {
        fetch(`${url_api}/categorias/`)
            .then((response) => response.json())
            .then((cat: Categorias[]) => setCategorias(cat))
            .catch((error) =>
                console.error(error)
            )
    }, [])

    const handleSelectChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const categorySelected = event.target.value
       setFilterCat(+categorySelected)
    }


    return {
        categorias,
        filterCat,
        handleSelectChangeCategory
    }
}