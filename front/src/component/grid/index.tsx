import React, { FC } from "react";
import "./index.scss";

interface GridProps {
  children?: React.ReactNode;
  small?: boolean;
}

const Grid: FC<GridProps> = ({ children, small }) => {
  const gridClasses = `grid ${small ? "grid__small" : ""}`;

  return <div className={gridClasses}>{children}</div>;
};

export default Grid;