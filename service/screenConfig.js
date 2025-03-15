import axios from "axios";
import api from "../utils/HttpClient";

const base_url = 'https://prod.wheelz365.com';

class ScreenConfig {

    static async fetchProfileScreenConfig() {
        try{
            const screen_name = 'home_screen';
            const response = await axios.get('https://prod.wheelz365.com/screen/config/screen_name/'+screen_name);
            console.log(response.data);
            return JSON.stringify(response.data.data)
        } catch(err) {
            console.log("ERROR");
            console.log(err);
            return null;
        }
    }

    async fetchHelpAndSupportScreenConfig() {
        return null;
    }

    static async fetchRefferAndEarnScreenConfig() {
        return null;
    }

    async fetchHomeScreenNavOptionConfig(screen_name) {
        try{
            const response = await axios.get('https://prod.wheelz365.com/screen/config/screen_name/'+screen_name);
            console.log(response.data);
            return JSON.stringify(response.data.data)
        } catch(err) {
            console.log("ERROR");
            console.log(err);
            return null;
        }
    }

    async fetchScreenConfig(screen_name) {
        try {
            const response = await axios.get(`${base_url}/screen/config/screen_name/`+screen_name);
            return response.data.data;
        } catch (err) {
            console.log(err);
        }
    }


    async fetchPassCardConfig(component_name) {
        try {
            return {
                daily_pass : {
                    title1: 'Daily Pass',
                    title2: 'A comprehensive cleaning with wash, glass and interior cleaning',
                    icon:'ticket-outline',
                    iconType:'ionicon',
                    iconColor:'black'
                }
            }
            
        } catch(err) {
            return null;
        }
    }

    static fetchSignInScreenConfig() {
        return {
            normal_phone : {
                regex: /^\d{10}$/,
                errorMessage: 'Invalid phone number'
            },
            normal_password : {
                regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                errorMessage: 'Password must be at least 8 characters, including uppercase, lowercase, digits, and special characters'
            },
            normal_email : {
                regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                errorMessage: 'Invalid email address'
            },
            refferal_code : {
                regex: '',
                errorMessage: 'Invalid email address'
            }
        };
    }
}

export default new ScreenConfig();