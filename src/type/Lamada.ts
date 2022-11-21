export interface LamadaEvent {
    queryStringParameters?: any;
    requestContext: {
        http: {
            method: string;
            path: string;
        };
    };
    body?: string;
}
