import axios from 'axios';
import React from 'react';

const instance = axios.create({
    baseURL: 'http://sipshrms.in/vts/index.php/'
});
export const instance2 = axios.create({
    baseURL: 'http://sipshrms.in/vts/'
});
export const instance3 = axios.create({
    baseURL: 'http://sipshrms.in/vts/index.php/'
});
export default instance
