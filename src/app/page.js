'use client';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';



const questions = {
  page1: {
    questions: [
      {
        vraag: "Hoe vaak ben je langer digitaal actief dan je zou willen?",
        opties: ["Niet van toepassing", "Zelden", "Af en toe", "Regelmatig", "Vaak", "Altijd"]
      },
      {
        vraag: "In hoeverre heb je het gevoel dat het huishouden leidt onder je digitale activiteit?",
        opties: ["Niet van toepassing", "Zelden", "Af en toe", "Regelmatig", "Vaak", "Altijd"]
      },
      {
        vraag: "Hoeveel van je sociale contact vindt digitaal plaats?",
        opties: ["Niet van toepassing", "Zelden", "Af en toe", "Regelmatig", "Vaak", "Altijd"]
      },
      {
        vraag: "In hoeverre klagen mensen om je heen over je digitale activiteit?",
        opties: ["Niet van toepassing", "Zelden", "Af en toe", "Regelmatig", "Vaak", "Altijd"]
      },
      {
        vraag: "In hoeverre leidt je productiviteit op school/werk onder je digitale activiteit?",
        opties: ["Niet van toepassing", "Zelden", "Af en toe", "Regelmatig", "Vaak", "Altijd"]
      },
      {
        vraag: "Hoevaak check je uit gewoonte je e-mail of berichten terwijl je eigenlijk met iets anders bezig bent?",
        opties: ["Niet van toepassing", "Zelden", "Af en toe", "Regelmatig", "Vaak", "Altijd"]
      },
      {
        vraag: "Hoevaak is digitale activiteit een manier om vervelende gevoelens of gedachten uit de weg te gaan?",
        opties: ["Niet van toepassing", "Zelden", "Af en toe", "Regelmatig", "Vaak", "Altijd"]
      },
      {
        vraag: "Hoevaak kijk je uit naar momenten waarop je weer digitaal actief kan zijn?",
        opties: ["Niet van toepassing", "Zelden", "Af en toe", "Regelmatig", "Vaak", "Altijd"]
      },
      {
        vraag: "Hoevaak voel je je verveeld, leeg, of vreugdeloos als je niet digitaal actief bent?",
        opties: ["Niet van toepassing", "Zelden", "Af en toe", "Regelmatig", "Vaak", "Altijd"]
      },
      {
        vraag: "Hoe vaak ben je snauwerig, kortaf, of chagrijnig als je digitale activiteit wordt onderbroken?",
        opties: ["Niet van toepassing", "Zelden", "Af en toe", "Regelmatig", "Vaak", "Altijd"]
      }
    ]
  },
  page2: {
    questions: [
      {
        vraag: "In hoeverre slaap je slechter door je digitale activiteit?",
        opties: ["Niet van toepassing", "Zelden", "Af en toe", "Regelmatig", "Vaak", "Altijd"]
      },
      {
        vraag: "Hoevaak overtuig je jezelf tevergeefs dat je 'nog maar heel even' digitaal actief blijft?",
        opties: ["Niet van toepassing", "Zelden", "Af en toe", "Regelmatig", "Vaak", "Altijd"]
      },
      {
        vraag: "Hoevaak probeer je te minderen, maar lukt dat niet?",
        opties: ["Niet van toepassing", "Zelden", "Af en toe", "Regelmatig", "Vaak", "Altijd"]
      },
      {
        vraag: "In hoeverre voel je de druk om de tijd die je digitaal actief bent voor anderen te verbergen?",
        opties: ["Niet van toepassing", "Zelden", "Af en toe", "Regelmatig", "Vaak", "Altijd"]
      },
      {
        vraag: "Hoevaak laat je sociale interacties aan je voorbij gaan, en ben je in plaats daarvan digitaal actief?",
        opties: ["Niet van toepassing", "Zelden", "Af en toe", "Regelmatig", "Vaak", "Altijd"]
      },
      {
        vraag: "Hoevaak heb je negatieve gevoelens als je offline bent, die weer verdwijnen als je digitaal actief bent?",
        opties: ["Niet van toepassing", "Zelden", "Af en toe", "Regelmatig", "Vaak", "Altijd"]
      },
      {
        vraag: "Hoevaak check je je telefoon zonder daar een bewuste intentie bij te hebben?",
        opties: ["Niet van toepassing", "Zelden", "Af en toe", "Regelmatig", "Vaak", "Altijd"]
      },
      {
        vraag: "Hoevaak voel je je slechter nadat je op sociale media hebt gezet?",
        opties: ["Niet van toepassing", "Zelden", "Af en toe", "Regelmatig", "Vaak", "Altijd"]
      },
      {
        vraag: "Hoevaak verlies je het besef van tijd wanneer je digitaal actief bent?",
        opties: ["Niet van toepassing", "Zelden", "Af en toe", "Regelmatig", "Vaak", "Altijd"]
      }
    ]
  }
};

export default function Home() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  

  const sections = Object.keys(questions);
  const totalQuestions = 19; // Changed from 20 to 19

  // Load saved state when component mounts
  useEffect(() => {
    const savedState = localStorage.getItem('formState');
    if (savedState) {
      const { answers: savedAnswers, step: savedStep, timestamp } = JSON.parse(savedState);
      
      // Check if saved state is less than 30 minutes old
      const thirtyMinutesInMs = 30 * 60 * 1000;
      if (Date.now() - timestamp < thirtyMinutesInMs) {
        setAnswers(savedAnswers);
        setCurrentStep(savedStep);
      } else {
        // Clear expired state
        localStorage.removeItem('formState');
      }
    }
  }, []);

  // Save state whenever answers or currentStep changes
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      const stateToSave = {
        answers,
        step: currentStep,
        timestamp: Date.now()
      };
      localStorage.setItem('formState', JSON.stringify(stateToSave));
    }
  }, [answers, currentStep]);

  const handleAnswerSelect = (questionIndex, value) => {
    // Use the current section and local question index directly
    const area = sections[currentStep];
    setAnswers(prev => ({
      ...prev,
      [`${area}_${questionIndex}`]: value
    }));
  };

  const handleNextSection = () => {
    if (currentStep < sections.length - 1) {
      setCurrentStep(currentStep + 1);
      setQuestionIndex(0);
      window.scrollTo(0, 0);
    } else {
      // If we're on the last section, move to the final page
      setQuestionIndex(totalQuestions);
      window.scrollTo(0, 0);
    }
  };

  const handlePreviousSection = () => {
    if (currentStep > -1) {
      setCurrentStep(currentStep - 1);
      setQuestionIndex(0);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!privacyAccepted) {
      toast.error('Je moet akkoord gaan met het privacybeleid');
      return;
    }
    
    setIsSubmitting(true);
    const loadingToast = toast.loading('Resultaten laden...');
    
    try {
      // Calculate total score
      const totalScore = Object.values(answers).reduce((sum, answer) => {
        const points = {
          'Niet van toepassing': 0,
          'Zelden': 1,
          'Af en toe': 2,
          'Regelmatig': 3,
          'Vaak': 4,
          'Altijd': 5
        }[answer] || 0;
        return sum + points;
      }, 0);

      // Save to Notion
      const notionResponse = await fetch('/api/save-to-notion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          phoneNumber,
          totalScore,
          answers,
        }),
      });
        
      if (!notionResponse.ok) {
        throw new Error('Failed to save to Notion');
      }

      toast.success('Je resultaten zijn verwerkt!', {
        id: loadingToast,
      });
      setIsSubmitted(true);
      
    } catch (error) {
      console.error('Error:', error);
      toast.error('Er is iets misgegaan bij het verzenden.', {
        id: loadingToast,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add function to get score interpretation
  const getScoreInterpretation = (score) => {
    if (score <= 20) {
      return "Een score tussen de 0-20 kan er op duiden dat je weinig tot geen klachten ervaart van je digitale activiteit.";
    } else if (score <= 40) {
      return "Een score tussen de 21-40 kan er op duiden dat je weinig tot milde klachten ervaart van je digitale activiteit.";
    } else if (score <= 60) {
      return "Een score tussen de 41-60 kan er op duiden dat je milde tot merkbare klachten ervaart van je digitale activiteit.";
    } else if (score <= 80) {
      return "Een score tussen 61-80 kan er op duiden dat je merkbare tot serieuze klachten ervaart van je digitale activiteit";
    } else {
      return "Een score tussen de 81-100 kan er op duiden dat je serieuze tot extreme klachten ervaart van je digitale activiteit.";
    }
  };

  // Get current question info
  const getCurrentQuestion = () => {
    let questionCount = 0;
    for (const [area, data] of Object.entries(questions)) {
      if (questionCount + data.questions.length > questionIndex) {
        const localIndex = questionIndex - questionCount;
        return {
          area,
          question: data.questions[localIndex],
          sectionTitle: data.title,
          emoji: data.emoji,
          localIndex
        };
      }
      questionCount += data.questions.length;
    }
    return null;
  };

  const currentQ = getCurrentQuestion();

  // Update handleRadioSelect to match
  const handleRadioSelect = (questionIdx, optie) => {
    handleAnswerSelect(questionIdx, optie);
    
    // Find and scroll to the next question
    setTimeout(() => {
      const nextQuestionElement = document.querySelector(`[name="question_${sections[currentStep]}_${questionIdx + 1}"]`);
      if (nextQuestionElement) {
        nextQuestionElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 100);
  };

  // Add this new handler
  const handleGoToFinal = () => {
    setQuestionIndex(totalQuestions);
  };

  // Add this function to calculate scores
  const calculateAreaScores = () => {
    const scores = {};
    
    Object.entries(questions).forEach(([area, data]) => {
      let totalScore = 0;
      let questionCount = 0;
      
      data.questions.forEach((_, idx) => {
        const answerKey = `${area}_${idx}`;
        const answer = answers[answerKey];
        
        if (answer) {
          const points = {
            'Niet van toepassing': 0,
            'Zelden': 1,
            'Af en toe': 2,
            'Regelmatig': 3,
            'Vaak': 4,
            'Altijd': 5
          }[answer];
          
          totalScore += points;
          questionCount++;
        }
      });
      
      scores[area] = questionCount > 0 ? Math.round(totalScore / questionCount) : 0;
    });
    
    return scores;
  };

  // Add this function to create radar chart points
  const createRadarPoints = (values, scale = 150) => {
    const points = [];
    const sides = Object.keys(questions).length;
    const angleStep = (Math.PI * 2) / sides;

    values.forEach((value, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const distance = (value / 5) * scale;
      const x = Math.cos(angle) * distance + scale;
      const y = Math.sin(angle) * distance + scale;
      points.push(`${x},${y}`);
    });

    return points.join(' ');
  };

  // Add this function near your other handlers
  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format for Dutch phone numbers
    if (digits.startsWith('31')) {
      // International format
      return digits.replace(/(\d{2})(\d{2})(\d{4})(\d{3,4})/, '+$1 $2 $3 $4').trim();
    } else if (digits.startsWith('0')) {
      // National format
      return digits.replace(/(\d{2})(\d{4})(\d{3,4})/, '$1 $2 $3').trim();
    }
    return digits;
  };

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto bg-[#2c2928] text-[#f5ede2]">
      <Toaster position="top-center" />
      <h1 className="text-3xl font-bold mb-8 text-center text-[#f5ede2]">
        Digital Detox Test
      </h1>

      {currentStep === -1 ? (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-8">📱</div>
          <h2 className="text-2xl font-bold mb-4 text-[#f5ede2]">
            Welkom bij de Digital Detox Test
          </h2>
          <div className="max-w-2xl mx-auto space-y-4 text-[#f5ede2]">
            <p>
            Deze test is bedoeld om je inzicht te geven in hoe je relatie met digitale tools er op dit moment voor staat. 

Hier valt uiteraard je smartphone onder, maar je kunt ook denken aan het gebruik van een laptop, of het streamen van media.
            </p>
            <p>
            Dit alles samen zullen we vanaf nu 'digitale activiteit' noemen.

De quickscan bestaat uit 20 vragen, en duurt ongeveer 1-2 minuten om in te vullen.
            </p>
            <p>

Probeer elke vraag zo eerlijk mogelijk te beantwoorden. Er zijn geen goede of foute antwoorden.
            </p>
            
          </div>
          
          <button
            onClick={() => setCurrentStep(0)}
            className="mt-8 bg-[#FE6C3B] text-[#2c2928] py-3 px-8 rounded-lg hover:bg-[#e55c2f] transition-colors text-lg font-medium"
          >
            Start de Test
          </button>
        </div>
      ) : isSubmitted ? (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-8">📱</div>
          <h2 className="text-2xl font-bold mb-4 text-[#f5ede2]">
            Je resultaten zijn verwerkt!
          </h2>
          
          <div className="bg-[#3a3635] p-6 rounded-lg mb-8">
            <h3 className="font-semibold mb-3 text-[#f5ede2]">Jouw Score</h3>
            <div className="text-4xl font-bold mb-4 text-[#FE6C3B]">
              {Object.values(answers).reduce((sum, answer) => {
                const points = {
                  'Niet van toepassing': 0,
                  'Zelden': 1,
                  'Af en toe': 2,
                  'Regelmatig': 3,
                  'Vaak': 4,
                  'Altijd': 5
                }[answer] || 0;
                return sum + points;
              }, 0)}
              <span className="text-sm text-[#f5ede2] ml-2">/ 100</span>
            </div>
            <p className="text-[#f5ede2] text-left">
              {getScoreInterpretation(Object.values(answers).reduce((sum, answer) => {
                const points = {
                  'Niet van toepassing': 0,
                  'Zelden': 1,
                  'Af en toe': 2,
                  'Regelmatig': 3,
                  'Vaak': 4,
                  'Altijd': 5
                }[answer] || 0;
                return sum + points;
              }, 0))}
            </p>
          </div>

          <div className="mt-12 bg-[#3a3635] p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-6 text-center text-[#f5ede2]">Herken je dit?</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Problems Column */}
              <div className="space-y-4">
                <div className="flex items-start justify-start mb-4">
                  <span className="text-2xl">❌</span>
                  <h4 className="text-xl font-semibold ml-2 text-[#f5ede2]">Probleem</h4>
                </div>
                <ul className="space-y-4 text-sm pl-4">
                  <li className="flex items-start">
                    <span className="text-[#f5ede2]">• (consistent) Overweldigd of gestresst voelen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#f5ede2]">• Moeite met het behouden van je focus</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#f5ede2]">• Gevoelens van eenzaamheid of moeite met het vormen en onderhouden van betekenisvolle relaties</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#f5ede2]">• Moeite met in slaap komen en slechte kwaliteit slaap (en de vermoeidheid die hier bij komt kijken)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#f5ede2]">• Hobbies en interesses waar je maar geen tijd voor lijkt te kunnen maken</span>
                  </li>
                </ul>
              </div>

              {/* Solutions Column */}
              <div className="space-y-4">
                <div className="flex items-start justify-start mb-4">
                  <span className="text-2xl">✅</span>
                  <h4 className="text-xl font-semibold ml-2 text-[#f5ede2]">Oplossing</h4>
                </div>
                <ul className="space-y-4 text-sm pl-4">
                  <li className="flex items-start">
                    <span className="text-[#f5ede2]">• Een diep gevoel van rust en controle ervaren</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#f5ede2]">• Versterkte concentratie en verhoogde productiviteit voor de dingen die je belangrijk vindt of die gedaan moeten worden</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#f5ede2]">• Sterkere verbinding met de mensen die belangrijk voor je zijn, en met meer gemak nieuwe connecties leggen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#f5ede2]">• Met meer gemak in slaap komen en een verhoogde kwaliteit van slaap</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#f5ede2]">• Eindelijk weer de hobbies oppakken en de interesses verkennen waar je al zo lang mee aan de slag wou</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => window.open('https://wijzijnspark.nl/digital-detox-workshop', '_blank')}
              className="bg-[#FE6C3B] text-[#2c2928] py-2 px-6 rounded hover:bg-[#e55c2f] transition-colors"
            >
              Bekijk de Digital Detox Workshop
            </button>
          </div>
        </div>
      ) : (
        <form className="space-y-6">
          {questionIndex < totalQuestions ? (
            <>
              <div className="text-center mb-8">
                <div className="text-[#f5ede2]">
                  Pagina {currentStep + 1} van 2
                </div>
                <div className="w-full bg-[#3a3635] h-2.5 mb-4">
                  <div 
                    className="bg-[#FE6C3B] h-2.5" 
                    style={{ width: `${(currentStep + 1) / 2 * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-12">
                {questions[sections[currentStep]].questions.map((q, idx) => (
                  <div 
                    key={`${sections[currentStep]}_${idx}`}
                    className={`transition-all duration-300 ${
                      idx > 0 && !answers[`${sections[currentStep]}_${idx - 1}`]
                        ? 'opacity-50 blur-sm pointer-events-none'
                        : ''
                    }`}
                  >
                    <p className="font-medium text-center text-xl mb-8 text-[#f5ede2]">{q.vraag}</p>
                    
                    <div className="flex justify-between items-center gap-2 px-4">
                      {q.opties.map((optie, optieIdx) => (
                        <div key={optieIdx} className="flex flex-col items-center text-center w-full">
                          <label className="flex flex-col items-center cursor-pointer">
                            <input
                              type="radio"
                              name={`question_${sections[currentStep]}_${idx}`}
                              value={optie}
                              checked={answers[`${sections[currentStep]}_${idx}`] === optie}
                              onChange={() => handleRadioSelect(idx, optie)}
                              className="appearance-none w-4 h-4 rounded-full border-2 border-[#FE6C3B] checked:bg-[#FE6C3B] checked:border-[#FE6C3B] transition-all duration-200 cursor-pointer focus:ring-2 focus:ring-[#FE6C3B] focus:ring-offset-2"
                              disabled={idx > 0 && !answers[`${sections[currentStep]}_${idx - 1}`]}
                            />
                            <span className="text-sm font-medium mb-2 text-[#f5ede2]">{optieIdx}</span>
                            <span className="text-xs text-[#f5ede2] whitespace-nowrap">{optie}</span>
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className="h-4"></div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between gap-4 mt-8">
                <button
                  type="button"
                  onClick={handlePreviousSection}
                  className={`flex-1 py-2 px-4 rounded ${
                    currentStep === -1 
                      ? 'bg-[#3a3635] text-[#f5ede2] cursor-not-allowed' 
                      : 'bg-[#3a3635] text-[#f5ede2] hover:bg-[#4a4645]'
                  }`}
                  disabled={currentStep === -1}
                >
                  Vorige
                </button>

                <button
                  type="button"
                  onClick={handleNextSection}
                  className={`flex-1 py-2 px-4 rounded ${
                    Object.keys(answers).filter(key => key.startsWith(sections[currentStep])).length === questions[sections[currentStep]].questions.length
                      ? `bg-[#FE6C3B] text-[#2c2928] hover:bg-[#e55c2f] ${currentStep === 0 ? 'plausible-event-name=Next+Button+Click' : ''}`
                      : 'bg-[#3a3635] text-[#f5ede2] cursor-not-allowed'
                  }`}
                  disabled={Object.keys(answers).filter(key => key.startsWith(sections[currentStep])).length !== questions[sections[currentStep]].questions.length}
                >
                  {currentStep === sections.length - 1 ? 'Naar resultaten' : 'Volgende'}
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4 text-[#f5ede2]">Bijna klaar!</h2>
                <p className="text-[#f5ede2]">
                  Vul hieronder je gegevens en bekijk je resultaten!
                </p>
              </div>

              <div className="max-w-2xl mx-auto space-y-6">
                <div>
                  <label className="block mb-2 text-[#f5ede2]">
                    Wat is je naam? *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full p-2 border border-[#f5ede2] rounded bg-[#2c2928] text-[#f5ede2] focus:ring-[#FE6C3B] focus:border-[#FE6C3B]"
                    placeholder="Jouw naam"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-[#f5ede2]">
                    E-mailadres: *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 border border-[#f5ede2] rounded bg-[#2c2928] text-[#f5ede2] focus:ring-[#FE6C3B] focus:border-[#FE6C3B]"
                    placeholder="jouw@email.nl"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-[#f5ede2]">
                    Telefoonnummer: *
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      const formattedNumber = formatPhoneNumber(e.target.value);
                      setPhoneNumber(formattedNumber);
                    }}
                    required
                    pattern="^(?:\+31|0)\s?(?:[1-9])(?:[\s.-]?\d{2}){4}$"
                    className="w-full p-2 border border-[#f5ede2] rounded bg-[#2c2928] text-[#f5ede2] focus:ring-[#FE6C3B] focus:border-[#FE6C3B]"
                    placeholder="06 12345678"
                  />
                </div>
                <div className="mt-6">
                  <label className="flex items-start space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacyAccepted}
                      onChange={(e) => setPrivacyAccepted(e.target.checked)}
                      required
                      className="mt-1 h-4 w-4 rounded border-[#f5ede2] bg-[#2c2928] text-[#FE6C3B] focus:ring-[#FE6C3B]"
                    />
                    <span className="text-sm text-[#f5ede2]">
                      Ik ga akkoord met het privacybeleid
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !email || !name || !phoneNumber || !privacyAccepted}
                className="w-full bg-[#FE6C3B] text-[#2c2928] py-2 px-4 rounded hover:bg-[#e55c2f] disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Laden...
                  </span>
                ) : (
                  'Bekijk je resultaten'
                )}
              </button>
              {/* <div className="mt-12 text-center">
                  <h3 className="text-xl font-semibold mb-4">Wat gebeurt er hierna?</h3>
                  <p className="text-[#f5ede2] mb-8">
                    Na het versturen ontvang je direct een e-mail met jouw persoonlijke resultaten. 
                    Hierin vind je een overzicht van je scores en inzichten per levensgebied.
                  </p>
                </div> */}
            </div>
          )}
        </form>
      )}
      
      
    </main>
  );
}
