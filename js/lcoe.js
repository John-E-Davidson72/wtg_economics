{
let form = document.getElementById('form_lcoe');
addEvent(form, 'submit', function (e) {
  e.preventDefault();
  // get form elements
  let elements = this.elements;
  let discrate = elements.discrate.value;
  let capcost = elements.capcost.value;
  let capacity = elements.capacity.value; 
  let psell = elements.psell.value;
  let pmarket = elements.pmarket.value;
  let deslife = elements.deslife.value;
  let capfactor = elements.capfactor.value;
  let omrate = elements.omrate.value;

  // perform calculations
  let discpc = discrate / 100;
  let capcostmil = capcost * 1000000;
  let fcrcalc = (((discpc / ((discpc + 1) ** deslife-1))) + discpc);
  let fcrint = fcrcalc * 100;
  let aep = capacity * 24 * 365 * (capfactor / 100);
  let opcost = psell * aep * (omrate / 100);
  let lcoe = (capcostmil / aep) * fcrcalc + opcost / aep;
  let lfc = (capcostmil / aep) * fcrcalc;
  let lvc = opcost / aep;
  let daysprod = 365 * (capfactor / 100);
  let margin = pmarket - lcoe;

  // currency formatting
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // populate results
  document.getElementById('lcoecalc').textContent = lcoe.toFixed(2);
  document.getElementById('production').textContent = formatter.format(aep);
  document.getElementById('dayseq').textContent = daysprod.toFixed(0); 
  document.getElementById('fcrcalc').textContent = fcrint.toFixed(0); 
  document.getElementById('lfccalc').textContent = lfc.toFixed(2);
  document.getElementById('lvccalc').textContent = lvc.toFixed(2);
  document.getElementById('margincalc').textContent = margin.toFixed(2);

  // Get margin element
  const marginEl = document.getElementById("margincalc");

  // Get numeric value
  const marginCheck = parseFloat(marginEl.textContent);

  // Compare the numeric value with the threshold
  if (marginCheck > 0) {
      marginEl.className = "val-pass"; // Set color to green if above threshold
  } else {
      marginEl.className = "val-fail"; // Set color to green if above threshold
  }
});

// currency selection
const curSelect = document.getElementById("currency");
const curSet = document.getElementsByClassName("cur");

curSelect.addEventListener("change", function () {
  const value = this.value;
  for (let i = 0; i < curSet.length; i++) {
    curSet[i].textContent = value;
  }
});


}


