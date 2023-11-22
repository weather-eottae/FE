//RegionSelect.tsx
import React from "react";
import { IRegionSelectProps } from "./AddressTypes";

const RegionSelect: React.FC<IRegionSelectProps> = ({
  regions,
  selectedRegion,
  onRegionChange,
}) => {
  return (
    <select value={selectedRegion} onChange={onRegionChange}>
      {regions.map((region) => (
        <option key={region.name} value={region.name}>
          {region.name}
        </option>
      ))}
    </select>
  );
};

export default RegionSelect;
