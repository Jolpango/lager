import config from "../config/config.json";
import storage from "./storage";

const authModel = {
    loggidIn: async function (): Promise<boolean> {
        const tokenData = await storage.readToken();
        const twentyFourHours = 1000*60*60*24;
        const notExpired = (new Date().getTime() - tokenData.date) < twentyFourHours;
        return tokenData.token && notExpired;
    },
    login: async function (email: string, password: string) {
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
        if(result.errors) {
            return false;
        }
        await storage.storeToken(result.data.token);
        return true;
    },
    register: async function(email: string, password: string) {
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
        return await response.json();
    }
};

export default authModel;