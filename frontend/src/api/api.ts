import axios, { AxiosInstance } from "axios";

const api = (bearerToken: string): AxiosInstance => {
    const api = axios.create({
        baseURL: "http://localhost:3001/",
        headers: {
            Authorization: `Bearer ${bearerToken}`
        }
    })

    api.defaults.withCredentials = true;
    return api
}

export { api}