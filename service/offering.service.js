import axios from "axios";

const base_url = `https://prod.wheelz365.com`

class OfferingService {

    async fetchCurrentOfferingsAndConfig() {

    }

    async fetchPassDetails() {
        
    }

    async fetchActiveCarCleaningPlan(service_type) {

        try {
            const response = await axios.get(`${base_url}/offer/plan`, { params: { plan_type: service_type, plan_status: 'ACTIVE' }})
            const responseData = response.data.data;
            //console.log(responseData);
            let result = [];
            for(let i = 0;i<responseData.length;i++){
                const obj = {
                    id: responseData[i]?.plan_id,
                    title: responseData[i].plan_name,
                    price: responseData[i].plan_amount,
                    offerPrice: responseData[i].plan_offer_price,
                    description: responseData[i].description,
                    image: responseData[i].plan_name === 'Suv' ? require("../assets/suv.webp") : responseData[i].plan_name === 'Luxe' ?  require("../assets/luxe.webp") : require("../assets/uber_car.webp")
                }
                result.push(obj);
            }
            return result;
        } catch (err) {
            console.error(`Error in fetching plan car cleaning \n` + err);
            return null;
        }
    }

    async fetchActiveBikeCleaningPlan(service_type) {

        try {
            const response = await axios.get(`${base_url}/offer/plan`, { params: { plan_type: service_type, plan_status: 'ACTIVE' }})
            const responseData = response.data.data;
            let result = [];
            for(let i = 0;i<responseData.length;i++){
                const obj = {
                    id: responseData[i]?.plan_id,
                    title: responseData[i].plan_name,
                    price: responseData[i].plan_amount,
                    offerPrice: responseData[i].plan_offer_price,
                    description: responseData[i].description,
                    image: responseData[i].plan_name === 'Scooty' ? require("../assets/scooty_logo.png") : responseData[i].plan_name === 'Luxe' ?  require("../assets/bike-luxe.jpg") : require("../assets/bike_logo.png")
                }
                result.push(obj);
            }
            return result;
        } catch (err) {
            console.error(`Error in fetching plan car cleaning \n` + err);
            return null;
        }
    }
}


export default new OfferingService();