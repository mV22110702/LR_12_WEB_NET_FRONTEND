import {useMemo} from "react";
import {getKeyByValue} from "@/lib/utils.ts";
import {CurrencyId} from "@/lib/enums/currencyId.enum.ts";
import {selectTargetCurrency} from "@/store/targetCurrencySlice.ts";
import {useAppSelector} from "@/store/store.ts";
import {useGetLatestListingsQuery} from "@/store/apiSlice.ts";


export const Listings: React.FC = () => {
    const targetCurrency = useAppSelector(selectTargetCurrency);
    const latestListings = useGetLatestListingsQuery();

    const listings = useMemo(() => !latestListings.data ? [] : latestListings.data.Data.map(datum => {
            return {
                name: datum.Name,
                quoteName: (getKeyByValue(CurrencyId, targetCurrency) as string).toUpperCase(),
                price: datum.Quote[
                    getKeyByValue(CurrencyId, targetCurrency) as string
                    ].Price
            }
        }
    ), [latestListings]);
    return <div>
        {JSON.stringify(listings)}
    </div>
}
