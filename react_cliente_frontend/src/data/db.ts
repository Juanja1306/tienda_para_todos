import { Categorias, Clientes, Productos, Proveedores } from "../types";


export const dbClientes: Clientes[] = [
    {
        cli_cedula: '0110838480',
        cli_nombre: 'Felipe',
        cli_apellido: 'Sanchez',
        cli_correo: 'felisan@gmail.com',
        cli_celular: '0912523800',
        cli_direccion: 'San Blas',
        cli_contrasenia: 'clave_123',
    }
]

export const dbCategorias: Categorias[] = [
    {
        cat_id: 1,
        cat_descripcion: 'Instrumentos musicales'
    }
]

export const dbProveedores: Proveedores[] = [
    {
        prov_id: 1,
        prov_nombre: 'GuitarLSA',
        prov_numero: '0985236741',
        prov_correo: ' guitarlsa@gmail.com',
        prov_contrasenia: 'guitar_123',
        prov_direccion: 'Parque Induistrial',
    }

]
export const dbProductos: Productos[] = [
    {
        prod_id: 1,
        prod_descripcion: 'Guitarra Campbell',
        prod_precio_unitario: 345,
        prod_stock: 84,
        fk_cat_id: dbCategorias[0].cat_id,
        prod_imagen: 'guitarra_10',
        fk_pro_provid: dbProveedores[0].prov_id
    }
]

/**@description objeto para redireccionar las páginas */
export const allRoutesComponents = {
    storeProducts: 'home',
    login: 'login',
    signUp: 'signUp'
}