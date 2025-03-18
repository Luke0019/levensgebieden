import { ServerClient } from 'postmark';

const client = new ServerClient(process.env.POSTMARK_API_TOKEN);

export async function POST(request) {
  try {
    const { email, name, phoneNumber, city, age, scores } = await request.json();

  

    
    await client.sendEmail({
      From: 'info@wijzijnspark.nl',
      To: 'info@wijzijnspark.nl',
      Subject: `Nieuwe 'Digitale verslaving test' Ingevuld`,
      TextBody: `
    Nieuwe 'Digitale verslaving test' ingevuld:

    Naam: ${name}
    Email: ${email}
    Telefoonnummer: ${phoneNumber}
    Woonplaats: ${city}
    Leeftijd: ${age}

    Scores per gebied:
    ${Object.entries(scores)
      .map(([area, score]) => `${area}: ${score}/10`)
      .join('\n')}

    Datum: ${new Date().toLocaleDateString('nl-NL')}
      `,
      MessageStream: 'outbound'
    });

    return new Response(JSON.stringify({ message: 'Emails sent successfully' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Email sending failed:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
} 