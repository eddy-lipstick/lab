{
"visualisatieElementen": {
"knooppunten": [
{
"id": "PHOENIX_ACQUISITION_COMPANY_Sarl",
"type": "bedrijf",
"label": "Phoenix Acquisition Company Sarl",
"categorie": "Eiser",
"belangrijkheid": 9,
"groep": "Partijen",
"eigenschappen": {
"startDatum": "",
"eindDatum": "",
"status": "Eiser tot cassatie"
}
},
{
"id": "KONINKLIJKE_PHILIPS_ELECTRONICS_NV",
"type": "bedrijf",
"label": "Koninklijke Philips Electronics N.V.",
"categorie": "Verweerder",
"belangrijkheid": 9,
"groep": "Partijen",
"eigenschappen": {
"startDatum": "",
"eindDatum": "",
"status": "Verweerster in cassatie"
}
},
{
"id": "HOGE_RAAD_DER_NEDERLANDEN",
"type": "instantie",
"label": "Hoge Raad der Nederlanden",
"categorie": "Rechtsprekende instantie",
"belangrijkheid": 10,
"groep": "Instanties",
"eigenschappen": {
"startDatum": "",
"eindDatum": "",
"status": "Hoogste rechtsprekende instantie"
}
},
{
"id": "BCcomponents_Holdings_BV",
"type": "bedrijf",
"label": "BCcomponents Holdings B.V.",
"categorie": "Mede-eiser",
"belangrijkheid": 7,
"groep": "Partijen",
"eigenschappen": {
"startDatum": "",
"eindDatum": "",
"status": "Mede-eiser in feitelijke instanties"
}
},
{
"id": "RECHTBANK_AMSTERDAM",
"type": "instantie",
"label": "Rechtbank Amsterdam",
"categorie": "Rechtsprekende instantie",
"belangrijkheid": 8,
"groep": "Instanties",
"eigenschappen": {
"startDatum": "",
"eindDatum": "",
"status": "Eerste aanleg"
}
},
{
"id": "GERECHTSHOF_AMSTERDAM",
"type": "instantie",
"label": "Gerechtshof Amsterdam",
"categorie": "Rechtsprekende instantie",
"belangrijkheid": 8,
"groep": "Instanties",
"eigenschappen": {
"startDatum": "",
"eindDatum": "",
"status": "Hoger beroep"
}
}
],
"relaties": [
{
"van": "PHOENIX_ACQUISITION_COMPANY_Sarl",
"naar": "KONINKLIJKE_PHILIPS_ELECTRONICS_NV",
"type": "juridisch conflict",
"visueleEigenschappen": {
"richting": "enkelzijdig",
"sterkte": 10,
"stijl": "vast",
"kleurCategorie": "rood"
},
"tijdgebonden": true,
"actief": false
},
{
"van": "PHOENIX_ACQUISITION_COMPANY_Sarl",
"naar": "HOGE_RAAD_DER_NEDERLANDEN",
"type": "cassatieberoep",
"visueleEigenschappen": {
"richting": "enkelzijdig",
"sterkte": 10,
"stijl": "vast",
"kleurCategorie": "blauw"
},
"tijdgebonden": true,
"actief": false
},
{
"van": "HOGE_RAAD_DER_NEDERLANDEN",
"naar": "PHOENIX_ACQUISITION_COMPANY_Sarl",
"type": "uitspraak",
"visueleEigenschappen": {
"richting": "enkelzijdig",
"sterkte": 10,
"stijl": "vast",
"kleurCategorie": "groen"
},
"tijdgebonden": true,
"actief": false
}
],
"tijdlijnElementen": [
{
"datum": "21 juli 2000",
"type": "juridisch",
"label": "Dagvaarding door Phoenix en BCC",
"beinvloedt": [
"PHOENIX_ACQUISITION_COMPANY_Sarl",
"KONINKLIJKE_PHILIPS_ELECTRONICS_NV"
],
"belangrijkheid": 8
},
{
"datum": "13 maart 2002",
"type": "juridisch",
"label": "Vonnis Rechtbank Amsterdam",
"beinvloedt": [
"PHOENIX_ACQUISITION_COMPANY_Sarl",
"KONINKLIJKE_PHILIPS_ELECTRONICS_NV"
],
"belangrijkheid": 8
},
{
"datum": "22 september 2005",
"type": "juridisch",
"label": "Arrest Gerechtshof Amsterdam",
"beinvloedt": [
"PHOENIX_ACQUISITION_COMPANY_Sarl",
"KONINKLIJKE_PHILIPS_ELECTRONICS_NV"
],
"belangrijkheid": 8
},
{
"datum": "7 september 2007",
"type": "juridisch",
"label": "Uitspraak Hoge Raad",
"beinvloedt": [
"PHOENIX_ACQUISITION_COMPANY_Sarl",
"KONINKLIJKE_PHILIPS_ELECTRONICS_NV"
],
"belangrijkheid": 10
}
],
"visueleGroepen": [
{
"naam": "Partijen",
"knooppunten": [
"PHOENIX_ACQUISITION_COMPANY_Sarl",
"KONINKLIJKE_PHILIPS_ELECTRONICS_NV",
"BCcomponents_Holdings_BV"
],
"kleurSchema": "rood"
},
{
"naam": "Instanties",
"knooppunten": [
"HOGE_RAAD_DER_NEDERLANDEN",
"RECHTBANK_AMSTERDAM",
"GERECHTSHOF_AMSTERDAM"
],
"kleurSchema": "blauw"
}
]
}
}
