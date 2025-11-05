// Add at the top of realApis.js
const imageCache = new Map();

// Update the getUnsplashImageForCountry function with caching
async function getUnsplashImageForCountry(countryName) {
  // Check cache first
  const cacheKey = countryName.toLowerCase();
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey);
  }

  // If no Unsplash key, use fallback
  if (
    !API_CONFIG.unsplash.accessKey ||
    API_CONFIG.unsplash.accessKey === "your_unsplash_key_here"
  ) {
    const fallbackImage = getFallbackCountryImage(countryName);
    imageCache.set(cacheKey, fallbackImage);
    return fallbackImage;
  }

  try {
    // Try different search queries to get the best image
    const searchQueries = [
      `${getCityForCountry(countryName)} travel`,
      `${countryName} landscape`,
      `${getCityForCountry(countryName)} city`,
      `${countryName} tourism`,
      `${getCityForCountry(countryName)} landmarks`,
    ];

    // Try each search query until we get a result
    for (const query of searchQueries) {
      try {
        const response = await fetchWithTimeout(
          `${
            API_CONFIG.unsplash.baseURL
          }/search/photos?query=${encodeURIComponent(
            query
          )}&per_page=1&orientation=landscape&client_id=${
            API_CONFIG.unsplash.accessKey
          }`,
          {},
          5000
        );

        if (response.results && response.results.length > 0) {
          const photo = response.results[0];
          const imageUrl = `${photo.urls.regular}&w=500&h=400&fit=crop&crop=entropy&q=80`;

          // Cache the result
          imageCache.set(cacheKey, imageUrl);
          return imageUrl;
        }
      } catch (error) {
        // Continue to next search query
        continue;
      }
    }

    // If all searches fail, use fallback and cache it
    const fallbackImage = getFallbackCountryImage(countryName);
    imageCache.set(cacheKey, fallbackImage);
    return fallbackImage;
  } catch (error) {
    console.warn("Unsplash country image search failed:", error);
    const fallbackImage = getFallbackCountryImage(countryName);
    imageCache.set(cacheKey, fallbackImage);
    return fallbackImage;
  }
}

import { API_CONFIG, MOCK_LOCATIONS } from "../constants";

// Helper function for API calls with error handling
const fetchWithTimeout = async (url, options = {}, timeout = 8000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

// Generate realistic ratings based on country popularity
function generateCountryRating(countryName) {
  const baseRatings = {
    'France': 4.8,
    'Italy': 4.7,
    'Japan': 4.9,
    'United States': 4.6,
    'Spain': 4.7,
    'Thailand': 4.5,
    'Australia': 4.6,
    'Brazil': 4.4,
    'Greece': 4.7,
    'Mexico': 4.5,
    'United Kingdom': 4.6,
    'Germany': 4.5,
    'Portugal': 4.6,
    'Netherlands': 4.5,
    'Switzerland': 4.8,
    'Canada': 4.6,
    'New Zealand': 4.7,
    'Indonesia': 4.4,
    'Vietnam': 4.3,
    'South Korea': 4.6,
    'Turkey': 4.4,
    'Egypt': 4.2,
    'Morocco': 4.3,
    'South Africa': 4.4,
    'Argentina': 4.3,
    'Chile': 4.4,
    'Peru': 4.5,
    'Costa Rica': 4.4,
    'Iceland': 4.7,
    'Norway': 4.6
  };

  // Return base rating with slight variation, or generate random if not in list
  if (baseRatings[countryName]) {
    return baseRatings[countryName] ; // ±0.1 variation
  }
  
  return 4.3 + Math.random() * 0.4; // Random between 4.3-4.7 for unknown countries
}

// Countries API - Get country information with Unsplash images
export const countriesAPI = {
  getAllCountries: async () => {
    try {
      const data = await fetchWithTimeout(
        `${API_CONFIG.restCountries.baseURL}/all?fields=name,capital,latlng,flags,population,currencies,languages`
      );

      // Get popular countries for travel
      const popularCountries = [
        "France",
        "Italy",
        "Japan",
        "United States",
        "Spain",
        "Thailand",
        "Australia",
        "Brazil",
        "Greece",
        "Mexico",
        "United Kingdom",
        "Germany",
        "Portugal",
        "Netherlands",
        "Switzerland",
        "Canada",
        "New Zealand",
        "Indonesia",
        "Vietnam",
        "South Korea",
        "Turkey",
        "Egypt",
        "Morocco",
        "South Africa",
        "Argentina",
        "Chile",
        "Peru",
        "Costa Rica",
        "Iceland",
        "Norway",
      ];

      const popularCountryData = data.filter((country) =>
        popularCountries.includes(country.name.common)
      );

      // Get Unsplash images for all countries
      const countriesWithImages = await Promise.all(
        popularCountryData.map(async (country) => {
          const imageUrl = await getUnsplashImageForCountry(
            country.name.common
          );

          return {
            id: country.name.common,
            name: getCityForCountry(country.name.common),
            country: country.name.common,
            description: generateCountryDescription(country),
            latitude: country.latlng?.[0] || 0,
            longitude: country.latlng?.[1] || 0,
            rating: generateCountryRating(country.name.common),
            imageUrl: imageUrl,
            population: country.population,
            currency: Object.values(country.currencies || {})[0]?.name,
            language: Object.values(country.languages || {})[0],
          };
        })
      );

      return countriesWithImages;
    } catch (error) {
      console.warn("Countries API failed, using fallback data:", error);
      return MOCK_LOCATIONS;
    }
  },

  getCountryByName: async (name) => {
    try {
      const data = await fetchWithTimeout(
        `${API_CONFIG.restCountries.baseURL}/name/${encodeURIComponent(
          name
        )}?fields=name,capital,latlng,flags,population,currencies,languages`
      );

      const country = data[0];
      const imageUrl = await getUnsplashImageForCountry(country.name.common);

      return {
        id: country.name.common,
        name: getCityForCountry(country.name.common),
        country: country.name.common,
        description: generateCountryDescription(country),
        latitude: country.latlng[0],
        longitude: country.latlng[1],
        rating: generateCountryRating(country.name.common),
        imageUrl: imageUrl,
        population: country.population,
        currency: Object.values(country.currencies || {})[0]?.name,
        language: Object.values(country.languages || {})[0],
      };
    } catch (error) {
      console.warn("Country API failed:", error);
      // Try to find in fallback locations
      const fallbackLoc = MOCK_LOCATIONS.find(
        (loc) =>
          loc.country.toLowerCase().includes(name.toLowerCase()) ||
          loc.name.toLowerCase().includes(name.toLowerCase())
      );
      if (fallbackLoc) return fallbackLoc;

      // If not found, try to get an image from Unsplash for this location
      const imageUrl = await getUnsplashImageForCountry(name);

      return {
        id: name,
        name: name,
        country: name,
        description: `Discover the beautiful landscapes and rich culture of ${name}.`,
        latitude: 0,
        longitude: 0,
        rating: generateCountryRating(name),
        imageUrl: imageUrl,
        population: null,
        currency: null,
        language: null,
      };
    }
  },
};

// Get specific cities for countries
function getCityForCountry(countryName) {
  const cityMap = {
    France: "Paris",
    Italy: "Rome",
    Japan: "Tokyo",
    "United States": "New York",
    Spain: "Barcelona",
    Thailand: "Bangkok",
    Australia: "Sydney",
    Brazil: "Rio de Janeiro",
    Greece: "Santorini",
    Mexico: "Cancún",
    "United Kingdom": "London",
    Germany: "Berlin",
    Portugal: "Lisbon",
    Netherlands: "Amsterdam",
    Switzerland: "Swiss Alps",
    Canada: "Vancouver",
    "New Zealand": "Queenstown",
    Indonesia: "Bali",
    Vietnam: "Hanoi",
    "South Korea": "Seoul",
    Turkey: "Istanbul",
    Egypt: "Cairo",
    Morocco: "Marrakech",
    "South Africa": "Cape Town",
    Argentina: "Buenos Aires",
    Chile: "Santiago",
    Peru: "Machu Picchu",
    "Costa Rica": "San José",
    Iceland: "Reykjavik",
    Norway: "Oslo",
  };
  return cityMap[countryName] || countryName;
}

// Curated fallback images for popular destinations
function getFallbackCountryImage(countryName) {
  const countryImages = {
    France:
      "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=500&h=400&fit=crop&q=80",
    Italy:
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=500&h=400&fit=crop&q=80",
    Japan:
      "https://images.unsplash.com/photo-1540959733332-0b10c5c066f2?w=500&h=400&fit=crop&q=80",
    "United States":
      "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=500&h=400&fit=crop&q=80",
    Spain:
      "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=500&h=400&fit=crop&q=80",
    Thailand:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?w=500&h=400&fit=crop&q=80",
    Australia:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop&q=80",
    Brazil:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=500&h=400&fit=crop&q=80",
    Greece:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&h=400&fit=crop&q=80",
    Mexico:
      "https://images.unsplash.com/photo-1518638150340-f706e86654de?w=500&h=400&fit=crop&q=80",
    "United Kingdom":
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&h=400&fit=crop&q=80",
    Germany:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=500&h=400&fit=crop&q=80",
    Portugal:
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=500&h=400&fit=crop&q=80",
    Netherlands:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop&q=80",
    Switzerland:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop&q=80",
    Canada:
      "https://images.unsplash.com/photo-1519832979-6fa011b87667?w=500&h=400&fit=crop&q=80",
    "New Zealand":
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=500&h=400&fit=crop&q=80",
    Indonesia:
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=500&h=400&fit=crop&q=80",
    Vietnam:
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=500&h=400&fit=crop&q=80",
    "South Korea":
      "https://images.unsplash.com/photo-1534274867514-d5b47ef89ed7?w=500&h=400&fit=crop&q=80",
    Turkey:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=500&h=400&fit=crop&q=80",
    Egypt:
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=500&h=400&fit=crop&q=80",
    Morocco:
      "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=500&h=400&fit=crop&q=80",
    "South Africa":
      "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?w=500&h=400&fit=crop&q=80",
    Argentina:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&h=400&fit=crop&q=80",
    Chile:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop&q=80",
    Peru: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=500&h=400&fit=crop&q=80",
    "Costa Rica":
      "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=500&h=400&fit=crop&q=80",
    Iceland:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop&q=80",
    Norway:
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=500&h=400&fit=crop&q=80",
  };

  return (
    countryImages[countryName] ||
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=400&fit=crop&q=80"
  );
}

// Generate better descriptions for countries
function generateCountryDescription(country) {
  const descriptions = {
    France:
      "Experience the romance of Paris, the glamour of the French Riviera, and the exquisite cuisine that makes France a world-class destination.",
    Italy:
      "From the ancient ruins of Rome to the romantic canals of Venice and the stunning Amalfi Coast, Italy offers endless beauty and history.",
    Japan:
      "Discover the perfect blend of ancient traditions and cutting-edge technology in the Land of the Rising Sun.",
    "United States":
      "Explore diverse landscapes from New York City skyscrapers to California beaches and the Grand Canyon's natural wonders.",
    Spain:
      "Enjoy vibrant festivals, stunning architecture, beautiful beaches, and world-renowned cuisine in this passionate Mediterranean country.",
    Thailand:
      "Experience golden temples, tropical islands, bustling markets, and the famous Thai hospitality in the Land of Smiles.",
    Australia:
      "Discover the Great Barrier Reef, unique wildlife, stunning outback landscapes, and vibrant coastal cities down under.",
    Brazil:
      "From the Amazon rainforest to Rio's Carnival and Iguazu Falls, Brazil offers incredible natural beauty and vibrant culture.",
    Greece:
      "Explore ancient ruins, stunning islands with whitewashed buildings, and crystal-clear waters in the birthplace of democracy.",
    Mexico:
      "Experience rich history from ancient Mayan ruins to colonial cities, beautiful beaches, and world-famous cuisine.",
  };

  return (
    descriptions[country.name.common] ||
    `Discover the beautiful landscapes, rich culture, and amazing experiences waiting for you in ${country.name.common}.`
  );
}

// OpenWeatherMap API
export const weatherAPI = {
  getWeather: async (lat, lon) => {
    try {
      const data = await fetchWithTimeout(
        `${API_CONFIG.openWeather.baseURL}/weather?lat=${lat}&lon=${lon}&appid=${API_CONFIG.openWeather.apiKey}&units=metric`
      );

      const getWeatherIcon = (condition) => {
        const icons = {
          Clear: "☀️",
          Clouds: "☁️",
          Rain: "🌧️",
          Drizzle: "🌦️",
          Thunderstorm: "⛈️",
          Snow: "❄️",
          Mist: "🌫️",
          Smoke: "💨",
          Haze: "🌫️",
          Dust: "💨",
          Fog: "🌫️",
          Sand: "💨",
          Ash: "💨",
          Squall: "💨",
          Tornado: "🌪️",
        };
        return icons[condition] || "🌤️";
      };

      return {
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
        icon: getWeatherIcon(data.weather[0].main),
        feelsLike: Math.round(data.main.feels_like),
        pressure: data.main.pressure,
        visibility: data.visibility,
      };
    } catch (error) {
      console.warn("Weather API failed, using mock data:", error);
      // Fallback to mock weather data
      const conditions = ["Sunny", "Cloudy", "Rainy", "Snowy"];
      const randomIndex = Math.floor(Math.random() * conditions.length);
      return {
        temperature: Math.round(Math.random() * 30 + 10),
        condition: conditions[randomIndex],
        humidity: Math.round(Math.random() * 100),
        windSpeed: Math.round(Math.random() * 20),
        icon: ["☀️", "☁️", "🌧️", "❄️"][randomIndex],
        feelsLike: Math.round(Math.random() * 30 + 10),
        pressure: 1013,
        visibility: Math.round((Math.random() * 10 + 5) * 1000),
      };
    }
  },
};

// OpenTripMap API for points of interest
export const placesAPI = {
  getPlaces: async (lat, lon, radius = 30000) => {
    try {
      // If no API key, return empty array
      if (
        !API_CONFIG.openTripMap.apiKey ||
        API_CONFIG.openTripMap.apiKey === "your_actual_opentripmap_key_here"
      ) {
        return [];
      }

      const data = await fetchWithTimeout(
        `${API_CONFIG.openTripMap.baseURL}/places/radius?radius=${radius}&lon=${lon}&lat=${lat}&format=json&apikey=${API_CONFIG.openTripMap.apiKey}`
      );

      return data.features.slice(0, 10).map((place) => ({
        id: place.properties.xid,
        name: place.properties.name,
        type: place.properties.kinds.split(",")[0],
        distance: Math.round(place.properties.dist),
      }));
    } catch (error) {
      console.warn("Places API failed:", error);
      return [];
    }
  },
};

// Enhanced Unsplash API with better error handling
export const photosAPI = {
  getPhotos: async (locationName, count = 6) => {
    // If no Unsplash key, use fallback
    if (
      !API_CONFIG.unsplash.accessKey ||
      API_CONFIG.unsplash.accessKey === "your_unsplash_key_here"
    ) {
      return getMockUnsplashPhotos(locationName);
    }

    try {
      const data = await fetchWithTimeout(
        `${
          API_CONFIG.unsplash.baseURL
        }/search/photos?query=${encodeURIComponent(
          locationName
        )}&per_page=${count}&orientation=landscape&client_id=${
          API_CONFIG.unsplash.accessKey
        }`
      );

      return data.results.map((photo, index) => ({
        id: photo.id,
        url: `${photo.urls.regular}&w=800&h=600&fit=crop&crop=entropy&q=80`,
        alt: photo.alt_description || `${locationName} - Photo ${index + 1}`,
        photographer: photo.user.name,
        photographerUrl: photo.user.links.html,
        color: photo.color,
      }));
    } catch (error) {
      console.warn("Unsplash API failed, using mock photos:", error);
      return getMockUnsplashPhotos(locationName);
    }
  },
};

// Fallback photo function
function getMockUnsplashPhotos(locationName) {
  const locationPhotos = {
    paris: [
      "1502602898536-47ad22581b52",
      "1522093007474-86b3541f1d6b",
      "1499852848445-1d1b0c5b0e0e",
      "1506905925346-21bda4d32df4",
      "1537953773345-d172ccf13cf1",
      "1570077188670-e3a8d69ac5ff",
    ],
    tokyo: [
      "1540959733332-0b10c5c066f2",
      "1490806842257-5f2d0e6e3c1a",
      "1503899036-87c9e15b2a8c",
      "1513584684386-9a1e6b6c5c8d",
      "1528164344702-4b0e1e6c8a9b",
      "1513584684386-9a1e6b6c5c8d",
    ],
    "new york": [
      "1496442226666-8d4d0e62e6e9",
      "1518391846015-6c8a8a5a5a5a",
      "1506905925346-21bda4d32df4",
      "1537953773345-d172ccf13cf1",
      "1570077188670-e3a8d69ac5ff",
      "1522093007474-86b3541f1d6b",
    ],
  };

  const locationKey = locationName.toLowerCase().split(",")[0];
  const photoIds = locationPhotos[locationKey] || locationPhotos.paris;

  return photoIds.map((photoId, index) => ({
    id: index.toString(),
    url: `https://images.unsplash.com/photo-${photoId}?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80`,
    alt: `${locationName} - Photo ${index + 1}`,
    photographer: "Unsplash Photographer",
    photographerUrl: "https://unsplash.com",
    color: "#3B82F6",
  }));
}