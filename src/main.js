import { init } from "./ui";
import { calculateResistance } from "./resistor";
import ResistorDisplay from "./resistor_display";

(function main() {
  // create the resistor display and attach it to
  // the container.
  const resistorDisplay = new ResistorDisplay(
    document.querySelector("#resistor-container")
  );

  // init requires a function that will be called whenever the
  // resistor is changed.
  // resistor will be an instance of the Resistor class.
  init(resistor => {
    setResistorValue(resistor);
    resistorDisplay.display(resistor);
  });
})();

function setResistorValue(resistor) {
  const val = calculateResistance(resistor);
  document.querySelector("#resistor-value").innerHTML = val;
}
