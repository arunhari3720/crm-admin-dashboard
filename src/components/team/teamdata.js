import harry from "../../assets/image_1.jpg";
import john from "../../assets/image_2.jpg";
import sophia from "../../assets/image_4.jpg";
import david from "../../assets/image_3.jpg";


const teamdata = [
  {
    id: 1,
    name: "Harry",
    role: "Frontend Developer",
    department: "Engineering",
    email: "harry@crm.com",
    image: harry,
    status: "Active",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 2,
    name: "John",
    role: "Backend Developer",
    department: "Engineering",
    email: "john@crm.com",
    image: john,
    status: "Active",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    name: "Sophia",
    role: "UI/UX Designer",
    department: "Design",
    email: "sophia@crm.com",
    image: sophia,
    status: "Busy",
    color: "from-orange-500 to-yellow-400",
  },
  {
    id: 4,
    name: "David",
    role: "Project Manager",
    department: "Management",
    email: "david@crm.com",
    image: david,
    status: "Offline",
    color: "from-emerald-500 to-green-400",
  },
];

export default teamdata;