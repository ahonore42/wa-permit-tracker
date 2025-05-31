export interface PermitType {
  id: string;
  name: string;
  description: string;
  category: "building" | "land-use" | "septic" | "well" | "tree";
  typicalProcessingTime: string;
  requiredDocuments: string[];
  fees: {
    base: string;
    description: string;
  };
  notes?: string[];
}

export const PERMIT_TYPES: PermitType[] = [
  {
    id: "residential-building",
    name: "Residential Building Permit",
    description:
      "New construction, additions, or major renovations to residential structures",
    category: "building",
    typicalProcessingTime: "6-12 weeks",
    requiredDocuments: [
      "Property Information Sheet",
      "Residential Building Permit Application",
      "Site plan showing setbacks",
      "Floor plans and elevations",
      "Structural calculations (if required)",
      "Critical Areas Review (if applicable)",
    ],
    fees: {
      base: "Based on project valuation",
      description: "Use Building Permit Fee Chart to calculate fees",
    },
    notes: [
      "Presubmission conference may be required",
      "Septic permit often required first",
      "Critical areas review required if within 400 feet of critical areas",
    ],
  },
  {
    id: "commercial-building",
    name: "Commercial Building Permit",
    description: "Commercial, industrial, or institutional building projects",
    category: "building",
    typicalProcessingTime: "8-16 weeks",
    requiredDocuments: [
      "Property Information Sheet",
      "Non-Residential Building Permit Application",
      "Site plan with parking and utilities",
      "Architectural and engineering plans",
      "Fire department review",
      "Traffic impact analysis (if required)",
      "SEPA environmental review",
    ],
    fees: {
      base: "Based on project valuation + plan review",
      description:
        "Higher fees due to complexity and multiple department reviews",
    },
  },
  {
    id: "adu",
    name: "Accessory Dwelling Unit (ADU)",
    description: "Guest house, family member unit, or granny flat",
    category: "building",
    typicalProcessingTime: "4-8 weeks",
    requiredDocuments: [
      "Property Information Sheet",
      "ADU Application",
      "Site plan showing both structures",
      "Floor plans for ADU",
      "Septic adequacy verification",
    ],
    fees: {
      base: "Reduced residential permit fees",
      description: "Special reduced fee structure for ADUs",
    },
  },
  {
    id: "septic",
    name: "Septic System Permit",
    description: "New septic installation or major repairs",
    category: "septic",
    typicalProcessingTime: "2-4 weeks",
    requiredDocuments: [
      "Septic permit application",
      "Soil evaluation",
      "System design plans",
      "Installer certification",
    ],
    fees: {
      base: "$500-2000 depending on system type",
      description: "Managed by Environmental Health division",
    },
    notes: [
      "Often required before building permit",
      "Soil evaluation required first",
      "Licensed installer required",
    ],
  },
  {
    id: "critical-areas",
    name: "Critical Areas Review",
    description: "Environmental review for projects near sensitive areas",
    category: "land-use",
    typicalProcessingTime: "4-12 weeks",
    requiredDocuments: [
      "Critical areas study",
      "Biological assessment (if required)",
      "Mitigation plan",
      "Habitat management plan",
    ],
    fees: {
      base: "$1000-5000+ depending on complexity",
      description: "Requires expert environmental consultants",
    },
    notes: [
      "Required for projects within 400 feet of wetlands, streams, or steep slopes",
      "Now required concurrently with building applications (SB5290)",
      "May require biological experts for assessment",
    ],
  },
];

export function getPermitTypeById(id: string): PermitType | undefined {
  return PERMIT_TYPES.find((p) => p.id === id);
}

export function getPermitTypesByCategory(
  category: PermitType["category"]
): PermitType[] {
  return PERMIT_TYPES.filter((p) => p.category === category);
}
