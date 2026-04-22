import { MetadataRoute } from "next";
import { getDetailsByPark } from "@/lib/attraction-detail";

export default function sitemap(): MetadataRoute.Sitemap {
  const tdlDetails = getDetailsByPark("tdl");
  const tdsDetails = getDetailsByPark("tds");

  return [
    {
      url: "https://disneynow.tokyo",
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: "https://disneynow.tokyo/faq",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://disneynow.tokyo/attractions/tdl",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://disneynow.tokyo/attractions/tds",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://disneynow.tokyo/dpa",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://disneynow.tokyo/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://disneynow.tokyo/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://disneynow.tokyo/en",
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: "https://disneynow.tokyo/en/attractions/tdl",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://disneynow.tokyo/en/attractions/tds",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://disneynow.tokyo/gw2026",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://disneynow.tokyo/summer2026",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://disneynow.tokyo/halloween2026",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://disneynow.tokyo/christmas2026",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://disneynow.tokyo/privacy",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    ...tdlDetails.map((d) => ({
      url: `https://disneynow.tokyo/attractions/tdl/${d.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...tdsDetails.map((d) => ({
      url: `https://disneynow.tokyo/attractions/tds/${d.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
