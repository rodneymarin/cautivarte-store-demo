import { PropsWithChildren } from "react";
import Modal from "./Modal";

interface SidebarNavMobileProps {
  isVisible: boolean,
  onClose: () => void,
}
export default function SidebarNavMobile(props: PropsWithChildren<SidebarNavMobileProps>) {
  return (
    <>
      {props.isVisible && <Modal onClick={() => props.onClose()} />}
      <div className={`fixed z-50 right-0 top-0 max-w-[70vw] h-screen rounded-l-3xl bg-white ease-in-out duration-200 ${props.isVisible ? "translate-x-0" : "translate-x-full"}`}>
        {props.children}
      </div>
    </>
  )
}
