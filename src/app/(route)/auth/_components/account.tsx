import Link from "next/link";
import { FC, PropsWithChildren } from "react";

type AccountProps = {
  message: string;
  btnText: string;
  urlAddress: string;
};

const AccountComponent: FC<PropsWithChildren<AccountProps>> = ({
  message,
  btnText,
  urlAddress,
  children,
}) => {
  return (
    <div className="account-content">
      <div className="account-box">
        <h1 className="account-logo">
          <span>histagram</span>
        </h1>
        <div className="account-form">{children}</div>
      </div>
      <div className="account-box">
        <span className="font-sm">{message}</span>
        <Link className="link-button" href={urlAddress}>{btnText}</Link>
      </div>
    </div>
  );
};

export default AccountComponent;
