import {TargetCurrencySelect} from "@/components/TargetCurrencySelect.tsx";
export const Header = () => {
    return (
        <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
            <div className="ml-auto flex gap-2">
                <TargetCurrencySelect/>
            </div>
        </header>
    );
};
