export const API_CONFIG = {
  unsplash: {
    accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
    baseURL: "https://api.unsplash.com",
  },
  openWeather: {
    apiKey: import.meta.env.VITE_OPENWEATHER_API_KEY,
    baseURL: "https://api.openweathermap.org/data/2.5",
  },
  openTripMap: {
    apiKey: import.meta.env.VITE_OPENTRIPMAP_API_KEY,
    baseURL: "https://api.opentripmap.com/0.1/en",
  },
  restCountries: {
    baseURL: "https://restcountries.com/v3.1",
  },
};

export const MOCK_LOCATIONS = [
  {
    id: "1",
    name: "Paris, France",
    country: "France",
    description:
      "The city of lights and love, known for its art, fashion, and culture. Home to the Eiffel Tower, Louvre Museum, and charming cafes along the Seine River.",
    latitude: 48.8566,
    longitude: 2.3522,
    rating: 4.7,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFyaXMlMjBmcmFuY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
  },
  {
    id: "2",
    name: "Tokyo, Japan",
    country: "Japan",
    description:
      "A vibrant blend of traditional culture and cutting-edge technology. Experience ancient temples alongside neon-lit streets and world-class cuisine.",
    latitude: 35.6762,
    longitude: 139.6503,
    rating: 4.8,
    imageUrl:
      "https://images.unsplash.com/photo-1556639118-e7d828188ff9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRva3lvJTIwamFwYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
  },
  {
    id: "3",
    name: "New York, USA",
    country: "United States",
    description:
      "The city that never sleeps, famous for its skyline and cultural diversity. Visit Times Square, Central Park, and the Statue of Liberty.",
    latitude: 40.7128,
    longitude: -74.006,
    rating: 4.6,
    imageUrl:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "4",
    name: "Santorini, Greece",
    country: "Greece",
    description:
      "Stunning island with white buildings and breathtaking sunsets. Famous for its volcanic beaches and crystal-clear waters.",
    latitude: 36.3932,
    longitude: 25.4615,
    rating: 4.9,
    imageUrl:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "5",
    name: "Bali, Indonesia",
    country: "Indonesia",
    description:
      "Tropical paradise known for its lush landscapes and spiritual culture. Discover ancient temples, rice terraces, and pristine beaches.",
    latitude: -8.4095,
    longitude: 115.1889,
    rating: 4.8,
    imageUrl:
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "6",
    name: "Swiss Alps, Switzerland",
    country: "Switzerland",
    description:
      "Majestic mountains and pristine landscapes for outdoor adventures. Perfect for skiing, hiking, and enjoying alpine scenery.",
    latitude: 46.8182,
    longitude: 8.2275,
    rating: 4.9,
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "7",
    name: "Rome, Italy",
    country: "Italy",
    description:
      "The Eternal City with ancient history at every corner. Explore the Colosseum, Roman Forum, and Vatican City.",
    latitude: 41.9028,
    longitude: 12.4964,
    rating: 4.7,
    imageUrl:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "8",
    name: "Kyoto, Japan",
    country: "Japan",
    description:
      "Cultural heart of Japan with thousands of temples and gardens. Experience traditional tea ceremonies and geisha culture.",
    latitude: 35.0116,
    longitude: 135.7681,
    rating: 4.8,
    imageUrl:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "9",
    name: "Barcelona, Spain",
    country: "Spain",
    description:
      "Vibrant city with unique Gaudí architecture and beautiful beaches. Visit Sagrada Familia and Park Güell.",
    latitude: 41.3851,
    longitude: 2.1734,
    rating: 4.6,
    imageUrl:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "10",
    name: "Sydney, Australia",
    country: "Australia",
    description:
      "Iconic harbor city with the Opera House and Harbour Bridge. Enjoy beautiful beaches and coastal walks.",
    latitude: -33.8688,
    longitude: 151.2093,
    rating: 4.7,
    imageUrl:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "11",
    name: "Machu Picchu, Peru",
    country: "Peru",
    description:
      "Ancient Incan citadel nestled in the Andes mountains. One of the most spectacular archaeological sites in the world.",
    latitude: -13.1631,
    longitude: -72.545,
    rating: 4.9,
    imageUrl:
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "12",
    name: "Dubai, UAE",
    country: "United Arab Emirates",
    description:
      "Modern metropolis with stunning architecture and luxury shopping. Home to the Burj Khalifa and Palm Jumeirah.",
    latitude: 25.2048,
    longitude: 55.2708,
    rating: 4.5,
    imageUrl:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&auto=format&fit=crop&q=80",
  },
];

// Unsplash configuration
export const UNSPLASH_CONFIG = {
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
  baseURL: "https://api.unsplash.com",
  defaultParams: {
    per_page: 6,
    orientation: "landscape",
  },
};
