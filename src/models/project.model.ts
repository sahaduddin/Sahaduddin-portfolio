export interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  videoUrl?: string;
  details: ProjectDetails;
}

export interface ProjectDetails {
  longDescription: string;
  features: string[];
  technologies: string[];
}