# Relationship Analysis Test Environment

## Background

We've developed a 4-step prompt chain to analyze relationships in legal cases. This is more sophisticated than the current single-prompt approach (which directly asks for chronology/arguments/legal concepts).

Instead of direct outputs, this chain builds a rich data model that can power various visualizations and analyses.

## The Chain

1. **Initial Context & Party Detection**

   - Identifies case type, parties, and basic relationships
   - Maps primary and secondary actors
   - Identifies key relationship mentions

2. **Relationship Analysis**

   - Deep analysis of identified relationships
   - Maps dependencies and impacts
   - Tracks relationship evolution

3. **Timeline Construction**

   - Creates chronological mapping
   - Identifies critical periods
   - Maps cause and effect

4. **Visualization Preparation**
   - Structures data for visualization
   - Defines nodes and relationships
   - Sets visual properties

## Test Environment Plan

Building a simple Next.js app to:

- Test and refine the prompt chain
- Validate with real cases
- Visualize results step by step
- No backend needed (direct API calls to Claude)

### Key Features Needed

- Input field for case text
- Step-by-step result display
- JSON formatting/validation
- Ability to modify prompts
- Save/load test cases

## Next Steps

1. Setup basic Next.js project
2. Create test environment page
3. Implement prompt chain
4. Test with real cases
5. Refine prompts based on results

## Example Usage

The environment will help validate if we can reliably extract structured relationship data that can power visualizations like:

- Timeline views
- Relationship diagrams
- Who's who overviews
- Process flows

## Original Prompts

[Include the 4 prompts we developed here]

Would you like me to continue by adding any specific section to this README?

PROMPTS

STAP 1

SYSTEM

Human: Je bent een expert in het analyseren van Nederlandse juridische teksten. Je taak is om alle relevante verhoudingen tussen partijen systematisch in kaart te brengen.

Focus op:

- Juridische terminologie die relaties aanduidt
- Zowel expliciete als impliciete verhoudingen
- Relevante contextuele informatie
- Tijdsaspecten en veranderingen in relaties

Let specifiek op indicatoren van:

- Procedurele verhoudingen
- Hiërarchische relaties
- Financiële verplichtingen
- Vertegenwoordigingsrelaties
- Termijnen en deadlines

Wees precies in je analyse en geef duidelijk aan waar interpretaties onzeker zijn.

USER

Analyseer deze juridische tekst en breng alle relevante verhoudingen tussen partijen in kaart.

Focus specifiek op:

1. Processuele verhoudingen

   - Primaire procespartijen en hun rollen
   - Vertegenwoordigingsrelaties (gemachtigden)
   - Hiërarchische verhoudingen (bestuursorgaan-burger)

2. Termijn- en procedurerelaties

   - Wettelijke termijnen en hun basis
   - Ingebrekestellingen en deadlines
   - Opgelegde nieuwe termijnen
   - Processtappen en hun volgorde

3. Financiële verhoudingen
   - Opgelegde dwangsommen
   - Proceskostenveroordelingen
   - Andere financiële verplichtingen

Geef je analyse in precies dit JSON format:
{
"context": {
"case_type": string, // Type procedure
"legal_domain": string[], // Rechtsgebieden
"procedural_stage": string // Fase van procedure
},
"key_sections": {
"party_mentions": {
"primary": {
"main_parties": string[], // Hoofdpartijen
"representatives": string[], // Gemachtigden
"deciding_body": string[] // Rechtsprekende instantie
},
"secondary": string[] // Contextuele partij-informatie
},
"relationship_mentions": {
"procedural": string[], // Processuele verhoudingen
"temporal": string[], // Termijnen en deadlines
"financial": string[], // Geldelijke verplichtingen
"hierarchical": string[] // Gezagsverhoudingen
}
},
"full_text": string
}

Hieronder volgt de te analyseren uitspraak:

[Plak hier de uitspraak]

STAP 2

SYSTEM

Je bent een expert in het analyseren van juridische verhoudingen. Je taak is om de geïdentificeerde relaties uit een eerdere analyse verder uit te diepen en te structureren.

Focus op:

- De juridische basis van elke relatie
- De onderlinge afhankelijkheden tussen relaties
- De chronologische ontwikkeling
- De formele en praktische impact
- De sterkte en richting van elke relatie

Wees specifiek in het identificeren van:

- Causale verbanden tussen gebeurtenissen
- Juridische gevolgen van handelingen
- Hoe verschillende relaties elkaar beïnvloeden
- De hiërarchie en prioriteit van verhoudingen

USER

Gebruik de volgende analyse om een gedetailleerd beeld te maken van alle relaties en hun onderlinge samenhang.

Eerdere analyse:
${de JSON die je net stuurde}

Geef een gedetailleerde analyse in dit format:
{
"relationships": [
{
"type": "employment" | "procedural" | "disciplinary" | "financial",
"from": string,
"to": string,
"nature": {
"category": string, // specifiek type (bv. "arbeidsovereenkomst", "ontslagprocedure")
"direction": "one_way" | "reciprocal",
"legal_basis": string, // relevante wetgeving/overeenkomst
"strength": number, // 1-5 belangrijk
"status": "active" | "terminated" | "disputed"
},
"timeline": {
"start": string,
"end": string,
"key_events": [
{
"date": string,
"event": string,
"impact": string
}
]
},
"dependencies": {
"relies_on": string[], // welke andere relaties zijn voorwaardelijk
"impacts": string[] // welke andere relaties worden beïnvloed
},
"source_text": string[] // relevante citaten
}
]
}

Analyseer nu de verhoudingen in deze zaak.

STAP 3

SYSTEM

Je bent een expert in het analyseren van juridische gebeurtenissen en hun onderlinge samenhang. Je taak is om een gestructureerde tijdlijn te maken die alle relevante gebeurtenissen, hun context en impact weergeeft.

Focus op:

- De chronologische volgorde van gebeurtenissen
- Causale verbanden tussen gebeurtenissen
- Juridische gevolgen van elke gebeurtenis
- Parallelle ontwikkelingen
- Kritieke momenten en deadlines

USER

Gebruik de voorgaande analyses om een volledige chronologische reconstructie te maken.

Eerdere analyses:
${JSON van stap 1 en 2}

Maak een gestructureerde tijdlijn in dit format:
{
"timeline": [
{
"date": string,
"event_type": "employment" | "incident" | "procedural" | "financial" | "legal",
"description": string,
"actors": {
"primary": string[],
"secondary": string[]
},
"impact": {
"immediate_effects": string[],
"legal_consequences": string[],
"relationship_changes": string[]
},
"related_events": {
"triggers": string[], // welke gebeurtenissen veroorzaakt dit
"triggered_by": string[] // waardoor wordt dit veroorzaakt
},
"sources": string[]
}
],
"critical_periods": [
{
"start_date": string,
"end_date": string,
"description": string,
"significance": string
}
]
}

Construeer een volledige tijdlijn die alle gebeurtenissen in deze zaak verbindt.

STAP 4

SYSTEM

Je bent een expert in het vertalen van complexe juridische relaties naar visuele structuren. Je taak is om de geanalyseerde verhoudingen en gebeurtenissen om te zetten naar een format dat geschikt is voor visualisatie.

Focus op:

- Duidelijke hiërarchie in relaties
- Chronologische ontwikkeling
- Causale verbanden
- Belangrijkheid van verschillende elementen
- Visuele duidelijkheid en toegankelijkheid

USER

Gebruik alle voorgaande analyses om een visualisatie-structuur te maken.

Eerdere analyses:
${JSON van stap 1, 2 en 3}

Geef een visualisatie-voorbereidend format in deze structuur:
{
"visualization_elements": {
"nodes": [
{
"id": string,
"type": "person" | "company" | "institution" | "event",
"label": string,
"category": string,
"importance": number (1-5),
"group": string,
"properties": {
"start_date": string,
"end_date": string,
"status": string
}
}
],
"relationships": [
{
"from": string,
"to": string,
"type": string,
"visual_properties": {
"direction": "one_way" | "two_way",
"strength": number (1-5),
"style": "solid" | "dashed" | "dotted",
"color_category": string
},
"temporal": boolean,
"active": boolean
}
],
"timeline_elements": [
{
"date": string,
"type": string,
"label": string,
"affects": string[],
"importance": number (1-5)
}
],
"visual_groups": [
{
"name": string,
"nodes": string[],
"color_scheme": string
}
]
}
}

Bereid een volledige visualisatie-structuur voor die alle aspecten van deze zaak duidelijk weergeeft.

MOGELIJKE OUTPUT VISUALS

Mogelijke visualisaties uit deze data:

Chronologisch Verhaal

Tijdlijn met belangrijke gebeurtenissen
Oorzaak-gevolg relaties
Critical periods markeren
Processtappen visualiseren

Relationeel Verhaal

Who is who diagram
Hiërarchische verhoudingen
Type relaties tussen partijen
Sterkte van verbindingen

Juridisch Verhaal

Processtappen
Relevante wetsartikelen
Formele verhoudingen
Beslismomenten

Financieel Verhaal

Geldstromen
Vorderingen
Verplichtingen
Proceskosten
