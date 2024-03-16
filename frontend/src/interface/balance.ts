export interface BalanceData {
    id?: number,
    name: string,
    description:string,
    value_init: number,
    active?: boolean
}
export interface UpdateBalanceData {
    id?: number,
    name: string    
}
export interface DeleteBalanceData {
    id: number 
}
