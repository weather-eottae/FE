//AddressTypes.ts

// 주소 타입 정의
export interface IRegion {
  name: string;
  subAreas: string[];
}

// RegionSelect 컴포넌트의 props 타입 정의
export interface IRegionSelectProps {
  regions: IRegion[];
  selectedRegion: string;
  onRegionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

// SubAreaSelect 컴포넌트의 props 타입 정의
export interface ISubAreaSelectProps {
  subAreas: string[];
  selectedSubArea: string;
  onSubAreaChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
