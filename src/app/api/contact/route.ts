import { NextResponse } from "next/server";
import * as z from "zod";

// Define the same Zod schema as in ContactForm
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: Request) {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const data = formSchema.parse(body);

    // Simulate backend operation (e.g., save to database, send email)
    console.log("Contact form submission:", data);

    // Example: Save to a database (pseudo-code)
    // await db.contact.create({ data });

    // Example: Send email via a service (pseudo-code)
    // await sendEmail({
    //   to: "support@example.com",
    //   from: data.email,
    //   subject: `New Contact Form Submission from ${data.name}`,
    //   body: data.message,
    // });

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return validation errors
      return NextResponse.json(
        { message: "Validation failed", errors: error.errors },
        { status: 400 }
      );
    }
    console.error("Server error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}