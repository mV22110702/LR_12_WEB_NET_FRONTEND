export type Platform =
    {
        Id: number;

        Name: string;

        Symbol: string;

        Slug: string;

        TokenAddress: string;
    }


export type Quote =
    {
        Price: number;

        Volume24h?: number;

        VolumeChange24h?: number;

        PercentChange1h?: number;

        PercentChange24h?: number;

        PercentChange7d?: number;

        MarketCap?: number;

        MarketCapDominance?: number;

        FullyDilutedMarketCap?: number;

        LastUpdated: Date
    }

export type Datum =
    {
        Id: number;

        Name: string;

        Symbol: string;

        Slug: string;

        CmcRank: number;

        NumMarketPairs: number;

        CirculatingSupply: number;

        TotalSupply: number;

        MaxSupply: number;

        InfiniteSupply?: boolean

        LastUpdated: Date

        DateAdded: Date

        Tags: string[]

        Platform: Platform;

        SelfReportedCirculatingSupply?: number;

        SelfReportedMarketCap?: number;

        Quote: { [K: string]: Quote };
    }

export type Status =
    {
        Timestamp: Date;

        ErrorCode: number

        ErrorMessage: string

        Elapsed: number

        CreditCount: number

        Notice: string
    }

export type GetLatestListingsResponse =
    {
        Data: Datum[]

        Status: Status
    }
