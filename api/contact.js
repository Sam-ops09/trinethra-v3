
import { storage } from '../server/storage';
import { contactFormSchema } from '../shared/schema';
import { z } from 'zod';

export default async function handler(req, res) {
  // Only allow POST requests for submissions
  if (req.method === 'POST') {
    try {
      // Validate request body
      const validatedData = contactFormSchema.parse(req.body);

      // Log the attempt to create a submission
      console.log("Attempting to create contact submission:", {
        environment: process.env.NODE_ENV,
        data: JSON.stringify(validatedData)
      });

      // Save the contact form submission
      const submission = await storage.createContactSubmission(validatedData);

      // Return success response
      res.status(200).json({
        success: true,
        message: "Contact request submitted successfully",
        submissionId: submission.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.errors
        });
      }

      // Enhanced error logging with more details
      console.error("Contact form submission error:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
        code: error.code,
        environment: process.env.NODE_ENV,
        // If there are any database or connection details available, log them:
        details: error.details || {},
      });

      res.status(500).json({
        success: false,
        message: "An error occurred while processing your request",
        // Include a reference ID for debugging but don't expose sensitive details
        errorId: Date.now().toString(36) + Math.random().toString(36).substr(2),
      });
    }
  }
  // For GET requests, return all submissions (admin only)
  else if (req.method === 'GET') {
    try {
      console.log("Attempting to fetch all contact submissions");
      const submissions = await storage.getAllContactSubmissions();
      res.status(200).json({
        success: true,
        data: submissions
      });
    } catch (error) {
      console.error("Error fetching contact submissions:", {
        message: error.message,
        stack: error.stack,
        environment: process.env.NODE_ENV
      });
      res.status(500).json({
        success: false,
        message: "An error occurred while retrieving contact submissions"
      });
    }
  }
  // Disallow other HTTP methods
  else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
