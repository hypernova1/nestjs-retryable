import Retryable from '../src/retryable';
import TestError from './test-error';

class TestClass {

    private loopCount = 0;

    @Retryable({
        maxAttempts: 3,
        value: [Error]
    })
    async doSomethingThrowError() {
        if (this.loopCount++ === 0) {
                throw new Error();
        }
        return true;
    }

    @Retryable({
        maxAttempts: 3,
        value: [TestError]
    })
    async doSomethingThrowTestError() {
        if (this.loopCount++ === 0) {
            throw new TestError();
        }
        return true;
    }

    @Retryable({
        maxAttempts: 3,
        value: [Error]
    })
    async doWrong() {
        if (this.loopCount++ === 0) {
            throw new TestError();
        }
        return true;
    }
}

describe('test', () => {
    it ('retry success test 1', async () => {
        const testClass = new TestClass();
        const result = await testClass.doSomethingThrowError();
        expect(result).toBeTruthy();
    });

    it ('retry success test 2', async () => {
        const testClass = new TestClass();
        const result = await testClass.doSomethingThrowTestError();
        expect(result).toBeTruthy();
    });

    it ('retry failure test', async () => {
        const testClass = new TestClass();
        await expect(testClass.doWrong()).rejects.toThrow();
    });
})