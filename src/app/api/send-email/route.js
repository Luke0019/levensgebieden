import { ServerClient } from 'postmark';

const client = new ServerClient(process.env.POSTMARK_API_TOKEN);

export async function POST(request) {
  try {
    const { email, name, pdfBase64, phoneNumber, city, age, scores } = await request.json();

    // Send email with PDF to user
    await client.sendEmailWithTemplate({
      TemplateId: 38528908,
      From: 'info@wijzijnspark.nl',
      To: email,
      TemplateModel: {
        name: name,
        message: 'Bedankt voor het invullen van de 7 Levensgebieden Vragenlijst.',
        signature: 'Team Spark',
        year: new Date().getFullYear(),
        companyName: 'Spark'
      },
      Attachments: [
        {
          Name: 'levensgebieden-resultaten.pdf',
          Content: pdfBase64,
          ContentType: 'application/pdf'
        }
      ],
      MessageStream: 'outbound'
    });

    
    await client.sendEmail({
      From: 'info@wijzijnspark.nl',
      To: 'info@wijzijnspark.nl',
      Subject: 'Nieuwe 7 Levensgebieden Vragenlijst Ingevuld',
      TextBody: `
Nieuwe vragenlijst ingevuld:

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