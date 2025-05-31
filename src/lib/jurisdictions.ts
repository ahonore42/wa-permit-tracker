export interface Jurisdiction {
  id: string;
  name: string;
  website: string;
  permitOffice: string;
  address: string;
  phone: string;
  email: string;
  requiresAppointment: boolean;
  appointmentUrl?: string;
  specialRequirements: string[];
  processingTimes: {
    basic: string;
    complex: string;
  };
}

export const JURISDICTIONS: Jurisdiction[] = [
  {
    id: "thurston-county",
    name: "Thurston County (Unincorporated)",
    website:
      "https://www.thurstoncountywa.gov/departments/community-planning-and-economic-development/permitting",
    permitOffice: "Building Development Center",
    address: "3000 Pacific Ave SE, Suite 100, Olympia, WA 98501",
    phone: "(360) 786-5490",
    email: "permit@co.thurston.wa.us",
    requiresAppointment: true,
    appointmentUrl:
      "https://www.thurstoncountywa.gov/departments/community-planning-and-economic-development/permitting/building-development-center-bdc-digest",
    specialRequirements: [
      "SB5290 compliance - only complete application packets accepted (effective March 1, 2025)",
      "Concurrent Critical Areas Review required",
      "Intake appointments required for post-presubmission applications",
      "Applications must be checked at counter before intake",
    ],
    processingTimes: {
      basic: "Up to 12 weeks for basic residential permits",
      complex: "Up to 1 year for complex projects and land-use reviews",
    },
  },
  {
    id: "lacey",
    name: "City of Lacey",
    website: "https://cityoflacey.org/building/",
    permitOffice: "Community Development",
    address: "420 College St SE, Lacey, WA 98503",
    phone: "(360) 491-3214",
    email: "permits@ci.lacey.wa.us",
    requiresAppointment: false,
    specialRequirements: ["Urban Growth Area rules apply"],
    processingTimes: {
      basic: "2-4 weeks for residential permits",
      complex: "6-12 weeks for commercial projects",
    },
  },
  {
    id: "olympia",
    name: "City of Olympia",
    website: "https://olympiawa.gov/building",
    permitOffice: "Building & Planning Department",
    address: "601 4th Ave E, Olympia, WA 98501",
    phone: "(360) 753-8314",
    email: "planning@olympiawa.gov",
    requiresAppointment: true,
    specialRequirements: [
      "Historic district reviews may apply",
      "Environmental review required for some projects",
    ],
    processingTimes: {
      basic: "3-6 weeks for residential permits",
      complex: "8-16 weeks for commercial projects",
    },
  },
  {
    id: "tumwater",
    name: "City of Tumwater",
    website: "https://www.tumwater.wa.gov/building",
    permitOffice: "Community Development",
    address: "555 Israel Rd SW, Tumwater, WA 98501",
    phone: "(360) 754-4140",
    email: "permits@tumwater.wa.gov",
    requiresAppointment: false,
    specialRequirements: [],
    processingTimes: {
      basic: "2-3 weeks for residential permits",
      complex: "4-8 weeks for commercial projects",
    },
  },
  {
    id: "yelm",
    name: "City of Yelm",
    website: "https://www.yelmwa.gov/building",
    permitOffice: "Planning & Building Department",
    address: "105 Yelm Ave W, Yelm, WA 98597",
    phone: "(360) 458-8400",
    email: "building@yelmwa.gov",
    requiresAppointment: false,
    specialRequirements: [],
    processingTimes: {
      basic: "1-2 weeks for residential permits",
      complex: "3-6 weeks for commercial projects",
    },
  },
  {
    id: "tenino",
    name: "City of Tenino",
    website: "https://www.tenino.org/building",
    permitOffice: "City Hall",
    address: "149 Hodgden St S, Tenino, WA 98589",
    phone: "(360) 264-2368",
    email: "cityhall@tenino.org",
    requiresAppointment: false,
    specialRequirements: [],
    processingTimes: {
      basic: "1-2 weeks for residential permits",
      complex: "2-4 weeks for commercial projects",
    },
  },
  {
    id: "bucoda",
    name: "City of Bucoda",
    website: "https://www.bucoda.wa.gov/",
    permitOffice: "City Hall",
    address: "110 Main St, Bucoda, WA 98530",
    phone: "(360) 264-2410",
    email: "cityhall@bucoda.wa.gov",
    requiresAppointment: false,
    specialRequirements: [],
    processingTimes: {
      basic: "1-2 weeks for residential permits",
      complex: "2-3 weeks for commercial projects",
    },
  },
];

export function getJurisdictionById(id: string): Jurisdiction | undefined {
  return JURISDICTIONS.find((j) => j.id === id);
}

export function getJurisdictionByName(name: string): Jurisdiction | undefined {
  return JURISDICTIONS.find(
    (j) =>
      j.name.toLowerCase().includes(name.toLowerCase()) ||
      j.id === name.toLowerCase().replace(/\s+/g, "-")
  );
}
