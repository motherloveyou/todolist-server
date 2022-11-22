export interface LamadaEvent {
    headers: {
        access_token?: string;
    };
    queryStringParameters?: any;
    requestContext: {
        http: {
            method: string;
            path: string;
        };
    };
    body?: string;
}
