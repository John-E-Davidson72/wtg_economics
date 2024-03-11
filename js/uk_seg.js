{
    let form = document.getElementById('form');

    // SEG rate dropdown

    segdata = `[{"provider" : "Octopus Fixed 15p", "rate" : "15"},
     {"provider" : "Octopus Flux 24p", "rate" : "24"},
     {"provider" : "Scottish Power SmartGen+ 15p", "rate" : "15"},
     {"provider" : "Scottish Power SmartGen 12p", "rate" : "12"},
     {"provider" : "British Gas (existing cust.) 15p", "rate" : "15"},
     {"provider" : "British Gas 6.4p", "rate" : "6.4"},
     {"provider" : "EDF (own cust.) 5.6p", "rate" : "5.6"},
     {"provider" : "E.On 5.5p", "rate" : "5.5"},
     {"provider" : "Pozitive Energy 5p", "rate" : "5"},
     {"provider" : "So Energy 5p", "rate" : "5"},
     {"provider" : "Octopus (non cust.) 4.1p", "rate" : "4.1"},
     {"provider" : "OVO 4p", "rate" : "4"},
     {"provider" : "SSE 3.5p", "rate" : "3.5"},
     {"provider" : "Shell Energy 3.5p", "rate" : "3.5"},
     {"provider" : "Utilita 3p", "rate" : "3"},
     {"provider" : "EDF (non cust.) 3p", "rate" : "3"},
     {"provider" : "E.On (non cust) 3p", "rate" : "3"},
     {"provider" : "Utility Warehouse 2p", "rate" : "2"}]`;

    let dataSEG = JSON.parse(segdata);

    let dropdownSEG = document.getElementById('seg-dropdown');
    dropdownSEG.length = 0;

    let defaultOptionSEG = document.createElement('option');
    defaultOptionSEG.text = 'Choose SEG rate';

    dropdownSEG.add(defaultOptionSEG);
    dropdownSEG.selectedIndex = 0;

    let optionSEG;
    for (let i = 0; i < dataSEG.length; i++) {
        optionSEG = document.createElement('option');
        optionSEG.text = dataSEG[i].provider;
        optionSEG.value = dataSEG[i].rate;
        dropdownSEG.add(optionSEG);
    };

    // Wind speed dropdown and logic
    let winData = {
        '4': { pa: 75, eff: 0.2 },
        '5': { pa: 146, eff: 0.2 },
        '6': { pa: 253, eff: 0.19 },
        '7': { pa: 401, eff: 0.16 },
        '8': { pa: 599, eff: 0.15 },
        '9': { pa: 853, eff: 0.14 }
    };

    let optionSpeed = Object.keys(winData);
    let dropdownSpeed = document.getElementById('speed-dropdown');

    for (let i = 0; i < optionSpeed.length; i++) {
        let optSp = optionSpeed[i];

        let elSp = document.createElement("option");
        elSp.text = optSp;
        elSp.value = optSp;

        dropdownSpeed.add(elSp);
    };

    addEvent(form, 'submit', function (e) {
        e.preventDefault();
        // get form elements
        let elements = this.elements;
        let speed = elements.speed.value;
        let dia = elements.dia.value;
        let rating = elements.rating.value;
        let usage = elements.usage.value;
        let elecost = elements.elecost.value;
        let standch = elements.standch.value;
        let segrate = elements.segrate.value;

        let paVal;
        let effVal;

        let speedVal = speed.toString();

        switch (speedVal) {
            case '4':
                paVal = winData['4'].pa;
                effVal = winData['4'].eff;
                break;
            case '5':
                paVal = winData['5'].pa;
                effVal = winData['5'].eff;
                break;
            case '6':
                paVal = winData['6'].pa;
                effVal = winData['6'].eff;
                break;
            case '7':
                paVal = winData['7'].pa;
                effVal = winData['7'].eff;
                break;
            case '8':
                paVal = winData['8'].pa;
                effVal = winData['8'].eff;
                break;
            case '9':
                paVal = winData['9'].pa;
                effVal = winData['9'].eff;
                break;
        };

        // perform calculations

        let area = Math.PI * (dia / 2) ** 2;
        let aeo = paVal * area * 8760 * effVal * 0.001;
        let energyCons = aeo * 0.3 * 0.95;
        let energyExp = aeo * 0.7 * 0.95;
        let utilCost = (((elecost / 100) * usage) + ((standch / 100) * 365)) * 1.05;
        let costAv = energyCons * (elecost / 100);
        let segPay = energyExp * (segrate / 100);
        let totalSaving = costAv + segPay;
        let wtgPc = ((aeo * 0.95) / usage) * 100;
        let yearSavePc = (totalSaving / utilCost) * 100;
        let capFact = (aeo / (rating * 8760)) * 100;

        let allowance = 1000;
        let taxable;

        // Compare SEG payment to allowance
        if (segPay < allowance) {
            taxable = "N";
        } else {
            taxable = "Y";
        };

        // Get tax y/n element
        const taxEl = document.getElementById("tax");

        // Compare SEG payment and set colour
        if (taxable == "N") {
            taxEl.className = "val-pass"; // Set color to green if below threshold
        } else {
            taxEl.className = "val-fail"; // Set color to red if above threshold
        };

        // currency formatting
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });

        // populate results
        document.getElementById('aeores').textContent = formatter.format(aeo);
        document.getElementById('utilcost').textContent = utilCost.toFixed(2);
        document.getElementById('energycon').textContent = formatter.format(energyCons);
        document.getElementById('energyexp').textContent = formatter.format(energyExp);
        document.getElementById('avcost').textContent = costAv.toFixed(2);
        document.getElementById('segp').textContent = segPay.toFixed(2);
        document.getElementById('totalsav').textContent = totalSaving.toFixed(2);
        document.getElementById('wtgpc').textContent = wtgPc.toFixed(1);
        document.getElementById('tax').textContent = taxable;
        document.getElementById('totalspc').textContent = yearSavePc.toFixed(1);
        document.getElementById('capfact').textContent = capFact.toFixed(1);
    });

}