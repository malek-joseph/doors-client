export const NAV_LINKS = [
  { href: '/', key: 'shortlist', label: 'Shortlist' },
  { href: '/', key: 'messages', label: 'Messages'},
  { href: '/', key: 'guides', label: 'Guides'},
]
export const FOOTER_LINKS = [
  { href: '/', key: 'about', label: 'About Us' },
  { href: '/', key: 'terms', label: 'Terms of use'},
  { href: '/', key: 'privacy', label: 'Privacy Policy'},
]


type Listing = {
  type: "place" | "person";
  images: string[];
  name: string;
  freeMessage: string;
  rent: string;
  age?: string;
  gender?: string;
  description: string;
  availability: string;
  billsIncluded?: boolean;
  list?: string;
  governance: string;
  city: string;
};



export const LISTINGS: Listing[] = [
  {
    type: "place",
    images: [
      "/assets/images/home1.jpeg",
      "/assets/images/home2.jpeg",
      "/assets/images/home3.jpeg",
    ],
    name: "John Doe",
    freeMessage: "Free to message",
    rent: "$800/month",

    description:
      "Spacious room available in a quiet neighborhood. Spacious room available in a quiet neighborhood. Spacious room available in a quiet neighborhood.",
    availability: "Now",
    billsIncluded: true,
    governance: "Giza",
    city: "Zayed",
    list: "1 Bed in single room",
  },
  {
    type: "person",
    images: ["/assets/images/man.jpeg", "/assets/images/woman.jpeg"],
    name: "John Doe",
    freeMessage: "Free to message",
    rent: "$800/month",
    age: "25",
    gender: "male",
    description:
      "Spacious room available in a quiet neighborhood. Spacious room available in a quiet neighborhood. Spacious room available in a quiet neighborhood.",
    availability: "Now",
    governance: "Giza",
    city: "Zayed",
  },
  {
    type: "place",
    images: [
      "/assets/images/home1.jpeg",
      "/assets/images/home2.jpeg",
      "/assets/images/home3.jpeg",
    ],
    name: "John Doe",
    freeMessage: "Free to message",
    rent: "$800/month",
  
 
    description:
      "Spacious room available in a quiet neighborhood. Spacious room available in a quiet neighborhood. Spacious room available in a quiet neighborhood.",
    availability: "Now",
    billsIncluded: false,
    governance: "Cairo",
    city: "Maadi",
    list: "1 Bed in double room",
  },
  {
    type: "person",
    images: ["/assets/images/man.jpeg", "/assets/images/woman.jpeg"],
    name: "John Doe",
    freeMessage: "Free to message",
    rent: "$800/month",
    age: "25",
    gender: "male",
    description:
      "Spacious room available in a quiet neighborhood. Spacious room available in a quiet neighborhood. Spacious room available in a quiet neighborhood.",
    availability: "Now",
    governance: "Giza",
    city: "Zayed",
  },
];









