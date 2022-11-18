export interface LamadaEvent {
    requestContext: {
        http: {
            method: string
            path: string
        }
    }
}
