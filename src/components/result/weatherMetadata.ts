/**
 * Weather Type Metadata
 * Contains mapping of weather types to their display metadata, default values, and colors
 */

export interface WeatherTypeMetadata {
  name: string;
  subtitle: string;
  colorScheme: string;
  defaultDevelopmentAreas: string[];
  defaultCareers: string[];
  imageSrc: string;
}

export const WEATHER_METADATA: Record<string, WeatherTypeMetadata> = {
  sunny: {
    name: "Sunny",
    subtitle: "Si Optimis yang Ceria",
    colorScheme: "orange",
    defaultDevelopmentAreas: ["Fokus", "Konsistensi", "Detail"],
    defaultCareers: ["Marketing", "Sales", "Entertainment", "Public Relations"],
    imageSrc: "/weather/sunny.png"
  },
  rainy: {
    name: "Rainy",
    subtitle: "Si Pemikir yang Detail",
    colorScheme: "blue",
    defaultDevelopmentAreas: ["Overthinking", "Perfeksionis", "Sensitif"],
    defaultCareers: ["Research", "Accounting", "Engineering", "Writing"],
    imageSrc: "/weather/rainy.png"
  },
  stormy: {
    name: "Stormy",
    subtitle: "Si Pemimpin yang Tegas",
    colorScheme: "purple",
    defaultDevelopmentAreas: ["Kesabaran", "Empati", "Fleksibilitas"],
    defaultCareers: ["Management", "Entrepreneurship", "Law", "Politics"],
    imageSrc: "/weather/stormy.png"
  },
  cloudy: {
    name: "Cloudy",
    subtitle: "Si Pendamai yang Tenang",
    colorScheme: "gray",
    defaultDevelopmentAreas: ["Inisiatif", "Asertivitas", "Motivasi"],
    defaultCareers: ["Counseling", "HR", "Teaching", "Healthcare"],
    imageSrc: "/weather/cloudy.png"
  }
};

export const TEMPERAMENT_COLORS: Record<string, string> = {
  Sunny: "orange.400",
  Stormy: "red.500",
  Rainy: "blue.500",
  Cloudy: "green.400"
};

/**
 * Get weather metadata by type (case-insensitive)
 */
export function getWeatherMetadata(weatherType: string): WeatherTypeMetadata | undefined {
  return WEATHER_METADATA[weatherType.toLowerCase()];
}

/**
 * Get weather color by name
 */
export function getWeatherColor(weatherName: string): string {
  return TEMPERAMENT_COLORS[weatherName] || "gray.400";
}
