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

        Volume24h: number;

        VolumeChange24h: number;

        Volume24hReported: number;

        Volume7d: number;

        Volume7dReported: number;

        Volume30d: number;

        Volume30dReported: number;

        MarketCap: number;

        MarketCapDominance: number;

        FullyDilutedMarketCap: number;

        PercentChange1h: number;

        PercentChange24h: number;

        PercentChange7d: number;

        PercentChange30d: number;

        LastUpdated: Date;
    }

export type Datum =
    {
        Id: number;

        Name: string;

        Symbol: string;

        Slug: string;

        IsActive: number;

        IsFiat: number;

        CmcRank?: number;

        NumMarketPairs: number;

        CirculatingSupply: number;

        TotalSupply: number;

        MarketCapByTotalSupply: number;

        MaxSupply?: number;

        DateAdded: Date;

        Tags: Array<string>;

        Platform?: Platform;

        LastUpdated: Date;

        SelfReportedCirculatingSupply?: number;

        SelfReportedMarketCap?: number;

        Quote: { [K: string]: Quote };
    }

export type Status =
    {
        Timestamp: Date;

        ErrorCode: number;

        ErrorMessage: string;

        Elapsed: number;

        CreditCount: number;

        Notice: string;
    }

export type GetLatestQuoteResponse =
    {
        Data: { [K: string]: Datum };

        Status: Status;
    }

