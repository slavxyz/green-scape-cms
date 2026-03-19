import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { SiteData, loadSiteData, saveSiteData, Service, Project, BlogPost, AboutData } from "@/data/siteData";

interface SiteDataContextType {
  data: SiteData;
  updateServices: (services: Service[]) => void;
  updateProjects: (projects: Project[]) => void;
  updateBlogPosts: (posts: BlogPost[]) => void;
  updateAbout: (about: AboutData) => void;
  updateHeroImages: (images: string[]) => void;
  updateCompanyInfo: (name: string, phone: string) => void;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(loadSiteData);

  const update = useCallback((partial: Partial<SiteData>) => {
    setData((prev) => {
      const next = { ...prev, ...partial };
      saveSiteData(next);
      return next;
    });
  }, []);

  const value: SiteDataContextType = {
    data,
    updateServices: (services) => update({ services }),
    updateProjects: (projects) => update({ projects }),
    updateBlogPosts: (posts) => update({ blogPosts: posts }),
    updateAbout: (about) => update({ about }),
    updateHeroImages: (images) => update({ heroImages: images }),
    updateCompanyInfo: (companyName, phone) => update({ companyName, phone }),
  };

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSiteData must be used within SiteDataProvider");
  return ctx;
}
