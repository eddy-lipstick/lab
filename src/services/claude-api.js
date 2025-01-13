
export const systemPrompts = {
  step1: `Je bent een expert in het analyseren van Nederlandse juridische teksten. Je taak is om alle relevante verhoudingen tussen partijen systematisch in kaart te brengen.

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

Wees precies in je analyse en geef duidelijk aan waar interpretaties onzeker zijn.`,

  step2: `Je bent een expert in het analyseren van juridische verhoudingen. Je taak is om de geïdentificeerde relaties uit een eerdere analyse verder uit te diepen en te structureren.

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
- De hiërarchie en prioriteit van verhoudingen`,

  step3: `Je bent een expert in het analyseren van juridische gebeurtenissen en hun onderlinge samenhang. Je taak is om een gestructureerde tijdlijn te maken die alle relevante gebeurtenissen, hun context en impact weergeeft.

Focus op:
- De chronologische volgorde van gebeurtenissen
- Causale verbanden tussen gebeurtenissen
- Juridische gevolgen van elke gebeurtenis
- Parallelle ontwikkelingen
- Kritieke momenten en deadlines`,

  step4: `Je bent een expert in het vertalen van complexe juridische relaties naar visuele structuren. Je taak is om de geanalyseerde verhoudingen en gebeurtenissen om te zetten naar een format dat geschikt is voor visualisatie.

Focus op:
- Duidelijke hiërarchie in relaties
- Chronologische ontwikkeling
- Causale verbanden
- Belangrijkheid van verschillende elementen
- Visuele duidelijkheid en toegankelijkheid`
};

export const userPrompts = {
  step1: `Analyseer deze juridische tekst en breng alle relevante verhoudingen tussen partijen in kaart.

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
    "case_type": string,
    "legal_domain": string[],
    "procedural_stage": string
  },
  "key_sections": {
    "party_mentions": {
      "primary": {
        "main_parties": string[],
        "representatives": string[],
        "deciding_body": string[]
      },
      "secondary": string[]
    },
    "relationship_mentions": {
      "procedural": string[],
      "temporal": string[],
      "financial": string[],
      "hierarchical": string[]
    }
  },
  "full_text": string
}`,

  step2: `Gebruik de volgende analyse om een gedetailleerd beeld te maken van alle relaties en hun onderlinge samenhang.

Geef een gedetailleerde analyse in dit format:
{
  "relationships": [
    {
      "type": "employment" | "procedural" | "disciplinary" | "financial",
      "from": string,
      "to": string,
      "nature": {
        "category": string,
        "direction": "one_way" | "reciprocal",
        "legal_basis": string,
        "strength": number,
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
        "relies_on": string[],
        "impacts": string[]
      },
      "source_text": string[]
    }
  ]
}`,

  step3: `Maak een gestructureerde tijdlijn in dit format:
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
        "triggers": string[],
        "triggered_by": string[]
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
}`,

  step4: `Geef een visualisatie-voorbereidend format in deze structuur:
{
  "visualization_elements": {
    "nodes": [
      {
        "id": string,
        "type": "person" | "company" | "institution" | "event",
        "label": string,
        "category": string,
        "importance": number,
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
          "strength": number,
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
        "importance": number
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
}`
};

export async function callClaude(step, legalText, previousResults = null) {
  const payload = {
    step,
    legalText,
    previousResults,
  };

  try {
    const response = await fetch('/api/claude', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Response Error:', errorData);
      throw new Error(`API call failed: ${response.statusText} ${JSON.stringify(errorData)}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Claude API Error:', error);
    throw error;
  }
}