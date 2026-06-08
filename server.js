import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is missing. Add it in Render Environment Variables.");
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/generate-readme", async (req, res) => {
    try {
        if (!GEMINI_API_KEY) {
            return res.status(500).json({
                success: false,
                message: "GEMINI_API_KEY is missing on the server."
            });
        }

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

        const geminiResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await geminiResponse.json();

        if (!geminiResponse.ok) {
            console.error("Gemini API Error:", data);

            return res.status(500).json({
                success: false,
                message: data.error?.message || "Gemini API request failed."
            });
        }

        const readme = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!readme) {
            return res.status(500).json({
                success: false,
                message: "Gemini did not return README content."
            });
        }

        res.json({
            success: true,
            readme
        });

    } catch (error) {
        console.error("AI README generation error:", error);

        res.status(500).json({
            success: false,
            message: error.message || "Failed to generate README using AI."
        });
    }
});

app.listen(PORT, () => {
    console.log(`RepoReady server running at http://localhost:${PORT}`);
});