/**
 * @file result.ts
 * @brief Result type for handling operations that can succeed or fail
 * @description Provides a type-safe way to handle success and failure cases
 */

/**
 * @class Result
 * @brief Represents the result of an operation that can succeed or fail
 */
export class Result<T, E = Error> {
    private constructor(
        private readonly _isSuccess: boolean,
        private readonly _value?: T,
        private readonly _error?: E
    ) {}

    /**
     * @brief Create a successful result
     */
    public static ok<T, E = Error>(value: T): Result<T, E> {
        return new Result<T, E>(true, value, undefined);
    }

    /**
     * @brief Create a failed result
     */
    public static fail<T, E = Error>(error: E): Result<T, E> {
        return new Result<T, E>(false, undefined, error);
    }

    /**
     * @brief Check if the result is successful
     */
    public isSuccess(): boolean {
        return this._isSuccess;
    }

    /**
     * @brief Check if the result is a failure
     */
    public isFailure(): boolean {
        return !this._isSuccess;
    }

    /**
     * @brief Get the value (throws if called on failure)
     */
    public getValue(): T {
        if (!this._isSuccess) {
            throw new Error('Cannot get value from a failed result');
        }
        return this._value as T;
    }

    /**
     * @brief Get the error (throws if called on success)
     */
    public getError(): E {
        if (this._isSuccess) {
            throw new Error('Cannot get error from a successful result');
        }
        return this._error as E;
    }

    /**
     * @brief Get value or default if failed
     */
    public getValueOr(defaultValue: T): T {
        return this._isSuccess ? (this._value as T) : defaultValue;
    }

    /**
     * @brief Map the value if successful
     */
    public map<U>(fn: (value: T) => U): Result<U, E> {
        if (this._isSuccess) {
            return Result.ok(fn(this._value as T));
        }
        return Result.fail(this._error as E);
    }

    /**
     * @brief Map the error if failed
     */
    public mapError<F>(fn: (error: E) => F): Result<T, F> {
        if (!this._isSuccess) {
            return Result.fail(fn(this._error as E));
        }
        return Result.ok(this._value as T);
    }

    /**
     * @brief Chain operations that return Results
     */
    public flatMap<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
        if (this._isSuccess) {
            return fn(this._value as T);
        }
        return Result.fail(this._error as E);
    }

    /**
     * @brief Execute a function if successful
     */
    public onSuccess(fn: (value: T) => void): Result<T, E> {
        if (this._isSuccess) {
            fn(this._value as T);
        }
        return this;
    }

    /**
     * @brief Execute a function if failed
     */
    public onFailure(fn: (error: E) => void): Result<T, E> {
        if (!this._isSuccess) {
            fn(this._error as E);
        }
        return this;
    }

    /**
     * @brief Match on success or failure
     */
    public match<U>(onSuccess: (value: T) => U, onFailure: (error: E) => U): U {
        return this._isSuccess 
            ? onSuccess(this._value as T)
            : onFailure(this._error as E);
    }
}

/**
 * @brief Async version of Result for handling async operations
 */
export class AsyncResult<T, E = Error> {
    constructor(private readonly promise: Promise<Result<T, E>>) {}

    /**
     * @brief Create a successful async result
     */
    public static ok<T, E = Error>(value: T): AsyncResult<T, E> {
        return new AsyncResult(Promise.resolve(Result.ok<T, E>(value)));
    }

    /**
     * @brief Create a failed async result
     */
    public static fail<T, E = Error>(error: E): AsyncResult<T, E> {
        return new AsyncResult(Promise.resolve(Result.fail<T, E>(error)));
    }

    /**
     * @brief Create from a promise
     */
    public static fromPromise<T, E = Error>(
        promise: Promise<T>,
        errorMapper?: (error: unknown) => E
    ): AsyncResult<T, E> {
        return new AsyncResult(
            promise
                .then(value => Result.ok<T, E>(value))
                .catch(error => Result.fail<T, E>(
                    errorMapper ? errorMapper(error) : error as E
                ))
        );
    }

    /**
     * @brief Get the underlying promise
     */
    public async toPromise(): Promise<Result<T, E>> {
        return this.promise;
    }

    /**
     * @brief Map the value if successful
     */
    public map<U>(fn: (value: T) => U): AsyncResult<U, E> {
        return new AsyncResult(
            this.promise.then(result => result.map(fn))
        );
    }

    /**
     * @brief Map the error if failed
     */
    public mapError<F>(fn: (error: E) => F): AsyncResult<T, F> {
        return new AsyncResult(
            this.promise.then(result => result.mapError(fn))
        );
    }

    /**
     * @brief Chain async operations
     */
    public flatMap<U>(fn: (value: T) => AsyncResult<U, E>): AsyncResult<U, E> {
        return new AsyncResult(
            this.promise.then(async result => {
                if (result.isSuccess()) {
                    return (await fn(result.getValue()).toPromise());
                }
                return Result.fail(result.getError());
            })
        );
    }
}
