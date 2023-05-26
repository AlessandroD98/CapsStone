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
    address: string
    city: string
    zipCode: string
}

export interface IUpdateUser {
    id: number
    name: string
    lastname: string
    telefono: number
}

export interface IStep {
    description: String,
    highlighted: boolean;
    selected: boolean;
    completed: boolean;
  }

export interface IArticle {
    id: number,
    nameArticle: string,
    price: number,
    height: number,
    width: number,
    thickness: number,
    type: string,
} 

export interface IPreventive {
articles: IArticle[]
inspectionDate: "",
cliente: IPrevUser,
description: string,
}

export interface IPrevUser {
    name : string,
    lastname: string,
    email: string,
    tel: number,
    city: string,
    zipCode: string,
    address: string,
}

export interface ICheck {
    profile : IProfileCheck
    article : IArticleCheck
    timing : ITimingCheck
}

export interface IProfileCheck {
   inputs : boolean
}

export interface IArticleCheck {
    inputs : boolean
}
export interface ITimingCheck {
    inputs : boolean
}
