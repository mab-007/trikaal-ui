import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./Index";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Index() {

  return (
    <Provider store={store}>
          <GestureHandlerRootView style={{ flex: 1 }}>
              <App />
          </GestureHandlerRootView>
    </Provider>
  );
}
