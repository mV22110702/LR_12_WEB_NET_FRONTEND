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

        volume_24h: number;

        volume_change_24h: number;

        volume_24h_reported: number;

        volume_7d: number;

        volume_7d_reported: number;

        volume_30d: number;

        volume_30d_reported: number;

        market_cap: number;

        market_cap_dominance: number;

        fully_diluted_market_cap: number;

        percent_change_1h: number;

        percent_change_24h: number;

        percent_change_7d: number;

        percent_change_30d: number;

        last_updated: Date;
    }

export type Datum =
    {
        id: number;

        name: string;

        symbol: string;

        slug: string;

        is_active: number;

        is_fiat: number;

        cmc_rank?: number;

        num_market_pairs: number;

        circulating_supply: number;

        total_supply: number;

        market_cap_by_total_supply: number;

        max_supply?: number;

        date_added: Date;

        tags: Array<string>;

        platform?: Platform;

        last_updated: Date;

        self_reported_circulating_supply?: number;

        self_reported_market_cap?: number;

        quote: { [K: string]: Quote };
    }

export type Status =
    {
        timestamp: Date;

        error_code: number;

        error_message: string;

        elapsed: number;

        credit_count: number;

        notice: string;
    }

export type GetLatestQuoteResponse =
    {
        data: { [K: string]: Datum };

        status: Status;
    }

