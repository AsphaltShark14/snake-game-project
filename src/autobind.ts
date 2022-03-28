export type Coordinates = { x: number, y: number };

export function AutoBind(_: any, __: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const customDescriptor: PropertyDescriptor = {
        get() {
            const boundFunction = originalMethod.bind(this);
            return boundFunction;
        }
    }
    return customDescriptor;
}