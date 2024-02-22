export type ResponseDtoBase = {
    description: string;
    statusCode: number;
}

export type ResponseDto<T> = ResponseDtoBase &
    {
        totalRecords: number;
        values: T[];
    }

export type ValueOf<T> = T[keyof T];
