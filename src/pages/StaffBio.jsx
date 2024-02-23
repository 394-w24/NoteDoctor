import React from "react";
import BackButton from "../components/BackButton";
import { DateHeader } from "../components/DateHeader";

import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getCareGiver } from "../utils/firebase";

export const StaffBio = () => {
  const { id } = useParams();
  const { data: staff } = useQuery({
    queryKey: ["staff", id],
    queryFn: () => getCareGiver(id),
  });
  if (!staff) return "Loading...";
  return (
    <div>
      <h1 className="ml-10 mt-10 font-cursive text-7xl">
        {staff.title} {staff.firstName} {staff.lastName} {staff.suffix}
      </h1>

      <DateHeader />

      <div className="mt-4 flex gap-12">
        <img
          className="h-96 rounded-full"
          src={staff.image}
          alt={staff.firstName + " " + staff.lastName}
        />
        <p className="mx-3 whitespace-pre-wrap">{staff.bio}</p>
      </div>

      <BackButton></BackButton>
    </div>
  );
};
