import Image from "next/image";


const HamburgerMenu = () => {
  return (
    <div className="padding-container ">     <Image
        src="/assets/images/menu.svg"
        alt="menu"
        width={50}
        height={50}
        className="inline-block cursor-pointer lg:hidden "
    />
    </div>
  )
}

export default HamburgerMenu