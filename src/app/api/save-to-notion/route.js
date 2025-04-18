import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID;
// const DATABASE_ID = '17abd1c3ca918032b321f2bc646a32da'; // production database
// const DATABASE_ID = '17abd1c3ca9180ec8e49c2f7f5e31a91'; // test database

export async function POST(req) {
  try {
    const { name, email, phoneNumber, city, birthDate, totalScore, answers } = await req.json();

    const response = await notion.pages.create({
      parent: {
        database_id: DATABASE_ID,
      },
      properties: {
        'Naam': {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        'E-mail': {
          email: email,
        },
        'Telefoonnummer': {
          phone_number: phoneNumber,
        },
      
        
        'Resultaat': {
          number: totalScore
        },
      },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Notion API Error:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
} 