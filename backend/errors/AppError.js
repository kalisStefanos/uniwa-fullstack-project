// src/errors/AppError.js
export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // expected error?
    }
}

export class ConflictError extends AppError{
    constructor(message){
        super(message, 409);
    }
}

export class NotFoundError extends AppError {
    constructor(message) { 
        super(message, 404); 
    }
}

export class ValidationError extends AppError {
    constructor(message) { 
        super(message, 400); 
    }
}

export class ForbiddenError extends AppError {
    constructor(message) { 
        super(message, 403); 
    }
}

export class UnauthorizedError extends AppError {
    constructor(message) {
        super(message, 401);
    }
}

export class ConstraintError extends AppError{
    constructor(message) {
        super(message, 409);
    }
}