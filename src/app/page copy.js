'use client';
import { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import PdfTemplate from './components/PdfTemplate';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// Move html2pdf import to a dynamic import
let html2pdf;
if (typeof window !== 'undefined') {
  import('html2pdf.js').then(module => {
    html2pdf = module.default;
  });
}

const questions = {
  existentieel: {
    emoji: "🧐",
    title: "Existentieel",
    questions: [
      {
        vraag: "Ik heb het gevoel dat mijn leven een duidelijk doel heeft",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik heb het gevoel dat ik in een richting beweeg die ik betekenisvol vind",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik heb het gevoel dat ik verbonden ben met iets dat groter is dan ik zelf",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik heb een onderliggend gevoel van rust, ook in onzekere tijden",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik heb het gevoel dat mijn ontwikkeling me helpt om de dingen te doen die ik belangrijk vind",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik heb een optimistische blik op de toekomst",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      }
    ]
  },
  emotioneel: {
    emoji: "💟",
    title: "Emotioneel",
    questions: [
      {
        vraag: "In uitdagende situaties lukt het me om mijn emoties effectief te reguleren",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik voel me emotioneel voldaan met de relaties in mijn leven",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Het lukt me om mijn emoties vrij en open te uiten",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik ervaar meer positieve emoties dan negatieve emoties",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik heb gezonde copingsmechanismes om met stress om te gaan",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik herstel snel van emotionele tegenslagen",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      }
    ]
  },
  cognitief: {
    emoji: "🧠",
    title: "Cognitief",
    questions: [
      {
        vraag: "Ik ben tevreden met mijn vermogen om me te concentreren en focussen",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik voel me mentaal gestimuleerd door mijn dagelijkse activiteiten",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik ben tevreden met de dingen die ik leer in mijn dagelijkse activiteiten",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik neem de tijd om te reflecteren op mijn gevoelens en gedachten",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik voel me mentaal weerbaar",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik leer graag over nieuwe mensen, concepten, en ideeën",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      }
    ]
  },
  fysiek: {
    emoji: "💪🏼",
    title: "Fysiek",
    questions: [
      {
        vraag: "Ik heb genoeg energie om de dingen te doen die ik graag wil doen",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik ben tevreden met de kwaliteit en hoeveelheid slaap die ik krijg",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Het lukt mij om te eten op een manier die me gezond en vitaal laat voelen",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik ben goed in staat om signalen van mijn lichaam te observeren",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Het lukt me om een goede balans te vinden tussen inspanning en herstel",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik heb het gevoel dat mijn lichaam sterk en weerbaar is",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      }
    ]
  },
  sociaal: {
    emoji: "👥",
    title: "Sociaal",
    questions: [
      {
        vraag: "Ik heb sterke en ondersteunende relaties in mijn leven",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik voel mij verbonden met een (lokale) community",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik ben goed in staat om met anderen te communiceren",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik heb mensen in mijn leven waar ik op kan terugvallen als het minder gaat",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik ben tevreden met de mate waarin ik verbinding leg met nieuwe mensen",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik ben tevreden met de mate waarin ik investeer in de relaties met de mensen om wie ik geef",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      }
    ]
  },
  materieel: {
    emoji: "💰",
    title: "Materieel",
    questions: [
      {
        vraag: "Ik heb de spullen die ik nodig heb om de dingen te doen die ik graag wil doen",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik heb een gezonde relatie met geld en materiële bezittingen",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik voel me financieel voorbereid op de toekomst",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik ben op dit moment in staat om een financiële tegenvaller op te vangen",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Mijn financiële situatie baart me geen zorgen",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Mijn fysieke leefomgeving heeft wat het nodig heeft om comfortabel te zijn",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      }
    ]
  },
  creatief: {
    emoji: "🎨",
    title: "Creatief",
    questions: [
      {
        vraag: "Ik heb het gevoel dat ik goed weet hoe ik mijn creativiteit kan uiten",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik uit mijn creativiteit regelmatig",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik heb het gevoel dat mijn creativiteit goed tot zijn recht komt in mijn dagelijke activiteiten",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik doe regelmatig creatieve inspiratie op",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik ben goed in staat om creatieve oplossingen te bedenken voor problemen",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      },
      {
        vraag: "Ik vind het leuk om te experimenteren met nieuwe ideeën en concepten",
        opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
      }
    ]
  }
};

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const sections = Object.keys(questions);
  const currentArea = sections[currentStep];
  const currentAreaQuestions = questions[currentArea]?.questions || [];

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
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setQuestionIndex(0);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loadingToast = toast.loading('Bezig met verzenden...');
    
    try {
      const scores = calculateAreaScores();

      // Make sure html2pdf is loaded
      if (!html2pdf) {
        await import('html2pdf.js').then(module => {
          html2pdf = module.default;
        });
      }

      // Generate PDF content
      const pdfContent = ReactDOMServer.renderToString(
        <PdfTemplate 
          answers={answers} 
          questions={questions}
          name={name}
        />
      );

      // Create a temporary div to render the HTML
      const element = document.createElement('div');
      element.innerHTML = pdfContent;
      document.body.appendChild(element);

      // Generate PDF using html2pdf in a try-catch block
      try {
        const pdf = await html2pdf().from(element).outputPdf('datauristring');
        
        // Remove the temporary element
        document.body.removeChild(element);

        // Send email with PDF attachment and name
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            name,
            phoneNumber,
            city,
            age,
            scores,
            pdfBase64: pdf.split(',')[1]
          })
        });

        if (response.ok) {
          toast.success('De resultaten zijn verzonden naar je e-mail!', {
            id: loadingToast,
          });
          setIsSubmitted(true);
        } else {
          throw new Error('Email sending failed');
        }
      } catch (pdfError) {
        console.error('PDF generation error:', pdfError);
        throw pdfError;
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Er is iets misgegaan bij het verzenden.', {
        id: loadingToast,
      });
    } finally {
      setIsSubmitting(false);
      toast.dismiss(loadingToast);
    }
  };

  // Calculate total questions
  const totalQuestions = Object.values(questions).reduce(
    (sum, section) => sum + section.questions.length, 
    0
  );

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
      const nextQuestionElement = document.querySelector(`[name="question_${currentArea}_${questionIdx + 1}"]`);
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
        
        console.log(`Checking ${answerKey}:`, answer); // Debug log
        
        if (answer) {
          const points = {
            'Helemaal eens': 10,
            'Eens': 8,
            'Neutraal': 6,
            'Oneens': 4,
            'Helemaal oneens': 2
          }[answer];
          
          totalScore += points;
          questionCount++;
        }
      });
      
      scores[area] = questionCount > 0 ? Math.round(totalScore / questionCount) : 0;
      console.log(`${area} score:`, scores[area]); // Debug log
    });
    
    console.log('Final scores:', scores); // Debug log
    return scores;
  };

  // Add this function to create radar chart points
  const createRadarPoints = (values, scale = 150) => {
    const points = [];
    const sides = Object.keys(questions).length;
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

  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <Toaster position="top-center" />
      <h1 className="text-3xl font-bold mb-8 text-center">
        De 7 Levensgebieden Vragenlijst
      </h1>

      {isSubmitted ? (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-8">✨</div>
          <h2 className="text-2xl font-bold mb-4">
            Bedankt voor het invullen van de vragenlijst!
          </h2>
          <p className="text-gray-600 mb-4">
            We hebben je resultaten verstuurd naar: <strong>{email}</strong>
          </p>
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h3 className="font-semibold mb-3">Wat nu?</h3>
            <p className="text-gray-600">
              Check je inbox voor een gedetailleerd overzicht van je scores en inzichten per levensgebied. <b>Het kan een aantal minuten duren voordat het mailtje in je mailbox verschijnt.</b><br></br>
              Als je de email niet kunt vinden, check dan ook je spam folder.
            </p>
          </div>
          <div className="space-y-4">
            <button
              onClick={handleSubmit}
              className="bg-gray-600 text-white py-2 px-6 rounded hover:bg-gray-700 transition-colors mr-4"
            >
              Opnieuw versturen
            </button>
            <button
              onClick={() => {
                // Clear localStorage
                localStorage.removeItem('formState');
                
                // Reset all state
                setAnswers({});
                setCurrentStep(0);
                setQuestionIndex(0);
                setEmail('');
                setName('');
                setPhoneNumber('');
                setCity('');
                setAge('');
                setIsSubmitted(false);
                
                // Refresh the page
                window.location.reload();
              }}
              className="bg-[#FE6C3B] text-white py-2 px-6 rounded hover:bg-[#e55c2f] transition-colors"
            >
              Start vragenlijst opnieuw
            </button>
          </div>
        </div>
      ) : (
        <form className="space-y-6">
          {questionIndex < totalQuestions ? (
            <>
              <div className="text-center mb-8">
                <div className="text-sm text-gray-500">
                  Gebied {currentStep + 1} van {sections.length}
                </div>
                <div className="w-full bg-gray-200 h-2.5 mb-4">
                  <div 
                    className="bg-blue-600 h-2.5" 
                    style={{ width: `${(currentStep + 1) / sections.length * 100}%` }}
                  />
                </div>
                <div className="text-2xl mt-2">
                  {currentArea && questions[currentArea] ? (
                    <>
                      {questions[currentArea].emoji} {questions[currentArea].title}
                    </>
                  ) : null}
                </div>
              </div>

              <div className="space-y-12">
                {currentAreaQuestions.map((q, idx) => (
                  <div 
                    key={`${currentArea}_${idx}`}
                    className={`transition-all duration-300 ${
                      // Check if previous questions are answered
                      idx > 0 && !answers[`${currentArea}_${idx - 1}`]
                        ? 'opacity-50 blur-sm pointer-events-none'
                        : ''
                    }`}
                  >
                    <p className="font-medium text-center text-xl mb-8">{q.vraag}</p>
                    
                    <div className="flex justify-between items-center gap-2 px-4">
                      {q.opties.map((optie, optieIdx) => (
                        <div key={optieIdx} className="flex flex-col items-center">
                          <label className="flex flex-col items-center cursor-pointer">
                            <input
                              type="radio"
                              name={`question_${currentArea}_${idx}`}
                              value={optie}
                              checked={answers[`${currentArea}_${idx}`] === optie}
                              onChange={() => handleRadioSelect(idx, optie)}
                              className="appearance-none w-4 h-4 rounded-full border-2 border-[#9346F5] checked:bg-[#9346F5] checked:border-[#9346F5] transition-all duration-200 cursor-pointer focus:ring-2 focus:ring-[#9346F5] focus:ring-offset-2"
                              // Disable input if previous question is not answered
                              disabled={idx > 0 && !answers[`${currentArea}_${idx - 1}`]}
                            />
                            <span className="text-sm font-medium">{optieIdx + 1}</span>
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between px-4 text-xs text-gray-500 mt-2">
                      <span>Helemaal oneens</span>
                      <span>Helemaal eens</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between gap-4 mt-8">
                <button
                  type="button"
                  onClick={handlePreviousSection}
                  className={`flex-1 py-2 px-4 rounded ${
                    currentStep === 0 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-gray-300'
                  }`}
                  disabled={currentStep === 0}
                >
                  Vorige
                </button>

                <button
                  type="button"
                  onClick={handleNextSection}
                  className={`flex-1 py-2 px-4 rounded ${
                    Object.keys(answers).filter(key => key.startsWith(currentArea)).length === currentAreaQuestions.length
                      ? 'bg-[#FE6C3B] text-white hover:bg-[#e55c2f]'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                  disabled={Object.keys(answers).filter(key => key.startsWith(currentArea)).length !== currentAreaQuestions.length}
                >
                  {currentStep === sections.length - 1 ? 'Naar resultaten' : 'Volgende'}
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Bedankt voor het invullen!</h2>
                <p className="text-gray-600">
                  Vul hieronder je gegevens in om de resultaten in je inbox te ontvangen.
                </p>
              </div>

              <div className="max-w-2xl mx-auto space-y-6">
                <div>
                  <label className="block mb-2">
                    Wat is je naam? *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full p-2 border rounded"
                    placeholder="Jouw naam"
                  />
                </div>
                <div>
                  <label className="block mb-2">
                    E-mailadres: *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 border rounded"
                    placeholder="jouw@email.nl"
                  />
                </div>
                <div>
                  <label className="block mb-2">
                    Telefoonnummer: *
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="w-full p-2 border rounded"
                    placeholder="06 12345678"
                  />
                </div>
                <div>
                  <label className="block mb-2">
                    Woonplaats: *
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="w-full p-2 border rounded"
                    placeholder="Groningen"
                  />
                </div>
                <div>
                  <label className="block mb-2">
                    Leeftijd: *
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    className="w-full p-2 border rounded"
                    placeholder="24"
                    min="0"
                    max="120"
                  />
                </div>

                
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !email || !name || !phoneNumber || !city || !age}
                className="w-full bg-[#FE6C3B] text-white py-2 px-4 rounded hover:bg-[#e55c2f] disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Versturen...
                  </span>
                ) : (
                  'Verstuur'
                )}
              </button>
              <div className="mt-12 text-center">
                  <h3 className="text-xl font-semibold mb-4">Wat gebeurt er hierna?</h3>
                  <p className="text-gray-600 mb-8">
                    Na het versturen ontvang je direct een e-mail met jouw persoonlijke resultaten. 
                    Hierin vind je een overzicht van je scores en inzichten per levensgebied.
                  </p>
                </div>
            </div>
          )}
        </form>
      )}
      
      {questionIndex === totalQuestions && (
        <div style={{ display: 'none' }}>
          <PdfTemplate 
            answers={answers}
            questions={questions}
            name={name}
          />
        </div>
      )}
    </main>
  );
}
