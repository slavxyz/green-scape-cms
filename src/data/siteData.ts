export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
}

export interface AboutData {
  story: string;
  mission: string;
  experience: string;
  teamMembers: { name: string; role: string; image: string }[];
}

export interface SiteData {
  services: Service[];
  projects: Project[];
  blogPosts: BlogPost[];
  about: AboutData;
  heroImages: string[];
  companyName: string;
  phone: string;
}

export const defaultSiteData: SiteData = {
  companyName: "GreenScape Pro",
  phone: "+1 (555) 123-4567",
  heroImages: [
    "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=1400&h=600&fit=crop",
  ],
  services: [
    {
      id: "1",
      title: "One-Time Mowing",
      description: "Professional mowing of low and high vegetation for residential and commercial properties. We handle overgrown lots, fields, and hard-to-reach areas.",
      icon: "scissors",
    },
    {
      id: "2",
      title: "Yard Maintenance Plans",
      description: "Subscription-based regular yard maintenance including mowing, edging, trimming, and seasonal cleanup to keep your property pristine year-round.",
      icon: "calendar",
    },
    {
      id: "3",
      title: "Planting Services",
      description: "Expert planting of flowers, trees, and shrubs. We help design and install beautiful garden beds, borders, and landscape features.",
      icon: "flower",
    },
    {
      id: "4",
      title: "Seeding & Turf",
      description: "Grass seeding, ryegrass installation, and premium turf laying for lush, green lawns. Includes soil preparation and aftercare guidance.",
      icon: "sprout",
    },
    {
      id: "5",
      title: "Irrigation Systems",
      description: "Design, installation, and maintenance of efficient irrigation systems. From simple sprinkler setups to automated drip irrigation networks.",
      icon: "droplets",
    },
  ],
  projects: [
    {
      id: "1",
      title: "Riverside Garden Transformation",
      description: "Complete backyard makeover featuring native plants, a stone pathway, and a custom irrigation system for a riverside property.",
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=500&fit=crop",
      date: "2024-12-15",
    },
    {
      id: "2",
      title: "Commercial Office Landscaping",
      description: "Modern landscaping design for a corporate office park, including drought-resistant plants and an automated sprinkler system.",
      image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&h=500&fit=crop",
      date: "2024-11-20",
    },
    {
      id: "3",
      title: "Residential Turf Installation",
      description: "Full lawn renovation with premium turf, complete soil preparation, and a new irrigation network for a family home.",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=500&fit=crop",
      date: "2024-10-05",
    },
    {
      id: "4",
      title: "Community Park Revitalization",
      description: "Revitalized a local community park with new flower beds, tree planting, and pathway improvements.",
      image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=800&h=500&fit=crop",
      date: "2024-08-18",
    },
  ],
  blogPosts: [
    {
      id: "1",
      title: "5 Tips for a Lush Green Lawn This Spring",
      excerpt: "Spring is the perfect time to revitalize your lawn. Here are our top tips for achieving that perfect green carpet.",
      content: "Spring is the perfect time to revitalize your lawn. Here are our top tips for achieving that perfect green carpet.\n\n## 1. Start with Soil Testing\nBefore you do anything, test your soil pH. Most grasses thrive in slightly acidic soil (pH 6.0-7.0).\n\n## 2. Aerate Your Lawn\nCompacted soil prevents water and nutrients from reaching grass roots. Rent an aerator or hire a professional.\n\n## 3. Overseed Thin Areas\nFill in bare patches by overseeding with a grass variety that matches your existing lawn.\n\n## 4. Fertilize Wisely\nApply a slow-release fertilizer in early spring. Avoid over-fertilizing, which can burn your grass.\n\n## 5. Water Deeply, Not Frequently\nDeep watering encourages deep root growth. Aim for 1 inch of water per week, including rainfall.",
      image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&h=400&fit=crop",
      date: "2025-03-10",
      author: "GreenScape Team",
    },
    {
      id: "2",
      title: "Choosing the Right Irrigation System",
      excerpt: "Not all irrigation systems are created equal. Learn which type is best for your property and budget.",
      content: "Not all irrigation systems are created equal. Learn which type is best for your property and budget.\n\n## Sprinkler Systems\nIdeal for large, open lawns. Available in pop-up and rotary styles.\n\n## Drip Irrigation\nPerfect for garden beds, trees, and shrubs. Delivers water directly to roots, reducing waste.\n\n## Smart Controllers\nModern systems with weather-based adjustments can save up to 50% on water usage.\n\n## Maintenance Tips\nRegular inspection and winterization are key to system longevity.",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=400&fit=crop",
      date: "2025-02-22",
      author: "GreenScape Team",
    },
    {
      id: "3",
      title: "Best Trees for Your Backyard",
      excerpt: "Discover the best shade and ornamental trees that thrive in various climates and add value to your property.",
      content: "Discover the best shade and ornamental trees that thrive in various climates and add value to your property.\n\n## Shade Trees\n- **Oak**: Long-lived, majestic shade provider\n- **Maple**: Beautiful fall colors and great shade\n- **Elm**: Fast-growing with a classic silhouette\n\n## Ornamental Trees\n- **Japanese Maple**: Stunning foliage colors\n- **Dogwood**: Beautiful spring blooms\n- **Crape Myrtle**: Extended summer flowering\n\n## Planting Tips\nAlways consider mature size, root spread, and proximity to structures when planting trees.",
      image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=800&h=400&fit=crop",
      date: "2025-01-15",
      author: "GreenScape Team",
    },
  ],
  about: {
    story: "GreenScape Pro was founded in 2015 with a simple mission: to transform outdoor spaces into beautiful, functional landscapes. What started as a small mowing service has grown into a full-service landscaping company serving residential and commercial clients across the region.",
    mission: "We believe every property deserves a beautiful outdoor space. Our team combines horticultural expertise with creative design to deliver landscapes that enhance property value and bring joy to our clients.",
    experience: "With over 9 years of experience and hundreds of completed projects, our team brings deep knowledge of local plant species, soil conditions, and climate considerations to every job.",
    teamMembers: [
      { name: "Alex Johnson", role: "Founder & Lead Designer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" },
      { name: "Maria Garcia", role: "Horticulturist", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face" },
      { name: "James Wilson", role: "Irrigation Specialist", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face" },
    ],
  },
};

const STORAGE_KEY = "greenscape-site-data";

export function loadSiteData(): SiteData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultSiteData, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error("Failed to load site data:", e);
  }
  return defaultSiteData;
}

export function saveSiteData(data: SiteData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save site data:", e);
  }
}
