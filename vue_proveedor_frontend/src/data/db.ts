import type { Clientes, Categorias, Proveedores, Productos } from "@/types"

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
        pro_id: 1,
        pro_descripcion: 'Guitarra Campbell',
        pro_precio_unitario: 345,
        pro_stock: 84,
        fk_cat_id: dbCategorias[0].cat_id,
        pro_imagen: 'guitarra_10',
        fk_pro_provid: dbProveedores[0].prov_id
    }
]