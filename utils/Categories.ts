import { GiVacuumCleaner } from "react-icons/gi";
import { MdStorefront } from "react-icons/md";
import { RiKnifeLine } from "react-icons/ri";
import { AiFillSound } from "react-icons/ai";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import { FcClock } from "react-icons/fc";
import { TbBedFilled } from "react-icons/tb";

export const categories = [
  {
    label: "All",
    icon: MdStorefront,
  },
  {
    label: "Alat Kamar Tidur",
    icon: TbBedFilled,
  },
  {
    label: "Alat Pembersih",
    icon: GiVacuumCleaner,
  },
  {
    label: "Alat Elektronik",
    icon: AiTwotoneThunderbolt,
  },
  {
    label: "Jam",
    icon: FcClock,
  },
  {
    label: "Speaker",
    icon: AiFillSound,
  },
  {
    label: "Peralatan Dapur",
    icon: RiKnifeLine,
  },
];
