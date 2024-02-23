import {combineReducers, Middleware} from "redux";
import {apiSlice} from "@/store/apiSlice.ts";
import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {targetCurrencySlice} from "@/store/targetCurrencySlice.ts";
import {converterSlice} from "@/store/converterSlice.ts";

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    [targetCurrencySlice.reducerPath]: targetCurrencySlice.reducer,
    [converterSlice.reducerPath]: converterSlice.reducer,
});

const loggerMiddleware: Middleware =
    ({getState}) =>
        next =>
            (action) => {
                console.log('will dispatch', action)
                if (action.type === targetCurrencySlice.actions.setTargetCurrency.type) {
                    apiSlice.endpoints.getLatestListings.initiate(undefined, {forceRefetch: true});
                }
                const returnValue = next(action)
                console.log('state after dispatch', getState())

                return returnValue
            }

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [targetCurrencySlice.reducerPath]: targetCurrencySlice.reducer,
        [converterSlice.reducerPath]: converterSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([apiSlice.middleware, loggerMiddleware]),
    devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
