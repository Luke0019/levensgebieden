import Link from "next/link";


// CHATGPT PROMPT TO GENERATE YOUR PRIVACY POLICY — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple privacy policy for my website. Here is some context:
// - Website: https://wijzijnspark.nl
// - Name: Wij zijn Spark
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Purpose of Data Collection: Order processing and sending information about Wij zijn Spark's activities
// - Data sharing: we do not share the data with any other parties
// - Children's Privacy: we do not collect any data from children
// - Updates to the Privacy Policy: users will be updated by email
// - Contact information: info@wijzijnspark.nl

// Please write a simple privacy policy for my site. Add the current date.  Do not add or explain your reasoning. Answer:


const PrivacyBeleid = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>{" "}
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Privacybeleid van Wij zijn Spark
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Datum: 22 januari 2025

Inleiding
Welkom bij Wij zijn Spark. Dit privacybeleid is van toepassing op onze website https://wijzijnspark.nl. Het beschrijft hoe wij persoonlijke gegevens verzamelen, gebruiken en beschermen die u ons verstrekt bij het gebruik van onze diensten.

Verzameling van Persoonsgegevens
Wij verzamelen de volgende persoonlijke gegevens van u:

- Naam
- E-mailadres
- Telefoonnummer

Cookies
Onze website maakt gebruik van cookies om uw ervaring te verbeteren. Cookies helpen ons om uw voorkeuren te begrijpen en onze diensten dienovereenkomstig aan te passen.

Gebruik van Gegevens
Uw persoonsgegevens worden enkel gebruikt voor het verwerken van de quickscan en het versturen van informatie over de werkzaamheden van Wij zijn Spark. Wij delen uw gegevens niet met derde partijen.

Bescherming van Kinderen
Onze diensten zijn niet gericht op kinderen onder de 16 jaar. Wij verzamelen niet bewust persoonlijke gegevens van kinderen.

Beveiliging van Uw Gegevens
Wij nemen de bescherming van uw persoonsgegevens serieus en nemen passende maatregelen om deze te beveiligen tegen ongeautoriseerde toegang, wijziging, openbaarmaking of vernietiging.

Contactinformatie
Voor vragen of zorgen over ons privacybeleid kunt u contact met ons opnemen via info@wijzijnspark.nl.

Dit privacybeleid biedt de basis voor de manier waarop wij omgaan met persoonlijke gegevens die u ons verstrekt. Wij raden u aan dit beleid regelmatig te herzien.`}
        </pre>
      </div>
    </main>
  );
};

export default PrivacyBeleid;