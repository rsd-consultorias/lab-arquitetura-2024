export class Link {
    constructor(
        rel: string,
        method: string,
        href: string
    ) { }
}

export class ApiResponse<T> {
    status?: string;
    body?: T;
    links: Link[] = [];
}

export class ApiCollectionResponse<T> extends ApiResponse<T> {

    constructor(
        public records: number,
        public ofTotalRecords: number,
        public page: number,
        public ofTotalPages: number
    ) {
        super();
    }
}

export class ApiBadRequestResponse {
    constructor(
        public message: string,
        public status: string,
        public links: Link[]
    ) { }
}