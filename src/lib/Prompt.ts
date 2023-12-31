import {Result, fetchUtils} from '@bubblewrap/core';

const KILOBYTE_SIZE = 1024;

/**
 * A function that takes a `string`, validates and tries to convert to the type `T`, and returns a
 * {@link Result}. If the conversion is successful, the result is `Ok` and unwrapping returns `T`.
 * Otherwise, the result is `Error` and `unwrapError()` returns the underlying error.
 * @param {string} input the value to be validated and converted.
 * @returns {Result<T, Error>} an `Ok` {@link Result} that unwraps `T` if the validation and
 * conversion are successful or an `Error` if it fails.
 */
export type ValidateFunction<T> = (input: string) => Promise<Result<T, Error>>;

/**
 * A an interface that promps for different types of user input.
 */
export interface Prompt {
  /**
   * Prints a message to the user.
   * @param message the message to be printed.
   */
  printMessage(message: string): Promise<void>;

  /**
   * Prompts for text input.
   * @param {string} message a short description of the input.
   * @param {string | null} defaultValue a default value or null.
   * @param {ValidateFunction<T>} validateFunction a function to validate the input.
   * @returns {Promise<T>} a {@link Promise} that resolves to the validated user input, converted
   * to `T` by the `validateFunction`.
   */
  promptInput<T>(
    message: string,
    defaultValue: string | null,
    validateFunction: ValidateFunction<T>,
  ): Promise<T>;

  /**
   * Displays a list of options to the user and prompts the user to choose one of them.
   * @param {string} message a short description of the input.
   * @param {string[]} choices a list of choices to be displayed to the user.
   * @param {string | null} defaultValue a default value or null.
   * @param {ValidateFunction<T>} validateFunction a function to validate the input.
   * @returns {Promise<T>} a {@link Promise} that resolves to the validated user input, converted
   * to `T` by the `validateFunction`.
   */
  promptChoice<T>(
    message: string,
    choices: string[],
    defaultValue: string | null,
    validateFunction: ValidateFunction<T>,
  ): Promise<T>;

  /**
   * Prompts the user for a password. The text typed by the user is hidden and replaced by the `*`
   * character.
   * @param {string} message a short description of the input.
   * @param {ValidateFunction<string>} validateFunction a function to validate the input.
   * @returns {Promise<string>} a {@link Promise} that resolves to the user input validated by
   * `validateFunction`.
   */
  promptPassword(
    message: string,
    validateFunction?: ValidateFunction<string>,
  ): Promise<string>;

  /**
   * Prompts a Yes/No dialog. Returns `true` for yes and `false` for no.
   * @param {string} message a short description of the input.
   * @param {boolean} defaultValue a default value.
   * @returns {Promise<boolean>} a {@link Promise} that resolves to a {@link boolean} value. The
   * value will the `true` if the user answers `Yes` and `false` for `No`.
   */
  promptConfirm(message: string, defaultValue: boolean): Promise<boolean>;

  /**
   * Downloads a file from `url` and saves it as `filename` and shows the download progress.
   * Optionaly, the total file size can be passed as `totalSize`.
   * @param url the url to download the file from.
   * @param filename the filename to save the file.
   * @param totalSize an optional total file size.
   */
  downloadFile(url: string, filename: string, totalSize?: number): Promise<void>;
}

// Builds an Inquirer validate function from a `ValidateFunction<T>`. From the inquirer docs:
//
// validate: (Function) Receive the user input and answers hash. Should return true if the
//           value is valid, and an error message (String) otherwise. If false is returned,
//           a default error message is provided.
function buildInquirerValidate<T>(validateFunction: ValidateFunction<T>):
    (input: string) => Promise<boolean | string> {
  return async (input: string): Promise<boolean | string> => {
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
export class InquirerPrompt implements Prompt {
  async printMessage(message: string): Promise<void> {
    console.log(message);
  }

  async promptInput<T>(
      message: string,
      defaultValue: string | null,
      validateFunction: ValidateFunction<T>,
  ): Promise<T> {
    return null;
  }

  async promptChoice<T>(
      message: string,
      choices: string[],
      defaultValue: string | null,
      validateFunction: ValidateFunction<T>,
  ): Promise<T> {
    return null;
  }

  async promptConfirm(message: string, defaultValue: boolean): Promise<boolean> {
    return true;
  }

  async promptPassword(message: string, validateFunction: ValidateFunction<string>):
      Promise<string> {
    return '';
  }

  async downloadFile(url: string, filename: string, totalSize = 0): Promise<void> {

  }
}
