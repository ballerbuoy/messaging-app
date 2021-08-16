import React from "react";

import "./DashboardLayout.css";

type DashboardProps = {
  header: React.ReactNode;
  leftSidebar: React.ReactNode;
  main: React.ReactNode;
};

export function DashboardLayout({ header, leftSidebar, main }: DashboardProps) {
  return (
    <div className="wrapper">
      {header}
      <div className="main-wrapper">
        {leftSidebar}
        {main}
      </div>
    </div>
  );
}
