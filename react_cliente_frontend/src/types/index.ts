//* Modelos de Base de Datos
export type Clientes = {
    cli_cedula: string //✔️
    cli_nombre: string // ✔️
    cli_apellido: string //✔️
    cli_correo: string //✔️
    cli_celular: string // 
    cli_direccion: string // ✔️
    cli_contrasenia: string //✔️
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
    prod_id: number
    prod_descripcion: string
    prod_precio_unitario: number
    prod_stock: number
    fk_cat_id: Categorias['cat_id']
    imagen: string
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
    fk_prod_id: Productos['prod_id']
    detalle_cantidad: Productos['prod_id']
    detalle_precio: number
}

//* Modelos para la App
export type CartItem = Pick<Productos, 'prod_id' | 'prod_descripcion' | 'prod_precio_unitario' | 'imagen' | 'fk_cat_id' | 'fk_pro_provid'> & {
    cantidad: number
}

export type OrderProduct = {
    prod_id: number;
    prod_stock: number;
};

export type OrderRequest = {
    cli_cedula: string;
    productos: OrderProduct[];
};

export type ProductosVendidos = {
    prod_id: number
    prod_descripcion: string
    prod_precio_unitario: string | number
    detalle_cantidad: number
}
export type GetOrderRequest = {
    prov_id: number
    productos_vendidos: ProductosVendidos[]
}

export type Sign = Pick<Clientes, 'cli_correo' | 'cli_contrasenia'>

export type SignProv = Pick<Proveedores, 'prov_correo' | 'prov_contrasenia'>

export type CreateProduct = Pick<Productos, 'prod_id' | 'prod_descripcion' | 'prod_precio_unitario' | 'prod_stock'> & {
    fk_categoria_id: number
    prod_imagen: string
    fk_prov_id: number
}