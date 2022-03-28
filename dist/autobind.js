"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoBind = void 0;
function AutoBind(_, __, descriptor) {
    const originalMethod = descriptor.value;
    const customDescriptor = {
        get() {
            const boundFunction = originalMethod.bind(this);
            return boundFunction;
        }
    };
    return customDescriptor;
}
exports.AutoBind = AutoBind;
