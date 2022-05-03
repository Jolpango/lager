import { MessageOptions } from "react-native-flash-message";
import config from "../config/config.json";
import storage from "./storage";

const authModel = {
    loggidIn: async function (): Promise<boolean> {
        const tokenData = await storage.readToken();
        const twentyFourHours = 1000*60*60*24;
        const notExpired = (new Date().getTime() - tokenData.date) < twentyFourHours;
        return tokenData.token && notExpired;
    },
    login: async function (email: string, password: string): Promise<MessageOptions> {
        const data = {
            api_key: config.api_key,
            email: email,
            password: password
        };
        const response = await fetch(`${config.base_url}/auth/login`, {
            method:"POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json"
            }
        });
        const result = await response.json();
        if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
            return {
                message: result.errors.title,
                description: result.errors.detail,
                type: "danger",
            };
        }
        await storage.storeToken(result.data.token);
        return {
            message: "Inloggning",
            description: result.data.message,
            type: "success",
        };
    },
    register: async function(email: string, password: string): Promise<MessageOptions> {
        const data = {
            api_key: config.api_key,
            email: email,
            password: password
        };
        const response = await fetch(`${config.base_url}/auth/register`, {
            method:"POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json"
            }
        });
        const result = await response.json();
        if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
            return {
                message: result.errors.title,
                description: result.errors.detail,
                type: "danger",
            };
        }
        return {
            message: "Registrering",
            description: result.data.message,
            type: "success",
        };
    },
    isValidEmail: function (email: string): boolean {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return email.match(pattern) !== null;
    },
    isValidPassword: function (password: string): boolean {
        const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        return password.match(pattern) !== null;
    }
};

export default authModel;