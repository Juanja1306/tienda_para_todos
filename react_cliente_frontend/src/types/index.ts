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
    ord_cli_id: number
    ord_cli_fecha: string
    fk_ord_cli_cedula: Clientes['cli_cedula']
    ord_cli_total: number
}

export type Detalle_Ordenes_Cli = {
    det_ord_id: number
    fk_det_ord_ordenid: Ordenes_Cli['ord_cli_id']
    det_ord_cantidad: number
    fk_det_ord_prod: Productos['pro_id']
    det_ord_precio: number
}

//* Modelos para la App

export type CartItem = Pick<Productos, 'pro_id' | 'pro_descripcion' | 'pro_precio_unitario'| 'pro_imagen' | 'fk_cat_id'| 'fk_pro_provid'>  & {
    cantidad : number
}

