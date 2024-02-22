import {Header} from "@/components/header.tsx";
import {store} from "@/store/store.ts";
import {Provider} from "react-redux";

function App() {

    return (
        <Provider store={store}>
            <div>
                <Header/>
                <div>

                </div>
                <div>

                </div>
            </div>
        </Provider>
    )
}

export default App
