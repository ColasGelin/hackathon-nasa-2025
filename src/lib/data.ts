// Main statistics
export const stats = [
  { value: "61,672", label: "Deaths (Europe 2022)" },
  { value: "+2-7°C", label: "Urban difference" },
  { value: "€114B", label: "EU Investments" }
]

// Urban heat island impacts
export const impacts = [
  "Heat stress",
  "Increased mortality", 
  "Amplified pollution",
  "Energy costs",
  "Infrastructure damage",
  "Social inequalities"
]

// Satellite technologies
export const satellites = [
  { 
    name: "Landsat", 
    res: "30m", 
    type: "Surface Temperature",
    description: "High-resolution thermal data for precise mapping"
  },
  { 
    name: "Sentinel-2", 
    res: "30m", 
    type: "Vegetation (NDVI)",
    description: "Monitoring urban vegetation cover and green spaces"
  },
  { 
    name: "MODIS", 
    res: "1km", 
    type: "Global Coverage",
    description: "Continuous monitoring of global urban temperatures"
  }
]

// Tested solutions in Málaga
export const malagaSolutions = [
  {
    title: "Strategic Green Spaces",
    impact: "↓ 3°C targeted zones"
  },
  {
    title: "Green Roofs", 
    impact: "↓ 5°C roof temperature"
  },
  {
    title: "Reflective Surfaces",
    impact: "↓ 15°C surface temp"
  },
  {
    title: "Biodiversity Corridors",
    impact: "↑ 40% urban species"
  }
]

// Solution pillars
export const solutionPillars = [
  {
    title: "Satellite Data",
    description: "Landsat + Sentinel-2 + MODIS for 30m real-time resolution",
    icon: "satellite"
  },
  {
    title: "Predictive AI", 
    description: "Machine learning to anticipate urban thermal evolution",
    icon: "brain"
  },
  {
    title: "Simple Interface",
    description: "Intuitive dashboard for urban planners and policy makers",
    icon: "dashboard"
  }
]