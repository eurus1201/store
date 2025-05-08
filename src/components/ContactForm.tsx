"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
} from "@mui/material";

// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Infer TypeScript type from schema
type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [success, setSuccess] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setSuccess(false); // Reset success state
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        console.log("Success:", result);
        
        setSuccess(true);
        reset(); // Reset form fields
        
      } else {
        console.error("Error:", result);
        if (result.errors) {
          result.errors.forEach((err: any) => {
            setError(err.path[0] as keyof FormData, { message: err.message });
          });
        } else {
          // Generic error
          setError("root", { message: result.message || "Failed to send message" });
        }
      }
    } catch (error) {
      console.error("Submission failed:", error);
      setError("root", { message: "Network error, please try again" });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 500, mx: "auto", mt: 2, p: 2 }}
    >
      <Typography variant="h6" gutterBottom>
        Contact Us
      </Typography>
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Message sent successfully!
        </Alert>
      )}
      {errors.root && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errors.root.message}
        </Alert>
      )}
      {/* Name Field */}
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Name"
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
            disabled={isSubmitting}
          />
        )}
      />

      {/* Email Field */}
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
            disabled={isSubmitting}
          />
        )}
      />

      {/* Message Field */}
      <Controller
        name="message"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Message"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            error={!!errors.message}
            helperText={errors.message?.message}
            disabled={isSubmitting}
          />
        )}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        fullWidth
        sx={{ mt: 2 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Send Message"}
      </Button>
    </Box>
  );
}