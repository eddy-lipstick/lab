RESPONSE 1

{
"context": {
"case_type": "Arbeidszaak",
"legal_domain": [
"Arbeidsrecht"
],
"procedural_stage": "Bodemzaak"
},
"key_sections": {
"party_mentions": {
"primary": {
"main_parties": [
"[eiser]",
"SOHO PRODUCE COÖPERATIE U.A."
],
"representatives": [
"mr. S.B.W. van de Scheur",
"mr. A.J.C. Theunissen"
],
"deciding_body": [
"Rechtbank Den Haag"
]
},
"secondary": [
"[naam 1] Produce Limited",
"[naam 1]",
"[naam 2]",
"[naam 3]",
"[naam 4]",
"[naam 5]",
"[naam 6]"
]
},
"relationship_mentions": {
"procedural": [
"Partijen worden hierna aangeduid als [eiser] en Soho.",
"Soho is een groothandel in groente en fruit die op 1 november 2012 is opgericht door [eiser] en [naam 1] Produce Limited",
"[eiser] is werkzaam als statutair bestuurder en werknemer bij Soho.",
"Op 1 april 2013 is [eiser] op basis van een arbeidsovereenkomst in dienst getreden bij Soho.",
"[naam 2] is op 1 april 2013 op basis van een arbeidsovereenkomst in dienst getreden bij Soho als sales manager.",
"Eind 2020 hebben Soho en [naam 2] een vaststellingsovereenkomst getekend, op grond waarvan [naam 2] per 1 april 2021 uit dienst is gegaan van Soho."
],
"temporal": [
"Op 1 mei 2013 hebben partijen een addendum aan de arbeidsovereenkomst toegevoegd",
"Begin 2019 is ook [naam 3] aan het managementteam toegevoegd.",
"De e-mail van 29 januari 2021 is onvoldoende om de door [eiser] gestelde overeenkomst vast te stellen.",
"De videomeeting heeft plaatsgevonden op 30 mei 2022.",
"In juni 2022 heeft [eiser] een bonus ontvangen over 2021",
"Op 1 augustus 2023 heeft Soho een bedrag van € 25.000,00 netto aan [eiser] betaald. Op 15 december 2023 heeft Soho een bruto bedrag van € 313.091,82 aan [eiser] betaald."
],
"financial": [
"[eiser] vordert dat Soho hem een onbetaald gebleven bonusbedrag van € 432.315,51 bruto betaalt.",
"Soho heeft in juni 2022 een bonus betaald aan [eiser] van € 200.183,94 bruto.",
"De rechtbank veroordeelt [eiser] tot betaling van de proceskosten aan de zijde van Soho, begroot op in totaal € 10.653,00."
],
"hierarchical": [
"MPL wordt bestuurd door [naam 1]",
"[naam 4] is Chief Administrative Officer bij MPL",
"[naam 5] is Chief Financial Officer bij MPL",
"[naam 6] is Vice President of Business Development bij MPL"
]
}
},
"full_text": "De volledige tekst van de uitspraak is opgenomen in het antwoord."
}

RESPONSE 2

{
"relationships": [
{
"type": "employment",
"from": "[eiser]",
"to": "SOHO PRODUCE COÖPERATIE U.A.",
"nature": {
"category": "arbeidsovereenkomst",
"direction": "reciprocal",
"legal_basis": "artikel 610 boek 7 BW",
"strength": 8,
"status": "active"
},
"timeline": {
"start": "1 april 2013",
"end": null,
"key_events": [
{
"date": "1 mei 2013",
"event": "Partijen voegen addendum toe aan arbeidsovereenkomst",
"impact": "Regelt o.a. bonus van 22% van positief bedrijfsresultaat"
}
]
},
"dependencies": {
"relies_on": [
"procedural_partnership_mplsoco"
],
"impacts": [
"financial_compensation_bonus"
]
},
"source_text": [
"Partijen worden hierna aangeduid als [eiser] en Soho.",
"[eiser] is werkzaam als statutair bestuurder en werknemer bij Soho.",
"Op 1 april 2013 is [eiser] op basis van een arbeidsovereenkomst in dienst getreden bij Soho.",
"Op 1 mei 2013 hebben partijen een addendum aan de arbeidsovereenkomst toegevoegd"
]
},
{
"type": "procedural",
"from": "[eiser]",
"to": "[naam 1] Produce Limited",
"nature": {
"category": "vennootschappelijk",
"direction": "reciprocal",
"legal_basis": "oprichting",
"strength": 9,
"status": "active"
},
"timeline": {
"start": "1 november 2012",
"end": null,
"key_events": []
},
"dependencies": {
"relies_on": [],
"impacts": [
"employment_esoho"
]
},
"source_text": [
"Soho is een groothandel in groente en fruit die op 1 november 2012 is opgericht door [eiser] en [naam 1] Produce Limited"
]
},
{
"type": "employment",
"from": "[naam 2]",
"to": "SOHO PRODUCE COÖPERATIE U.A.",
"nature": {
"category": "arbeidsovereenkomst",
"direction": "reciprocal",
"legal_basis": "artikel 610 boek 7 BW",
"strength": 8,
"status": "terminated"
},
"timeline": {
"start": "1 april 2013",
"end": "1 april 2021",
"key_events": [
{
"date": "eind 2020",
"event": "Partijen tekenen vaststellingsovereenkomst",
"impact": "[naam 2] vertrekt per 1 april 2021"
}
]
},
"dependencies": {
"relies_on": [
"employment_esoho"
],
"impacts": []
},
"source_text": [
"[naam 2] is op 1 april 2013 op basis van een arbeidsovereenkomst in dienst getreden bij Soho als sales manager.",
"Eind 2020 hebben Soho en [naam 2] een vaststellingsovereenkomst getekend, op grond waarvan [naam 2] per 1 april 2021 uit dienst is gegaan van Soho."
]
},
{
"type": "employment",
"from": "[naam 3]",
"to": "SOHO PRODUCE COÖPERATIE U.A.",
"nature": {
"category": "arbeidsovereenkomst",
"direction": "reciprocal",
"legal_basis": "artikel 610 boek 7 BW",
"strength": 8,
"status": "active"
},
"timeline": {
"start": "begin 2019",
"end": null,
"key_events": []
},
"dependencies": {
"relies_on": [
"employment_esoho"
],
"impacts": []
},
"source_text": [
"Begin 2019 is ook [naam 3] aan het managementteam toegevoegd."
]
},
{
"type": "hierarchical",
"from": "[naam 1]",
"to": "[naam 1] Produce Limited",
"nature": {
"category": "bestuurlijk",
"direction": "one_way",
"legal_basis": "vennootschapsrecht",
"strength": 10,
"status": "active"
},
"timeline": {
"start": null,
"end": null,
"key_events": []
},
"dependencies": {
"relies_on": [
"procedural_partnership_mplsoco"
],
"impacts": [
"hierarchical_caomfocfo",
"hierarchical_vpbd"
]
},
"source_text": [
"MPL wordt bestuurd door [naam 1]"
]
},
{
"type": "hierarchical",
"from": "[naam 4]",
"to": "[naam 1] Produce Limited",
"nature": {
"category": "dienstverband",
"direction": "one_way",
"legal_basis": "arbeidsovereenkomst",
"strength": 9,
"status": "active"
},
"timeline": {
"start": null,
"end": null,
"key_events": []
},
"dependencies": {
"relies_on": [
"hierarchical_n1mpl"
],
"impacts": []
},
"source_text": [
"[naam 4] is Chief Administrative Officer bij MPL"
]
},
{
"type": "hierarchical",
"from": "[naam 5]",
"to": "[naam 1] Produce Limited",
"nature": {
"category": "dienstverband",
"direction": "one_way",
"legal_basis": "arbeidsovereenkomst",
"strength": 9,
"status": "active"
},
"timeline": {
"start": null,
"end": null,
"key_events": []
},
"dependencies": {
"relies_on": [
"hierarchical_n1mpl"
],
"impacts": []
},
"source_text": [
"[naam 5] is Chief Financial Officer bij MPL"
]
},
{
"type": "hierarchical",
"from": "[naam 6]",
"to": "[naam 1] Produce Limited",
"nature": {
"category": "dienstverband",
"direction": "one_way",
"legal_basis": "arbeidsovereenkomst",
"strength": 9,
"status": "active"
},
"timeline": {
"start": null,
"end": null,
"key_events": []
},
"dependencies": {
"relies_on": [
"hierarchical_n1mpl"
],
"impacts": []
},
"source_text": [
"[naam 6] is Vice President of Business Development bij MPL"
]
},
{
"type": "financial",
"from": "SOHO PRODUCE COÖPERATIE U.A.",
"to": "[eiser]",
"nature": {
"category": "compensatie",
"direction": "one_way",
"legal_basis": "arbeidsovereenkomst",
"strength": 8,
"status": "disputed"
},
"timeline": {
"start": "1 april 2013",
"end": null,
"key_events": [
{
"date": "juni 2022",
"event": "Soho betaalt bonus €200.183,94 bruto",
"impact": "Bonus over 2021"
},
{
"date": "1 augustus 2023",
"event": "Soho betaalt €25.000 netto aan [eiser]",
"impact": "Voorschot op bonus 2022"
},
{
"date": "15 december 2023",
"event": "Soho betaalt €313.091,82 bruto aan [eiser]",
"impact": "Bonus over 2022"
}
]
},
"dependencies": {
"relies_on": [
"employment_esoho"
],
"impacts": []
},
"source_text": [
"[eiser] vordert dat Soho hem een onbetaald gebleven bonusbedrag van € 432.315,51 bruto betaalt.",
"Soho heeft in juni 2022 een bonus betaald aan [eiser] van € 200.183,94 bruto.",
"Op 1 augustus 2023 heeft Soho een bedrag van € 25.000,00 netto aan [eiser] betaald. Op 15 december 2023 heeft Soho een bruto bedrag van € 313.091,82 aan [eiser] betaald."
]
}
]
}

RESPONSE 3

{
"timeline": [
{
"date": "1 november 2012",
"event_type": "procedural",
"description": "[eiser] en [naam 1] Produce Limited richten SOHO PRODUCE COÖPERATIE U.A. op",
"actors": {
"primary": [
"[eiser]",
"[naam 1] Produce Limited"
],
"secondary": []
},
"impact": {
"immediate_effects": [
"Oprichting groothandel in groente en fruit"
],
"legal_consequences": [
"Artikel 610 boek 7 BW is van toepassing"
],
"relationship_changes": [
"Zakelijke samenwerking tussen [eiser] en [naam 1] Produce Limited"
]
},
"related_events": {
"triggers": [],
"triggered_by": []
},
"sources": [
"Soho is een groothandel in groente en fruit die op 1 november 2012 is opgericht door [eiser] en [naam 1] Produce Limited (hierna: MPL), een Canadese kasgroententeler."
]
},
{
"date": "1 april 2013",
"event_type": "employment",
"description": "[eiser] treedt in dienst bij SOHO PRODUCE COÖPERATIE U.A.",
"actors": {
"primary": [
"[eiser]",
"SOHO PRODUCE COÖPERATIE U.A."
],
"secondary": []
},
"impact": {
"immediate_effects": [
"[eiser] wordt statutair bestuurder en werknemer"
],
"legal_consequences": [
"Artikel 610 boek 7 BW is van toepassing"
],
"relationship_changes": [
"Arbeidsrelatie tussen [eiser] en SOHO PRODUCE COÖPERATIE U.A."
]
},
"related_events": {
"triggers": [
"procedural_partnership_mplsoco"
],
"triggered_by": []
},
"sources": [
"Op 1 april 2013 is [eiser] op basis van een arbeidsovereenkomst in dienst getreden bij Soho."
]
},
{
"date": "1 mei 2013",
"event_type": "employment",
"description": "Partijen voegen addendum toe aan arbeidsovereenkomst van [eiser]",
"actors": {
"primary": [
"[eiser]",
"SOHO PRODUCE COÖPERATIE U.A."
],
"secondary": []
},
"impact": {
"immediate_effects": [
"Regelt o.a. bonus van 22% van positief bedrijfsresultaat"
],
"legal_consequences": [],
"relationship_changes": []
},
"related_events": {
"triggers": [
"employment_esoho"
],
"triggered_by": []
},
"sources": [
"Op 1 mei 2013 hebben partijen een addendum aan de arbeidsovereenkomst toegevoegd"
]
},
{
"date": "1 april 2013",
"event_type": "employment",
"description": "[naam 2] treedt in dienst als sales manager",
"actors": {
"primary": [
"[naam 2]",
"SOHO PRODUCE COÖPERATIE U.A."
],
"secondary": []
},
"impact": {
"immediate_effects": [],
"legal_consequences": [
"Arbeidsovereenkomst met managementbonus van 11%"
],
"relationship_changes": []
},
"related_events": {
"triggers": [
"employment_esoho"
],
"triggered_by": []
},
"sources": [
"[naam 2] is op 1 april 2013 op basis van een arbeidsovereenkomst in dienst getreden bij Soho als sales manager."
]
},
{
"date": "begin 2019",
"event_type": "employment",
"description": "[naam 3] treedt in dienst",
"actors": {
"primary": [
"[naam 3]",
"SOHO PRODUCE COÖPERATIE U.A."
],
"secondary": []
},
"impact": {
"immediate_effects": [],
"legal_consequences": [],
"relationship_changes": []
},
"related_events": {
"triggers": [
"employment_esoho"
],
"triggered_by": []
},
"sources": [
"Begin 2019 is ook [naam 3] aan het managementteam toegevoegd."
]
},
{
"date": "eind 2020",
"event_type": "employment",
"description": "[naam 2] en SOHO PRODUCE COÖPERATIE U.A. tekenen vaststellingsovereenkomst",
"actors": {
"primary": [
"[naam 2]",
"SOHO PRODUCE COÖPERATIE U.A."
],
"secondary": []
},
"impact": {
"immediate_effects": [],
"legal_consequences": [],
"relationship_changes": [
"[naam 2] vertrekt per 1 april 2021"
]
},
"related_events": {
"triggers": [
"employment_jn2soco"
],
"triggered_by": []
},
"sources": [
"Eind 2020 hebben Soho en [naam 2] een vaststellingsovereenkomst getekend, op grond waarvan [naam 2] per 1 april 2021 uit dienst is gegaan van Soho."
]
}
],
"critical_periods": [
{
"start_date": "1 april 2013",
"end_date": "1 april 2021",
"description": "Periode arbeidsovereenkomst [naam 2]",
"significance": "Beïnvloedde hoogte bonus [eiser]"
},
{
"start_date": "begin 2019",
"end_date": null,
"description": "Toetreding [naam 3] tot managementteam",
"significance": "Impact op verdeling bonuspool"
}
]
}

RESPONSE 4

{
"visualization_elements": {
"nodes": [
{
"id": "eiser",
"type": "person",
"label": "[eiser]",
"category": "primary",
"importance": 3,
"group": "employees",
"properties": {
"start_date": "2013-04-01",
"end_date": null,
"status": "employed"
}
},
{
"id": "soco",
"type": "company",
"label": "SOHO PRODUCE COÖPERATIE U.A.",
"category": "defendant",
"importance": 3,
"group": "companies",
"properties": {
"start_date": "2012-11-01",
"end_date": null,
"status": "active"
}
},
{
"id": "mpl",
"type": "company",
"label": "[naam 1] Produce Limited",
"category": "secondary",
"importance": 2,
"group": "companies",
"properties": {
"start_date": null,
"end_date": null,
"status": "active"
}
},
{
"id": "jn1",
"type": "person",
"label": "[naam 1]",
"category": "secondary",
"importance": 2,
"group": "shareholders",
"properties": {
"start_date": null,
"end_date": null,
"status": null
}
},
{
"id": "jn2",
"type": "person",
"label": "[naam 2]",
"category": "secondary",
"importance": 2,
"group": "employees",
"properties": {
"start_date": "2013-04-01",
"end_date": "2021-04-01",
"status": "former_employee"
}
},
{
"id": "jn3",
"type": "person",
"label": "[naam 3]",
"category": "secondary",
"importance": 1,
"group": "employees",
"properties": {
"start_date": "2019-01-01",
"end_date": null,
"status": "employed"
}
}
],
"relationships": [
{
"from": "eiser",
"to": "soco",
"type": "employment",
"visual_properties": {
"direction": "one_way",
"strength": 3,
"style": "solid",
"color_category": "primary"
},
"temporal": false,
"active": true
},
{
"from": "jn2",
"to": "soco",
"type": "employment",
"visual_properties": {
"direction": "one_way",
"strength": 2,
"style": "solid",
"color_category": "secondary"
},
"temporal": true,
"active": false
},
{
"from": "jn3",
"to": "soco",
"type": "employment",
"visual_properties": {
"direction": "one_way",
"strength": 1,
"style": "solid",
"color_category": "secondary"
},
"temporal": false,
"active": true
},
{
"from": "eiser",
"to": "jn1",
"type": "dispute",
"visual_properties": {
"direction": "two_way",
"strength": 3,
"style": "dashed",
"color_category": "primary"
},
"temporal": false,
"active": true
},
{
"from": "mpl",
"to": "jn1",
"type": "ownership",
"visual_properties": {
"direction": "one_way",
"strength": 2,
"style": "solid",
"color_category": "secondary"
},
"temporal": false,
"active": true
},
{
"from": "eiser",
"to": "mpl",
"type": "partnership",
"visual_properties": {
"direction": "two_way",
"strength": 2,
"style": "solid",
"color_category": "secondary"
},
"temporal": false,
"active": false
},
{
"from": "mpl",
"to": "soco",
"type": "partnership",
"visual_properties": {
"direction": "two_way",
"strength": 3,
"style": "solid",
"color_category": "primary"
},
"temporal": false,
"active": true
}
],
"timeline_elements": [
{
"date": "2012-11-01",
"type": "event",
"label": "Oprichting SOHO PRODUCE COÖPERATIE U.A.",
"affects": [
"eiser",
"soco",
"mpl"
],
"importance": 3
},
{
"date": "2013-04-01",
"type": "event",
"label": "[eiser] treedt in dienst bij SOHO",
"affects": [
"eiser",
"soco"
],
"importance": 3
},
{
"date": "2013-05-01",
"type": "event",
"label": "Addendum arbeidsovereenkomst [eiser]",
"affects": [
"eiser",
"soco"
],
"importance": 3
},
{
"date": "2013-04-01",
"type": "event",
"label": "[naam 2] treedt in dienst bij SOHO",
"affects": [
"jn2",
"soco"
],
"importance": 2
},
{
"date": "2019-01-01",
"type": "event",
"label": "[naam 3] treedt in dienst bij SOHO",
"affects": [
"jn3",
"soco"
],
"importance": 1
},
{
"date": "2021-04-01",
"type": "event",
"label": "[naam 2] vertrekt bij SOHO",
"affects": [
"jn2",
"soco"
],
"importance": 2
}
],
"visual_groups": [
{
"name": "employees",
"nodes": [
"eiser",
"jn2",
"jn3"
],
"color_scheme": "blue"
},
{
"name": "companies",
"nodes": [
"soco",
"mpl"
],
"color_scheme": "green"
},
{
"name": "shareholders",
"nodes": [
"jn1"
],
"color_scheme": "red"
}
]
}
}

RESPONSE 4

{
"visualisatieElementen": {
"knooppunten": [
{
"id": "PEC_MANDARIN_SARL",
"type": "bedrijf",
"label": "PEC MANDARIN SARL",
"categorie": "Eiser in conventie, Gedaagde in reconventie",
"belangrijkheid": 10,
"groep": "Partijen",
"eigenschappen": {
"startDatum": "",
"eindDatum": "",
"status": "actief"
}
},
{
"id": "gedaagde",
"type": "persoon",
"label": "[gedaagde]",
"categorie": "Gedaagde in conventie, Eiser in reconventie",
"belangrijkheid": 10,
"groep": "Partijen",
"eigenschappen": {
"startDatum": "",
"eindDatum": "",
"status": "actief"
}
},
{
"id": "Rechtbank_Amsterdam",
"type": "instantie",
"label": "Rechtbank Amsterdam",
"categorie": "Beslissende instantie",
"belangrijkheid": 9,
"groep": "Instanties",
"eigenschappen": {
"startDatum": "",
"eindDatum": "",
"status": "actief"
}
},
{
"id": "mr_WY_Wong",
"type": "persoon",
"label": "mr. W.Y. Wong",
"categorie": "Gemachtigde van PEC",
"belangrijkheid": 8,
"groep": "Vertegenwoordigers",
"eigenschappen": {
"startDatum": "",
"eindDatum": "",
"status": "actief"
}
},
{
"id": "accountmanager_MVGM",
"type": "persoon",
"label": "Accountmanager MVGM",
"categorie": "Vertegenwoordiger van PEC",
"belangrijkheid": 7,
"groep": "Vertegenwoordigers",
"eigenschappen": {
"startDatum": "",
"eindDatum": "",
"status": "actief"
}
}
],
"relaties": [
{
"van": "gedaagde",
"naar": "PEC_MANDARIN_SARL",
"type": "Huurachterstand",
"visueleEigenschappen": {
"richting": "enkelzijdig",
"sterkte": 8,
"stijl": "vast",
"kleurCategorie": "financieel"
},
"tijdgebonden": true,
"actief": true
},
{
"van": "PEC_MANDARIN_SARL",
"naar": "gedaagde",
"type": "Juridisch conflict",
"visueleEigenschappen": {
"richting": "tweezijdig",
"sterkte": 10,
"stijl": "gestreept",
"kleurCategorie": "juridisch"
},
"tijdgebonden": true,
"actief": true
},
{
"van": "Rechtbank_Amsterdam",
"naar": "PEC_MANDARIN_SARL",
"type": "Juridische beslissing",
"visueleEigenschappen": {
"richting": "enkelzijdig",
"sterkte": 9,
"stijl": "vast",
"kleurCategorie": "juridisch"
},
"tijdgebonden": true,
"actief": true
},
{
"van": "Rechtbank_Amsterdam",
"naar": "gedaagde",
"type": "Juridische beslissing",
"visueleEigenschappen": {
"richting": "enkelzijdig",
"sterkte": 9,
"stijl": "vast",
"kleurCategorie": "juridisch"
},
"tijdgebonden": true,
"actief": true
}
],
"tijdlijnElementen": [
{
"datum": "2025-01-07",
"type": "juridisch",
"label": "Vonnis",
"beinvloedt": [
"PEC_MANDARIN_SARL",
"gedaagde"
],
"belangrijkheid": 10
}
],
"visueleGroepen": [
{
"naam": "Partijen",
"knooppunten": [
"PEC_MANDARIN_SARL",
"gedaagde"
],
"kleurSchema": "blauw"
},
{
"naam": "Instanties",
"knooppunten": [
"Rechtbank_Amsterdam"
],
"kleurSchema": "groen"
},
{
"naam": "Vertegenwoordigers",
"knooppunten": [
"mr_WY_Wong",
"accountmanager_MVGM"
],
"kleurSchema": "oranje"
}
]
}
}
