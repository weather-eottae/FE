import React,{useState} from "react";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal"; // 추가
import styled from "styled-components";
import axios from "axios";


const Postcode: React.FC = ({zipCode,setZipcode,roadAddress,setRoadAddress,detailAddress,setDetailAddress}:any) =>{

    const [isOpen, setIsOpen] = useState<boolean>(false); //추가

    const completeHandler = (data:any) =>{
        setZipcode(data.zonecode);
        setRoadAddress(data.roadAddress);
        setIsOpen(false); //추가
    }

    // Modal 스타일
    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
        },
        content: {
            left: "0",
            margin: "auto",
            width: "500px",
            height: "600px",
            padding: "0",
            overflow: "hidden",
        },
    };

    // 검색 클릭
    const toggle = () =>{
        setIsOpen(!isOpen);
    }

    // 상세 주소검색 event
    const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setDetailAddress(e.target.value);
    }

    // 추가
    const clickHandler = async () => {
        if (detailAddress === "") {
          alert("상세주소를 입력해주세요.");
        } else {
          console.log(zipCode,roadAddress,detailAddress )
       
      toggle();
        }  
      };

    return(
        
            <Container>
                <label htmlFor="address">주소</label> 
                <div className="zip" >
                    <input className='zipcode'value={zipCode} readOnly placeholder="우편번호" />
                    <button className="custom" onClick={toggle}>우편번호 검색</button>
                <br />
                </div>
           
            
                <input value={roadAddress} className="road" readOnly placeholder="도로명 주소" />
                <br />
            
            <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
                <DaumPostcode onComplete={completeHandler}/>
            </Modal>
            <Label>
            <input type="text" className='detail'onChange={changeHandler} value={detailAddress} placeholder="상세주소"/>
            <br />
            <button className="custom-two" onClick={clickHandler}>주소 등록</button>
            </Label>
            </Container>
            
        
    );
}

export default Postcode;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 415px;
  
  }

  input{
    margin:3px;
  }
  
  
  .zip {
    display: flex;
    flex-direction: row;
    gap: 18px;
  }
  .zipcode {
    margin:10px;
    width: 250px;
    margin: 10px;
  }

  .road{
    margin-left: 10px;
  }
  .detail {
    width: 70%;
    padding:0;
    margin-bottom:5px;
  }
button {
    margin:  10px;
}
`

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
  }
`;