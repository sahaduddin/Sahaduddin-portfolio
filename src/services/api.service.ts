import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import type { Project } from '../models/project.model';
import type { Skill } from '../models/skill.model';

const PROJECTS_DATA: Project[] = [
    {
      "title": "AverIQA Solution",
      "category": "Corporate Website",
      "description": "Contributed to UI/UX enhancements and logo design for the official corporate website of an IT solutions provider, built with React.",
      "tags": ["React", "UI/UX Design", "Logo Design", "ERP"],
      "imageUrl": "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=800&h=600&auto=format&fit=crop",
      "liveUrl": "https://averiqa.com",
      "videoUrl": "#",
      "details": {
        "longDescription": "AverIQA Solution's philosophy is \"Confident Intelligence for Advancement.\" My role was to translate this mission into a compelling visual identity. I contributed to the UI enhancement efforts using React to create a modern, intuitive user experience for their corporate website. I also assisted in designing their new logo, embodying their promise of smart, reliable, and trustworthy IT solutions that propel businesses forward.",
        "features": [
          "UI/UX Overhaul Contribution",
          "Modern Logo and Brand Identity Design",
          "Interactive and Responsive Interface built with React",
          "Clear Showcase of Agile ERP System Solutions",
          "Enhanced User Engagement through Intuitive Navigation"
        ],
        "technologies": [
          "React",
          "UI/UX Design Principles",
          "Figma",
          "Brand Strategy",
          "CSS-in-JS"
        ]
      }
    },
    {
      "title": "MSAT ISO Compliance Simplified",
      "category": "Enterprise Software",
      "description": "Enhanced the UI/UX of an enterprise compliance platform by developing dynamic components for module setup processes.",
      "tags": ["Angular", "UI/UX", "Dynamic Components", "Enterprise"],
      "imageUrl": "https://picsum.photos/seed/project9/400/300",
      "liveUrl": "https://msat.tofrum.com/",
      "videoUrl": "#",
      "details": {
        "longDescription": "As a Development Engineer, I focused on enhancing the user experience of the MSAT ISO compliance platform. My primary role involved UI/UX development and implementing dynamic components to streamline and simplify the setup process for existing modules, making the system more intuitive for users.",
        "features": [
          "Dynamic Component Implementation for Setup Processes",
          "UI/UX Enhancement for Existing Modules",
          "Improved User Workflow and Intuitiveness",
          "Responsive Interface Refinements",
          "Collaboration on a Large-Scale Enterprise Application"
        ],
        "technologies": [
          "Angular",
          "TypeScript",
          "RxJS",
          "SCSS",
          "UI/UX Principles"
        ]
      }
    },
    {
      "title": "Awadh Driving School",
      "category": "Business Website",
      "description": "A comprehensive, multilingual website for a driving school, featuring course details, online booking, and student resources.",
      "tags": ["HTML5", "CSS3", "JavaScript", "Multilingual"],
      "imageUrl": "https://picsum.photos/seed/project7/400/300",
      "liveUrl": "#",
      "videoUrl": "#",
      "details": {
        "longDescription": "Awadh Driving School is a fully responsive, multilingual website designed to attract and manage students. It provides detailed information on driving courses, allows for easy online registration and booking, and supports multiple languages to cater to a diverse clientele. Built with a focus on clean code and user experience using vanilla HTML, CSS, and JavaScript.",
        "features": [
          "Bilingual/Multilingual Support",
          "Online Course Booking System",
          "Detailed Service & Pricing Pages",
          "Student Testimonial Section",
          "Contact Form with Validation",
          "Fully Responsive for all devices"
        ],
        "technologies": [
          "HTML5",
          "CSS3 (Flexbox/Grid)",
          "JavaScript (ES6+)",
          "i18n (Internationalization)",
          "SEO Best Practices"
        ]
      }
    },
    {
      "title": "TaskStream - RxJS Playground",
      "category": "Learning Platform",
      "description": "An interactive RxJS playground to learn reactive programming with live code execution and visual data flows.",
      "tags": ["Angular", "RxJS", "Material UI"],
      "imageUrl": "https://picsum.photos/seed/project5/400/300",
      "liveUrl": "#",
      "videoUrl": "#",
      "details": {
        "longDescription": "TaskStream is an interactive RxJS playground for developers to learn reactive programming through live code execution, real-time examples, and visual data flow. Built with Angular & Material, it offers hands-on exercises, operator references, and guided paths from beginner to advanced.",
        "features": [
          "Live RxJS Code Editor",
          "Real-time Output Visualization",
          "Interactive Marble Diagrams",
          "Comprehensive Operator Library",
          "Guided Learning Paths"
        ],
        "technologies": [
          "Angular 17",
          "RxJS",
          "Angular Material",
          "TypeScript",
          "Monaco Editor"
        ]
      }
    },
    {
      "title": "Dynamic Dashboard",
      "category": "Data Analytics",
      "description": "Resizable widget-based dashboard with real-time data visualization using AG-Grid and AmCharts.",
      "tags": ["Angular", "AG-Grid", "Charts"],
      "imageUrl": "https://picsum.photos/seed/project4/400/300",
      "liveUrl": "#",
      "videoUrl": "#",
      "details": {
        "longDescription": "A highly customizable and interactive dashboard for data analytics. It features a widget-based layout where users can add, remove, resize, and rearrange components to fit their needs. The dashboard integrates with AG-Grid for powerful data tables and AmCharts for a wide range of data visualizations, all updating in real-time.",
        "features": ["Drag-and-drop widget positioning", "Resizable dashboard components", "AG-Grid tables with advanced filtering", "AmCharts data visualization", "Real-time data updates", "Export to PDF/Excel"],
        "technologies": ["Angular 14", "AG-Grid", "AmCharts", "RxJS", "Material UI"]
      }
    },
    {
      "title": "Patient Care Guide",
      "category": "Healthcare Web App",
      "description": "Bilingual health guidance app for patients via QR code scan, offering precautions, diet, and activities.",
      "tags": ["Angular", "Bilingual", "Healthcare", "QR Code"],
      "imageUrl": "https://picsum.photos/seed/project6/400/300",
      "liveUrl": "#",
      "videoUrl": "#",
      "details": {
        "longDescription": "A bilingual (English + Hindi) health guidance web app where patients can scan a QR code to access disease-wise precautions, suggested foods, and recommended activities. Designed to be accessible and easy to use for a wide range of patients.",
        "features": ["Bilingual Support (English & Hindi)", "QR Code Based Access", "Disease-specific Guidance", "Dietary Recommendations", "Activity Suggestions", "Responsive Design for Mobile"],
        "technologies": ["Angular", "TypeScript", "PWA", "i18n"]
      }
    }
];

const SKILLS_DATA: Skill[] = [
  {
    name: "Angular",
    description: "Expert in Angular 14+ with RxJS, and state management.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" fill="none">
      <path fill="#DD0031" d="M125 0L0 45l23 150 102 55 102-55 23-150L125 0z"/>
      <path fill="#C3002F" d="M125 0v250l102-55 23-150L125 0z"/>
      <path fill="#FFF" d="M125 30l-60 135h30l10-25h40l10 25h30L125 30zm0 40l15 35h-30l15-35z"/>
    </svg>`
  },
  {
    name: "TypeScript",
    description: "Strong proficiency in type-safe development and advanced features.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none">
      <rect width="256" height="256" rx="60" fill="#3178C6"/>
      <path fill="#fff" d="M104 104h48v16h-16v48h-16v-48h-16v-16z"/>
    </svg>`
  },
  {
    name: "JavaScript ES6+",
    description: "Deep understanding of modern JavaScript and best practices.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none">
      <rect width="256" height="256" rx="60" fill="#F7DF1E"/>
      <path fill="#000" d="M104 104h48v16h-16v48h-16v-48h-16v-16z"/>
    </svg>`
  },
  {
    name: "SQL & Databases",
    description: "Experience with MySQL, query optimization, and database design.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3C6.48 3 2 5.69 2 9v6c0 3.31 4.48 6 10 6s10-2.69 10-6V9c0-3.31-4.48-6-10-6z"/>
      <path d="M12 5c4.42 0 8 1.79 8 4s-3.58 4-8 4-8-1.79-8-4 3.58-4 8-4z"/>
    </svg>`
  },
  {
    name: "Data Visualization",
    description: "Proficient with AG-Grid and creating interactive dashboards.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 3h2v18H3V3zm4 8h2v10H7V11zm4-4h2v14h-2V7zm4 6h2v8h-2v-8zm4-2h2v10h-2V11z"/>
    </svg>`
  },
  {
    name: "UI/UX Design",
    description: "Creating responsive, accessible, and user-centric design systems.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 4h16v2H4V4zm0 4h10v2H4V8zm0 4h16v2H4v-2zm0 4h10v2H4v-2z"/>
    </svg>`
  }
];


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  getProjects(): Observable<Project[]> {
    return of(PROJECTS_DATA);
  }

  getSkills(): Observable<Skill[]> {
    return of(SKILLS_DATA);
  }
}