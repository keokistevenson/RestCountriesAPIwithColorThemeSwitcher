// Implement a custom error class and functions to handle different types of errors gracefully.

// Throw error when a network no internet or connection
export class NetworkError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NetworkError';
    }
}

// Throw error when the API returns a bad HTTP status 
export class HttpError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'HttpError';
    }
}

// Throw error  when the API response has missing data
export class DataError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DataError';
    }
}