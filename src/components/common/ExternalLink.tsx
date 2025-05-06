import React from "react";
import { FC, PropsWithChildren } from "react";

interface ExternalLinkOwnProps {
  href: string | undefined | null;
}

type ExternalLinkProps = PropsWithChildren<ExternalLinkOwnProps>;

const ExternalLink: FC<ExternalLinkProps> = ({ href, children }) => {
  if (!href) {
    return <span>{children}</span>;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

export default ExternalLink;
