//SubAreaSelect.tsx
import React from "react";
import { ISubAreaSelectProps } from "./AddressTypes";

const SubAreaSelect: React.FC<ISubAreaSelectProps> = ({
  subAreas,
  selectedSubArea,
  onSubAreaChange,
}) => {
  return (
    <select value={selectedSubArea} onChange={onSubAreaChange}>
      {subAreas.map((subArea: string) => (
        <option key={subArea} value={subArea}>
          {subArea}
        </option>
      ))}
    </select>
  );
};

export default SubAreaSelect;
