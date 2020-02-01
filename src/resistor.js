export const bandColors = {
  BLACK: "BLACK",
  BROWN: "BROWN",
  RED: "RED",
  ORANGE: "ORANGE",
  YELLOW: "YELLOW",
  GREEN: "GREEN",
  BLUE: "BLUE",
  VIOLET: "VIOLET",
  GRAY: "GRAY",
  WHITE: "WHITE",
  SILVER: "SILVER",
  GOLD: "GOLD"
};

export class Resistor {
  constructor(
    bands = [
      bandColors.BROWN,
      bandColors.BLACK,
      bandColors.ORANGE,
      bandColors.GOLD
    ]
  ) {
    this.numBands = bands.length;
    this.bands = bands;
  }

  status() {
    console.log(`${this.numBands}`);
    for (let color of this.bands) {
      console.log(color);
    }
  }
}

export function calculateResistance(resistor) {
  let digit1, digit2, digit3, mult, tolerance;
  const plusMinus = "\u00B1";

  if (resistor.numBands < 4 || resistor.numBands > 6) {
    return null; // only supports 4,5, and 6 band resistors
  }

  if (resistor.numBands === 4) {
    // four bands - first two are the digits, third is the multiplier, fourth is the tolerance
    digit1 = getDigitByColor(resistor.bands[0]);
    digit2 = getDigitByColor(resistor.bands[1]);
    mult = getMultiplierByColor(resistor.bands[2]);
    tolerance = getToleranceByColor(resistor.bands[3]);

    return `${convertOhmsToString(
      (digit1 * 10 + digit2) * mult
    )} ${plusMinus}${tolerance}`;
  } else if (resistor.numBands === 5 || resistor.numBands === 6) {
    digit1 = getDigitByColor(resistor.bands[0]);
    digit2 = getDigitByColor(resistor.bands[1]);
    digit3 = getDigitByColor(resistor.bands[2]);
    mult = getMultiplierByColor(resistor.bands[3]);
    tolerance = getToleranceByColor(resistor.bands[4]);
    let tempCo = null;

    if (resistor.numBands === 6) {
      // get the temperature coefficient
      switch (resistor.bands[5]) {
        case bandColors.BROWN:
          tempCo = "100PPM";
          break;
        case bandColors.RED:
          tempCo = "50PPM";
          break;
        case bandColors.ORANGE:
          tempCo = "15PPM";
          break;
        case bandColors.Yellow:
          tempCo = "25PPM";
          break;
        default:
          tempCo = null;
      }
    }
    const val = digit1 * 100 + digit2 * 10 + digit3;
    return `${convertOhmsToString(val * mult)} ${plusMinus}${tolerance} ${
      tempCo !== null ? tempCo : ""
    }`;
  }
}

function getDigitByColor(color) {
  switch (color) {
    case bandColors.BLACK:
      return 0;
    case bandColors.BROWN:
      return 1;
    case bandColors.RED:
      return 2;
    case bandColors.ORANGE:
      return 3;
    case bandColors.YELLOW:
      return 4;
    case bandColors.GREEN:
      return 5;
    case bandColors.BLUE:
      return 6;
    case bandColors.VIOLET:
      return 7;
    case bandColors.GRAY:
      return 8;
    case bandColors.WHITE:
      return 9;
    default:
      return null;
  }
}

function getMultiplierByColor(color) {
  switch (color) {
    case bandColors.SILVER:
      return 0.01;
    case bandColors.GOLD:
      return 0.1;
    case bandColors.BLACK:
      return 1;
    case bandColors.BROWN:
      return 10;
    case bandColors.RED:
      return 100;
    case bandColors.ORANGE:
      return 1000;
    case bandColors.YELLOW:
      return 10000;
    case bandColors.GREEN:
      return 100000;
    case bandColors.BLUE:
      return 1000000;
    case bandColors.VIOLET:
      return 10000000;
    default:
      return null;
  }
}

function getToleranceByColor(color) {
  switch (color) {
    case bandColors.SILVER:
      return "10%";
    case bandColors.GOLD:
      return "5%";
    case bandColors.BROWN:
      return "1%";
    case bandColors.RED:
      return "2%";
    case bandColors.GREEN:
      return "0.5%";
    case bandColors.BLUE:
      return "0.25%";
    case bandColors.VIOLET:
      return "0.1%";
    default:
      return null;
  }
}

function convertOhmsToString(ohms) {
  const omegaSign = "\u2126";
  if (ohms >= 1000) {
    return `${ohms / 1000}K ${omegaSign}`;
  } else {
    return `${ohms} ${omegaSign}`;
  }
}
