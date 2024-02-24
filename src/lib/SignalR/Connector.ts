import * as signalR from "@microsoft/signalr";
import {GetLatestQuoteDto} from "@/lib/GetLatestQuoteDto.ts";
import {GetLatestQuoteResponse} from "@/lib/GetLatestQuoteResponse.ts";
import {GetLatestListingsResponse} from "@/lib/GetLatestListingsResponse.ts";
import {ResponseDto} from "@/lib/types.ts";

if (!import.meta.env.VITE_SERVER_URL || !import.meta.env.VITE_SERVER_HUB_PATH) {
    throw new Error("VITE_SERVER_URL and VITE_SERVER_HUB_PATH must be set in .env file.")
}
const URL = import.meta.env.VITE_SERVER_URL + import.meta.env.VITE_SERVER_HUB_PATH;

export class Connector {
    private static connection: signalR.HubConnection | null = null;

    public static async connect(){
        if (Connector.connection) return;
        Connector.connection = new signalR.HubConnectionBuilder()
            .withUrl(URL)
            .withAutomaticReconnect()
            .build();
        await Connector.connection.start();
    }

    public static async disconnect() {
        if (!Connector.connection) return;
        await Connector.connection.stop();
        Connector.connection = null;
    }

    public static async setListener<Name extends keyof EventNameToDtoType>(event: {
        name: Name,
        callback: EventNameToDtoType[Name]['callback']
    }) {
        if (!Connector.connection) await Connector.connect();
        Connector.connection!.on(event.name, event.callback);
    }

    public static removeListeners<Name extends keyof EventNameToDtoType>(name: Name) {
        if (!Connector.connection) throw new Error("Connection is not established");
        Connector.connection.off(name);
    }

    public static async invoke<Name extends keyof EventNameToDtoType>(
        name: Name,
        dto: EventNameToDtoType[Name]['requestDto']
    ) {
        if (!Connector.connection) await Connector.connect();
        return await Connector.connection!.invoke(name, dto);
    }
}

export type EventOptions<T> = {
    name: string;
    callback: (params: T) => void;
}

export type Dtos<RQ, RS> = {
    requestDto: RQ;
    callback: (params: ResponseDto<RS>) => void;
    responseDto: RS;
}

export type EventNameToDtoType = {
    GetLatestQuote: Dtos<GetLatestQuoteDto, void>;
    ReceiveLatestQuote: Dtos<void, GetLatestQuoteResponse>;
    ReceiveLatestListings: Dtos<void, GetLatestListingsResponse>;
    ReceiveError: Dtos<void, ResponseDto<object>>;
    SetConnectionTargetCurrency: Dtos<number, void>;
};

export type Listing = {
    name: string;
    quoteName: string;
    price: number;
    lastUpdated: Date;
}


