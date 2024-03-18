import axios from "axios";
import { BalanceData, UpdateBalanceData } from "./interface/balance";
import { PaymentsData } from "./interface/payments";
import { UsersData } from "./interface/users"

// export const BASE_API = 'http://localhost:3001/v1';
export const BASE_API = 'https://projeto-selecao-incentive-me.onrender.com/v1';

type Login = {
    email: string;
    password: string;
};

// Login
export async function LoginUser(props: Login) {
    try {
        const response = await axios.post(`${BASE_API}/login`, {
            email: props.email,
            password: props.password,
        });
        console.log('API loginUser: ',response);
        return response.data;
    } catch (error) {
        return { error: error };
    }
}

//AddFirstUser
export async function addFirstUser(props: UsersData) {
    try {
        const response = await axios.post(`${BASE_API}/login/addFirstUser`, {
            name: props.name,
            email: props.email,
            password: props.password,
        });
        return response.data;
    } catch (error) {
        return { error: error };
    }
}

// BALANCE
export async function getBalance() {
    try {
        const response = await axios.get(`${BASE_API}/balance`);
        return response.data;
    } catch (error) {
        return { error: error };
    }
}

export async function addBalance(props: BalanceData) {
    try {
        const response = await axios.post(`${BASE_API}/balance`, {
            name: props.name,
            description: props.description,
            value_init: props.value_init
        });
        return response.data;
    } catch (error) {
        return { error: error };
    }
}

export async function updateBalance(props: UpdateBalanceData) {
    try {
        const response = await axios.put(`${BASE_API}/balance`, {
            id: props.id,
            name: props.name
        });
        return response.data;
    } catch (error) {
        return { error: error };
    }
}

export async function deleteBalance(id: {id:number}) {
    try {
        const response = await axios.delete(`${BASE_API}/balance/${id}`);
        return response.data;
    } catch (error) {
        return { error: error };
    }
}

// PAYMENTS
export async function getPayments() {
    try {
        const response = await axios.get(`${BASE_API}/payments`);
        return response.data;
    } catch (error) {
        return { error: error };
    }
}
export async function getPaymentById(id: {id:number}) {
    try {
        const response = await axios.get(`${BASE_API}/payments/${id}`);
        return response.data;
    } catch (error) {
        return { error: error };
    }
}

export async function addPayments(props: PaymentsData) {
    try {
        const response = await axios.post(`${BASE_API}/payments`, {
            name: props.name,
            description: props.description,
            value: props.value,
            balance_id: props.balance_id,
        });
        return response.data;
    } catch (error) {
        return { error: error };
    }
}

export async function updatePayments(props: UpdateBalanceData) {
    try {
        const response = await axios.put(`${BASE_API}/payments`, {
            id: props.id,
            name: props.name
        });
        return response.data;
    } catch (error) {
        return { error: error };
    }
}

export async function deletePayments(id: {id:number}) {
    try {
        const response = await axios.delete(`${BASE_API}/payments/${id}`);
        return response.data;
    } catch (error) {
        return { error: error };
    }
}