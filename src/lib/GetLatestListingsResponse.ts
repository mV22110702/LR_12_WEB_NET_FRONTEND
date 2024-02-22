export type Platform =
    {
        id: number;

        name: string;

        symbol: string;

        slug: string;

        token_address: string;
    }


export type Quote =
    {
        price: number;

        volume_24h?: number;

        volume_change_24h?: number;

        percent_change_1h?: number;

        percent_change_24h?: number;

        percent_change_7d?: number;

        market_cap?: number;

        market_cap_dominance?: number;

        fully_diluted_market_cap?: number;

        last_updated: Date
    }

export type Datum =
    {
        id: number;

        name: string;

        symbol: string;

        slug: string;

        cmc_rank: number;

        num_market_pairs: number;

        circulating_supply: number;

        total_supply: number;

        max_supply: number;

        infinite_supply?: boolean

        last_updated: Date

        date_added: Date

        tags: string[]

        platform: Platform;

        self_reported_circulating_supply?: number;

        self_reported_market_cap?: number;

        quote: { [K: string]: Quote };
    }

export type Status =
    {
        timestamp: Date;

        error_code: number

        error_message: string

        elapsed: number

        credit_count: number

        notice: string
    }

export type GetLatestListingsResponse =
    {
        data: Datum[]

        status: Status
    }
