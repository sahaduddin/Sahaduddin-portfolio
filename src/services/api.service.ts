import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import type { Project } from '../models/project.model';
import type { Skill } from '../models/skill.model';

const PROJECTS_DATA: Project[] = [
    {
      "title": "DietCode - QR Generator",
      "category": "Health & Wellness",
      "description": "A smart tool for generating QR codes for personalized diet plans, making nutrition tracking seamless.",
      "tags": ["Angular", "TypeScript", "QR Code"],
      "imageUrl": "https://picsum.photos/seed/project1/400/300",
      "liveUrl": "https://dietcode-qr.web.app/",
      "videoUrl": "#",
      "details": {
        "longDescription": "DietCode QR Generator is a progressive web application designed to help nutritionists and their clients easily manage and share diet plans. It allows for the creation of detailed meal plans which are then encoded into a QR code for quick access on any mobile device.",
        "features": ["Dynamic QR Code Generation", "Customizable Diet Templates", "User Authentication", "PWA for Offline Access", "Print-friendly Output"],
        "technologies": ["Angular 16", "TypeScript", "Firebase", "PWA", "QR Code Scannable SVG"]
      }
    },
    {
      "title": "File Management System",
      "category": "Enterprise Solution",
      "description": "Role-based document repository with secure access control, version management, and user permissions.",
      "tags": ["Angular 17", "Node.js", "MariaDB"],
      "imageUrl": "https://picsum.photos/seed/project2/400/300",
      "liveUrl": "#",
      "videoUrl": "#",
      "details": {
        "longDescription": "An enterprise-grade file management system built to handle secure document storage and retrieval. It features a robust role-based access control system, ensuring that users can only access files and perform actions appropriate to their permission level. The system also includes version history for documents, allowing for easy rollback and auditing.",
        "features": ["Role-based permissions (Admin, Manager, User)", "Secure file upload/download with validation", "Version control and file history tracking", "Advanced search and filtering", "Audit logging for compliance"],
        "technologies": ["Angular 17", "Node.js", "Express", "MariaDB", "JWT Authentication", "Multer"]
      }
    },
    {
      "title": "AI Form Builder",
      "category": "Developer Tool",
      "description": "Dynamic form generation with intelligent field validation and AI-assisted suggestions for optimal UX.",
      "tags": ["Angular", "AI/ML", "Forms"],
      "imageUrl": "https://picsum.photos/seed/project3/400/300",
      "liveUrl": "#",
      "videoUrl": "#",
      "details": {
        "longDescription": "An innovative form builder that leverages AI to simplify the process of creating complex forms. Users can design forms with a drag-and-drop interface, and the system provides intelligent suggestions for field types, validation rules, and layout to optimize user experience and data collection accuracy.",
        "features": ["Drag-and-drop form designer", "AI-powered field type suggestions", "Dynamic validation rules", "Conditional logic and field dependencies", "Multi-step form support", "Export/import form templates"],
        "technologies": ["Angular", "TypeScript", "RxJS", "Angular Forms", "Gemini API"]
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
    }
];

const SKILLS_DATA: Skill[] = [
    {
      "name": "Angular",
      "description": "Expert in Angular 14+ with RxJS, and state management.",
      "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 250 250\"><path fill=\"#DD0031\" d=\"M125 30L31.9 63.2 46.1 165h157.8l14.2-101.8z\"/><path fill=\"#C3002F\" d=\"M125 30v15l89 51-14.2-101.8z\"/><path fill=\"#FFFFFF\" d=\"M125 52.1l65.9 80.5h-29.2l-36.7-45-36.7 45H59.1z\"/></svg>"
    },
    {
      "name": "TypeScript",
      "description": "Strong proficiency in type-safe development and advanced features.",
      "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 128 128\"><path fill=\"#007ACC\" d=\"M0 0h128v128H0z\"/><path fill=\"#FFF\" d=\"M22 22h84v84H22z\"/><path fill=\"#007ACC\" d=\"M101 27H27v74h74V27zm-5 69H32V32h64v64z\"/><path fill=\"#FFF\" d=\"M43.6 43.6h12.3v34.9h11.2V43.6h12.4V36H43.6v7.6zM85.5 59.9c.4 2.1 1.6 3.8 3.5 5.1 1.9 1.3 4.4 2 7.4 2 3.5 0 6-.8 7.3-2.3 1.4-1.5 2.1-3.6 2.1-6.4 0-2.4-.6-4.4-1.9-6-1.3-1.6-3.3-2.4-6-2.4-2.5 0-4.6.6-6.4 1.7-1.8 1.1-3 2.8-3.7 5l-7.9-1.5c.9-3.9 2.8-7.1 5.7-9.5s6.6-3.7 11-3.7c4.6 0 8.4 1.3 11.4 3.9 3 2.6 4.5 6.2 4.5 10.8s-1.5 8.2-4.5 10.8c-3 2.6-6.8 3.9-11.4 3.9-5.9 0-10.4-2-13.3-6.1l-6.8 3.9z\"/></svg>"
    },
    {
      "name": "JavaScript ES6+",
      "description": "Deep understanding of modern JavaScript and best practices.",
      "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 128 128\"><path fill=\"#F7DF1E\" d=\"M0 0h128v128H0z\"/><path d=\"M103.3 93.3c-2.4 4.3-6.3 7.5-12 9.2s-11.3 1.8-16.3-.2c-5-2-9.3-5.5-12.2-10.2s-4.6-10.3-4.6-16.2c0-6.1 1.5-11.5 4.5-16.1s7-8.2 11.9-10.5c5-2.2 10.3-2.6 15.6-1.2 5.3 1.4 9.6 4.4 12.6 8.7l-10.3 6.2c-1.5-2.5-3.5-4.4-6.2-5.5-2.6-1.1-5.5-1.3-8.4-.5-3 .8-5.5 2.4-7.5 4.7s-3 5.2-3 8.6c0 3.6 1.1 6.7 3.4 9.1s5.2 3.9 8.9 4.2c3.7.3 7-1 9.5-3.5 1.5-1.5 2.5-3.4 3-5.8l10.9 1.9zM42.8 110.3V52.2H56v49.6c0 3.3 1 5.8 3 7.4 2 1.6 4.6 2.4 7.9 2.4s6-.8 7.9-2.4c2-1.6 3-4.1 3-7.4V52.2h13.2v58.1H81.3V99.5c-2.3 3.6-5.5 6.3-9.5 7.9s-8.5 2.5-13.4 2.5c-5.5 0-10.2-1.1-14.1-3.2s-6.7-5.3-8.5-9.4z\"/></svg>"
    },
    {
      "name": "SQL & Databases",
      "description": "Experience with MySQL, query optimization, and database design.",
      "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375\" /></svg>"
    },
    {
      "name": "Data Visualization",
      "description": "Proficient with AG-Grid and creating interactive dashboards.",
      "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z\" /></svg>"
    },
    {
      "name": "UI/UX Design",
      "description": "Creating responsive, accessible, and user-centric design systems.",
      "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 21.75l-.648-1.188a2.25 2.25 0 01-1.4-1.4l-1.188-.648 1.188-.648a2.25 2.25 0 011.4-1.4l.648-1.188.648 1.188a2.25 2.25 0 011.4 1.4l1.188.648-1.188.648a2.25 2.25 0 01-1.4 1.4z\" /></svg>"
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
