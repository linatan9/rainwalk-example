/* eslint-disable no-extend-native */

// no-extend-native is intended to prevent breaking things by overriding
// existing native functions and properties. Since we're not overriding an
// existing function, this shouldn't break anything.

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface String {
  /**
   * Truncates the string with an ellipsis character if it is greater than the
   * desired length.
   */
  truncate: (desiredLength: number) => string;
}

String.prototype.truncate = function truncate(desiredLength: number) {
  return `${this.substring(0, desiredLength - 1)}${
    this.length > desiredLength ? '…' : ''
  }`;
};
