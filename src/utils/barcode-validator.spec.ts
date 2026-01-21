import { barcodeValidator } from "./barcode-validator";

describe("barcodeValidator", () => {
  describe("Valid fixtures", () => {
    // arrange
    const fixtures = ["AB473124829GB", "XH545554533GB", "AA000000005GB"];

    it.each(fixtures)("should return no errors for valid barcodes", barcode => {
      // act
      const result = barcodeValidator(barcode);

      // assert
      expect(result).toBeFalsy();
    });
  });

  describe("Invalid fixtures", () => {
    // arrange
    const fixtures = [
      {
        barcode: "1B47312864829BB",
        expected: "Validation failed - Barcode is not the correct length",
      },
      {
        barcode: "1B473128649BB",
        expected: "Validation failed - Prefix is not in the range AA to ZZ",
      },
      {
        barcode: "AB4731 8649BB",
        expected:
          "Validation failed - Serial number is not in the range 00 000 000 to 99 999 999",
      },
      {
        barcode: "ZZ999999990GB",
        expected: "Validation failed - Check digit is not correct",
      },
      {
        barcode: "AB473124829NG",
        expected: "Validation failed - Country code is not GB",
      },
    ];
    const edgeCasesFixtures = [
      {
        barcode: "",
        expected: "Validation failed - Barcode is not the correct length",
      },
      {
        barcode: "             ", // 13 empty spaces to match required barcode length
        expected: "Validation failed - Barcode is not the correct length",
      },
    ];

    it.each(fixtures.concat(edgeCasesFixtures))(
      "should return errors if barcode is incorrectly formatted",
      ({ barcode, expected }) => {
        // act
        const result = barcodeValidator(barcode);

        // assert
        expect(result).toBe(expected);
      }
    );
  });
});
