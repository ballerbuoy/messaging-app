import React, { Dispatch, SetStateAction } from "react";

import { Header } from "../../../Pages/Dashboard/Header/Header";
import { Sidebar } from "../../../Pages/Dashboard/Sidebar/Sidebar";

import "./DashboardLayout.css";

type DashboardProps = {
  children: React.ReactNode;
  selectedChatRoom: string;
  // setSelectedChatRoom: (arg: string) => void;
  setSelectedChatRoom: Dispatch<SetStateAction<string>>;
};

export function DashboardLayout({
  children,
  selectedChatRoom,
  setSelectedChatRoom,
}: DashboardProps) {
  return (
    <div className="wrapper">
      <Header changeSelectedChatRoom={setSelectedChatRoom} />
      <div className="main-wrapper">
        <Sidebar
          selectedChatRoom={selectedChatRoom}
          changeSelectedChatRoom={setSelectedChatRoom}
        />
        {children}
      </div>
    </div>
  );
}
