import { Resistor, bandColors } from "./resistor";

// let mainResistor;
let currentNumBands = 4;

// only function needed is init. It takes a reference to a function that will
// be called when the select items are changed causing the colors of the
// resistor to change. The function passed in is called and gets sent the Resistor
// object that represents the currently selected resistor values.

export function init(resistorChangeCallback) {
  // handlers for when the radio buttons for selecting 4 or 5 bands is
  // selected.
  document.querySelector("#four-bands-radio").addEventListener("change", e => {
    if (currentNumBands !== 4) {
      initFourBands(resistorChangeCallback);
      currentNumBands = 4;
    }
  });

  document.querySelector("#five-bands-radio").addEventListener("change", e => {
    if (currentNumBands !== 5) {
      initFiveBands(resistorChangeCallback);
      currentNumBands = 5;
    }
  });

  // start off with four bands
  initFourBands(resistorChangeCallback);
}

function createBandSelects(count, ids, labels) {
  if (ids.length < count || labels.length < count) {
    return null;
  }

  // remove all the selects first
  const selectContainer = document.querySelector("#select-container");
  while (selectContainer.firstChild) {
    selectContainer.removeChild(selectContainer.firstChild);
  }

  for (let i = 0; i < count; i++) {
    const select = document.createElement("select");
    select.id = ids[i];

    const label = document.createElement("label");
    label.setAttribute("for", ids[i]);
    label.innerHTML = labels[i];

    selectContainer.appendChild(label);
    selectContainer.appendChild(select);
  }
}

function initFourBands(resistorChangeCallback) {
  createBandSelects(
    4,
    [
      "first-band-select",
      "second-band-select",
      "third-band-select",
      "fourth-band-select"
    ],
    ["First Band", "Second Band", "Third Band", "Fourth Band"]
  );

  // initialize the first four band selectors
  createColorOptions(document.querySelector("#first-band-select"), [
    bandColors.SILVER,
    bandColors.GOLD
  ]);
  createColorOptions(document.querySelector("#second-band-select"), [
    bandColors.SILVER,
    bandColors.GOLD
  ]);
  createColorOptions(document.querySelector("#third-band-select"), [
    bandColors.GRAY,
    bandColors.WHITE
  ]);
  createColorOptions(document.querySelector("#fourth-band-select"), [
    bandColors.BLACK,
    bandColors.ORANGE,
    bandColors.YELLOW,
    bandColors.GRAY,
    bandColors.WHITE
  ]);
  setHandlers(resistorChangeCallback);
}

function setHandlers(resistorChangeCallback) {
  // set the initial value of the resistor
  let resistor = updateResistor();
  // setResistorValue(mainResistor);
  resistorChangeCallback(resistor);

  // create the event listeners for when a selection is changed
  document.querySelectorAll("select").forEach(select => {
    select.addEventListener("change", () => {
      const selectedColor = select.options[
        select.selectedIndex
      ].value.toLowerCase();

      // the selected options have changed so get a
      // new resistor
      let resistor = updateResistor();
      // displayResistor(mainResistor);
      resistorChangeCallback(resistor);
    });
  });
}

function displayResistor(resistor) {
  setResistorValue(resistor);
  // put the resistor drawing stuff here
}
function initFiveBands(resistorChangeCallback) {
  // have to change the third and fourth select to allow different colors
  // add the fifth select and set that to the tolerance
  // create all the <select>s as well as the option, then when switching
  // from 4 to 5 bands of 5 to 4, just empty them all and start over?
  // that will get rid of the event listeners as well.
  console.log("Switching to five bands");
  createBandSelects(
    5,
    [
      "first-band-select",
      "second-band-select",
      "third-band-select",
      "fourth-band-select",
      "fifth-band-select"
    ],
    ["First Band", "Second Band", "Third Band", "Fourth Band", "Fifth Band"]
  );

  createColorOptions(document.querySelector("#first-band-select"), [
    bandColors.SILVER,
    bandColors.GOLD
  ]);
  createColorOptions(document.querySelector("#second-band-select"), [
    bandColors.SILVER,
    bandColors.GOLD
  ]);

  createColorOptions(document.querySelector("#third-band-select"), [
    bandColors.SILVER,
    bandColors.GOLD
  ]);
  createColorOptions(document.querySelector("#fourth-band-select"), [
    bandColors.GRAY,
    bandColors.WHITE
  ]);
  createColorOptions(document.querySelector("#fifth-band-select"), [
    bandColors.BLACK,
    bandColors.ORANGE,
    bandColors.YELLOW,
    bandColors.GRAY,
    bandColors.WHITE
  ]);

  setHandlers(resistorChangeCallback);
}

function updateResistor() {
  const bands = getSelectedBandValues();
  return new Resistor(bands);
}

function getSelectedBandValues() {
  const selects = Array.from(document.querySelectorAll("select"));
  return selects.map(select => select.options[select.selectedIndex].value);
}

function createColorOptions(selectElement, excludeColors = []) {
  Object.keys(bandColors).forEach(color => {
    if (!excludeColors.includes(color)) {
      const o = document.createElement("option");
      o.setAttribute("value", color);
      o.innerHTML = bandColors[color].toLowerCase();
      selectElement.appendChild(o);
    }
  });
}
