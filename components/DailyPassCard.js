import { View } from "react-native";
import NavOptions from "./NavOptions";

const data = [

]


const DailyPassCard = () => {

    return (
        <View>
            <NavOptions param1='HomeScreen' param2={data} />
        </View>
    )
}

export default DailyPassCard;