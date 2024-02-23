import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {FC} from "react";

type TargetCurrencySelectProps = {
    placeholder: string,
    items: { key: string, value: string }[],
    value: string;
    onClick: (v: string) => void
}
export const CustomSelect: FC<TargetCurrencySelectProps> = ({
                                                                items,
                                                                onClick,
                                                                placeholder,
                                                                value
                                                            }) => {

    return (
        <Select onValueChange={onClick} defaultValue={value}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={placeholder}/>
            </SelectTrigger>
            <SelectContent>
                {items.map(({key, value}) => {
                    return <SelectItem
                        key={key}
                        value={value}
                    >
                        {key.toUpperCase()}
                    </SelectItem>;
                })}
            </SelectContent>
        </Select>);
}
