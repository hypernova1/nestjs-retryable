export default function Retryable(param: {
    maxAttempts: number;
    value?: (new (...args: any[]) => Error)[];
    backoff?: number;
    recover?: string;
}) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            let attempts = 0;

            let error: Error | undefined = undefined;
            while (attempts < param.maxAttempts) {
                try {
                    return await originalMethod.apply(this, args);
                } catch (e) {
                    error = e as Error;

                    const isExpectedError = param.value?.some(errorType => (e as Error).constructor === errorType);

                    if (isExpectedError) {
                        attempts++;
                        if (attempts >= param.maxAttempts) {
                            break;
                        }
                        await new Promise(resolve => setTimeout(resolve, param.backoff));
                    } else {
                        break;
                    }
                }
            }
            // if (param.recover) {
            //     return;
            // }

            if (error) {
                throw error;
            }
        };

        return descriptor;
    };
}