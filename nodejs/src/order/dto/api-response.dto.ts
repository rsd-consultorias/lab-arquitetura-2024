export class Link {
    constructor(
        public rel: string,
        public method: string,
        public href: string
    ) { }
}

export class ApiResponse<T> {
    public status?: string;
    public body?: T;
    public links: Link[] = [];
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