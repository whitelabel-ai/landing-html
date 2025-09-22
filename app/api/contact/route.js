export async function POST(request) {
  try {
    const formData = await request.formData();
    // Aquí podrías integrar con un servicio de email real (SendGrid, Resend, etc.)
    // De momento respondemos OK para que el front funcione igual que con mail.php
    const name = formData.get("name") || formData.get("nombre") || "";
    const email = formData.get("email") || "";
    const message = formData.get("message") || formData.get("mensaje") || "";

    // TODO: enviar email real
    return new Response("Gracias, hemos recibido tu mensaje.", { status: 200 });
  } catch (e) {
    return new Response("Oops! An error occured and your message could not be sent.", { status: 500 });
  }
}