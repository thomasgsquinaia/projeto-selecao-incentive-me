export interface PaymentsData {
    id?: number,
    name: string,
    description:string,
    value: number,
    balance_id?: number,
    active?: boolean
}
export interface UpdatePaymentsData {
    id: number,
    name: string    
}
export interface DeletePaymentsData {
    id: number 
}
