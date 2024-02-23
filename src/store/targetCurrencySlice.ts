import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {RootState} from "@/store/store.ts";
import {CurrencyId} from "@/lib/enums/currencyId.enum.ts";
import {ValueOf} from "@/lib/types.ts";

interface TargetCurrencyState {
    value: number
}

const initialState: TargetCurrencyState = {
    value: CurrencyId.Usd,
}

export type CurrencyIdValues = ValueOf<typeof CurrencyId>;

export const targetCurrencySlice = createSlice({
    name: 'targetCurrency',
    initialState,
    reducers: {
        setTargetCurrency: (state, action: PayloadAction<CurrencyIdValues>) => {
            state.value = action.payload
        },
    },
})

export const selectTargetCurrency = (state: RootState) => state.targetCurrency.value
