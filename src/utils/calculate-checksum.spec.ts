import { calculateChecksum } from "./calculate-checksum";

describe("calculateChecksum", () => {
  //arrange
  const validFixtures = [
    {
      serial: "47312482",
      checkDigit: "9",
    },
    {
      serial: "54555453",
      checkDigit: "3",
    },
    {
      serial: "00000000",
      checkDigit: "5",
    },
  ];

  it.each(validFixtures)(
    "should return true for valid serial numbers",
    ({ checkDigit, serial }) => {
      // act
      const result = calculateChecksum(serial, checkDigit);

      // assert
      expect(result).toBe(true);
    }
  );

  //arrange
  const invalidFixtures = [
    {
      serial: "39152282",
      checkDigit: "5",
    },
    {
      serial: "54555453",
      checkDigit: "P",
    },
    {
      serial: "99999999",
      checkDigit: "0",
    },
    {
      serial: "0000000",
      checkDigit: "0",
    },
  ];

  it.each(invalidFixtures)(
    "should return false for valid serial numbers",
    ({ checkDigit, serial }) => {
      // act
      const result = calculateChecksum(serial, checkDigit);

      // assert
      expect(result).toBe(false);
    }
  );

  //arrange
  const edgeCaseFixtures = [
    {
      serial: "391522825",
      checkDigit: "5",
    },
    {
      serial: "2456C453",
      checkDigit: "3",
    },
    {
      serial: "47  '482",
      checkDigit: "9",
    },
  ];

  it.each(edgeCaseFixtures)(
    "should return false for edge cases",
    ({ checkDigit, serial }) => {
      // act
      const result = calculateChecksum(serial, checkDigit);

      // assert
      expect(result).toBe(false);
    }
  );
});
