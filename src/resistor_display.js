export default class ResistorDisplay {
  constructor(parentElement) {
    this.parentElement = parentElement;

    const resistor = document.createElement("div");
    resistor.classList.add("resistor-display");

    this.parentElement.appendChild(resistor);
    this.resistor = resistor;
  }

  // display() creates a div for each band on the resistor and
  // sets the correct class for the corresponding color.
  display(resistor) {
    const res = this.resistor;
    res.innerHTML = "";

    // create each colored band
    resistor.bands.forEach(color => {
      const div = document.createElement("div");
      div.classList.add(`resistor-band`);
      div.classList.add(`resistor-band-${color.toLowerCase()}`);
      res.appendChild(div);
    });

    // set the tolerance class
    res.lastChild.classList.add("resistor-tolerance");
  }
}
