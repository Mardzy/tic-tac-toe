import React, { FC, HTMLProps } from "react";

export const Flex: FC<HTMLProps<HTMLDivElement>> = ({
  children,
  className = "",
}) => <div className={`flex w-full ${className}`}>{children}</div>;
