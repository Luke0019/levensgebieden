import Workbook from "../components/Workbook";

export default function Home() {
    // Dummy answers simulating completed questionnaire
    const dummyAnswers = {
        'existentieel_0': 4,  // "Eens"
        'existentieel_1': 5,  // "Helemaal eens"
        'existentieel_2': 4,  // "Eens"
        
        'emotioneel_0': 3,    // "Neutraal"
        'emotioneel_1': 4,    // "Eens"
        'emotioneel_2': 4,    // "Eens"
        
        'creatief_0': 5,      // "Helemaal eens"
        'creatief_1': 4,      // "Eens"
        'creatief_2': 5,      // "Helemaal eens"
        
        'cognitief_0': 4,     // "Eens"
        'cognitief_1': 3,     // "Neutraal"
        'cognitief_2': 4,     // "Eens"
        
        'materieel_0': 3,     // "Neutraal"
        'materieel_1': 4,     // "Eens"
        'materieel_2': 3,     // "Neutraal"
        
        'sociaal_0': 5,       // "Helemaal eens"
        'sociaal_1': 4,       // "Eens"
        'sociaal_2': 5,       // "Helemaal eens"
        
        'fysiek_0': 4,        // "Eens"
        'fysiek_1': 3,        // "Neutraal"
        'fysiek_2': 4         // "Eens"
    };

    // Dummy questions data
    const dummyQuestions = {
        existentieel: {
            emoji: "🧐",
            title: "Existentieel",
            questions: [
                {
                    vraag: "Ik denk regelmatig na over de betekenis van mijn leven",
                    opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
                },
                {
                    vraag: "Ik heb een duidelijk doel voor ogen in mijn leven",
                    opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
                },
                {
                    vraag: "Ik leef volgens mijn persoonlijke waarden",
                    opties: ["Helemaal oneens", "Oneens", "Neutraal", "Eens", "Helemaal eens"]
                }
            ]
        },
        // ... other categories can be added if needed
    };

    return(
        <div>
            <Workbook 
                answers={dummyAnswers}
                questions={dummyQuestions}
                name={'Luuk'}
            />
        </div>
    )
}
