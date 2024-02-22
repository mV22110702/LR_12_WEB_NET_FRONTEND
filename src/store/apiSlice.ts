import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {GetLatestListingsResponse} from "@/lib/GetLatestListingsResponse.ts";
import {ApiRoute} from "@/lib/api-route.enum.ts";
import Connector from "@/lib/SignalR/Connector.ts";

export const apiSlice = createApi({
    reducerPath: 'base',
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_SERVER_URL, mode: 'cors'}),
    endpoints: (builder) => ({
        getLatestListings: builder.query<GetLatestListingsResponse, void>({
            query: () => ApiRoute.LISTINGS.LATEST,
            async onCacheEntryAdded(
                _,
                {updateCachedData, cacheDataLoaded, cacheEntryRemoved}
            ) {
                let connector: ReturnType<typeof Connector> | undefined;
                try {
                    await cacheDataLoaded
                    const connector = Connector();
                    connector.setListener(
                        {
                            name: "GetLatestListings",
                            callback: (params) => {
                                updateCachedData(draft => {
                                    draft.Data = params.Data
                                    draft.Status = params.Status
                                })
                            }
                        }
                    );
                } catch {
                    // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
                    // in which case `cacheDataLoaded` will throw
                }
                await cacheEntryRemoved
                connector?.removeListener("GetLatestListings")
            },
        }),
    }),
});

export const {useGetLatestListingsQuery} = apiSlice;
