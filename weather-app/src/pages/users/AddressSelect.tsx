// AddressSelect. tsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IRegion } from "./AddressTypes";
import RegionSelect from "./RegionSelect";
import SubAreaSelect from "./SubAreaSelect";

const addressData: IRegion[] = [
  {
    name: "서울특별시",
    subAreas: [
      "강남구",
      "강동구",
      "강북구",
      "강서구",
      "관악구",
      "광진구",
      "구로구",
      "금천구",
      "노원구",
      "도봉구",
      "동대문구",
      "동작구",
      "마포구",
      "서대문구",
      "서초구",
      "성동구",
      "성북구",
      "송파구",
      "양천구",
      "영등포구",
      "용산구",
      "은평구",
      "종로구",
      "중구",
      "중랑구",
    ],
  },
  {
    name: "경기도",
    subAreas: [
      "고양시",
      "과천시",
      "광명시",
      "광주시",
      "구리시",
      "군포시",
      "김포시",
      "남양주시",
      "동두천시",
      "부천시",
      "성남시",
      "수원시",
      "시흥시",
      "안산시",
      "안성시",
      "안양시",
      "양주시",
      "오산시",
      "용인시",
      "의왕시",
      "의정부시",
      "이천시",
      "파주시",
      "평택시",
      "포천시",
      "하남시",
      "화성시",
      "가평군",
      "양평군",
      "여주군",
      "연천군",
    ],
  },
  {
    name: "인천",
    subAreas: [
      "계양구",
      "미추홀구",
      "남동구",
      "동구",
      "부평구",
      "서구",
      "연수구",
      "중구",
      "강화군",
      "옹진군",
    ],
  },
  {
    name: "대전광역시",
    subAreas: ["대덕구", "동구", "서구", "유성구", "중구"],
  },
  {
    name: "대구광역시",
    subAreas: [
      "남구",
      "달서구",
      "동구",
      "북구",
      "서구",
      "수성구",
      "중구",
      "달성군",
    ],
  },
  {
    name: "부산광역시",
    subAreas: [
      "강서구",
      "금정구",
      "남구",
      "동구",
      "동래구",
      "부산진구",
      "북구",
      "사상구",
      "사하구",
      "서구",
      "수영구",
      "연제구",
      "영도구",
      "중구",
      "해운대구",
      "기장군",
    ],
  },
  {
    name: "울산광역시",
    subAreas: ["남구", "동구", "북구", "중구", "울주군"],
  },
  {
    name: "광주광역시",
    subAreas: ["광산구", "남구", "동구", "북구", "서구"],
  },
  {
    name: "강원도",
    subAreas: [
      "강릉시",
      "동해시",
      "삼척시",
      "속초시",
      "원주시",
      "춘천시",
      "태백시",
      "고성군",
      "양구군",
      "양양군",
      "영월군",
      "인제군",
      "정선군",
      "철원군",
      "평창군",
      "홍천군",
      "화천군",
      "횡성군",
    ],
  },
  {
    name: "충청북도",
    subAreas: [
      "제천시",
      "청주시",
      "충주시",
      "괴산군",
      "단양군",
      "보은군",
      "영동군",
      "옥천군",
      "음성군",
      "증평군",
      "진천군",
      "청원군",
    ],
  },

  {
    name: "충청남도",
    subAreas: [
      "계룡시",
      "공주시",
      "논산시",
      "보령시",
      "서산시",
      "아산시",
      "천안시",
      "금산군",
      "당진군",
      "부여군",
      "서천군",
      "연기군",
      "예산군",
      "청양군",
      "태안군",
      "홍성군",
    ],
  },

  {
    name: "경상북도",
    subAreas: [
      "경산시",
      "경주시",
      "구미시",
      "김천시",
      "문경시",
      "상주시",
      "안동시",
      "영주시",
      "영천시",
      "포항시",
      "고령군",
      "군위군",
      "봉화군",
      "성주군",
      "영덕군",
      "영양군",
      "예천군",
      "울릉군",
      "울진군",
      "의성군",
      "청도군",
      "청송군",
      "칠곡군",
    ],
  },
  {
    name: "경상남도",
    subAreas: [
      "거제시",
      "김해시",
      "마산시",
      "밀양시",
      "사천시",
      "양산시",
      "진주시",
      "진해시",
      "창원시",
      "통영시",
      "거창군",
      "고성군",
      "남해군",
      "산청군",
      "의령군",
      "창녕군",
      "하동군",
      "함안군",
      "함양군",
      "합천군",
    ],
  },
  {
    name: "전라북도",
    subAreas: [
      "군산시",
      "김제시",
      "남원시",
      "익산시",
      "전주시",
      "정읍시",
      "고창군",
      "무주군",
      "부안군",
      "순창군",
      "완주군",
      "임실군",
      "장수군",
      "진안군",
    ],
  },
  {
    name: "전라남도",
    subAreas: [
      "광양시",
      "나주시",
      "목포시",
      "순천시",
      "여수시",
      "강진군",
      "고흥군",
      "곡성군",
      "구례군",
      "담양군",
      "무안군",
      "보성군",
      "신안군",
      "영광군",
      "영암군",
      "완도군",
      "장성군",
      "장흥군",
      "진도군",
      "함평군",
      "해남군",
      "화순군",
    ],
  },
  {
    name: "제주도",
    subAreas: ["서귀포시", "제주시"],
  },
];

const SelectContainer = styled.div`
  width: 140%; // 원하는 너비로 설정
  margin: auto; // 가운데 정렬을 위해
  margin-left: -10px;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  background-color: white;
  color: #5d6dbe;
  margin-top: 10px;
  font-size: 15px;
  font-family: "Jua", sans-serif;
  border: none;
  border-bottom: 2px solid #5d6dbe;
  justify-content: center;
  text-align: center;
  max-width: 300px;

  &:focus {
    outline: none;
    border-color: #4e5ca1;
  }
`;

const Label = styled.label`
  color: #5d6dbe;
  margin-left: 5px;
`;

type AddressSelectProps = {
  initialAddress: string; // 초기 주소 값
  onAddressSelectChange: (address: string) => void; // 콜백 함수 prop 추가
};

const AddressSelect: React.FC<AddressSelectProps> = ({
  initialAddress,
  onAddressSelectChange,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedSubArea, setSelectedSubArea] = useState<string>("");
  const [subAreas, setSubAreas] = useState<string[]>([]);

  useEffect(() => {
    if (initialAddress) {
      setSelectedRegion(initialAddress); // 초기 주소 설정
      const region = addressData.find((r) => r.name === selectedRegion);
      setSubAreas(region ? region.subAreas : []);
      setSelectedSubArea(
        region && region.subAreas.length > 0 ? region.subAreas[0] : ""
      );
    }
  }, [initialAddress]);

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(event.target.value);
  };

  const handleSubAreaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubArea(event.target.value);
  };

  // 선택된 지역과 하위 지역이 변경될 때마다 콜백을 호출하는 useEffect 추가
  useEffect(() => {
    if (selectedRegion && selectedSubArea) {
      // 선택된 지역과 하위 지역을 조합하여 콜백 함수 호출
      onAddressSelectChange(`${selectedRegion} ${selectedSubArea}`);
    }
  }, [selectedRegion, selectedSubArea, onAddressSelectChange]);

  return (
    <SelectContainer>
      <Label>지역</Label>
      <StyledSelect value={selectedRegion} onChange={handleRegionChange}>
        <option value="">시도 선택</option>
        {addressData.map((region) => (
          <option key={region.name} value={region.name}>
            {region.name}
          </option>
        ))}
      </StyledSelect>
      {/* <StyledSelect
        value={selectedSubArea}
        onChange={handleSubAreaChange}
        disabled={!selectedRegion}
      >
        <option value="">시군구 선택</option> 
        {subAreas.map((subArea) => (
          <option key={subArea} value={subArea}>
            {subArea}
          </option>
        ))}
      </StyledSelect> */}
    </SelectContainer>
  );
};

export default AddressSelect;
