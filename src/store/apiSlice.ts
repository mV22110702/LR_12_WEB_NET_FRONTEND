import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {GetLatestListingsResponse} from "@/lib/GetLatestListingsResponse.ts";
import {ApiRoute} from "@/lib/api-route.enum.ts";
import {Connector} from "@/lib/SignalR/Connector.ts";
import {ResponseDto} from "@/lib/types.ts";

export const apiSlice = createApi({
    reducerPath: 'base',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_URL,
        mode: 'cors',
        headers: {'Content-Type': 'application/json'}
    }),
    endpoints: (builder) => ({
        getLatestListings: builder.query<GetLatestListingsResponse, void>({
            query: () => ({
                method: 'POST',
                url: ApiRoute.LISTINGS.LATEST,
                body:{}
            }),
            transformResponse: (response: ResponseDto<GetLatestListingsResponse>) => {
                console.log('=================')
                console.log(response.values[0])
                console.log('=================')
                return response.values[0]
            },
            async onCacheEntryAdded(
                _,
                {updateCachedData, cacheDataLoaded, cacheEntryRemoved}
            ) {
                try {
                    await cacheDataLoaded
                    await Connector.connect()
                    Connector.setListener(
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
                    Connector.removeListener("GetLatestListings")
                    await Connector.disconnect()
                }
                await cacheEntryRemoved
                Connector.removeListener("GetLatestListings")
                await Connector.disconnect()
            },
        }),
    }),
});

export const {useGetLatestListingsQuery} = apiSlice;
