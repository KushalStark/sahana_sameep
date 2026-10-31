/**
 * ====================================================================
 * SAHANA & SAMEEP — OFFICIAL WEDDING CONFIGURATION
 * ====================================================================
 * Single authoritative source of truth for all wedding details.
 * Contains verified Kannada script, Muhurtha, and venue details
 * as printed on the official invitation card.
 */

export const weddingConfig = {
  // Couple Information
  couple: {
    bride: "Sahana",
    groom: "Sameep",
    brideKannada: "ಸಹನ",
    groomKannada: "ಸಮೀಪ್",
    coupleKannada: "ಸಹನ ಮತ್ತು ಸಮೀಪ್",
    monogram: "S & S",
    tagline: "Two hearts. One beautiful beginning.",
    invitationSubtitle: "A CELEBRATION OF LOVE",
    heroPrimaryAction: "OPEN OUR INVITATION",
    heroSecondaryAction: "VIEW WEDDING DETAILS",
  },

  // Official Wedding Date & Time
  // Monday, 8 February 2027 at 12:35 PM (Muhurtha)
  weddingDate: "2027-02-08T12:35:00+05:30",
  timeZone: "Asia/Kolkata",
  dateFormats: {
    hero: "MONDAY, 08 FEBRUARY 2027",
    card: "MONDAY, 08 FEBRUARY 2027",
    full: "Monday, 08 February 2027",
    standard: "08 February 2027",
    dotted: "08.02.2027",
    kannada: "೦೮-೦೨-೨೦೨೭, ಸೋಮವಾರ",
  },
  muhurtha: "12:35 PM",
  muhurthaKannada: "ಮಧ್ಯಾಹ್ನ: ೧೨:೩೫",

  // Venue Information (as printed on invitation)
  venue: {
    title: "Venue & Location",
    subtitle: "We look forward to celebrating with you",
    name: "ವಿಶ್ವಮಾನವ ಸಭಾಭವನ (Vishwamanava Sabhabhavana)",
    nameKannada: "ವಿಶ್ವಮಾನವ ಸಭಾಭವನ",
    nameEnglish: "Vishwamanava Sabhabhavana",
    addressLine1: "Sagara Road, Ripponpete",
    addressLine2: "Hosanagara Taluk, Shivamogga, Karnataka - 577426",
    locality: "Sagara Road, Ripponpete",
    talukDistrict: "Hosanagara Taluk, Shivamogga, Karnataka - 577426",
    googleMapsUrl: "https://www.google.com/maps?ll=14.002067,75.256803&z=15&t=m&hl=en-US&gl=US&mapclient=embed&cid=15410651585215520925",
    embedMapUrl: "https://maps.google.com/maps?ll=14.002067,75.256803&z=15&t=m&hl=en-US&gl=US&cid=15410651585215520925&output=embed",
    qrCodeImage: "/images/venue-qr.svg",
    parkingNote: "Ample parking available on premise for wedding guests.",
    travelNote: "Conveniently located on Sagara Road, Ripponpete with celebratory signboards.",
  },

  // English Invitation Copy (Revealed inside 3D Envelope)
  invitationCard: {
    blessingHeading: "WITH THE BLESSINGS OF THE DIVINE AND OUR FAMILIES",
    callText: "Cordially invite you to join us and celebrate our wedding day.",
    actionText: "DISCOVER OUR WEDDING",
    actionSubtitle: "Explore our celebration, memories and wedding details.",
    actionTextKannada: "ನಮ್ಮ ವಿವಾಹ ವಿವರಗಳನ್ನು ನೋಡಿ",
    actionSubtitleKannada: "ನಮ್ಮ ವಿವಾಹದ ಸಂಭ್ರಮ ಹಾಗೂ ನೆನಪುಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.",
  },

  // Wedding Rings Presentation Configuration
  weddingRings: {
    subtitle: "Two Hearts. One Promise.",
    heading: "Our Wedding Rings",
    quote: "As these golden bands circle without beginning or end, so too does our devotion.",
    image: "/images/wedding-rings.jpg",
  },

  // Dedicated Traditional Kannada Invitation Details
  kannadaInvitation: {
    invocation: "|| ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ ||",
    tagline: "ಶುಭ ವಿವಾಹ ಆಮಂತ್ರಣ ಪತ್ರಿಕೆ",
    couple: "ಸಹನ ಮತ್ತು ಸಮೀಪ್",
    dateLabel: "ದಿನಾಂಕ",
    dateValue: "೦೮-೦೨-೨೦೨೭, ಸೋಮವಾರ",
    muhurthaLabel: "ಮುಹೂರ್ತ",
    muhurthaValue: "ಮಧ್ಯಾಹ್ನ: ೧೨:೩೫",
    venueLabel: "ವಿವಾಹ ಸ್ಥಳ",
    venueValue: "ವಿಶ್ವಮಾನವ ಸಭಾಭವನ",
    locationLabel: "ಸ್ಥಳ",
    locationValue: "ಸಾಗರ ರಸ್ತೆ, ರಿಪ್ಪನ್ ಪೇಟೆ",
    welcomeNote: "ತಾವೆಲ್ಲರೂ ಸಕುಟುಂಬ ಸಮೇತರಾಗಿ ಆಗಮಿಸಿ, ವಧು-ವರರನ್ನು ಹರಸಿ ಆಶೀರ್ವದಿಸಬೇಕಾಗಿ ವಿನಮ್ರ ಪ್ರಾರ್ಥನೆ.",
  },

  // Official Verified Wedding Events
  // Note: Only verified ceremonies are listed; no fabricated dates or times.
  events: [
    {
      id: "wedding-ceremony",
      title: "Wedding Ceremony",
      titleKannada: "ವಿವಾಹ ಮಹೋತ್ಸವ",
      type: "Sacred Muhurtha (ಮುಹೂರ್ತ)",
      date: "Monday, 08 February 2027",
      dateShort: "08.02.2027",
      time: "Muhurtha: 12:35 PM",
      timeKannada: "ಮುಹೂರ್ತ: ಮಧ್ಯಾಹ್ನ: ೧೨:೩೫",
      venueName: "ವಿಶ್ವಮಾನವ ಸಭಾಭವನ",
      venueTransliteration: "Vishwamanava Sabhabhavana",
      address: "Sagara Road, Ripponpete",
      description: "Join us under the traditional mandap as we exchange sacred vows, sapthapadi, and rings at the auspicious muhurtha.",
      dressCode: "Traditional / Ethnic (Festive Pastels, Silk Sarees & Dhotis)",
      googleMapsUrl: "https://www.google.com/maps?ll=14.002067,75.256803&z=15&t=m&hl=en-US&gl=US&mapclient=embed&cid=15410651585215520925",
      image: "/images/ceremony.jpg",
    }
  ],

  // Countdown Section
  countdown: {
    title: "The Countdown",
    subtitle: "Counting down to the auspicious Muhurtha",
    quote: "Good people, good food, great memories.",
  },

  // Story Section
  story: {
    title: "Our Story",
    subtitle: "Different paths, same destination.",
    leadParagraph: "From friends to partners in every adventure, our journey has been filled with love, laughter and countless memories. Now, we begin our forever together.",
    image: "/images/our-story.jpg",
    timeline: [
      {
        id: "met",
        title: "We Met",
        period: "First Chapter",
        description: "A chance introduction that sparked an effortless conversation lasting into the early hours.",
        icon: "heart"
      },
      {
        id: "friends",
        title: "We Became Friends",
        period: "The Foundation",
        description: "Shared coffees, spontaneous road trips, and countless shared playlists grew into an unbreakable bond.",
        icon: "coffee"
      },
      {
        id: "love",
        title: "We Fell in Love",
        period: "The Spark",
        description: "Realizing that in every dream of tomorrow, we always saw each other by our side.",
        icon: "sparkles"
      },
      {
        id: "forever",
        title: "Forever Begins",
        period: "Our Wedding Day",
        description: "Surrounded by our families and dearest friends, stepping hand in hand into a lifetime of togetherness.",
        icon: "gem"
      }
    ]
  },

  // Photo Gallery
  gallery: {
    title: "Our Gallery",
    subtitle: "Moments that mean the world to us",
    items: [
      {
        id: 1,
        title: "Golden Hour Glow",
        description: "Sunset promises and quiet smiles",
        src: "/images/gallery-1.jpg",
        orientation: "landscape"
      },
      {
        id: 2,
        title: "Hands Entwined",
        description: "A lifelong promise sealed with trust",
        src: "/images/gallery-2.jpg",
        orientation: "portrait"
      },
      {
        id: 3,
        title: "Under the Floral Canopy",
        description: "Surrounded by blooms and blessings",
        src: "/images/gallery-3.jpg",
        orientation: "square"
      },
      {
        id: 4,
        title: "Stolen Glances",
        description: "Laughing at inside jokes during our pre-wedding walk",
        src: "/images/gallery-4.jpg",
        orientation: "portrait"
      },
      {
        id: 5,
        title: "By the Mountain Lake",
        description: "Where Sameep asked, and Sahana said forever",
        src: "/images/gallery-5.jpg",
        orientation: "landscape"
      },
      {
        id: 6,
        title: "Traditional Splendor",
        description: "Silk, gold, and festive celebration",
        src: "/images/gallery-6.jpg",
        orientation: "portrait"
      }
    ]
  },

  // Family Note & Portrait Presentation
  familyNote: {
    heading: "THE FAMILIES BEHIND OUR CELEBRATION",
    subtitle: "Two families, one beautiful beginning.",
    photo: "/images/full family.png",
    fullFamilyPhoto: "/images/full family.png",
    brideFamilyPhoto: "/images/bride.png",
    groomFamilyPhoto: "/images/groom.png",
    brideFamily: {
      title: "THE BRIDE'S FAMILY",
      message: "With warm hearts and deep gratitude, we invite you to bless our daughter Sahana as she embarks on this magical new chapter of life with Sameep.",
      names: "The Bride's Parents & Family",
      photo: "/images/bride.png"
    },
    groomFamily: {
      title: "THE GROOM'S FAMILY",
      message: "Our family is overjoyed to welcome Sahana into our lives and to celebrate this union of love and friendship. We eagerly look forward to sharing this joy with you.",
      names: "The Groom's Parents & Family",
      photo: "/images/groom.png"
    }
  },

  // Travel Information (Ripponpete, Shivamogga)
  travel: {
    enabled: true,
    title: "Travel & Location",
    subtitle: "Helpful transit information for Ripponpete",
    cards: [
      {
        id: "venue-map",
        title: "Official Venue",
        name: "ವಿಶ್ವಮಾನವ ಸಭಾಭವನ (Vishwamanava Sabhabhavana)",
        distance: "Sagara Road, Ripponpete",
        note: "Easily accessible from Sagara, Shivamogga, and Thirthahalli routes.",
        link: "https://www.google.com/maps?ll=14.002067,75.256803&z=15&t=m&hl=en-US&gl=US&mapclient=embed&cid=15410651585215520925"
      },
      {
        id: "railway",
        title: "Nearest Railway",
        name: "Ripponpete Station (RPP) / Shivamogga (SMET)",
        distance: "Ripponpete station is within 2 km",
        note: "Prepaid autos and local transit available to Sagara Road.",
        link: "https://www.irctc.co.in/"
      },
      {
        id: "airport",
        title: "Nearest Airports",
        name: "Shivamogga Airport (RQY) / Mangaluru (IXE)",
        distance: "Approx. 45 km from Shivamogga Airport",
        note: "Direct cab and taxi connectivity available.",
        link: "https://www.google.com/maps?ll=14.002067,75.256803&z=15&t=m&hl=en-US&gl=US&mapclient=embed&cid=15410651585215520925"
      }
    ]
  },

  // Background Music
  music: {
    enabled: true,
    title: "Acoustic Romantic Ambient",
    src: "/audio/wedding-ambient.mp3",
    autoPlayPrompt: true,
  },

  // RSVP Configuration
  rsvp: {
    title: "Kindly RSVP",
    subtitle: "Let us know if you'll be joining our special day",
    deadline: "Please reply by 25 January 2027",
    endpoint: "", // Optional: Paste your Google Apps Script Web App URL here or in .env as VITE_RSVP_ENDPOINT
    demoModeNotice: "Demo Mode: No backend URL configured. Submissions validate and simulate locally.",
  },

  // Thank You Experience & Footer
  thankYou: {
    heading: "THANK YOU",
    subheading: "We can't wait to celebrate with you.",
    signature: "Sahana & Sameep",
    closingNote: "With love, blessings, and sincere gratitude for being part of our story.",
  },

  // Social & Share
  share: {
    title: "Sahana & Sameep's Wedding Invitation",
    text: "With the blessings of the divine and our families, Sahana & Sameep cordially invite you to join them on their wedding day on Monday, 8 February 2027 at Vishwamanava Sabhabhavana, Sagara Road, Ripponpete.",
    url: typeof window !== 'undefined' ? window.location.href : "https://sahana-sameep.wedding",
    whatsappMessage: "We cordially invite you to celebrate our wedding on Monday, 8 February 2027 at Vishwamanava Sabhabhavana (ವಿಶ್ವಮಾನವ ಸಭಾಭವನ), Sagara Road, Ripponpete! View invitation details & directions: "
  }
};
