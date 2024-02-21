import React from "react";
import {getPatient, getAppt, getCareGiver} from "../utils/firebase"
import { useQuery } from 'react-query';

const CheckIn = () => {
  const patData = getPatient("2ScZbzYKjN7leSH2V6ro");
  getAppt("KMa3tIVTBbLKpv9etNau");
  getCareGiver("a8be0g5CGUvm3ARLAxDb")
  return (
    <main>
      <h1 className="font-cursive text-5xl">{patData.firstName} {patData.lastName} ({patData.pronouns})</h1>
    </main>
  );
};

export default CheckIn;
