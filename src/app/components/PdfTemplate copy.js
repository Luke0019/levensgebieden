// PDFTemplate.js
'use client';

import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const styles = {
    pdfContent: {
        width: '210mm',
        height: '594mm',
        margin: '0 auto',
        padding: 0,
        boxSizing: 'border-box',
        backgroundColor: '#F5EDE2',
        overflow: 'hidden'
    },
    page: {
        width: '210mm',
        height: '297mm',
        padding: '20mm',
        margin: 0,
        boxSizing: 'border-box',
        backgroundColor: '#F5EDE2',
        position: 'relative'
    }
};

const PdfTemplate = ({ answers = {}, questions, name }) => {
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

        Object.entries(answers).forEach(([key, value]) => {
            if (key.startsWith(area)) {
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

        return questionCount > 0 ? Math.round(totalScore / questionCount) : 0;
    };

    // Create points for SVG radar chart
    const createRadarPoints = (values, scale = 150) => {
        const points = [];
        const sides = 7;
        const angleStep = (Math.PI * 2) / sides;

        values.forEach((value, i) => {
            const angle = i * angleStep - Math.PI / 2;
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

    useEffect(() => {
        const loadHtml2pdf = async () => {
            const html2pdf = (await import('html2pdf.js')).default;
            window.html2pdf = html2pdf;
        };
        loadHtml2pdf();
    }, []);

    const generatePDF = () => {
        if (!window.html2pdf) return;

        const options = {
            margin: 0,
            filename: `7-levensgebieden-${name}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                letterRendering: true,
                scrollY: -window.scrollY,
                height: 594 * 2
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait'
            }
        };

        const element = document.getElementById('pdf-content');
        window.html2pdf().set(options).from(element).save();
    };

    // Add this style to control markdown spacing
    const markdownStyles = {
        p: { marginBottom: '2px' },  // Reduce space between paragraphs
        strong: { display: 'inline-block', marginRight: '4px' }  // Keep bold text inline
    };

    return (
        <div id="pdf-content" style={styles.pdfContent}>
            {/* Page 1 */}
            <div style={styles.page}>
                <header>
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'flex-start',
                        gap: '1rem',
                        marginBottom: '16px'
                    }}>
                        <img src="/favicon.ico" alt="Logo" style={{ 
                            width: '24px', 
                            height: '24px',
                            flexShrink: 0  // Prevent logo from shrinking
                        }} />
                        <div style={{ 
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',  // Center all content horizontally
                            textAlign: 'center'    // Center all text
                        }}>
                            <h1 style={{ 
                                fontSize: '20px', 
                                fontWeight: 'bold',
                                marginBottom: '8px',
                                width: '100%'      // Full width for proper centering
                            }}>7 Levensgebieden Rapport</h1>
                            
                            <div style={{ 
                                fontSize: '12px',
                                marginBottom: '16px',
                                width: '100%'      // Full width for proper centering
                            }}>
                                <p>Opgesteld voor <span style={{ fontWeight: 'bold' }}>{name}</span></p>
                                <p>{currentDate}</p>
                            </div>

                            <div style={{ 
                                fontSize: '12px',
                                maxWidth: '500px',  // Limit width for better readability
                                margin: '0 auto'    // Center the block
                            }}>
                                <p style={{ textAlign: 'center' }}>  {/* Ensure paragraph is centered */}
                                    In dit rapport krijg je een overzicht van je tevredenheidsscore voor de verschillende levensgebieden. 
                                    Belangrijk om te weten is dat dit dus los staat van hoe ontwikkeld jij/een ander denkt dat je in dit gebied bent: 
                                    ook als miljonair kun je ontevreden zijn over je materiële leefgebied!
                                </p>
                            </div>
                        </div>
                        <div style={{ width: '24px', flexShrink: 0 }}></div> {/* Matching spacer */}
                    </div>
                </header>

                {/* Radar Chart */}
                <div style={{ margin: '20px 0' }}>
                    <svg viewBox="-150 -120 600 540">
                        {[20, 40, 60, 80, 100].map((level) => (
                            <g key={level}>
                                <polygon
                                    points={createRadarPoints(Array(7).fill(level/10), 150)}
                                    fill="none"
                                    stroke="#D1D5DB"
                                    strokeWidth="1"
                                />
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

                        <polygon
                            points={createRadarPoints(scoreValues, 150)}
                            fill="rgba(59, 130, 246, 0.2)"
                            stroke="rgb(59, 130, 246)"
                            strokeWidth="2"
                        />

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
                                        fontSize: '12px',
                                        fill: '#4B5563'
                                    }}
                                >
                                    {label}
                                </text>
                            );
                        })}
                    </svg>
                </div>

                {/* Scores Grid */}
                <div style={{ margin: '16px 0' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Scores per gebied</h3>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(4, 1fr)', 
                        gap: '4px',
                        fontSize: '12px',
                        backgroundColor: 'white',
                        padding: '12px',
                        borderRadius: '8px',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                    }}>
                        {Object.entries(scores).map(([area, score]) => (
                            <div key={area} style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                padding: '2px 4px'
                            }}>
                                <span style={{ textTransform: 'capitalize' }}>{area}:</span>
                                <span style={{ fontWeight: 500 }}>{score * 10}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Page 2 */}
            <div style={styles.page}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>De 7 Levensgebieden</h2>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '8px'
                }}>
                    {Object.entries(questions).map(([area, { emoji, title }]) => (
                        <div key={area} style={{ 
                            padding: '12px',
                            border: '1px solid #e5e7eb', 
                            borderRadius: '8px',
                            fontSize: '10px',
                            backgroundColor: 'white',
                            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                        }}>
                            <div style={{ marginBottom: '4px' }}>
                                <span style={{ marginRight: '4px' }}>{emoji}</span>
                                <span style={{ fontWeight: 'bold', fontSize: '11px' }}>{title}</span>
                            </div>
                            <div style={{ fontSize: '10px' }}>
                                <ReactMarkdown 
                                    components={{
                                        p: ({ children }) => <p style={{ marginBottom: '2px', fontSize: '10px' }}>{children}</p>,
                                        strong: ({ children }) => <strong style={{ display: 'inline-block', marginRight: '4px', fontSize: '10px' }}>{children}</strong>,
                                        em: ({ children }) => <em style={{ fontSize: '10px' }}>{children}</em>
                                    }}
                                >{getAreaDescription(area)}</ReactMarkdown>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PdfTemplate;

// Helper function for area descriptions (same as original)
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