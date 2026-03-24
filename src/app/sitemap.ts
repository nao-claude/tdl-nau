import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://disneynow.tokyo",
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: "https://disneynow.tokyo/privacy",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
