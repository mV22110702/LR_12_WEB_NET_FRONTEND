import {combineReducers} from "redux";
import {apiSlice} from "@/store/apiSlice.ts";
import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {targetCurrencySlice} from "@/store/targetCurrencySlice.ts";

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    [targetCurrencySlice.reducerPath]: targetCurrencySlice.reducer
});
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [targetCurrencySlice.reducerPath]: targetCurrencySlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([apiSlice.middleware]),
    devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
