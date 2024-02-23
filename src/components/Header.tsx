import {CustomSelect} from "@/components/CustomSelect.tsx";
import {useAppDispatch, useAppSelector} from "@/store/store.ts";
import {CurrencyIdValues, selectTargetCurrency, targetCurrencySlice} from "@/store/targetCurrencySlice.ts";
import {useEffect} from "react";
import {Connector} from "@/lib/SignalR/Connector.ts";
import {CurrencyItems} from "@/lib/enums/currencyId.enum.ts";


export const Header = () => {
    const targetCurrency = useAppSelector(selectTargetCurrency);
    useEffect(() => {
        void Connector.invoke("SetConnectionTargetCurrency", targetCurrency)
    }, [targetCurrency]);
    const setTargetCurrency = targetCurrencySlice.actions.setTargetCurrency;
    const dispatch = useAppDispatch()
    return (
        <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
            <div className="ml-auto flex gap-2">
                <CustomSelect
                    placeholder={'Target currency'}
                    value={targetCurrency.toString()}
                    onClick={(v) => dispatch(setTargetCurrency(Number.parseInt(v) as CurrencyIdValues))}
                    items={CurrencyItems}
                />
            </div>
        </header>
    );
};
