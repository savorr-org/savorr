import { NextResponse } from "next/server";
import vision from "@google-cloud/vision";

const credential = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_KEY, "base64").toString()
);

const client = new vision.ImageAnnotatorClient({
  projectId: credential.project_id,
  credentials: {
    client_email: credential.client_email,
    private_key: credential.private_key
  }
});

const link = "https://media.licdn.com/dms/image/D5603AQGooiAw6TVqBA/profile-displayphoto-shrink_800_800/0/1687936635764?e=1703116800&v=beta&t=J5Av9F1joZbNs3I-u2LHYoKYrKL8GqfE-l5t15-XS8I";


// TODO: request for image
// TODO: return 1 name with highest confidence
export async function GET() {
  const [result] = await client.objectLocalization(link);
  const objects = result.localizedObjectAnnotations;

  return NextResponse.json({ data: objects });
}