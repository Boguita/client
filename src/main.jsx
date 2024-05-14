import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContexProvider } from "./context/authContext";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
const store = configureStore();
console.log("store", store);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AuthContexProvider>
      <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
        <App />
      </PrimeReactProvider>
    </AuthContexProvider>
  </Provider>
);
