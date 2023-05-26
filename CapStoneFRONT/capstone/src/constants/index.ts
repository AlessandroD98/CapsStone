import  web from "../assets/web.png";
import  mobile from "../assets/mobile.png";
import  backend from "../assets/backend.png";
import  creator from "../assets/creator.png";
import isolation from "../assets/isolation.png"
import smart from "../assets/smart.png"
import lock from "../assets/lock.png"
import defence from "../assets/defence.png"

export const navLinks = [
    {
      id: "/",
      title: "Home",
    },
    {
      id: "/preventivo",
      title: "Richiedi Preventivo",
    },
  ];

 export const services = [
    {
      title: "Installation of doors and windows",
      icon: web,
    },
    {
      title: "Replacement and repair of locks",
      icon: mobile,
    },
    {
      title: "Custom fabrication of metal structures",
      icon: backend,
    },
    {
      title: "Manufacturing and installation of gates and railings",
      icon: creator,
    },
  ];

  export const experiences = [
    {
      title: "Your first line of defense",
      company_name: "Security",
      icon: defence,
      iconBg: "#383E56",
      points: [
        "Some armored doors are touted as being able to withstand break-ins, but if someone tries to force the lock, it will be damaged and will need to be replaced.",
        "Our cylinder, thanks to its unique shape, not only resists any attempts at burglary but also remains undamaged, allowing you to access your home using the key.",
      ],
    },
    {
      title: "It doesn't allow anyone to listen to you when you're at home",
      company_name: "Isolation",
      icon: isolation,
      iconBg: "#E6DEDD",
      points: [
        "Who would want an entrance door that makes you hear all the noises coming from the stairwell? Or that allows others to listen to you while you're at home? Thanks to the insulation with fire-resistant mineral wool, it is the only soundproof armored door in Italy. From now on, you won't have to worry about being listened to from the outside.",
        "Thanks to the thermal insulation panel, our doors offer excellent insulation, keeping your home protected from temperature variations."
      ],
    },
    {
      title: "Cutting-edge security lock",
      company_name: "Security",
      icon: lock,
      iconBg: "#383E56",
      points: [
        "Thanks to the high-security European cylinder lock with an exclusive key, we help you protect what truly matters. The cylinder is personalized, and the keys cannot be reproduced by anyone. No hardware store or key duplication shop has the ability to make a copy. Only we, after verifying ownership, can reproduce them in record time.",
      ],
    },
    {
      title: "See who's at the door",
      company_name: "Security",
      icon: smart,
      iconBg: "#E6DEDD",
      points: [
        "The electronic peephole installed on our doors allows you to see who's at the door, so you won't miss anything. It replaces the traditional peephole and boasts high-definition video quality with clear and bright images, even at night. With integrated microphone and speakers, you can scare off intruders or ask the mailman to leave the package in front of the door.",
      ],
    },
  ];

  export const testimonials = [
    {
      testimonial:
      "Fast and reliable service, the locksmith fixed my broken lock in no time. Highly recommended!",
      name: "Sara Lee",
      designation: "CFO",
      company: "McDonald's.",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      testimonial:
      "Professional and efficient locksmith, arrived promptly and solved my lockout situation with ease. Great service!",
      name: "Pino",
      designation: "COO",
      company: "Epicode",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      testimonial:
      "Excellent craftsmanship and attention to detail. The locksmith installed a new high-security lock with precision. Very satisfied with the results!",
      name: "Lisa Wang",
      designation: "CTO",
      company: "Daje Roma Daje",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
  ];
  export const slides = [
    "https://picsum.photos/id/5/900/480", "https://picsum.photos/id/241/900/480", "https://picsum.photos/id/100/900/480","https://picsum.photos/id/124/900/480","https://picsum.photos/id/15/900/480"
  ]
  