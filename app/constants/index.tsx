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
  id: number;
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
  budget?: number;
  availableDuration?: number;
  about: string;
  job: string;
  smoker: boolean;
  pets: boolean;

  
};



export const LISTINGS: Listing[] = [
  {
    id: 1,
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
    budget: 800,
    availableDuration: 6,
    about:" " ,
    job: "Engineer",
    pets: true,
    smoker: true,
    


  },
  {
    id: 2,

    type: "person",
    images: ["/assets/images/man.jpeg", "/assets/images/woman.jpeg"],
    name: "John Doe",
    freeMessage: "Free to message",
    rent: "$800/month",
    age: "25",
    gender: "male",
    description:
      "Spacious room available in a quiet neighborhood. Spacious room available in a quiet neighborhood. Spacious room available in a quiet neighborhood. lorem",
    availability: "Now",
    governance: "Giza",
    city: "Zayed",
    budget: 800,
    availableDuration: 6,
     about:"Hello I'm happy to meet you guys, I'm calm and work quietly. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi similique cupiditate fugit consequatur, animi harum expedita, ipsa hic laudantium maxime suscipit soluta repellat aut ad dolores itaque nostrum facere? A." ,
    job: "Engineer",
    pets: true,
    smoker: true,


  },
  {
    id: 3,

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
    budget: 800,
    availableDuration: 6,
         about:"Hello I'm happy to meet you guys, I'm calm and work quietly. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut voluptatem dolor repudiandae minima quaerat repellat. Quis vel distinctio voluptatum voluptatem, modi consequuntur iste id, doloribus laboriosam perferendis deleniti commodi neque." ,
    job: "Engineer",
    pets: true,
    smoker: true,


  },
  {
    id: 4,

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
    budget: 800,
    availableDuration: 6,
         about:"Hello I'm happy to meet you guys, I'm calm and work quietly. " ,
    job: "Engineer",
    pets: true,
    smoker: true,


  },
];




export const accommodationTypes = [
  {
    name: "Room(s) in an existing sharehouse",
    iconSrc: "/assets/images/room.png",
  },
  { name: "Whole property for rent", iconSrc: "/assets/images/whole.png" },
  {
    name: "Student accommodation",
    iconSrc: "/assets/images/students.png",
  },
  { name: "Homestay", iconSrc: "/assets/images/homestay.png" },
];








