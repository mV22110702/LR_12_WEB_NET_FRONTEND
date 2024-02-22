export type ResponseDtoBase = {
    Description: string;
    StatusCode: number;
}

export type ResponseDto<T> = ResponseDtoBase &
    {
        TotalRecords: number;
        Values: T[];
    }

export type ValueOf<T> = T[keyof T];
