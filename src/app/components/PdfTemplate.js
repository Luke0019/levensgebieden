"use client"

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
    creatief: calculateAreaScore('creatief'),
    cognitief: calculateAreaScore('cognitief'),
    materieel: calculateAreaScore('materieel'),
    sociaal: calculateAreaScore('sociaal'),
    fysiek: calculateAreaScore('fysiek')
  };

  const scoreValues = Object.values(scores);
  const labels = ['Existentieel', 'Emotioneel', 'Creatief', 'Cognitief', 'Materieel', 'Sociaal', 'Fysiek'];

  return (
    <section className="bg-[#F5EDE2] p-8 min-h-[297mm] w-[210mm]">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-4">7 Levensgebieden Rapport</h1>
        <h2 className="text-2xl text-center mb-6">Persoonlijke Ontwikkelingsanalyse</h2>
        <p className="text-center mb-2">
          Opgesteld voor <span className="italic">{name}</span>
        </p>
        <p className="text-center text-gray-600 mb-8">{currentDate}</p>

        {/* Radar Chart */}
        <div className="max-w-xl mx-auto mb-12">
          <svg viewBox="-150 -100 600 600" className="w-full">
            {/* Background circles */}
            {[2, 4, 6, 8, 10].map((level) => (
              <polygon
                key={level}
                points={createRadarPoints(Array(7).fill(level), 150)}
                fill="none"
                stroke="#E5E5E5"
                strokeWidth="0.5"
              />
            ))}

            {/* Data polygon */}
            <polygon
              points={createRadarPoints(scoreValues, 150)}
              fill="rgba(54, 162, 235, 0.2)"
              stroke="rgb(54, 162, 235)"
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
                    fill: '#666666'
                  }}
                >
                  {label}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Scores display */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Scores per gebied:</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(scores).map(([area, score]) => (
              <div key={area} className="flex justify-between items-center">
                <span className="capitalize">{area}:</span>
                <span className="font-medium">{score}/10</span>
              </div>
            ))}
          </div>
        </div>

        {/* Introduction */}
        <div className="mb-8">
          <p className="mb-4">Het <strong>7 Levensgebieden Rapport</strong> biedt een holistische kijk op de verschillende aspecten van je leven. Dit rapport beschrijft je huidige situatie en ontwikkelingsmogelijkheden binnen elk levensgebied.</p>
        </div>

        <h3 className="text-2xl font-semibold mb-6">De Zeven Levensgebieden</h3>
        
        {/* Areas descriptions - now in single column */}
        <div className="space-y-8">
          {/* Each area section */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-2xl">🧐</span>
              <h4 className="text-lg font-semibold">Existentieel</h4>
            </div>
            <p className="text-gray-700">
              Het existentiële domein gaat over zingeving en levensdoelen. Het omvat je persoonlijke waarden, spiritualiteit en je plaats in het grotere geheel. Dit gebied helpt je antwoorden te vinden op fundamentele vragen als "Wie ben ik?" en "Wat is mijn doel in het leven?" Door regelmatig stil te staan bij deze dimensie, ontwikkel je een dieper begrip van jezelf en je levenspad.
            </p>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-2xl">💟</span>
              <h4 className="text-lg font-semibold">Emotioneel</h4>
            </div>
            <p className="text-gray-700">
              Het emotionele domein betreft je gevoelsleven en innerlijke balans. Het gaat over hoe je omgaat met je emoties, stress en uitdagingen. Een gezond emotioneel leven kenmerkt zich door zelfbewustzijn, het vermogen om emoties te herkennen en te reguleren, en het ontwikkelen van emotionele veerkracht. Dit gebied is essentieel voor je algemene welzijn en geluk.
            </p>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-2xl">🎨</span>
              <h4 className="text-lg font-semibold">Creatief</h4>
            </div>
            <p className="text-gray-700">
              Het creatieve domein omvat je vermogen tot expressie en innovatie. Het gaat niet alleen om kunstzinnige uitingen, maar ook om creatief denken en problemen oplossen. Dit gebied stimuleert je om nieuwe ideeën te ontwikkelen, buiten de gebaande paden te denken en je verbeeldingskracht te gebruiken in alle aspecten van je leven.
            </p>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-2xl">🧠</span>
              <h4 className="text-lg font-semibold">Cognitief</h4>
            </div>
            <p className="text-gray-700">
              Het cognitieve domein betreft je denkvermogen en intellectuele ontwikkeling. Het omvat leren, analyseren, kritisch denken en het verwerken van informatie. Dit gebied stimuleert je om je kennis te verbreden, nieuwe vaardigheden te ontwikkelen en je geest scherp te houden door middel van studie, reflectie en het aangaan van intellectuele uitdagingen.
            </p>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-2xl">💰</span>
              <h4 className="text-lg font-semibold">Materieel</h4>
            </div>
            <p className="text-gray-700">
              Het materiële domein gaat over je fysieke middelen en financiële situatie. Het omvat je inkomen, bezittingen, werk en financiële zekerheid. Een gezond materieel leven betekent niet alleen voldoende middelen hebben voor je basisbehoeften, maar ook verstandig omgaan met wat je hebt en werken aan langetermijndoelen voor financiële stabiliteit.
            </p>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-2xl">👥</span>
              <h4 className="text-lg font-semibold">Sociaal</h4>
            </div>
            <p className="text-gray-700">
              Het sociale domein betreft je relaties en interacties met anderen. Het omvat vriendschappen, familierelaties, romantische relaties en professionele contacten. Dit gebied is cruciaal voor je gevoel van verbondenheid, ondersteuning en betekenisvolle interacties met anderen. Het ontwikkelen van sterke sociale banden draagt bij aan je algemene levenskwaliteit.
            </p>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-2xl">💪🏼</span>
              <h4 className="text-lg font-semibold">Fysiek</h4>
            </div>
            <p className="text-gray-700">
              Het fysieke domein gaat over je lichamelijke gezondheid en vitaliteit. Het omvat voeding, beweging, rust en algemene gezondheid. Een gezond fysiek leven vormt de basis voor alle andere levensdomeinen. Door goed voor je lichaam te zorgen, creëer je de energie en vitaliteit die nodig is om actief en betrokken te zijn in alle aspecten van je leven.
            </p>
          </div>
        </div>

        {/* Conclusion */}
        <div className="mt-8 space-y-4">
          <p className="text-gray-700">Dit rapport is bedoeld als hulpmiddel voor zelfreflectie en persoonlijke groei. Gebruik het als uitgangspunt om je ontwikkeling binnen elk levensgebied te monitoren en te stimuleren.</p>
          <p className="text-gray-700">Succes met je persoonlijke ontwikkelingsreis!</p>
        </div>
      </div>
    </section>
  );
}