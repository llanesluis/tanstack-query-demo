import { ReactNode } from "react";

interface ContainerProps {
  children?: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <div className="container relative grow p-8">{children}</div>;
}
