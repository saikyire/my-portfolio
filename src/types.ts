export interface Project {
  id: string;
  title: string;
  subtitle: string;
  techStack: string[];
  problem: string;
  solution: string;
  architecture: string;
  features: string[];
  githubUrl: string;
  demoUrl: string;
  caseStudy: string;
  lessonsLearned: string;
  futureScope: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  details: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}
