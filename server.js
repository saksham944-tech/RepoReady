import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing. Add it in Render Environment Variables.");
}

const ai = new GoogleGenAI({
    apiKey: apiKey
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/generate-readme", async (req, res) => {
    try {
        const projectData = req.body;

        const prompt = `
You are an expert technical documentation writer.

Create a professional GitHub README.md file using Markdown.

Project details:
Project Name: ${projectData.projectName}
Project Type: ${projectData.projectType}
Description: ${projectData.projectDescription}
Features: ${projectData.features}
Tech Stack: ${projectData.techStack}
Installation Steps: ${projectData.installation}
Usage Instructions: ${projectData.usage}
Project Structure: ${projectData.projectStructure}
Future Scope: ${projectData.futureScope}
Author: ${projectData.author}
GitHub Profile: ${projectData.githubLink}
Repository Link: ${projectData.repoLink}
Live Demo Link: ${projectData.demoLink}
Screenshot Link: ${projectData.screenshotLink}
License: ${projectData.license}
Template Style: ${projectData.readmeTemplate}

Rules:
- Return only README.md content.
- Use clean Markdown.
- Do not write explanations outside the README.
- Make the README professional and GitHub-ready.
- Add badges if tech stack is available.
- Add table of contents if useful.
- Add project links if provided.
- Add screenshot section if screenshot link is provided.
- Do not invent fake links.
- If any field is empty, skip that section or write it naturally.
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        const readme = response.text;

        res.json({
            success: true,
            readme
        });

    } catch (error) {
        console.error("AI README generation error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to generate README using AI."
        });
    }
});

app.listen(PORT, () => {
    console.log(`RepoReady server running at http://localhost:${PORT}`);
});