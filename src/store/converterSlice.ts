import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {RootState} from "@/store/store.ts";
import {CurrencyId} from "@/lib/enums/currencyId.enum.ts";
import {CurrencyIdValues} from "@/store/targetCurrencySlice.ts";

interface TargetCurrencyState {
    sourceCurrency: CurrencyIdValues,
    targetCurrency: CurrencyIdValues,
}

const initialState: TargetCurrencyState = {
    sourceCurrency: CurrencyId.Usd,
    targetCurrency: CurrencyId.Usd,
}

export const converterSlice = createSlice({
    name: 'converter',
    initialState,
    reducers: {
        setTargetCurrency: (state, action: PayloadAction<TargetCurrencyState>) => {
            state.sourceCurrency = action.payload.sourceCurrency
            state.targetCurrency = action.payload.targetCurrency
        },
    },
})

export const selectConverterSourceCurrency = (state: RootState) => state.converter.sourceCurrency
export const selectConverterTargetCurrency = (state: RootState) => state.converter.targetCurrency
