const weights = [8, 6, 4, 2, 3, 5, 9, 7];
const specialCase = {
  10: 0,
  11: 5,
};

export const calculateChecksum = (string: string, checkDigit: string) => {
  let sum = 0;
  const checkDigitInt = parseInt(checkDigit);

  if (string.length !== 8 || Number.isNaN(checkDigitInt)) {
    return false;
  }

  /**
   * Duplicated serial number validation so calculateChecksum
   * can be utilised independently.
   */
  for (let i = 0; i < string.length; i++) {
    const char = parseInt(string[i]);
    if (Number.isNaN(char)) {
      return false;
    }

    sum += char * weights[i];
  }

  const result = 11 - (sum % 11);

  return (specialCase[result] ?? result) === checkDigitInt;
};
