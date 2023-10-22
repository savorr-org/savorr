import {NextRequest, NextResponse} from "next/server";

type Product = {
  name: string;
};

const apiKey = process.env.SPOONACULAR_API_KEY;

export async function POST(req: NextRequest) {
  const request = await req.json();
  const query = request.query;

  const apiUrl = `https://api.spoonacular.com/food/ingredients/search?number=5&query=${query}&apiKey=${apiKey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  const productNames = data.results.map((product: Product) => ({
    name: product.name
  }));

  return NextResponse.json({ data: productNames });
}
