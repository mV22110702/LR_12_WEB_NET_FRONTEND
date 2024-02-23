import {Input} from "@/components/ui/input.tsx";
import {useForm} from "react-hook-form";
import {CustomSelect} from "@/components/CustomSelect.tsx";
import {CurrencyIdValues} from "@/store/targetCurrencySlice.ts";
import {useEffect, useMemo, useState} from "react";
import {CurrencyId, CurrencyItems} from "@/lib/enums/currencyId.enum.ts";
import {apiSlice, useLazyGetLatestQuoteQuery} from "@/store/apiSlice.ts";
import {Connector} from "@/lib/SignalR/Connector.ts";

export const Converter = () => {
    const form = useForm<{ amount: number }>({defaultValues: {amount: 1}});
    const [sourceCurrency, setSourceCurrency] = useState<CurrencyIdValues>(CurrencyId.Usd)
    const [targetCurrency, setTargetCurrency] = useState<CurrencyIdValues>(CurrencyId.Uah)
    const [getLatestQuote, {data: latestQuoteData, isLoading}] = useLazyGetLatestQuoteQuery();
    const rate = useMemo(() => (latestQuoteData?.data[sourceCurrency.toString()]?.quote[targetCurrency.toString()]?.price ?? 0), [latestQuoteData, sourceCurrency, targetCurrency])
    const [convertedAmount, setConvertedAmount] = useState<number>(0);
    useEffect(() => {
        if(isLoading) return;
        console.log("CONVERTER")
        console.log('sourceCurrency', sourceCurrency, 'targetCurrency', targetCurrency)
        getLatestQuote({Id: sourceCurrency.toString(), ConvertId: targetCurrency.toString()})
    }, [sourceCurrency, targetCurrency]);
    const amount = form.watch('amount');
    useEffect(() => {
        setConvertedAmount(amount * rate)
    }, [amount, rate])
    useEffect(() => {
            if (!sourceCurrency || !targetCurrency) return;
            (async () => await Connector.setListener({
                    name: 'ReceiveLatestQuote', callback: (dto) => {
                        if (dto.statusCode !== 200) return;
                        apiSlice.util.updateQueryData('getLatestQuote', {
                            Id: sourceCurrency.toString(), ConvertId: targetCurrency.toString()
                        }, (draftLatestQuote) => {
                            draftLatestQuote.data = dto.values[0].data
                            draftLatestQuote.status = dto.values[0].status
                        })
                    }
                }
            ))();
            setInterval(async (sourceCurrency: CurrencyIdValues, targetCurrency: CurrencyIdValues) => {
                const s1 = '' + sourceCurrency;
                const s2 = '' + targetCurrency;
                console.log('s1', s1, 's2', s2)
                await Connector.invoke('GetLatestQuote', {
                    Id: s1, ConvertId: s2
                })
            }, 10000, sourceCurrency, targetCurrency)
        }, [sourceCurrency, targetCurrency]
    );

    return <div className={'flex-row flex justify-center gap-20'}>
        <div>
            <h3>Source currency name</h3>
            <CustomSelect
                placeholder={'Pick'}
                items={CurrencyItems}
                value={sourceCurrency.toString()}
                onClick={(v) => setSourceCurrency(Number.parseInt(v) as CurrencyIdValues)}
            />
        </div>
        <div className={'flex-col grid grid-rows-3 grid-cols-1'}>
            <div>
                <h3>Amount</h3>
                <Input
                    type={'number'}
                    min={0}
                    step={0.1}
                    placeholder={'Amount to convert'}
                    {...form.register('amount', {min: 0, valueAsNumber: true})}
                />
            </div>
            <div>
                <h3>Rate</h3>
                <Input
                    placeholder={'Rate'}
                    value={rate.toFixed(2)}
                    readOnly
                />
            </div>
            <div>
                <h3>Converted Amount</h3>
                <Input
                    placeholder={'Converted amount'}
                    value={convertedAmount.toFixed(2)}
                    readOnly
                />
            </div>
        </div>
        <div>
            <h3>Target currency name</h3>
            <CustomSelect
                placeholder={'Pick'}
                items={CurrencyItems}
                value={targetCurrency.toString()}
                onClick={(v) => setTargetCurrency(Number.parseInt(v) as CurrencyIdValues)}
            />
        </div>
    </div>
}

