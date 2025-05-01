import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2),
  organization: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  interest: z.string().min(1),
  message: z.string().min(10),
  confidential: z.boolean().optional()
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = contactFormSchema.parse(req.body);
      
      // Log the contact submission (in a real app, this might be saved to DB or sent via email)
      console.log("Contact form submission:", validatedData);
      
      // Return success response
      res.status(200).json({ 
        success: true, 
        message: "Contact request submitted successfully" 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation failed", 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while processing your request" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
