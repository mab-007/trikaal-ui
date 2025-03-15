import axios from "axios";

const base_url = `https://prod.wheelz365.com`

class ProfileService {

    async fetchProfileDetails(user_id) {
        try {
            const response = await axios.get(`${base_url}/user/id`, { params: { user_id } });
            return response.data.data;
        } catch (error) {
            console.error(`Error in fetching user details from backed \n`+error);
            return null;
        }
    }

    async editProfileDetails() {
        return null
    }

    async updateUserProfile(user_id, user_name, phone_no, user_email_id) {
        try {
            const response = await axios.post(`${base_url}/user`, {user_name, phone_no, user_email_id, status:'ACTIVE'}, { params: { user_id } })
            if(!response.status) {
                throw new Error(`Error in updating profile`);
            }
            return response.data;
        } catch (err) {
            console.error(`Error in updating user profile \n` + err);
            return null;
        }
    }
}

export default new ProfileService();