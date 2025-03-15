import axios from "axios";

const base_url = 'https://prod.wheelz365.com';

class HelpAndSupport {

    async postHelpAndSupportQuery(user_id, mode, app_name) {
        try {
            const response = await axios.post(`${base_url}/help_and_support`, {user_id, mode, app_name});
            console.log(response);
            if(!response.status)
                throw new Error(`Error in updating help and support query` + response?.error);
            return true;
        } catch(err) {
            console.log(`Error in publishing help and support \n`+err);
        }
    }
}

export default new HelpAndSupport();