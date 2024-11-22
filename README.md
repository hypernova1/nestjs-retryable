# @hypernova1/Retryable
This library provides a decorator-based retry mechanism inspired by Spring's @Retryable. It allows you to automatically retry a function or method upon encountering specific errors or exceptions. You can configure the maximum number of retries, the delay between attempts, and the exceptions to handle, ensuring robust error handling and fault tolerance in your Node.js applications.

## Usage
1. install package
~~~
$ npm install @hypernova1/retryable
~~~

2. using Retryable decorator in asynchronous function
~~~typescript
class AsyncFoo {

    @Retryable({
        maxAttempts: 3,        // Maximum number of retry attempts
        backoff: 2000,         // Wait 2000ms (2 seconds) before each retry
        value: [FooError]      // Only retry if a FooError is thrown
    })
    async doSomething() {
        if (...) {
            throw new FooError(); // Retry the function up to 3 times with a 2-second delay between retries
        }

        if (...) {
            throw new BarError(); // Do not retry the function
        }
    }

    @Retryable({
        maxAttempts: 2,        // Maximum number of retry attempts
        recoverFunc: () => {   // Recovery function to call after retries are exhausted
            console.log('call recover function');
        }
    })
    async callRecover() {
        if (...) {
            throw new FooError(); // Retry the function 2 times, then call recoverFunc
        }

        if (...) {
            throw new BarError(); // Do not retry the function
        }
    }
}
~~~