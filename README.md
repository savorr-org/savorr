# Savorr

A Next.js web application to save your money and savor your ingredients.

## Technologies
- Next.js [docs](https://nextjs.org/docs)
- TailwindCSS [docs](https://tailwindcss.com/docs/installation)
- TypeScript [docs](https://www.typescriptlang.org/docs/)
- Vercel Platform [docs](https://vercel.com/docs)
- OpenAI GPT API [docs](https://platform.openai.com/docs/api-reference)
- Kroger API [docs](https://developer.kroger.com/reference#section/Authentication)
- Google Cloud Vision API [docs](https://cloud.google.com/vision/docs)
- Spoonacular API [docs](https://spoonacular.com/food-api/docs#Ingredient-Search)

## Data Flow Diagrams

Location Required for Store Locality
![Diagram 2](https://github.com/savorr-org/.github/blob/main/assets/diagram-2.png)

Input to Item Text
![Diagram 1](https://github.com/savorr-org/.github/blob/main/assets/diagram-1.png)

Average Price for each Added Item
![Diagram 3](https://github.com/savorr-org/.github/blob/main/assets/diagram-3.png)

Generate Savorr List (cheapest items)
![Diagram 4](https://github.com/savorr-org/.github/blob/main/assets/diagram-4.png)

## Future Considerations
- A item alternative suggestions is compatible with another item alternative suggestions for good recipe
- Track grocery item if in stock
- Healthiness option list (Save lives)
- Brand ESG option list (Save environment)

## Getting Started

Populate environment variables in `.env.local`:
```bash
OPENAI_KEY=
SPOONACULAR_API_KEY=
GOOGLE_SERVICE_KEY=
CLIENT_ID=
CLIENT_SECRET=
```

`CLIENT_ID` and `CLIENT_SECRET` is for the Kroger API.

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Troubleshooting

Base64 Encode Service Account JSON file ([discussion](https://github.com/orgs/vercel/discussions/219))
