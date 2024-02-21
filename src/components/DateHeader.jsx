import React from "react";
import { formatDate } from "../utils/dates";

export const DateHeader = () => {
  const today = formatDate(new Date());
  return (
    <div className="text-shadow-sm fixed right-5 top-5 font-serif text-2xl text-white shadow-slate-950/40">
      {today}
    </div>
  );
};
