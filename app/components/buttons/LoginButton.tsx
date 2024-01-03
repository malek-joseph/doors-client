import ButtonSm from "../shared/buttons/ButtonSm";
import Link from "next/link";


const LoginButton = () => {
  return (
       <div className="lg:flexCenter hidden transition-all hover:font-bold">
        <Link href="/login">
          <ButtonSm
            type="button"
            title="Login"
            icon="/assets/images/user.png"
            variant="white"
        />
        </Link>
      </div>
  )
}

export default LoginButton