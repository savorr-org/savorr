import { NextRequest, NextResponse } from 'next/server';

export async function getBearerToken() {
  const path = 'https://api.kroger.com/v1/connect/oauth2/token?';
  const clientInfo = Buffer.from(
    process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET,
    'utf8'
  ).toString('base64');
  const data = await fetch(
    path +
      new URLSearchParams({
        grant_type: 'client_credentials',
        scope: 'product.compact',
      }),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + clientInfo,
      },
    }
  )
  const response = await data.json();
  return response.access_token;
}

export async function POST(req: NextRequest) {
  const bearerToken = await getBearerToken();
  const request = await req.json();

  const path = 'https://api.kroger.com/v1/products?';
  const data = await fetch(
    path +
      new URLSearchParams({
        'filter.term': request.term,
        'filter.locationId': request.locationId,
        'filter.limit': request.limit,
      }),
    {
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + bearerToken,
      },
    }
  );
  const response = await data.json();

  if (response.length === 0) {
    return NextResponse.json({ data: '' });
  }

  const itemCategories = response.data[0].categories;
  const filteredItems = response.data.filter(
    (product: any) =>
      product.items &&
      product.categories.some((item: any) => itemCategories.includes(item))
  );
  let sum = 0;
  let min = {
    item: '',
    price: Number.MAX_SAFE_INTEGER,
  };
  filteredItems.forEach((element: any) => {
    if (element.items.length > 0 && element.items[0].price) {
      let currPrice = element.items[0].price.regular;
      sum += currPrice;
      if (currPrice < min.price) {
        min = {
          item: element.description,
          price: currPrice,
        };
      }
    }
  });
  const totalCount = filteredItems.reduce((accumulator: any, curr: any) => {
    if (curr.items.length > 0 && curr.items[0].price) return accumulator + 1;
    else return accumulator;
  }, 0);

  return NextResponse.json({
    data: {
      average: sum / totalCount,
      lowest: min,
    },
  });
}
