import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import weather from "../../assets/img/signup/weather.png";
import devicon_google from "../../assets/img/login/devicon_google.png";
import kakao from "../../assets/img/login/kakao.png";
import Postcode from "../../components/login/Postcode";

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    userName: "",
    nickName: "",
    email: "",
    password: "",
    address: "",
    message: "",
  });

  const [zipCode, setZipcode] = useState("");
  const [roadAddress, setRoadAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  const [file, setFile] = useState("");

  const navigate = useNavigate();

  const [passwordError, setPasswordError] = useState("");

  //닉네임 중복체크 
  const [isNickname, setIsNickname] = useState(false);
  const [loading,setIsloading]= useState(false);
  const [empty,setEmpty] = useState(false);

  const doubleCheck = async() =>{
    const { nickName } = userInfo;
  
      try{
        setIsloading(true);
        setEmpty(true);
        const response = await axios.post(`http://43.200.188.52:8080/api/user/${nickName}`,
        {nickName}
        );

        console.log('중복체크의 서버로부터의 응답:',response);

        if (response.status === 200) {
          setIsNickname(true);
        } else if (response.status === 409){
          // 닉네임이 사용 불가능한 경우(409)
          setIsNickname(false);
        }
      } catch (error) {
        // 통신실패 
        console.error("닉네임 중복체크 오류", error);
        setIsNickname(false)
        
      } finally {
        setIsloading(false);
      }
    };


  const handleChange =  (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [name]: value }));

    if (name === "password") {
      // 비밀번호 유효성
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/;

      if (!passwordRegex.test(value)) {
        setPasswordError(
          "비밀번호는 9자 이상, 영문 소문자, 대문자, 숫자, 특수문자(@$!%*?&)를 포함해야합니다."
        );
      } else {
        setPasswordError("");
      }
    }

    if (e.target.files && e.target.files.length > 0) {
      setFile(() => e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

       const jsonData = {
        userName: userInfo.userName,
        password: userInfo.password,
        nickName: userInfo.nickName,
        email: userInfo.email,
        address: `${zipCode} ${roadAddress} ${detailAddress}`,
        message: userInfo.message,
      };

      // JSON 데이터를 Blob으로 변환
      
      const jsonBlob = new Blob([JSON.stringify(jsonData)], {
        type: "application/json",
      });

      // FormData에 Blob 추가
      formData.append("request", jsonBlob); 
      formData.append("file", file, file.name);

      const headers = {
        "Content-Type": "multipart/form-data",
         accept: "application/json",
      };

      const response = await axios.post(
        "http://43.200.188.52:8080/api/signup",
        formData,
        { headers }
      );

      if (response.status === 200) {
        console.log("통신 성공", response);
        navigate("/");
      } else {
        console.log("통신 실패", response);
      }
    } catch (err) {
      console.log("통신 실패", err);
    }
  };

  console.log("useInfo입니다.", {
    userInfo,
    zipCode,
    roadAddress,
    detailAddress,
    file,
    key: file.name,
  });



  return (
    <Container>
      <div className="cover-img">
        <img src={weather} alt="signup" height="100%" width="720px" />
      </div>
      <div className="signup-container">
        <div className="signup-form">
          <h1>회원가입</h1>

          <div className="second-container">
            <label htmlFor="userName">이름</label>
            <input
              type="text"
              value={userInfo.userName}
              name="userName"
              id="text"
              onChange={handleChange}
            />

            <label htmlFor="userName">닉네임</label>
            
            
            <Label>
            <input
              type="text"
              value={userInfo.nickName}
              name="nickName"
              id="nickName"
              onChange={handleChange}
            />
           
              <button onClick={doubleCheck}>중복검사
              </button>
            </Label>
            
            {/*{!loading && <p>닉네임 중복검사를 해주세요.</p>}*/}
            {/*{loading && <p>사용할 수 있는지 닉네임인지 확인중</p>}*/}
            {!loading && !isNickname && empty && (<p style={{color: "orange"}}>사용할 수 없는 닉네임입니다.</p>)}
            {!loading && isNickname && <p>닉네임을 사용할 수 있습니다.</p>}
            <label htmlFor="email">email</label>
            <input
              type="text"
              value={userInfo.email}
              name="email"
              id="email"
              onChange={handleChange}
            />
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              value={userInfo.password}
              name="password"
              id="password"
              onChange={handleChange}
            />
            {passwordError && <p style={{ color: "grey" }}>{passwordError}</p>}
            <Postcode
              zipCode={zipCode}
              setZipcode={setZipcode}
              roadAddress={roadAddress}
              setRoadAddress={setRoadAddress}
              detailAddress={detailAddress}
              setDetailAddress={setDetailAddress}
            />

            {/*일반주소
              <label htmlFor="address">주소 입력</label>
              <input
                type="text"
                value={userInfo.address}
                name="address"
                id="address"
                onChange={handleChange}
               /> */}

            <label htmlFor="message" className="message-margin">
              회원들에게 보일 인삿말과 프로필사진을 등록해보세요
            </label>
            <input
              type="text"
              value={userInfo.message}
              name="message"
              id="message"
              onChange={handleChange}
            ></input>
            <input
              type="file"
              name="file"
              multiple="multiple"
              onChange={handleChange}
            ></input>
          </div>
          <button onClick={handleSubmit}>회원가입</button>

          <div className="line-container">
            <div className="line">
              <hr className="line" />
              <p>Or</p>
              <hr className="line" />
            </div>
            <div className="social-login">
              <img src={devicon_google} alt="google" />
              <img src={kakao} alt="kakao" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};


export default Signup;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;

  .signup-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: black;
    width: 720px;
  }
  .signup-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 70%;
    margin: 0 auto;
    row-gap: 20px;
  }

  h1 {
    font-size: 36px;
  }

  .second-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  input[type="text"],
  input[type="password"] {
    margin: 0 auto;
    height: 35px;
    width: 400px;
    color: black;
    border: 0.2px solid black;
    border-radius: 10px;
    outline: none;
  }

  input[type="file"]::file-selector-button {
    margin-top: 5px;
    width: 150px;
    height: 30px;
    background: #fff;
    border: 1px solid rgb(77, 77, 77);
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      background: rgb(77, 77, 77);
      color: #fff;
    }
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 400px;
    background-color: #7376ff;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 18px;
  }
  .custom {
    margin-top: 10px;
    background-color: black;
    color: white;
    width: 110px;
    height: 20px;
    border: 1px solid black;
    border-radius: 5px;
    font-size: 12px;
    &:hover {
      color: black;
      background-color: white;
      transition: 0.2s;
    }
  }

  .custom-two {
    background-color: black;
    color: white;
    width: 110px;
    height: 20px;
    border: 1px solid black;
    border-radius: none;
    font-size: 12px;
    &:hover {
      color: black;
      background-color: white;
      transition: 0.2s;
    }
  }
  .message-margin {
    margin-top: 8px;
  }
  .line-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
  }

  .line {
    display: flex;
    width: 100%;
  }

  .social-login {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    margin-top: 20px;

    & img {
      cursor: pointer;
    }
  }

  @media (max-width: 770px) {
    .cover-img {
      display: none;
    }
  }
`;

const Label = styled.label`
  position: relative;

  input {
    border: none;
    padding: 0;
    height: 40px;
    width: 200px;
    margin-bottom:5px;
  }
  button {
    position: absolute;
    top: 0px;
    right: 20px;
    margin-top: 10px;
    background-color: black;
    color: white;
    width: 80px;
    height: 20px;
    border: 1px solid black;
    border-radius: 5px;
    font-size: 12px;
  
  
  &:hover {
    color: black;
    background-color: white;
    transition: 0.2s;
  }

}

}
`;