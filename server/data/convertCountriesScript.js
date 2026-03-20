import fs from "fs"

const raw = JSON.parse(fs.readFileSync("./data/countriesRaw.json"));

const codeToName = {};

raw.forEach(c =>{
    codeToName[c.cca3]=c.name.common
});


const formatted = raw.map(c=> ({
    name: c.name.common,
    lat: c.latlng?.[0]||0,
    lng: c.latlng?.[1]||0,
    neighbors: (c.borders || []).map(code=>codeToName[code])
}));

fs.writeFileSync(
    "./data/countries.json",
    JSON.stringify(formatted, null, 2)
);
console.log("COUNTRIES JSON CREATED!")