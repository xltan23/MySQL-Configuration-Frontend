// Create model to receive postForm values
export interface Member {
    name:string
    telegram:string
    grade:string
}

// Create model to receive getForm values
export interface SearchTele {
    telegram:string
}

// Create model to receive result from server's ResponseEntity<String> in JSON 
export interface ServerResponse {
    telegram:string
    grade:string
    date:string
}