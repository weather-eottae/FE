//UserInfo.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios"; // 백엔드 API 통신을 위해 사용
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
}

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
  //   const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState({ region: "", city: "" });
  const [imagePreviewUrl, setImagePreviewUrl] = useState("/person-circle.svg");
  const [showAlert, setShowAlert] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  // 백엔드에서 사용자 정보를 받아오는 함수
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("/api/user/info"); // API 경로는 예시
        setEmail(response.data.email);
      } catch (error) {
        console.error("UserInfo 가져오기 실패", error);
      }
    };

    fetchUserInfo();
  }, []);

  // 이미지 업로드 핸들러
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = event.target.files![0];
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result as string);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) {
    return null;
  }

  //닉네임 제한
  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    if (newNickname.length > 10) {
      setNicknameError(true);
    } else {
      setNicknameError(false);
    }
    setNickname(newNickname);
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

  // Form submit 핸들러
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 글자 수 제한 검사
    if (nickname.length > 10 || message.length > 30) {
      alert("닉네임이나 메시지가 너무 길면 다시 한 번 확인해주세요.");
      return; // 제출 중단
    }

    onSave(imagePreviewUrl, nickname, message);
    // 백엔드에 데이터를 전송하는 로직을 여기에 구현
    // 백엔드에 데이터 전송 로직
    // 예: axios.post('/api/update-user-info', { ... }).then(...)
    // .then(response => { setUpdateCompleteModalOpen(true); })

    alert("변경 완료되었습니다");
    onClose();
  };

  // 주소 선택 핸들러
  const handleAddressSelectChange = (selectedAddress: string) => {
    const [region, city] = selectedAddress.split(" ");
    setAddress({ region, city });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalBackground>
      <ModalContainer>
        <TopSection>
          <Header>프로필 수정</Header>
          {imagePreviewUrl && (
            <ProfileImagePreview src={imagePreviewUrl} alt="Profile Preview" />
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

            <AddressSelect onAddressSelectChange={handleAddressSelectChange} />

            <InputWrapper>
              <Label htmlFor="nickname">닉네임</Label>
              <Input
                type="text"
                id="nickname"
                value={nickname}
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
