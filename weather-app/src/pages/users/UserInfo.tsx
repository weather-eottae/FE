//UserInfo.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import AddressSelect from "./AddressSelect"; // 주소 선택 컴포넌트
import {
  Header,
  TopSection,
  BottomSection,
  ProfileImagePreview,
  CustomFileInput,
  ModalBackground,
  ModalContainer,
  Form,
  Label,
  Input,
  InputWrapper,
  Button,
  ButtonGroup,
} from "./UserInfoStyles";

interface UserInfoProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    newProfileImage: string,
    newNickname: string,
    newStatusMessage: string
  ) => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ isOpen, onClose, onSave }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [message, setMessage] = useState("");
  // const [address, setAddress] = useState({ region: "" });
  const [address, setAddress] = useState<string>("");
  const [imageUrl, setImageUrl] = useState("/person-circle.svg");
  const [showAlert, setShowAlert] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  // 백엔드에서 사용자 정보를 받아오는 함수
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get("http://43.200.188.52:8080/api/user", {
          headers: {
            Authorization: token,
          },
        });
        setName(response.data.name || "");
        setEmail(response.data.email || "");
        setImageUrl(response.data.imageUrl || "/person-circle.svg");
        setAddress(response.data.address || "");
        // 서버로부터 받은 주소를 AddressSelect 컴포넌트에 전달
        const userAddress = response.data.address || "";
        setAddress(userAddress);
      } catch (error) {
        console.error("UserInfo 가져오기 실패", error);
      }
    };

    fetchUserInfo();
  }, []);

  // 이미지 업로드 핸들러
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  //닉네임 제한
  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    if (newNickname.length > 10) {
      setNicknameError(true);
    } else {
      setNicknameError(false);
    }
    setNickName(newNickname);
  };

  //메세지 제한
  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMessage = e.target.value;
    if (newMessage.length > 30) {
      setMessageError(true);
    } else {
      setMessageError(false);
    }
    setMessage(newMessage);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (nickName.length > 10 || message.length > 30) {
      alert("닉네임이나 메시지가 너무 길면 다시 한 번 확인해주세요.");
      return;
    }

    try {
      let token = localStorage.getItem("access_token");
      if (!token) {
        alert("인증 토큰이 존재하지 않습니다.");
        return;
      }

      // 토큰에서 "Bearer " 접두사가 중복되었다면 제거
      if (token.startsWith("Bearer Bearer ")) {
        token = token.replace("Bearer Bearer ", "Bearer ");
      }

      const formData = new FormData();

      // 회원 정보 JSON 데이터
      const userInfoData = {
        nickName: nickName,
        email: email,
        address: address,
        message: message,
      };
      // JSON 데이터를 Blob으로 변환하여 FormData에 'request'라는 키로 추가
      formData.append(
        "request",
        new Blob([JSON.stringify(userInfoData)], { type: "application/json" })
      );

      // 이미지파일 데이터 추가
      if (uploadedImage) {
        formData.append("file", uploadedImage, uploadedImage.name);
      }

      const response = await axios.patch(
        "http://43.200.188.52:8080/api/user",
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 새로운 토큰 저장
      const newAccessToken = response.headers["Authorization_Access_Token"];
      const newRefreshToken = response.headers["Authorization_Refresh_Token"];

      if (newAccessToken) {
        localStorage.setItem("access_token", newAccessToken);
      }

      if (newRefreshToken) {
        localStorage.setItem("refresh_token", newRefreshToken);
      }

      alert("변경 완료되었습니다");
      onClose();
    } catch (error) {
      console.error("사용자 정보 업데이트 실패", error);
      if (axios.isAxiosError(error) && error.response) {
        console.error("서버 에러 응답:", error.response);
        alert(
          `에러 발생: ${
            error.response.data.message || error.response.statusText
          }`
        );
      }
    }
  };

  // AddressSelect 컴포넌트로부터 주소값을 받아오는 함수
  const handleAddressChange = (selectedAddress: string) => {
    setAddress(selectedAddress);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalBackground>
      <ModalContainer>
        <TopSection>
          <Header>프로필 수정</Header>
          {imageUrl && (
            <ProfileImagePreview src={imageUrl} alt="Profile Preview" />
          )}
          <CustomFileInput htmlFor="profileImageInput">
            변경
            <input
              id="profileImageInput"
              type="file"
              onChange={handleImageChange}
            />
          </CustomFileInput>
        </TopSection>
        <BottomSection>
          <Form onSubmit={handleSubmit}>
            <InputWrapper>
              <Label htmlFor="name">이름</Label>
              <Input type="text" id="name" value={name} readOnly />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="email">이메일</Label>
              <Input type="email" id="email" value={email} readOnly />
            </InputWrapper>

            <AddressSelect
              initialAddress={address}
              onAddressSelectChange={handleAddressChange}
            />

            <InputWrapper>
              <Label htmlFor="nickName">닉네임</Label>
              <Input
                type="text"
                id="nickName"
                value={nickName}
                onChange={handleNicknameChange}
                maxLength={10}
              />
              {nicknameError && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  닉네임은 10글자 이내로 작성해주세요.
                </span>
              )}
            </InputWrapper>

            <InputWrapper>
              <Label htmlFor="message">메시지</Label>
              <Input
                type="text"
                id="message"
                value={message}
                onChange={handleMessageChange}
                maxLength={31}
              />
              {messageError && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  메시지는 30글자 이내로 작성해주세요.
                </span>
              )}
            </InputWrapper>
            <ButtonGroup>
              <Button type="submit">수정</Button>
              <Button type="button" onClick={onClose}>
                닫기
              </Button>
            </ButtonGroup>
          </Form>
        </BottomSection>
      </ModalContainer>
    </ModalBackground>
  );
};

export default UserInfo;
