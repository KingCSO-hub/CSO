import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

// Define the shape locally as fallback if backend is not completely up
export interface PermitFallback {
  id: number;
  permitNumber: string;
  company: string;
  issueDate: string;
  expiryDate: string;
  pdfUrl: string;
}

export function usePermit(id: number) {
  return useQuery({
    queryKey: [api.permits.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.permits.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      
      if (res.status === 404) {
        return null;
      }
      
      if (!res.ok) {
        throw new Error('Failed to fetch permit');
      }
      
      return api.permits.get.responses[200].parse(await res.json());
    },
    // We provide initialData here to fulfill the user's requirement of hardcoding 
    // the UI while still building production-ready API wiring.
    initialData: {
      id: 1,
      permitNumber: "1895",
      company: "شلمبرجر",
      issueDate: "2026-02-01",
      expiryDate: "2027-01-27",
      pdfUrl: "#",
    } as any, // Typecast to bypass strict structural match if backend schema changes
  });
}
