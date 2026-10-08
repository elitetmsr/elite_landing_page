import type { LucideIcon } from "lucide-react";
import { Building2, BrainCircuit, ChartColumn, CodeXml, Globe, PenTool, Smartphone } from "lucide-react";

/** Keys map to `home.services.items.<key>` in messages. Services from elitemsr.com/our-services. */
export type ServiceKey =
  | "customSoftware"
  | "webPlatforms"
  | "mobileApps"
  | "erpSystems"
  | "aiAutomation"
  | "uiux"
  | "dataBi";

export interface ServiceItem {
  key: ServiceKey;
  icon: LucideIcon;
}

export const HOME_SERVICES: ServiceItem[] = [
  { key: "customSoftware", icon: CodeXml },
  { key: "webPlatforms", icon: Globe },
  { key: "mobileApps", icon: Smartphone },
  { key: "erpSystems", icon: Building2 },
  { key: "aiAutomation", icon: BrainCircuit },
  { key: "uiux", icon: PenTool },
  { key: "dataBi", icon: ChartColumn },
];

/** Keys map to `home.ideas.items.<key>`. Ideas published on community.elitemsr.com/ideas. */
export type IdeaKey = "qrExchange" | "ventureStudio" | "voiceAgent";

export interface IdeaItem {
  key: IdeaKey;
  techStack: string[];
}

export const HOME_IDEAS: IdeaItem[] = [
  { key: "qrExchange", techStack: ["Python", "Django", "REST APIs", "Redis", "AWS"] },
  { key: "ventureStudio", techStack: ["React", "Node.js", "Next.js", "PostgreSQL", "Docker"] },
  { key: "voiceAgent", techStack: ["Python", "OpenAI API", "Twilio", "FastAPI"] },
];
