export interface UsersData {
    id?: number,
    name: string,
    email:string,
    password: string,
    active?: boolean
}
export interface Login {
    id?: number,
    name: string,
    description:string,
    value_init: number,
    value_rest: number,
    active?: boolean
}