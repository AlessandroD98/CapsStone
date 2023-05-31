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
    preventives: IPreventive[]
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
    height: number,
    width: number,
    thickness: number,
    type: string,
    material: IMaterial | IMaterialLock | null;
} 

export interface IPreventive {
articles: IArticle[]
inspectionDate: string,
inspectionHour: IHour,
cliente: IPrevUser,
description: string,
state: string

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
    dimension : IGenericCheck
    material: IGenericCheck
    summary: IGenericCheck
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
export interface IGenericCheck{
    inputs : boolean
}

export interface IHour {
    hour: string;
  }

export interface IMaterial {
    materialCode: string;
    material: string;
    priceMin: number;
    priceMax: number;
}

export interface IMaterialLock {
    materialCode: string;
    lockType: string;
    priceMin: number;
    priceMax: number;
}