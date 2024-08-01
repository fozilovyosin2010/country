let api = "https://restcountries.com/v3.1/all";

let root = document.querySelector(".root");

let inpSearch = document.querySelector(".inpSearch");

let viewModal = document.querySelector(".viewModal");
let rootView = document.querySelector(".rootView");

inpSearch.oninput = () => {
  if (inpSearch.value.trim().length > 0) {
    searchData(inpSearch.value.trim().toLowerCase());
  }
};

async function searchData(name) {
  try {
    let response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    let data = await response.json();
    get(data);
  } catch (error) {
    console.error(error);
  }
}

async function getDataView(name) {
  try {
    let response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    let data = await response.json();
    getView(data);
  } catch (error) {
    console.error(error);
  }
}

async function getData() {
  try {
    let response = await fetch(api);
    let data = await response.json();
    get(data);
  } catch (error) {
    console.error(error);
  }
}

getData();

function viewCountry() {
  viewModal.showModal();
}
function getView(data) {
  rootView.innerHTML = "";

  let mainBlock = document.createElement("div");
  mainBlock.className = "mainBlock";

  let block1 = document.createElement("div");
  block1.className = "block1";

  let block2 = document.createElement("div");
  block2.className = "block2";

  let secX = document.createElement("div");
  secX.className = "secX";

  let h1 = document.createElement("h1");
  h1.className = "h1";
  h1.innerHTML = "Name";

  let h2 = document.createElement("h1");
  h2.className = "h2";
  h2.innerHTML = "Languages";

  let btnXview = document.createElement("button");
  btnXview.className = "btnXview";
  btnXview.innerHTML = "&times";
  btnXview.onclick = () => {
    viewModal.close();
  };

  let table1 = document.createElement("table");
  table1.className = "table1";

  let table2 = document.createElement("table");
  table2.className = "table2";

  secX.appendChild(btnXview);
  block1.append(h1, table1);
  block2.append(h2, table2);
  mainBlock.append(block1, block2);
  rootView.append(secX, mainBlock);

  data.forEach((e) => {
    let trCommon = document.createElement("tr");

    let tdCommonN = document.createElement("td");

    tdCommonN.innerHTML = `Country`;

    let tdCommon = document.createElement("td");
    tdCommon.innerHTML = e.name.common;

    let trOffcial = document.createElement("tr");

    let tdOffcialN = document.createElement("td");
    tdOffcialN.innerHTML = `Official name`;

    let tdOffcial = document.createElement("td");
    tdOffcial.innerHTML = e.name.official;

    let trCapital = document.createElement("tr");

    let tdCapitalN = document.createElement("td");
    tdCapitalN.innerHTML = `Capital`;

    let tdCapital = document.createElement("td");
    tdCapital.innerHTML = e.capital;

    let trNativeName = document.createElement("tr");

    let tdNativeNameN = document.createElement("td");
    tdNativeNameN.innerHTML = `Native name`;

    let tdNativeName = document.createElement("td");
    // tdNativeName.innerHTML = e.name.nativeName;

    if (e.name.nativeName) {
      tdNativeName.innerHTML = Object.values(e.name.nativeName)[0].official;
    }

    let trTranslation = document.createElement("tr");
    trTranslation.className = "trTranslation";

    //translation

    let tdTranslationN = document.createElement("td");
    tdTranslationN.innerHTML =
      "<span>Translations</span> <i class='bx bx-chevrons-down'></i>";
    tdTranslationN.colSpan = 2;
    tdTranslationN.className = "tdTranslationN";

    //Only native language
    let trNatLang = document.createElement("tr");

    let tdNatLangN = document.createElement("td");
    tdNatLangN.innerHTML = "Native Language(s)";

    let tdNatLang = document.createElement("td");

    if (e.languages) {
      let a = Object.values(e.languages)[0];
      tdNatLang.innerHTML = a;
    }

    let trLangs = document.createElement("tr");

    let tdLangs = document.createElement("td");
    tdLangs.innerHTML = "Languages";
    tdLangs.colSpan = 2;

    trLangs.append(tdLangs);
    trNatLang.append(tdNatLangN, tdNatLang);
    table2.append(trNatLang, trLangs);

    //Languages
    if (e.languages) {
      let a = Object.keys(e.languages);
      let b = Object.values(e.languages);

      for (let i = 0; i < a.length; i++) {
        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.innerHTML = a[i];

        let td2 = document.createElement("td");
        td2.innerHTML = b[i];

        tr.append(td1, td2);
        table2.append(tr);
      }
      a.map((e) => {
        let td1 = document.createElement("td");
        td1.innerHTML = e;
      });

      b.map((e) => {
        let td2 = document.createElement("td");
        td2.innerHTML = e;
      });
    }

    table1.append(trCommon, trOffcial, trCapital, trNativeName, trTranslation);
    trTranslation.append(tdTranslationN);
    trNativeName.append(tdNativeNameN, tdNativeName);
    trCapital.append(tdCapitalN, tdCapital);
    trOffcial.append(tdOffcialN, tdOffcial);
    trCommon.append(tdCommonN, tdCommon);

    let trC = [];
    for (let i = 0; i < 25; i++) {
      let tr = document.createElement("tr");

      tr.className = "lang-clk";

      let objN = Object.keys(e.translations)[i];

      let tdN = document.createElement("td");
      tdN.innerHTML = objN;

      let obj = Object.values(e.translations)[i].common;

      let td = document.createElement("td");
      td.innerHTML = obj;

      tr.append(tdN, td);
      table1.append(tr);

      trC.push(tr);

      tdTranslationN.onclick = () => {
        trC.map((e) => {
          e.classList.toggle("lang-clk");
        });
      };
    }
  });
}

function get(data) {
  root.innerHTML = "";
  data.forEach((e) => {
    let sec = document.createElement("div");
    sec.classList.add("sec");

    let block1 = document.createElement("div");
    block1.className = "bbtm f block";

    let block2 = document.createElement("div");
    block2.className = "bbtm block";

    let block3 = document.createElement("div");
    block3.className = "bbtm block";

    let block4 = document.createElement("div");
    block4.className = "bbtm block";

    let block5 = document.createElement("div");
    block5.className = "bbtm block";

    let regionN = document.createElement("h4");
    regionN.innerHTML = `region`;
    let region = document.createElement("h5");
    region.innerHTML = e.region;

    let currenciesN = document.createElement("h4");
    currenciesN.innerHTML = `currency`;

    let currencies = document.createElement("h5");
    if (e.currencies) {
      currencies.innerHTML = `${Object.values(e.currencies)[0].name} (${
        Object.values(e.currencies)[0].symbol
      })`;
    }
    let capitalN = document.createElement("h4");
    capitalN.innerHTML = `capital`;

    let capital = document.createElement("h5");
    capital.innerHTML = e.capital;

    let cca2Name = document.createElement("h4");
    cca2Name.innerHTML = "cca2";

    let cca2 = document.createElement("h5");
    cca2.innerHTML = e.cca2;

    let b1Div1 = document.createElement("div");
    b1Div1.classList.add("b1Div1");

    let nameC = document.createElement("h6");

    if (e.name.common && e.name.nativeName) {
      nameC.innerHTML = `${e.name.common}<br>(${
        Object.values(e.name.nativeName)[0].official
      })`;
    }

    let btnView = document.createElement("button");
    btnView.innerHTML =
      "<i class='bx bx-search-alt-2'></i><span>Learn more!</span>";
    btnView.classList.add("btnView");
    btnView.onclick = (event) => {
      event.preventDefault();
      getDataView(e.name.common);

      viewCountry();
    };
    b1Div1.append(nameC);
    block5.append(regionN, region);
    block4.append(currenciesN, currencies);
    block3.append(capitalN, capital);
    block2.append(cca2Name, cca2);
    block1.append(b1Div1, btnView);
    sec.append(block1, block2, block3, block4, block5);
    root.appendChild(sec);
  });
}
