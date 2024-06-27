import {Accepting} from "@/app/types/listing"
import cigarette from "@/public/assets/images/cigarette.png";
import pet from "@/public/assets/images/pet.png";
import student from "@/public/assets/images/student.png";
import visitors from "@/public/assets/images/visitors.png";


export const NAV_LINKS = [
  { href: '/info', key: 'info', label: 'Info' },
  { href: '/shortlists', key: 'shortlist', label: 'Shortlists' },
  { href: '/messages', key: 'messages', label: 'Messages'},
  // { href: '/', key: 'guides', label: 'Guides'},
]
export const FOOTER_LINKS = [
  { href: '/info', key: 'info', label: 'Info' },
  { href: '/info/about', key: 'about', label: 'About Us' },
  { href: '/info/terms', key: 'terms', label: 'Terms of use'},
  { href: '/info/privacy', key: 'privacy', label: 'Privacy Policy'},
  { href: '/info/contact', key: 'contact', label: 'Contact'},
  { href: '/info/FAQ', key: 'faq', label: 'FAQ'},
]


export const accommodationTypes = [
  {
    name: "Shared appartment",
    iconSrc: "/assets/images/appartment.png",
  },
  { name: "Shared house", iconSrc: "/assets/images/whole.png" },
  {
    name: "Students Place",
    iconSrc: "/assets/images/students-place.png",
  },
  { name: "Family home", iconSrc: "/assets/images/family-home.png" },
];



 export const accepting: Accepting[] = [
    { name: "smokers", src: cigarette },
    { name: "pets", src: pet },
    { name: "students", src: student },
    { name: "visitors", src: visitors },
  ];








