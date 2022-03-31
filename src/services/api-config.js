import axios from "axios";


const baseURL = process.env.NODE_ENV === "production" ? "someherokuurl" : "http://localhost:3000";

const API = axios.create({baseURL: baseURL,});


export default API;