import {TargetCurrencySelect} from "@/components/TargetCurrencySelect.tsx";
import {useAppSelector} from "@/store/store.ts";
import {selectTargetCurrency} from "@/store/targetCurrencySlice.ts";
import {useEffect} from "react";
import {Connector} from "@/lib/SignalR/Connector.ts";

export const Header = () => {
    const targetCurrency = useAppSelector(selectTargetCurrency);
    useEffect(() => {
        void Connector.invoke("SetConnectionTargetCurrency", targetCurrency)
    }, [targetCurrency]);
    return (
        <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
            <div className="ml-auto flex gap-2">
                <TargetCurrencySelect/>
            </div>
        </header>
    );
};
