function getValue(id) {
    return document.getElementById(id).value.trim();
}

function isChecked(id) {
    return document.getElementById(id).checked;
}

function makeBulletList(text) {
    if (!text.trim()) {
        return "- Not specified";
    }

    return text
        .split("\n")
        .filter(item => item.trim() !== "")
        .map(item => `- ${item.trim()}`)
        .join("\n");
}

function makeCodeBlock(text, language = "") {
    if (!text.trim()) {
        return "Not specified";
    }

    return `\`\`\`${language}
${text.trim()}
\`\`\``;
}

function generateTableOfContents(sections) {
    let toc = `## Table of Contents\n\n`;

    sections.forEach(section => {
        let link = section
            .toLowerCase()
            .replaceAll(" ", "-")
            .replaceAll(".", "")
            .replaceAll("/", "");

        toc += `- [${section}](#${link})\n`;
    });

    return toc + "\n";
}

function generateBadges(techStackText) {
    if (!techStackText.trim()) {
        return "";
    }

    const badgeMap = {
        html: "![HTML](https://img.shields.io/badge/HTML-5-orange)",
        css: "![CSS](https://img.shields.io/badge/CSS-3-blue)",
        javascript: "![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)",
        js: "![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)",
        react: "![React](https://img.shields.io/badge/React-18-blue)",
        node: "![Node.js](https://img.shields.io/badge/Node.js-Backend-green)",
        "node.js": "![Node.js](https://img.shields.io/badge/Node.js-Backend-green)",
        express: "![Express](https://img.shields.io/badge/Express.js-Backend-lightgrey)",
        mongodb: "![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)",
        mysql: "![MySQL](https://img.shields.io/badge/MySQL-Database-blue)",
        python: "![Python](https://img.shields.io/badge/Python-3.x-blue)",
        flask: "![Flask](https://img.shields.io/badge/Flask-Backend-black)",
        django: "![Django](https://img.shields.io/badge/Django-Backend-darkgreen)",
        java: "![Java](https://img.shields.io/badge/Java-Programming-red)",
        c: "![C](https://img.shields.io/badge/C-Programming-blue)",
        "c++": "![C++](https://img.shields.io/badge/C++-Programming-blue)",
        firebase: "![Firebase](https://img.shields.io/badge/Firebase-Backend-yellow)",
        tailwind: "![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8)",
        bootstrap: "![Bootstrap](https://img.shields.io/badge/Bootstrap-CSS-purple)",
        vite: "![Vite](https://img.shields.io/badge/Vite-Build_Tool-purple)",
        git: "![Git](https://img.shields.io/badge/Git-Version_Control-orange)",
        github: "![GitHub](https://img.shields.io/badge/GitHub-Repository-black)",
        api: "![API](https://img.shields.io/badge/API-Integrated-blue)",
        ai: "![AI](https://img.shields.io/badge/AI-Powered-purple)",
        ml: "![Machine Learning](https://img.shields.io/badge/Machine_Learning-Model-purple)"
    };

    let techItems = techStackText
        .split(/\n|,/)
        .map(item => item.trim().toLowerCase())
        .filter(item => item !== "");

    let badges = [];

    techItems.forEach(tech => {
        if (badgeMap[tech]) {
            badges.push(badgeMap[tech]);
        } else {
            let cleanTech = tech.replaceAll(" ", "%20");
            let displayName = tech
                .split(" ")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join("%20");

            badges.push(`![${tech}](https://img.shields.io/badge/${displayName}-Technology-blue)`);
        }
    });

    return badges.join("\n") + "\n";
}

function generateProjectLinks(repoLink, demoLink) {
    let output = "";

    if (!repoLink && !demoLink) {
        return "";
    }

    output += `## Project Links

`;

    if (repoLink) {
        output += `- Repository: [View on GitHub](${repoLink})\n`;
    }

    if (demoLink) {
        output += `- Live Demo: [Open Project](${demoLink})\n`;
    }

    output += "\n";

    return output;
}

function generateScreenshotSection(screenshotLink) {
    if (!screenshotLink) {
        return "";
    }

    return `## Screenshots

![Project Screenshot](${screenshotLink})

`;
}

function generateReadme() {
    let template = getValue("readmeTemplate") || "professional";

    let projectName = getValue("projectName") || "Project Name";
    let projectDescription = getValue("projectDescription") || "Project description goes here.";
    let features = getValue("features");
    let techStack = getValue("techStack");
    let installation = getValue("installation");
    let usage = getValue("usage");
    let projectStructure = getValue("projectStructure");
    let futureScope = getValue("futureScope");
    let author = getValue("author") || "Author Name";
    let githubLink = getValue("githubLink");
    let repoLink = getValue("repoLink");
    let demoLink = getValue("demoLink");
    let screenshotLink = getValue("screenshotLink");
    let license = getValue("license");

    let selectedSections = [];
    
    if (isChecked("includeLinks")) selectedSections.push("Project Links");
    if (isChecked("includeScreenshots")) selectedSections.push("Screenshots");
    if (isChecked("includeFeatures")) selectedSections.push("Features");
    if (isChecked("includeTech")) selectedSections.push("Tech Stack");
    if (isChecked("includeInstallation")) selectedSections.push("Installation");
    if (isChecked("includeUsage")) selectedSections.push("Usage");
    if (isChecked("includeStructure")) selectedSections.push("Project Structure");
    if (isChecked("includeFuture")) selectedSections.push("Future Scope");
    if (isChecked("includeAuthor")) selectedSections.push("Author");
    if (isChecked("includeLicense")) selectedSections.push("License");

    let readme = "";

    if (template === "basic") {
        readme = generateBasicTemplate(
            projectName,
            projectDescription,
            features,
            techStack,
            installation,
            usage,
            author,
            license,
            repoLink,
            demoLink,
            screenshotLink
        );
    } else if (template === "college") {
        readme = generateCollegeTemplate(
            projectName,
            projectDescription,
            features,
            techStack,
            installation,
            usage,
            projectStructure,
            futureScope,
            author,
            license,
            repoLink,
            demoLink,
            screenshotLink
        );
    } else if (template === "opensource") {
    readme = generateOpenSourceTemplate(
        projectName,
        projectDescription,
        features,
        techStack,
        installation,
        usage,
        projectStructure,
        futureScope,
        author,
        githubLink,
        license,
        repoLink,
        demoLink,
        screenshotLink
    );
    } else if (template === "aiml") {
        readme = generateAIMLTemplate(
            projectName,
            projectDescription,
            features,
            techStack,
            installation,
            usage,
            projectStructure,
            futureScope,
            author,
            githubLink,
            license,
            repoLink,
            demoLink,
            screenshotLink
        );
    } else {
        readme = generateProfessionalTemplate(
        projectName,
        projectDescription,
        features,
        techStack,
        installation,
        usage,
        projectStructure,
        futureScope,
        author,
        githubLink,
        license,
        selectedSections,
        repoLink,
        demoLink,
        screenshotLink
    );
    }

    document.getElementById("readmePreview").value = readme;
    updateRenderedPreview();
    saveDraft();
}

function generateBasicTemplate(projectName, description, features, techStack, installation, usage, author, license, repoLink, demoLink, screenshotLink) {
    let badgeSection = isChecked("includeBadges") ? generateBadges(techStack) + "\n" : "";

    return `# ${projectName}

${description}

${badgeSection}${isChecked("includeLinks") ? generateProjectLinks(repoLink, demoLink) : ""}${isChecked("includeScreenshots") ? generateScreenshotSection(screenshotLink) : ""}## Features

${makeBulletList(features)}

## Tech Stack

${makeBulletList(techStack)}

## Installation

${makeCodeBlock(installation, "bash")}

## Usage

${makeCodeBlock(usage, "bash")}

## Author

${author}

## License

This project is licensed under the ${license} License.
`;
}

function generateProfessionalTemplate(projectName, description, features, techStack, installation, usage, projectStructure, futureScope, author, githubLink, license, selectedSections, repoLink, demoLink, screenshotLink) {
    let badgeSection = isChecked("includeBadges") ? generateBadges(techStack) + "\n" : "";

    let readme = `# ${projectName}

    ${description}

    ${badgeSection}`;

    if (isChecked("includeLinks")) {
        readme += generateProjectLinks(repoLink, demoLink);
    }

    if (isChecked("includeScreenshots")) {
        readme += generateScreenshotSection(screenshotLink);
    }

    if (isChecked("includeToc")) {
        readme += generateTableOfContents(selectedSections);
    }

    if (isChecked("includeFeatures")) {
        readme += `## Features

${makeBulletList(features)}

`;
    }

    if (isChecked("includeTech")) {
        readme += `## Tech Stack

${makeBulletList(techStack)}

`;
    }

    if (isChecked("includeInstallation")) {
        readme += `## Installation

${makeCodeBlock(installation, "bash")}

`;
    }

    if (isChecked("includeUsage")) {
        readme += `## Usage

${makeCodeBlock(usage, "bash")}

`;
    }

    if (isChecked("includeStructure")) {
        readme += `## Project Structure

${makeCodeBlock(projectStructure)}

`;
    }

    if (isChecked("includeFuture")) {
        readme += `## Future Scope

${makeBulletList(futureScope)}

`;
    }

    if (isChecked("includeAuthor")) {
        readme += `## Author

${author}
`;

        if (githubLink) {
            readme += `\nGitHub: ${githubLink}\n`;
        }

        readme += "\n";
    }

    if (isChecked("includeLicense")) {
        readme += `## License

This project is licensed under the ${license} License.

`;
    }

    return readme;
}

function generateCollegeTemplate(projectName, description, features, techStack, installation, usage, projectStructure, futureScope, author, license, repoLink, demoLink, screenshotLink) {
    let badgeSection = isChecked("includeBadges") ? generateBadges(techStack) + "\n" : "";

    return `# ${projectName}

    ${badgeSection}${isChecked("includeLinks") ? generateProjectLinks(repoLink, demoLink) : ""}${isChecked("includeScreenshots") ? generateScreenshotSection(screenshotLink) : ""}## Project Overview

${description}

## Objective

The main objective of this project is to design and develop a functional solution that demonstrates practical implementation of the selected technologies and solves the defined problem efficiently.

## Features

${makeBulletList(features)}

## Technologies Used

${makeBulletList(techStack)}

## System Requirements

- Basic development environment
- Code editor such as VS Code
- Web browser or required runtime environment

## Installation

${makeCodeBlock(installation, "bash")}

## How to Run

${makeCodeBlock(usage, "bash")}

## Project Structure

${makeCodeBlock(projectStructure)}

## Learning Outcomes

- Improved understanding of project development workflow
- Practical implementation of programming concepts
- Experience with debugging, testing and documentation
- Better understanding of GitHub-ready project presentation

## Future Scope

${makeBulletList(futureScope)}

## Developed By

${author}

## License

This project is licensed under the ${license} License.
`;
}

function generateOpenSourceTemplate(projectName, description, features, techStack, installation, usage, projectStructure, futureScope, author, githubLink, license, repoLink, demoLink, screenshotLink) {
    let badgeSection = isChecked("includeBadges") ? generateBadges(techStack) + "\n" : "";

    return `# ${projectName}

${description}

${badgeSection}${isChecked("includeLinks") ? generateProjectLinks(repoLink, demoLink) : ""}${isChecked("includeScreenshots") ? generateScreenshotSection(screenshotLink) : ""}

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)

## About

${description}

## Features

${makeBulletList(features)}

## Tech Stack

${makeBulletList(techStack)}

## Getting Started

Follow these steps to set up the project locally.

### Installation

${makeCodeBlock(installation, "bash")}

## Usage

${makeCodeBlock(usage, "bash")}

## Project Structure

${makeCodeBlock(projectStructure)}

## Roadmap

${makeBulletList(futureScope)}

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## Author

${author}
${githubLink ? `\nGitHub: ${githubLink}` : ""}

## License

This project is licensed under the ${license} License.
`;
}

function generateAIMLTemplate(projectName, description, features, techStack, installation, usage, projectStructure, futureScope, author, githubLink, license, repoLink, demoLink, screenshotLink) {
    let badgeSection = isChecked("includeBadges") ? generateBadges(techStack) + "\n" : "";

    return `# ${projectName}

    ${badgeSection}${isChecked("includeLinks") ? generateProjectLinks(repoLink, demoLink) : ""}${isChecked("includeScreenshots") ? generateScreenshotSection(screenshotLink) : ""}## Overview

${description}

## Problem Statement

This project focuses on solving a real-world problem using artificial intelligence and machine learning techniques.

## Features

${makeBulletList(features)}

## Tech Stack

${makeBulletList(techStack)}

## Dataset

Add details about the dataset used in this project.

## Model / Approach

Explain the model, algorithm, or AI approach used in this project.

## Installation

${makeCodeBlock(installation, "bash")}

## Usage

${makeCodeBlock(usage, "bash")}

## Project Structure

${makeCodeBlock(projectStructure)}

## Results

Add screenshots, accuracy, performance metrics, graphs, or output examples here.

## Future Scope

${makeBulletList(futureScope)}

## Author

${author}
${githubLink ? `\nGitHub: ${githubLink}` : ""}

## License

This project is licensed under the ${license} License.
`;
}

function downloadReadme() {
    let readmeContent = document.getElementById("readmePreview").value;

    if (readmeContent.trim() === "") {
        alert("Please generate the README first.");
        return;
    }

    let blob = new Blob([readmeContent], { type: "text/markdown" });

    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "README.md";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}

function copyReadme() {
    let readmeContent = document.getElementById("readmePreview").value;

    if (readmeContent.trim() === "") {
        alert("Please generate the README first.");
        return;
    }

    navigator.clipboard.writeText(readmeContent)
        .then(() => {
            alert("README copied to clipboard.");
        })
        .catch(() => {
            alert("Could not copy README.");
        });
}

function suggestSections() {
    let projectType = getValue("projectType");
    let suggestionBox = document.getElementById("assistantSuggestion");

    let suggestions = {
        web: {
            message: "For a Web App, I suggest including Features, Tech Stack, Installation, Usage, Project Structure, Screenshots, Deployment, Author, and License.",
            sections: ["includeBadges", "includeLinks", "includeScreenshots", " includeFeatures", "includeTech", "includeInstallation", "includeUsage", "includeStructure", "includeFuture", "includeAuthor", "includeLicense"]
        },
        python: {
            message: "For a Python Project, I suggest including Features, Tech Stack, Installation, Usage, Project Structure, Example Output, Author, and License.",
            sections: ["includeBadges", "includeLinks", "includeScreenshots", " includeFeatures", "includeTech", "includeInstallation", "includeUsage", "includeStructure", "includeAuthor", "includeLicense"]
        },
        ai: {
            message: "For an AI/ML Project, I suggest including Overview, Dataset, Model Details, Features, Tech Stack, Installation, Usage, Results, Future Scope, Author, and License.",
            sections: ["includeBadges", "includeLinks", "includeScreenshots", " includeFeatures", "includeTech", "includeInstallation", "includeUsage", "includeStructure", "includeFuture", "includeAuthor", "includeLicense"]
        },
        mobile: {
            message: "For a Mobile App, I suggest including Features, Tech Stack, Installation, Usage, Screenshots, APK/Build Instructions, Future Scope, Author, and License.",
            sections: ["includeBadges", "includeLinks", "includeScreenshots", " includeFeatures", "includeTech", "includeInstallation", "includeUsage", "includeFuture", "includeAuthor", "includeLicense"]
        },
        api: {
            message: "For a Backend/API Project, I suggest including Features, Tech Stack, Installation, Usage, API Endpoints, Environment Variables, Project Structure, Author, and License.",
            sections: ["includeBadges", "includeLinks", "includeScreenshots", " includeFeatures", "includeTech", "includeInstallation", "includeUsage", "includeStructure", "includeAuthor", "includeLicense"]
        },
        college: {
            message: "For a College Mini Project, I suggest including Description, Objectives, Features, Tech Stack, Installation, Usage, Future Scope, Author, and License.",
            sections: ["includeBadges", "includeLinks", "includeScreenshots", " includeFeatures", "includeTech", "includeInstallation", "includeUsage", "includeFuture", "includeAuthor", "includeLicense"]
        }
    };

    if (!projectType) {
        suggestionBox.textContent = "Select a project type and I will suggest the best README sections.";
        return;
    }

    suggestionBox.textContent = suggestions[projectType].message;

    let allSections = [
        "includeBadges",
        "includeLinks",
        "includeScreenshots",
        "includeFeatures",
        "includeTech",
        "includeInstallation",
        "includeUsage",
        "includeStructure",
        "includeFuture",
        "includeAuthor",
        "includeLicense"
    ];
    allSections.forEach(section => {
        document.getElementById(section).checked = false;
    });

    suggestions[projectType].sections.forEach(section => {
        document.getElementById(section).checked = true;
    });

    document.getElementById("includeToc").checked = true;
}

let chatbotQuestions = [
    {
        question: "What is your project name?",
        fieldId: "projectName"
    },
    {
        question: "Write a short description of your project.",
        fieldId: "projectDescription"
    },
    {
        question: "List your project features. You can separate them using commas.",
        fieldId: "features",
        format: "list"
    },
    {
        question: "What technologies did you use? Example: HTML, CSS, JavaScript",
        fieldId: "techStack",
        format: "list"
    },
    {
        question: "What is the installation command or setup step?",
        fieldId: "installation"
    },
    {
        question: "How can someone run or use your project?",
        fieldId: "usage"
    },
    {
        question: "Write your project folder structure. You can separate folders using commas.",
        fieldId: "projectStructure",
        format: "list"
    },
    {
        question: "Write future improvements for this project. Separate them using commas.",
        fieldId: "futureScope",
        format: "list"
    },
    {
        question: "What is your name as the author?",
        fieldId: "author"
    },
    {
        question: "Paste your GitHub profile link.",
        fieldId: "githubLink"
    },
    {
        question: "Paste your repository link. If you do not have one, type NA.",
        fieldId: "repoLink"
    },
    {
        question: "Paste your live demo link. If you do not have one, type NA.",
        fieldId: "demoLink"
    },
    {
        question: "Paste your screenshot image path or link. If you do not have one, type NA.",
        fieldId: "screenshotLink"
    }
];

let currentQuestionIndex = 0;
let chatbotStarted = false;

function addBotMessage(message) {
    let chatbotBox = document.getElementById("chatbotBox");

    let messageDiv = document.createElement("div");
    messageDiv.className = "bot-message";
    messageDiv.textContent = message;

    chatbotBox.appendChild(messageDiv);
    chatbotBox.scrollTop = chatbotBox.scrollHeight;
}

function addUserMessage(message) {
    let chatbotBox = document.getElementById("chatbotBox");

    let messageDiv = document.createElement("div");
    messageDiv.className = "user-message";
    messageDiv.textContent = message;

    chatbotBox.appendChild(messageDiv);
    chatbotBox.scrollTop = chatbotBox.scrollHeight;
}

function formatChatAnswer(answer, format) {
    if (format === "list") {
        return answer
            .split(",")
            .map(item => item.trim())
            .filter(item => item !== "")
            .join("\n");
    }

    return answer;
}

function askNextQuestion() {
    if (currentQuestionIndex < chatbotQuestions.length) {
        addBotMessage(chatbotQuestions[currentQuestionIndex].question);
    } else {
        addBotMessage("Perfect! I have filled your project details. Now I am generating your README preview.");

        generateReadme();

        addBotMessage("Done! Check the README Preview section. You can copy it or download the README.md file.");
    }
}

function handleChatInput() {
    let chatInput = document.getElementById("chatInput");
    let userAnswer = chatInput.value.trim();

    if (userAnswer === "") {
        alert("Please type an answer first.");
        return;
    }

    addUserMessage(userAnswer);

    if (!chatbotStarted) {
        chatbotStarted = true;
    }

    if (currentQuestionIndex < chatbotQuestions.length) {
        let currentQuestion = chatbotQuestions[currentQuestionIndex];

        let formattedAnswer = formatChatAnswer(userAnswer, currentQuestion.format);

        if (formattedAnswer.toLowerCase() === "na" || formattedAnswer.toLowerCase() === "n/a") {
            formattedAnswer = "";
        }

        document.getElementById(currentQuestion.fieldId).value = formattedAnswer;

        currentQuestionIndex++;

        setTimeout(() => {
            askNextQuestion();
        }, 500);
    }

    chatInput.value = "";
}

function resetChatbot() {
    currentQuestionIndex = 0;
    chatbotStarted = false;

    document.getElementById("chatbotBox").innerHTML = `
        <div class="bot-message">
            Hey! I am RepoReady Assistant. Let’s create your README step by step.
        </div>
    `;

    setTimeout(() => {
        askNextQuestion();
    }, 500);
}

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        askNextQuestion();
    }, 700);

    document.getElementById("chatInput").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            handleChatInput();
        }
    });
});

function updateRenderedPreview() {
    let markdownContent = document.getElementById("readmePreview").value;
    let renderedPreview = document.getElementById("renderedPreview");

    if (markdownContent.trim() === "") {
        renderedPreview.innerHTML = "<p>Your rendered README preview will appear here.</p>";
        return;
    }

    renderedPreview.innerHTML = marked.parse(markdownContent);
}

function showRawPreview() {
    document.getElementById("readmePreview").classList.remove("hidden");
    document.getElementById("renderedPreview").classList.add("hidden");

    document.getElementById("rawTab").classList.add("active-tab");
    document.getElementById("renderedTab").classList.remove("active-tab");
}

function showRenderedPreview() {
    updateRenderedPreview();

    document.getElementById("readmePreview").classList.add("hidden");
    document.getElementById("renderedPreview").classList.remove("hidden");

    document.getElementById("renderedTab").classList.add("active-tab");
    document.getElementById("rawTab").classList.remove("active-tab");
}

const draftInputIds = [
    "readmeTemplate",
    "projectType",
    "projectName",
    "projectDescription",
    "features",
    "techStack",
    "installation",
    "usage",
    "projectStructure",
    "futureScope",
    "author",
    "githubLink",
    "repoLink",
    "demoLink",
    "screenshotLink",
    "license"
];

const draftCheckboxIds = [
    "includeToc",
    "includeBadges",
    "includeLinks",
    "includeScreenshots",
    "includeFeatures",
    "includeTech",
    "includeInstallation",
    "includeUsage",
    "includeStructure",
    "includeFuture",
    "includeAuthor",
    "includeLicense"
];

function saveDraft() {
    let draftData = {};

    draftInputIds.forEach(id => {
        let element = document.getElementById(id);

        if (element) {
            draftData[id] = element.value;
        }
    });

    draftCheckboxIds.forEach(id => {
        let element = document.getElementById(id);

        if (element) {
            draftData[id] = element.checked;
        }
    });

    localStorage.setItem("repoReadyDraft", JSON.stringify(draftData));
}

function loadDraft() {
    let savedDraft = localStorage.getItem("repoReadyDraft");

    if (!savedDraft) {
        return;
    }

    let draftData = JSON.parse(savedDraft);

    draftInputIds.forEach(id => {
        let element = document.getElementById(id);

        if (element && draftData[id] !== undefined) {
            element.value = draftData[id];
        }
    });

    draftCheckboxIds.forEach(id => {
        let element = document.getElementById(id);

        if (element && draftData[id] !== undefined) {
            element.checked = draftData[id];
        }
    });

    generateReadme();
}

function clearSavedDraft() {
    let confirmClear = confirm("Are you sure you want to clear the saved draft?");

    if (!confirmClear) {
        return;
    }

    localStorage.removeItem("repoReadyDraft");

    draftInputIds.forEach(id => {
        let element = document.getElementById(id);

        if (element) {
            if (element.tagName === "SELECT") {
                element.selectedIndex = 0;
            } else {
                element.value = "";
            }
        }
    });

    draftCheckboxIds.forEach(id => {
        let element = document.getElementById(id);

        if (element) {
            element.checked = true;
        }
    });

    document.getElementById("readmePreview").value = "";
    document.getElementById("renderedPreview").innerHTML = "<p>Your rendered README preview will appear here.</p>";

    alert("Saved draft cleared.");
}

function enableAutoSave() {
    draftInputIds.forEach(id => {
        let element = document.getElementById(id);

        if (element) {
            element.addEventListener("input", saveDraft);
            element.addEventListener("change", saveDraft);
        }
    });

    draftCheckboxIds.forEach(id => {
        let element = document.getElementById(id);

        if (element) {
            element.addEventListener("change", saveDraft);
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    loadDraft();
    enableAutoSave();
});

async function generateAIReadme() {
    const aiButton = document.querySelector(".ai-btn");
    const oldText = aiButton.textContent;

    aiButton.textContent = "Generating...";
    aiButton.disabled = true;

    const projectData = {
        readmeTemplate: getValue("readmeTemplate"),
        projectType: getValue("projectType"),
        projectName: getValue("projectName"),
        projectDescription: getValue("projectDescription"),
        features: getValue("features"),
        techStack: getValue("techStack"),
        installation: getValue("installation"),
        usage: getValue("usage"),
        projectStructure: getValue("projectStructure"),
        futureScope: getValue("futureScope"),
        author: getValue("author"),
        githubLink: getValue("githubLink"),
        repoLink: getValue("repoLink"),
        demoLink: getValue("demoLink"),
        screenshotLink: getValue("screenshotLink"),
        license: getValue("license")
    };

    try {
        const response = await fetch("/api/generate-readme", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projectData)
        });

        const data = await response.json();

        if (!data.success) {
            alert(data.message || "AI README generation failed.");
            return;
        }

        document.getElementById("readmePreview").value = data.readme;

        if (typeof updateRenderedPreview === "function") {
            updateRenderedPreview();
        }

        if (typeof showRenderedPreview === "function") {
            showRenderedPreview();
        }

    } catch (error) {
        console.error(error);
        alert("Something went wrong while connecting to AI backend.");
    } finally {
        aiButton.textContent = oldText;
        aiButton.disabled = false;
    }
}