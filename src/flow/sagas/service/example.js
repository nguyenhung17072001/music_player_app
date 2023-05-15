"use strict";
import axios from '../../util/http/http';
import {URL} from '../../util/url.js';
export async function exampleService(params){
    return axios.post(URL.example.login, params);
}