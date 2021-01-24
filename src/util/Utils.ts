export interface APIGatewayResponse {
    statusCode: number,
    body: any
}

export const str = (obj: object): string => {
    return JSON.stringify(obj);
};

export const prepResponse = (statusCode: number, body: object): APIGatewayResponse => {
    return {
        statusCode: statusCode,
        body: str(body),
    };
};