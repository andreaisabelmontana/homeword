// A small, hand-authored catalogue of fictional Madrid rentals. No backend and
// no API — everything the matcher needs lives here. `tags` are the structured
// features the natural-language query is scored against.

export const NEIGHBORHOODS = [
  "Malasaña", "Chamberí", "Salamanca", "La Latina", "Lavapiés", "Chueca",
  "Retiro", "Moncloa", "Tetuán", "Arganzuela", "Chamartín", "Centro",
];

// canonical feature tags + the colour used for the listing's generated cover
export const FEATURES = {
  metro: "Near a metro", quiet: "Quiet street", bright: "Bright / exterior",
  furnished: "Furnished", terrace: "Terrace / balcony", elevator: "Elevator",
  pets: "Pet-friendly", desk: "Desk / workspace", park: "Near a park",
  modern: "Renovated / modern", parking: "Parking", gym: "Gym in building",
};

export const LISTINGS = [
  { id: 1, title: "Sunny attic off Plaza del Dos de Mayo", hood: "Malasaña", price: 1450, beds: 2, baths: 1, sqm: 68, tags: ["metro", "bright", "furnished", "modern"], blurb: "Top-floor two-bed with skylights over the plaza; loud but lively at night." },
  { id: 2, title: "Quiet interior one-bed near Iglesia", hood: "Chamberí", price: 1200, beds: 1, baths: 1, sqm: 52, tags: ["quiet", "elevator", "metro", "desk"], blurb: "Faces a silent courtyard; small study nook by the window." },
  { id: 3, title: "Elegant flat on Calle Velázquez", hood: "Salamanca", price: 2400, beds: 3, baths: 2, sqm: 110, tags: ["bright", "elevator", "parking", "modern"], blurb: "High ceilings, herringbone floors, garage space included." },
  { id: 4, title: "Cosy studio by the Mercado de la Cebada", hood: "La Latina", price: 950, beds: 0, baths: 1, sqm: 34, tags: ["metro", "furnished", "bright"], blurb: "Compact studio in the heart of the tapas district." },
  { id: 5, title: "Bright two-bed with terrace", hood: "Retiro", price: 1700, beds: 2, baths: 1, sqm: 74, tags: ["terrace", "park", "bright", "elevator"], blurb: "Steps from the park; sunny terrace for morning coffee." },
  { id: 6, title: "Renovated loft in Lavapiés", hood: "Lavapiés", price: 1300, beds: 1, baths: 1, sqm: 60, tags: ["modern", "metro", "bright", "pets"], blurb: "Open-plan loft, exposed brick, dog-friendly building." },
  { id: 7, title: "Family flat near Cuatro Caminos", hood: "Tetuán", price: 1250, beds: 3, baths: 2, sqm: 95, tags: ["metro", "elevator", "quiet", "park"], blurb: "Spacious and affordable, near three metro lines." },
  { id: 8, title: "Designer one-bed in Chueca", hood: "Chueca", price: 1600, beds: 1, baths: 1, sqm: 55, tags: ["modern", "furnished", "metro", "gym"], blurb: "Smart-home one-bed with a residents' gym." },
  { id: 9, title: "Riverside two-bed in Arganzuela", hood: "Arganzuela", price: 1400, beds: 2, baths: 2, sqm: 80, tags: ["park", "bright", "parking", "elevator"], blurb: "Overlooks Madrid Río; perfect for runners and cyclists." },
  { id: 10, title: "Studio with a desk in Moncloa", hood: "Moncloa", price: 880, beds: 0, baths: 1, sqm: 30, tags: ["desk", "quiet", "metro"], blurb: "Student-friendly studio with a proper work desk." },
  { id: 11, title: "Grand three-bed on Calle Génova", hood: "Chamberí", price: 2200, beds: 3, baths: 2, sqm: 120, tags: ["bright", "elevator", "modern", "terrace"], blurb: "Classic Chamberí elegance with a sunny terrace." },
  { id: 12, title: "Penthouse with skyline terrace", hood: "Chamartín", price: 2600, beds: 3, baths: 2, sqm: 130, tags: ["terrace", "parking", "gym", "modern", "bright"], blurb: "Top-floor penthouse, wraparound terrace, two parking spots." },
  { id: 13, title: "Charming one-bed near El Rastro", hood: "La Latina", price: 1100, beds: 1, baths: 1, sqm: 48, tags: ["furnished", "metro", "bright"], blurb: "Steps from the Sunday flea market; fully furnished." },
  { id: 14, title: "Calm two-bed by Parque del Oeste", hood: "Moncloa", price: 1550, beds: 2, baths: 1, sqm: 78, tags: ["quiet", "park", "bright", "elevator"], blurb: "Leafy, peaceful street; ten minutes from the park." },
  { id: 15, title: "Modern studio in Centro", hood: "Centro", price: 1050, beds: 0, baths: 1, sqm: 36, tags: ["modern", "metro", "furnished", "desk"], blurb: "Brand-new micro-studio with a fold-out workspace." },
  { id: 16, title: "Pet-friendly two-bed in Retiro", hood: "Retiro", price: 1650, beds: 2, baths: 1, sqm: 72, tags: ["pets", "park", "quiet", "elevator"], blurb: "Dogs welcome; the park is your back garden." },
  { id: 17, title: "Sun-drenched three-bed in Salamanca", hood: "Salamanca", price: 2800, beds: 3, baths: 3, sqm: 140, tags: ["bright", "elevator", "parking", "gym", "modern"], blurb: "Premium exterior flat with all-day light." },
  { id: 18, title: "Compact one-bed in Tetuán", hood: "Tetuán", price: 900, beds: 1, baths: 1, sqm: 45, tags: ["metro", "furnished", "quiet"], blurb: "Great-value one-bed on a calm residential street." },
  { id: 19, title: "Loft-style two-bed in Malasaña", hood: "Malasaña", price: 1750, beds: 2, baths: 1, sqm: 82, tags: ["modern", "bright", "metro", "desk"], blurb: "Industrial-chic with a dedicated home-office corner." },
  { id: 20, title: "Bright studio near Tribunal", hood: "Chueca", price: 1000, beds: 0, baths: 1, sqm: 33, tags: ["bright", "metro", "furnished"], blurb: "Tiny but luminous; central and well connected." },
  { id: 21, title: "Quiet garden flat in Arganzuela", hood: "Arganzuela", price: 1350, beds: 2, baths: 1, sqm: 70, tags: ["quiet", "park", "pets", "bright"], blurb: "Ground floor opening onto a shared garden." },
  { id: 22, title: "Executive one-bed in Chamartín", hood: "Chamartín", price: 1500, beds: 1, baths: 1, sqm: 58, tags: ["modern", "elevator", "parking", "desk", "gym"], blurb: "Near the business district; built for remote work." },
  { id: 23, title: "Two-bed with balcony in Lavapiés", hood: "Lavapiés", price: 1250, beds: 2, baths: 1, sqm: 66, tags: ["terrace", "metro", "bright", "pets"], blurb: "Sunny balcony over a multicultural, buzzing street." },
  { id: 24, title: "Spacious three-bed in Chamberí", hood: "Chamberí", price: 1950, beds: 3, baths: 2, sqm: 105, tags: ["quiet", "elevator", "bright", "park"], blurb: "Family-sized, calm, and close to two parks." },
];
