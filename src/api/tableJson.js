import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_IP

export const API={
    async getJSON (){
        return axios.get(`${BASE_URL}/api/monitoring-data`, {})
    }
}