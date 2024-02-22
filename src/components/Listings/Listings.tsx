import {getKeyByValue} from "@/lib/utils.ts";
import {CurrencyId} from "@/lib/enums/currencyId.enum.ts";
import {selectTargetCurrency, targetCurrencySlice} from "@/store/targetCurrencySlice.ts";
import {useAppDispatch, useAppSelector} from "@/store/store.ts";
import {useGetLatestListingsQuery} from "@/store/apiSlice.ts";
import {useEffect, useMemo} from "react";


export const Listings: React.FC = () => {
    const targetCurrency = useAppSelector(selectTargetCurrency);
    const latestListings = useGetLatestListingsQuery();
    console.log('latestListings.data')
    console.log(latestListings.data)
    const dispatch = useAppDispatch();
    const listings = useMemo(() => !latestListings.data?.data ? [] : latestListings.data.data.map(datum => {
            console.log('_________')
        console.log((getKeyByValue(CurrencyId, targetCurrency) as string).toUpperCase())
            console.log(datum.quote[
                (getKeyByValue(CurrencyId, targetCurrency) as string).toUpperCase()
                ]?.price??0)
            return {
                name: datum.name,
                quoteName: (getKeyByValue(CurrencyId, targetCurrency) as string).toUpperCase(),
                price: datum.quote[
                    (getKeyByValue(CurrencyId, targetCurrency) as string).toUpperCase()
                    ]?.price??0
            }
        }
    ), [latestListings.data?.data, targetCurrency]);
    useEffect(() => {
        setTimeout(()=>dispatch(targetCurrencySlice.actions.setTargetCurrency(CurrencyId.Aed)),3000);
    }, []);

    console.log("listings")
    console.log(listings)
    return <div>
        {JSON.stringify(listings, null, 2)}
    </div>
}
