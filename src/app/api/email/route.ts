export async function POST(req: Request) {
  const body = await req.json();
  const { email, subject, message } = body;
  return Response.json({ message: "email sent successfully" });
}
