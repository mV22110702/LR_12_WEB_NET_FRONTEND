import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {GetLatestListingsResponse} from "@/lib/GetLatestListingsResponse.ts";
import {ApiRoute} from "@/lib/api-route.enum.ts";
import {Connector} from "@/lib/SignalR/Connector.ts";
import {ResponseDto} from "@/lib/types.ts";
import {GetLatestQuoteResponse} from "@/lib/GetLatestQuoteResponse.ts";
import {GetLatestQuoteDto} from "@/lib/GetLatestQuoteDto.ts";
import {GetLatestListingsDto} from "@/lib/GetLatestListingsDto.ts";

export const apiSlice = createApi({
    reducerPath: 'base',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_URL,
        mode: 'cors',
        headers: {'Content-Type': 'application/json'}
    }),
    endpoints: (builder) => ({
        getLatestListings: builder.query<GetLatestListingsResponse, GetLatestListingsDto|undefined>({
            query: (dto) => ({
                method: 'POST',
                url: ApiRoute.LISTINGS.LATEST,
                body: dto??{}
            }),
            transformResponse: (response: ResponseDto<GetLatestListingsResponse>) => {
                return response.values[0]
            },
            async onCacheEntryAdded(
                _,
                {updateCachedData, cacheDataLoaded, cacheEntryRemoved}
            ) {
                try {
                    await cacheDataLoaded
                    await Connector.setListener(
                        {
                            name: "ReceiveLatestListings",
                            callback: (dto: ResponseDto<GetLatestListingsResponse>) => {
                                if (dto.statusCode !== 200) return
                                updateCachedData(draft => {
                                    draft.data = dto.values[0].data
                                    draft.status = dto.values[0].status
                                })
                            }
                        }
                    );
                } catch {
                    Connector.removeListeners("ReceiveLatestListings")
                    await Connector.disconnect()
                }
                await cacheEntryRemoved
                Connector.removeListeners("ReceiveLatestListings")
                await Connector.disconnect()
            },
        }),
        getLatestQuote: builder.query<GetLatestQuoteResponse, GetLatestQuoteDto>({
            query: (body) => ({
                method: 'POST',
                url: ApiRoute.QUOTES.LATEST,
                body
            }),
            transformResponse: (response: ResponseDto<GetLatestQuoteResponse>) => {
                return response.values[0]
            },
        }),
    }),
});

export const {useGetLatestListingsQuery, useLazyGetLatestQuoteQuery} = apiSlice;
