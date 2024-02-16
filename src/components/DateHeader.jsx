import React from "react";
import { formatDate } from "../utils/dates";

export const DateHeader = () => {
  const today = formatDate(new Date());
  return <div className="fixed right-0 top-0">{today}</div>;
};
