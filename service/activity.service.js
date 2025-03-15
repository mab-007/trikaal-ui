import axios from "axios";

const base_url = `https://prod.wheelz365.com`

class ActivityService {

    async fetchRecentActivity() {
        return null;
    }

    async fetchActivityList(user_id) {
        try {
            const response = await axios.get(`${base_url}/activity/list`, { params: { user_id } });
            if(!response.data.status)
                throw new Error(`Error in fetch list from backend` + response.error)
            return response.data.data;
        } catch (err) {
            console.error(`Error in fetch task list from backend \n` + err);
            return [];
        }
    }

    async fetchActivityDetailsById(activity_id) {
        try {
            const response = await axios.get(`${base_url}/activity/details`, { params: { activity_id } });
            if(!response.data?.status){
                throw new Error(`Error in fetching activity Details`)
            }
            return response.data.data;
        } catch (err) {
            console.error(`Error in fetching activity details \n`+err);
            return null;
        }
    }

    async reportIssueInActivity() {
        return null;
    }

    async createActivity(activityObj) {
        try {
            const response = await axios.post(`${base_url}/activity`, activityObj);
            if(!response.data.status) {
                throw new Error(`Error in creating order`)
            }
            return response.data
        } catch(err) {
            console.error(`Error in creating order from backedn \n` + err);
            return null;
        }
    }
}

export default new ActivityService();