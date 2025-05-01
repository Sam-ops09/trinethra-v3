import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = contactFormSchema.parse(req.body);
      
      // Save the contact form submission
      const submission = await storage.createContactSubmission(validatedData);
      
      // Log the contact submission ID
      console.log(`Contact form submission saved with ID: ${submission.id}`);
      
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
  });
  
  // Get all contact submissions (for admin purposes)
  app.get("/api/contact", async (req, res) => {
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
  });

  const httpServer = createServer(app);
  return httpServer;
}
