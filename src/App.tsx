import {Header} from "@/components/header.tsx";
import {store} from "@/store/store.ts";
import {Provider} from "react-redux";
import {Listings} from "@/components/Listings/Listings.tsx";
import {useEffect} from "react";
import {Connector} from "@/lib/SignalR/Connector.ts";
import {Toaster} from "@/components/ui/sonner.tsx";
import {toast} from "sonner"

function App() {
    useEffect(
        () => {
            const callback = async () => {
                await Connector.connect();
                Connector.setListener({
                    name: 'ReceiveError', callback: (responseDto) => {
                        toast(responseDto.description)
                    }
                })
            }
            void callback();
        }
        , []
    )

    return (
        <Provider store={store}>
            <Toaster/>
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
