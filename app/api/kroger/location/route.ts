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
  );
  const response = await data.json();
  return response.access_token;
}

export async function POST(req: NextRequest) {
  const bearerToken = await getBearerToken();
  const request = await req.json();

  const path = 'https://api.kroger.com/v1/locations?';
  const data = await fetch(
    path +
      new URLSearchParams({
        'filter.zipCode.near': request.zipcode,
      }),
    {
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + bearerToken,
      },
    }
  );
  const response = await data.json();
  console.log(response);

  return NextResponse.json({
    data: response,
  });
}
