import * as signalR from "@microsoft/signalr";
import {GetLatestQuoteDto} from "@/lib/GetLatestQuoteDto.ts";
import {GetLatestListingsDto} from "@/lib/GetLatestListingsDto.ts";
import {GetLatestQuoteResponse} from "@/lib/GetLatestQuoteResponse.ts";
import {GetLatestListingsResponse} from "@/lib/GetLatestListingsResponse.ts";

if (!import.meta.env.VITE_SERVER_URL || !import.meta.env.VITE_SERVER_HUB_PATH) {
    throw new Error("VITE_SERVER_URL and VITE_SERVER_HUB_PATH must be set in .env file.")
}
const URL = import.meta.env.VITE_SERVER_URL + import.meta.env.VITE_SERVER_HUB_PATH;

class Connector {
    private connection: signalR.HubConnection;
    static instance: Connector;

    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(URL)
            .withAutomaticReconnect()
            .build();
        this.connection.start().catch(err => document.write(err));
    }

    public setListener<Name extends keyof EventNameToDtoType>(event: {
        name: Name,
        callback: EventNameToDtoType[Name]['callback']
    }) {
        this.connection.on(event.name, event.callback);
    }

    public removeListener<Name extends keyof EventNameToDtoType>(name: Name) {
        this.connection.off(name);
    }

    public async invoke<Name extends keyof EventNameToDtoType>(
        name: Name,
        dto: EventNameToDtoType[Name]['requestDto']
    ) {
        return await this.connection.invoke(name, dto);
    }

    public static getInstance(): Connector {
        if (!Connector.instance)
            Connector.instance = new Connector();
        return Connector.instance;
    }
}

export default Connector.getInstance;

export type EventOptions<T> = {
    name: string;
    callback: (params: T) => void;
}

export type Dtos<RQ, RS> = {
    requestDto: RQ;
    callback: (params: RS) => void;
    responseDto: RS;
}

export type EventNameToDtoType = {
    GetLatestQuote: Dtos<GetLatestQuoteDto, GetLatestQuoteResponse>;
    GetLatestListings: Dtos<GetLatestListingsDto, GetLatestListingsResponse>;
};

export type Listing = {
    name: string;
    quoteName:string;
    price: number;
}


