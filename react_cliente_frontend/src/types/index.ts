//* Modelos de Base de Datos
export type Clientes = {
    cli_cedula: string
    cli_nombre: string
    cli_apellido: string
    cli_correo: string
    cli_celular: string
    cli_direccion: string
    cli_contrasenia: string
}

export type Categorias = {
    cat_id: number
    cat_descripcion: string
}

export type Proveedores = {
    prov_id: number
    prov_nombre: string
    prov_numero: string
    prov_correo: string
    prov_contrasenia: string
    prov_direccion: string
}

export type Productos = {
    pro_id: number
    pro_descripcion: string
    pro_precio_unitario: number
    pro_stock: number
    fk_cat_id: Categorias['cat_id']
    pro_imagen: string
    fk_pro_provid: Proveedores['prov_id']
}

export type Ordenes_Cli = {
    orden_id: number
    fk_cli_cedula: string
    orden_fecha: Clientes['cli_cedula']
    orden_total: number
}

export type Detalle_Ordenes_Cli = {
    detalle_id: number
    fk_orden_id: Ordenes_Cli['orden_id']
    fk_prod_id: Productos['pro_id']
    detalle_cantidad: Productos['pro_id']
    detalle_precio: number
}

//* Modelos para la App
export type CartItem = Pick<Productos, 'pro_id' | 'pro_descripcion' | 'pro_precio_unitario'| 'pro_imagen' | 'fk_cat_id'| 'fk_pro_provid'>  & {
    cantidad : number
}

