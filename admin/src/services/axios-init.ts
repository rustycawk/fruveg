import axios from 'axios'

export const HOST = axios.create({
    baseURL:process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})

export const FILE_HOST = axios.create({
    baseURL:process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
})
