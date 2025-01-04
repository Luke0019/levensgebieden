import { ServerClient } from 'postmark';

const client = new ServerClient(process.env.POSTMARK_API_TOKEN);

export async function POST(request) {
  try {
    const { email, name, pdfBase64 } = await request.json();

    // Send email using Postmark template
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

    return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Email sending failed:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
} 