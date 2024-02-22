import {Header} from "@/components/header.tsx";
import {store} from "@/store/store.ts";
import {Provider} from "react-redux";
import {Listings} from "@/components/Listings/Listings.tsx";

function App() {

    return (
        <Provider store={store}>
            <div>
                <Header/>
                <Listings/>
                <div>

                </div>
            </div>
        </Provider>
    )
}

export default App
