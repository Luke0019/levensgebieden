"use client"

import React from 'react';
import ReactMarkdown from 'react-markdown';
import html2pdf from 'html2pdf.js';

export default function PdfTemplate({ answers = {}, questions, name }) {
  // Add current date formatting
  const currentDate = new Date().toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  });

  // Calculate average scores for each area
  const calculateAreaScore = (area) => {
    if (!answers) return 0;
    
    let totalScore = 0;
    let questionCount = 0;

    // Loop through all answers
    Object.entries(answers).forEach(([key, value]) => {
      // Check if this answer belongs to current area
      if (key.startsWith(area)) {
        // Convert text answers to points (same scale as page.js)
        const points = {
          'Helemaal eens': 10,
          'Eens': 8,
          'Neutraal': 6,
          'Oneens': 4,
          'Helemaal oneens': 2
        }[value] || 0;
        
        totalScore += points;
        questionCount++;
      }
    });

    // Return average score (rounded to nearest whole number)
    return questionCount > 0 ? Math.round(totalScore / questionCount) : 0;
  };

  // Create points for SVG radar chart (updated to match page.js)
  const createRadarPoints = (values, scale = 150) => {
    const points = [];
    const sides = 7;
    const angleStep = (Math.PI * 2) / sides;

    values.forEach((value, i) => {
      const angle = i * angleStep - Math.PI / 2; // Start from top
      const distance = (value / 10) * scale;
      const x = Math.cos(angle) * distance + scale;
      const y = Math.sin(angle) * distance + scale;
      points.push(`${x},${y}`);
    });

    return points.join(' ');
  };

  const scores = {
    existentieel: calculateAreaScore('existentieel'),
    emotioneel: calculateAreaScore('emotioneel'),
    cognitief: calculateAreaScore('cognitief'),
    fysiek: calculateAreaScore('fysiek'),
    sociaal: calculateAreaScore('sociaal'),
    materieel: calculateAreaScore('materieel'),
    creatief: calculateAreaScore('creatief')
  };

  const scoreValues = Object.values(scores);
  const labels = [
    'Existentieel',
    'Emotioneel',
    'Cognitief',
    'Fysiek',
    'Sociaal',
    'Materieel',
    'Creatief'
  ];

  // Add these styles
  const markdownStyles = {
    h3: "text-2xl font-bold mb-4 flex items-center gap-2",
    p: "mb-4",
    strong: "font-bold",
    em: "italic text-gray-700",
  };

  // PDF generation options
  const pdfOptions = {
    margin: [10, 10, 10, 10],
    filename: `7-levensgebieden-${name}.pdf`,
    image: { 
      type: 'jpeg', 
      quality: 0.98
    },
    html2canvas: { 
      scale: 2,
      letterRendering: true,
      useCORS: true,
    },
    jsPDF: { 
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    }
  };

  return (
    <div className="pdf-wrapper" style={{
      width: '210mm',
      margin: '0 auto',
      backgroundColor: 'white'
    }}>
      {/* Page 1 */}
      <section className="pdf-template" style={{
        pageBreakAfter: 'always',
        padding: '10mm',
        boxSizing: 'border-box'
      }}>
        <div className="pdf-content">
          {/* Header */}
          <header className="pdf-header">
            <div className="header-with-favicon">
              <img src="/favicon.ico" alt="Logo" className="header-favicon" />
              <div className="header-content">
                <h1>7 Levensgebieden Rapport</h1>
                
                <div className="header-info">
                  <p className="name">
                    Opgesteld voor <span>{name}</span>
                  </p>
                  <p className="date">{currentDate}</p>
                </div>
              </div>
            </div>
          </header>

          {/* Introduction */}
          <div className="pdf-introduction">
            <p>
              In dit rapport krijg je een overzicht van je tevredenheidsscore voor de verschillende levensgebieden. 
              Belangrijk om te weten is dat dit dus los staat van hoe ontwikkeld jij/een ander denkt dat je in dit gebied bent: 
              ook als miljonair kun je ontevreden zijn over je materiële leefgebied!
            </p>
            
            <p className="leading-relaxed mt-4">
              Je kunt de vragenlijst en het document periodiek invullen om:
            </p>
            
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Te ontdekken welke gebieden het meest rijp zijn voor groei</li>
              <li>Waar je je aandacht op zou kunnen richten als je binnen een bepaald levensgebied wil ontwikkelen</li>
              <li>Inzicht te krijgen in hoe de tevredenheid voor de verschillende levensgebieden zich over de tijd ontwikkelt</li>
            </ul>
          </div>

          {/* Radar Chart - Now first */}
          <div className="radar-chart">
          <svg viewBox="-150 -120 600 540">
              {/* Background circles with percentage numbers */}
              {[20, 40, 60, 80, 100].map((level) => (
                <g key={level}>
                  <polygon
                    points={createRadarPoints(Array(7).fill(level/10), 150)}
                    fill="none"
                    stroke="#D1D5DB"
                    strokeWidth="2"
                  />
                  {/* Add percentage label */}
                  <text
                    x="155"
                    y={150 - (level/100 * 150)}
                    fontSize="10"
                    fill="#6B7280"
                    textAnchor="start"
                    dominantBaseline="middle"
                  >
                    {level}%
                  </text>
                </g>
              ))}

              {/* Data polygon - multiply scores by 10 to convert to percentage */}
              <polygon
                points={createRadarPoints(scoreValues.map(score => score * 10), 150)}
                fill="rgba(156, 163, 175, 0.2)"
                stroke="rgb(107, 114, 128)"
                strokeWidth="2"
              />

              {/* Labels */}
              {labels.map((label, i) => {
                const angle = (i * (Math.PI * 2)) / 7 - Math.PI / 2;
                const labelDistance = 200;
                const x = Math.cos(angle) * labelDistance + 150;
                const y = Math.sin(angle) * labelDistance + 150;
                
                return (
                  <text
                    key={label}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                      fontFamily: 'sans-serif',
                      fontSize: '14px',
                      fill: '#4B5563'
                    }}
                  >
                    {label}
                  </text>
                );
              })}
            </svg>
          </div>

          {/* Scores Grid - Updated to be more compact */}
          <div className="scores-grid">
            <h3>Scores per gebied</h3>
            <div className="scores-container grid grid-cols-4 gap-2 text-sm">
              {Object.entries(scores).map(([area, score]) => (
                <div key={area} className="score-item flex justify-between px-2 py-1">
                  <span className="area-name capitalize">{area}:</span>
                  <span className="score-value font-medium">{score * 10}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Areas Description - Updated to 2 columns */}
          <div className="areas-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, calc(50% - 5mm))',
            gap: '10mm',
            breakInside: 'avoid'
          }}>
            <h3 className="areas-title">De 7 Levensgebieden</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(questions).map(([area, { emoji, title }]) => (
                <div key={area} className="area-card p-4">
                  <div className="area-header mb-2">
                    <span className="area-emoji mr-2">{emoji}</span>
                    <h4 className="inline font-semibold">{title}</h4>
                  </div>
                  <div className="area-description text-sm">
                    <ReactMarkdown>{getAreaDescription(area)}</ReactMarkdown>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Page 2 */}
      <section className="pdf-template" style={{
        pageBreakAfter: 'always',
        padding: '10mm',
        boxSizing: 'border-box'
      }}>
        <div className="pdf-content">
          <h3 className="areas-title">De 7 Levensgebieden</h3>
          
          <div className="areas-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, calc(50% - 5mm))',
            gap: '10mm',
            breakInside: 'avoid'
          }}>
            {Object.entries(questions).map(([area, { emoji, title }]) => (
              <div key={area} className="area-card">
                <div className="area-header">
                  <span className="area-emoji">{emoji}</span>
                  <h4>{title}</h4>
                </div>
                <div className="area-description">
                  <ReactMarkdown>{getAreaDescription(area)}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>

          <footer className="pdf-footer">
            <p>Dit rapport is bedoeld als hulpmiddel voor zelfreflectie en persoonlijke groei...</p>
            <p>Succes met je persoonlijke ontwikkelingsreis!</p>
          </footer>
        </div>
      </section>
    </div>
  );
}

// Helper function to get area descriptions
function getAreaDescription(area) {
  const descriptions = {
    existentieel: `

**Key Skill:** *being*

**Omvat:** je existentiële, ethische, en filosofische ingeving

**Voorbeeldtrainingen:** Mindfulness, Meditatie, Breathwork, Yoga

**Uitleg:** Voor sommigen misschien een 'ver van je bed-show', maar de antwoorden op deze vragen geven (bewust en onbewust) ontzettend veel sturing aan je leven. Als je gedrag en overtuigingen vaak genoeg met een 'waarom' bevraagd, kom je uiteindelijk bij deze vraagstukken uit.`,
    
    emotioneel: `

**Key Skill:** *feeling*

**Omvat:** (het reguleren van) je emoties en gevoelens

**Voorbeeldtrainingen:** Emotionele Intelligentie, Familiesystemen, Zelfverzekerdheid

**Uitleg:** Emoties zijn eigenlijk de (alarm)signalen die aangeven of je diepere behoeftes wel of niet worden vervuld- en daarmee dus ontzettend waardevol. Emoties zijn meer feminien van aard is, maar het label 'soft' is wat ons betreft volkomen onterecht. Weinig is moeilijker dan het oprecht confronteren van je emoties.`,
    
    cognitief: `

**Key Skill:** *thinking*

**Omvat:** je intellectuele vermogen

**Voorbeeldtrainingen:** Mindset, Analytisch Denken, Creativiteit, Leervaardigheden

**Uitleg:** Evolutionair gezien zijn we eigenlijk als apen met een supercomputer. En die supercomputer kan ons prachtig van dienst zijn, maar soms ook waanzinnig belemmeren. Door relevante kennis uit te breiden, sneller logica te zien, en overtuigingen behulpzamer te maken kan ook hier het vervullen van je behoeftes een stuk makkelijker worden.`,
    
    fysiek: `

**Key Skill:** *living*

**Omvat:** je fysieke gesteldheid

**Voorbeeldtrainingen:** Slaap Optimaliseren, Voeding & Supplementen, Beweging

**Uitleg:** De staat van onze biologische machine heeft ontzettend veel invloed op ons vermogen om onze behoeftes te vervullen. Het bepaalt namelijk onze belastbaarheid, en daarmee de last die we op een gegeven moment kunnen dragen. Elke uitdaging wordt makkelijker wanneer je goed hebt geslapen, fysiek fit bent, en voedzaam hebt gegeten.`,
    
    sociaal: `

**Key Skill:** *relating*

**Omvat:** je relaties met andere mensen

**Voorbeeldtrainingen:** Non-violent Communication, Charisma, Seksualiteit

**Uitleg:** We zijn sociale wezens, en de mate waarin wij betekenisvolle relaties hebben met andere mensen heeft significante invloed op de kwaliteit van ons leven. De cliche 'samen sta je sterker' klopt als een bus.`,
    
    materieel: `

**Key Skill:** *getting*

**Omvat:** je bezittingen en leefomgeving

**Voorbeeldtrainingen:** Investeren, Carrieregroei, Persoonlijke Financiën

**Uitleg:** In tegenstelling tot het spirituele levensgebied kan dit voor sommigen oppervlakkig overkomen, maar er zijn ontzettend veel 'spullen' die voor de meesten van ons een significante impact maken op ons welzijn, in de breedste zin. Een huis, een auto, goede schoenen, een wasmachine die het doet, of hoogwaardige voeding- voor niets gaat de zon op.`,
    
    creatief: `

**Key Skill:** *creating*

**Omvat:** je vermogen om nieuwe dingen of concepten te maken

**Voorbeeldtrainingen:** Schrijven, Design, Brainstormen

**Uitleg:** Bij creativiteit kunnen we uiteraard denken aan schilderen, tekenen, of kleien, maar het omvat het elk proces waarbij ruimte is om nieuwe verbindingen te leggen of iets te maken wat nog niet (in die specifieke vorm of context) bestaat- zowel conceptueel als fysiek.`
  };
  return descriptions[area] || "";
}