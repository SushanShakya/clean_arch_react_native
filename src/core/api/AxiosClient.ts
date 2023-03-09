import axios from 'axios'
import { BaseURL } from '../constants/strings'

export const axiosClient = axios.create({
    baseURL: BaseURL,
    timeout: 5 * 60 * 1000,
})