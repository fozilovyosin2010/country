let api = "https://restcountries.com/v3.1/all";

let root = document.querySelector(".root");

let inpSearch = document.querySelector(".inpSearch");

inpSearch.oninput = () => {
  searchData(inpSearch.value.trim());
};

if (inpSearch.value.trim() == "") {
  getData();
}

async function searchData(name) {
  try {
    let response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    let data = await response.json();
    get(data);
  } catch (error) {
    console.error(error);
  }
}

export async function getData() {
  try {
    let response = await fetch(api);
    let data = await response.json();
    get(data);
  } catch (error) {
    console.error(error);
  }
}

getData();

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
      // let a = Object.values(e.name.nativeName)[0].official;
      nameC.innerHTML = `${e.name.common}<br>(${
        Object.values(e.name.nativeName)[0].official
      })`;
    }

    let aView = document.createElement("a");
    aView.href = "../html/view.html";
    aView.className = "aView";

    let btnView = document.createElement("button");
    btnView.innerHTML =
      "<i class='bx bx-search-alt-2'></i><span>Learn more!</span>";
    btnView.classList.add("btnView");
    btnView.setAttribute("formaction", "./html/view.html");
    btnView.onclick = () => {
      console.log(e.name.common);
    };

    aView.append(btnView);
    b1Div1.append(nameC);
    block5.append(regionN, region);
    block4.append(currenciesN, currencies);
    block3.append(capitalN, capital);
    block2.append(cca2Name, cca2);
    block1.append(b1Div1, aView);
    sec.append(block1, block2, block3, block4, block5);
    root.appendChild(sec);
  });
}
