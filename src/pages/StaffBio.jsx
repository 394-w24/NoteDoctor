import React from "react";
import BackButton from "../components/BackButton";
import { DateHeader } from "../components/DateHeader";

export const StaffBio = () => {
  return (
    <div>
      <h1 className="font-serif text-5xl font-bold">Dr.Jennifer Valina, MD</h1>

      <DateHeader> </DateHeader>

      <div className="mt-4 flex gap-12">
        <img
          className="h-96 rounded-full"
          src="/doctor.webp"
          alt="Dr. Jennifer Valina"
        />
        <p>
          Dr. Valina graduated from The Ohio State University, completed her
          medical school training at Harvard Medical School, and her residency
          at Johns Hopkins Medical School. Board Certified in Obstetrics and
          Gynecology, Dr. Valina has been practicing for 28 years, the last
          seven at Women’s Health Clinic. She focuses on general Ob-Gyn care
          from adolescence to menopausal care and beyond. Her passion for
          women’s health care started well before medical school, and she finds
          the ability and training to be involved in primary care as well as
          surgical care of a patient very fulfilling. Plus, she says,
          “Delivering babies is just the sweetest!” Dr. Valina lives in
          Arlington Heights with her husband and three dogs. When not seeing
          patients, she enjoys spending time with her family, cooking, and
          traveling.
        </p>
      </div>

      <BackButton></BackButton>
    </div>
  );
};