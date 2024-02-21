import React from "react";
import { useQuery } from "react-query";
import { getAppt, getCareGiver, getPatient } from "../utils/firebase";

const CheckIn = () => {
  const { isLoading, data: patData } = useQuery({
    queryKey: ["apptData"],
    queryFn: () => getPatient("2ScZbzYKjN7leSH2V6ro"),
  });
  if (isLoading) return "Loading...";

  return (
    <main>
      <h1 className="font-cursive text-5xl">
        {patData.firstName} {patData.lastName} ({patData.pronouns})
      </h1>
    </main>
  );
};

export default CheckIn;
