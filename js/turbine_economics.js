{
  let form = document.getElementById('form');
  addEvent(form, 'submit', function (e) {
    e.preventDefault();
    // get form elements
    let elements = this.elements;
    let capex = elements.turcost.value;
    let rating = elements.rating.value;
    let cap = elements.capfactor.value;
    let life = elements.deslife.value;
    let psell = elements.psell.value;
    let omrate = elements.omrate.value;
    let llrate = elements.llrate.value;
    let fcr = elements.fcr.value;
    // perform calculations
    let aep = rating * 24 * 365 * (cap / 100);
    let lrc = capex / life
    let revenue = aep * psell
    let omcost = revenue * (omrate / 100);
    let llcost = revenue * (llrate / 100);
    let pctg = (((fcr / 100) * capex) / aep) + ((lrc + omcost + llcost) / aep);
    let tae = aep * pctg;
    let pa = (psell - pctg) * aep;
    let roi = (pa / capex) * 100;
    let bep = capex / pa;

    // currency formatting
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    // populate results
    document.getElementById('capex').textContent = formatter.format(capex);
    document.getElementById('aep').textContent = formatter.format(aep);
    document.getElementById('lrc').textContent = formatter.format(lrc);
    document.getElementById('revenue').textContent = formatter.format(revenue);
    document.getElementById('omcost').textContent = formatter.format(omcost);
    document.getElementById('llcost').textContent = formatter.format(llcost);
    document.getElementById('pctg').textContent = pctg.toFixed(2);
    document.getElementById('tae').textContent = formatter.format(tae);
    document.getElementById('pa').textContent = formatter.format(pa);
    document.getElementById('roi').textContent = roi.toFixed(2);
    document.getElementById('bep').textContent = bep.toFixed(0);

    // Get margin element
    const roiEl = document.getElementById("roi");

    // Get numeric value
    const roiCheck = parseFloat(roiEl.textContent);

    // Compare the numeric value with the threshold
    if (roiCheck > 8) {
      roiEl.className = "val-pass"; // Set color to green if above threshold
    } else {
      roiEl.className = "val-fail"; // Set color to red if below threshold
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


