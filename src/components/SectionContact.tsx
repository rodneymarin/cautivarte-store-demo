import { BsInstagram } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";

export default function SectionContact() {
  return (
    <section className="w-full">
      <h2 className="text-center section-title">Contáctanos</h2>
      <div className="flex gap-10 h-10 justify-center items-center">
        <a href="mailto:cautivarteaccesorios@gmail.com" target="_blank">
          <MdOutlineEmail size="32" />
        </a>
        <a href="https://www.instagram.com/cautivarteaccesorios/" target="_blank">
          <BsInstagram size="28" />
        </a>
      </div>
    </section>

  )
}
