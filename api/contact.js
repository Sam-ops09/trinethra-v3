import { storage } from '../server/storage';
import { contactFormSchema } from '../shared/schema';
import { z } from 'zod';

export default async function handler(req, res) {
  // Only allow POST requests for submissions
  if (req.method === 'POST') {
    try {
      // Validate request body
      const validatedData = contactFormSchema.parse(req.body);
      
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
      
      console.error("Contact form submission error:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while processing your request" 
      });
    }
  } 
  // For GET requests, return all submissions (admin only)
  else if (req.method === 'GET') {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.status(200).json({
        success: true,
        data: submissions
      });
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
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