import React, { useState } from 'react';
import styled from 'styled-components';
import weather from '../../assets/img/signup/weather.png';
import devicon_google from '../../assets/img/login/devicon_google.png';
import kakao from '../../assets/img/login/kakao.png';

//유효성 검사, 비번확인, 미디어파일전송
const Signup = () => {
	const [userName, setUserName] = useState('');
	const [userId, setUserId] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [verifidePassword, setVerifidePassword] = useState('');
	const [address, setAddress] = useState('');
	const [message, setMessage] = useState('');
	const [file, setFile] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(`id : ${userId}, password: ${password}`);
	};

	return (
		<Container>
			<div className="cover-img">
				<img src={weather} alt="login" height="100%" width="720px" />
			</div>
			<div className="signup-container">
				<div className="signup-form">
					<h1>회원가입</h1>
					<form onSubmit={handleSubmit}>
						<div className="second-container">
							<label htmlFor="userName">이름</label>
							<input
								type="text"
								value={userName}
								name="userName"
								id=""
								onChange={(e) => setUserName(e.target.value)}
							/>

							<label htmlFor="userName">아이디</label>
							<input
								type="text"
								value={userId}
								name="userId"
								id=""
								onChange={(e) => setUserId(e.target.value)}
							/>

							<label htmlFor="email">email</label>
							<input
								type="text"
								value={email}
								name="email"
								id=""
								onChange={(e) => setEmail(e.target.value)}
							/>
							<label htmlFor="password">비밀번호</label>
							<input
								type="password"
								value={password}
								name="password"
								id=""
								onChange={(e) => setPassword(e.target.value)}
							/>
							<label htmlFor="verifidePassword">비밀번호 확인</label>
							<input
								type="password"
								value={verifidePassword}
								name="verifidePassword"
								id=""
								onChange={(e) => setVerifidePassword(e.target.value)}
							/>
							<label htmlFor="address">주소 입력</label>
							<input
								type="text"
								value={address}
								name="address"
								id=""
								onChange={(e) => setAddress(e.target.value)}
							/>
							<label htmlFor="message">
								회원들에게 보일 인삿말과 프로필사진을 등록해보세요
							</label>
							<input
								type="textarea"
								value={message}
								name="message"
								id=""
								onChange={(e) => setMessage(e.target.value)}
							></input>
							<input
								type="file"
								value={file}
								name="file"
								id=""
								onChange={(e) => setFile(e.target.value)}
							></input>
						</div>

						<button>회원가입</button>
					</form>
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
	height: 100vh;
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
		label {
			margin: 5px 0;
		}
	}

	input[type='text'],
	input[type='password'] {
		margin: 0 auto;
		height: 35px;
		width: 400px;
		color: black;
		border: 0.2px solid black;
		border-radius: 10px;
		outline: none;
	}

	input[type='textarea'] {
		margin: 0 auto;
		height: 80px;
		width: 400px;
		color: black;
		border: 0.2px solid black;
		border-radius: 10px;
		outline: none;
	}

	input[type='textarea'] {
		margin: 0 auto;
		height: 80px;
		width: 400px;
		color: black;
		border: 0.2px solid black;
		border-radius: 10px;
		outline: none;
	}

	input[type='file']::file-selector-button {
		width: 150px;
		height: 30px;
		background: #fff;
		border: 1px solid rgb(77, 77, 77);
		border-radius: 10px;
		margin: 5px 10px 5px 0;
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
		margin: 0 auto;
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
