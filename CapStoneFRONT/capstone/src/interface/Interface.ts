export interface IUser {
    username: string,
    password: string,
    roles: String[],
    accessToken: String,
}

interface IRole{
    id: number
    roleName: string
}

export interface ICliente {
    name: string
    lastname:string
    email: string,
    id_cliente: number,
    password: string,
    preventives: String[]
    roles: IRole[]
    telefono: number
    username: string
}

export interface IUpdateUser {
    id: number
    name: string
    lastname: string
    telefono: number
}