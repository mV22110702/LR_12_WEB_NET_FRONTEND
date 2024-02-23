import {getKeyByValue} from "@/lib/utils.ts";
import {CurrencyId} from "@/lib/enums/currencyId.enum.ts";
import {selectTargetCurrency} from "@/store/targetCurrencySlice.ts";
import {useAppSelector} from "@/store/store.ts";
import {useGetLatestListingsQuery} from "@/store/apiSlice.ts";
import {useMemo} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Listing} from "@/lib/SignalR/Connector.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";

export const Listings: React.FC = () => {
    const targetCurrency = useAppSelector(selectTargetCurrency);
    const latestListings = useGetLatestListingsQuery();
    const listings: Listing[] = useMemo(() => !latestListings.data?.data ? [] : latestListings.data.data.map(datum => {
            console.log((getKeyByValue(CurrencyId, targetCurrency) as string).toUpperCase())
            console.log(datum.quote[
                (getKeyByValue(CurrencyId, targetCurrency) as string).toUpperCase()
                ]?.price ?? 0)
            return {
                name: datum.symbol,
                quoteName: (getKeyByValue(CurrencyId, targetCurrency) as string).toUpperCase(),
                price: datum.quote[
                    (getKeyByValue(CurrencyId, targetCurrency) as string).toUpperCase()
                    ]?.price ?? 0,
                lastUpdated: datum.quote[
                    (getKeyByValue(CurrencyId, targetCurrency) as string).toUpperCase()
                    ]?.last_updated ?? Date.now()
            }
        }
    ), [latestListings.data?.data, targetCurrency]);
    let content: React.ReactNode = (<>
        <Skeleton className="h-4 w-[250px]"/>
        <Skeleton className="h-4 w-[250px]"/>
        <Skeleton className="h-4 w-[250px]"/>
    </>)
    if (latestListings.isSuccess) {
        content = listings.map((listing, index) => {
            return <TableRow key={index}>
                <TableCell className="text-center">{listing.name}</TableCell>
                <TableCell className="text-center">{listing.quoteName}</TableCell>
                <TableCell className="text-center">{listing.price.toFixed(2)}</TableCell>
                <TableCell className="text-center">{listing.lastUpdated.toLocaleString()}</TableCell>
            </TableRow>
        });
    }
    return <div>
        {/*{JSON.stringify(listings, null, 2)}*/}
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center">Source Currency</TableHead>
                    <TableHead className="text-center">Target Currency</TableHead>
                    <TableHead className='text-center'>Price</TableHead>
                    <TableHead className='text-center'>Last Updated</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {content}
            </TableBody>
        </Table>
    </div>
}
