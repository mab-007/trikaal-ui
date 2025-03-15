import axios from "axios";

const base_url = 'https://prod.wheelz365.com';

class AddressService {

    async addNewAddress(user_id, addressObj) {
        try {
            const response = await axios.post(`${base_url}/address`, addressObj ,{ params: { user_id } });
            if(!response.data?.success) throw new Error(`Error in adding new address \n` + response?.data?.error)
            return response.data?.data;
        }catch(err) {
            console.error('Error in add new address');
            return null;
        }
    }

    async fetchAllAddress(user_id) {
        try {
            const response = await axios.get(`${base_url}/address/list`, { params: {user_id }});
            if(!response.status)
                throw new Error(`Error in fetching address list`+ response?.error);
            return response.data.data;
        } catch(err) {
            console.error(`Error in fetching address list from the backend \n` + err);
            return [];
        }

        return null;
    }


    async fetchAddressDetailsById(id) {
        try {
            const response = await axios.get(`${base_url}/address/address_id/${id}`);
            return response.data.data;
        } catch(err) {
            console.error(`Error in fetching details from backed \n` + err);
            return null;
        }
    }

    async updateAddressDetails(user_id, addressObj) {
        try {
            const response = await axios.post(`${base_url}/address`, addressObj ,{ params: { user_id } });
            if(!response.data?.success) throw new Error(`Error in adding new address \n` + response?.data?.error)
            return response.data?.data;
        }catch(err) {
            console.error('Error in add new address');
            return null;
        }
    }
}

export default new AddressService();