import 'reflect-metadata';

export function Recover() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        Reflect.defineMetadata('recover-function', { method: originalMethod }, target, propertyKey);
        return descriptor;
    }
}