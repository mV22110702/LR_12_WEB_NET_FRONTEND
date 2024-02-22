import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {CurrencyId} from "@/lib/enums/currencyId.enum.ts";
import {targetCurrencySlice} from "@/store/targetCurrencySlice.ts";
import {useAppDispatch} from "@/store/store.ts";

export const TargetCurrencySelect = () => {
    const setTargetCurrency = targetCurrencySlice.actions.setTargetCurrency;
    const dispatch = useAppDispatch()
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Target currency"/>
            </SelectTrigger>
            <SelectContent>
                {Object.entries(CurrencyId).map(([k, v]) => {
                    return <SelectItem
                        key={v}
                        value={k}
                        onClick={() => dispatch(setTargetCurrency(v))}
                    >
                        {k.toUpperCase()}
                    </SelectItem>;
                })}
            </SelectContent>
        </Select>);
}
