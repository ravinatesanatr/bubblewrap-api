"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InquirerPrompt = void 0;
const KILOBYTE_SIZE = 1024;
// Builds an Inquirer validate function from a `ValidateFunction<T>`. From the inquirer docs:
//
// validate: (Function) Receive the user input and answers hash. Should return true if the
//           value is valid, and an error message (String) otherwise. If false is returned,
//           a default error message is provided.
function buildInquirerValidate(validateFunction) {
    return async (input) => {
        const result = await validateFunction(input);
        if (result.isOk()) {
            return true;
        }
        return result.unwrapError().message;
    };
}
/**
 * A {@link Prompt} implementation powered by inquirer.js (https://www.npmjs.com/package/inquirer)
 */
class InquirerPrompt {
    async printMessage(message) {
        console.log(message);
    }
    async promptInput(message, defaultValue, validateFunction) {
        return null;
    }
    async promptChoice(message, choices, defaultValue, validateFunction) {
        return null;
    }
    async promptConfirm(message, defaultValue) {
        return true;
    }
    async promptPassword(message, validateFunction) {
        return '';
    }
    async downloadFile(url, filename, totalSize = 0) {
    }
}
exports.InquirerPrompt = InquirerPrompt;
