import Image from "next/image";
import SignInPage from "./signin/page";

const AuthIntroPage = () => {
  return (
    <>
      <div className="content-image">
        <div className="img-account">
          <Image
            src="/img_account.png"
            alt="image"
            width={250}
            height={538}
          />
        </div>
      </div>

      <SignInPage />
    </>
  );
}

export default AuthIntroPage;