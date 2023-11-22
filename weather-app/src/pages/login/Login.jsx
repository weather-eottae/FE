import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import login from '../../assets/img/login/login.png';
import devicon_google from '../../assets/img/login/devicon_google.png';
import kakao from '../../assets/img/login/kakao.png';

const Login = () => {
	const [userId, setUserId] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(`id : ${userId}, password: ${password}`);
		//서버에 요청. 여기에도 토큰을 담아서 요청? 서버에서 언제 토큰을 받고 또 로컬스토리지.셋아이템() 언제 어디에? 쓰는지?
	};

	return (
		<Container>
			<div className="cover-img">
				<img src={login} alt="login" height="100%" width="720px" />
			</div>
			<div className="loginPage">
				<div className="loginPage-content">
					<h1>로그인</h1>
					<p>오늘도 좋은 날이에요</p>
					<div className="form-container">
						<form onSubmit={handleSubmit}>
							<div className="textfield-container">
								<input
									type="text"
									value={userId}
									name="id"
									id=""
									placeholder=" 아이디"
									onChange={(e) => setUserId(e.target.value)}
								/>
								<input
									type="password"
									value={password}
									name="password"
									id=""
									placeholder=" 비밀번호"
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div className="button-container">
								<div className="checkbox">
									<input type="checkbox" id="checkbox" />
									로그인 정보 기억하기
								</div>
								<div className="button">
									<button>로그인</button>
								</div>
							</div>
						</form>
					</div>
					<div className="password-container">
						<p>비밀번호를 잊으셨나요?</p>
					</div>
					<div className="line">
						<hr className="line" />
						<p>Or</p>
						<hr className="line" />
					</div>
					<div className="social-login">
						<img src={devicon_google} alt="google" />
						<img src={kakao} alt="kakao" />
					</div>
					<div className="signup-container">
						<h3>
							아이디가 없으신가요?{' '}
							<h6>
								<Link to="/signup">회원가입하기</Link>
							</h6>
						</h3>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default Login;

const Container = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	max-width: 1440px;
	height: 100vh;
	margin: 0 auto;

	.loginPage {
		display: flex;
		justify-content: center;
		background-color: #505ea3;
		color: white;
		width: 720px;
	}
	.loginPage-content {
		display: flex;
		flex-direction: column;
		justify-content: center;

		text-align: center;
		width: 70%;
		row-gap: 20px;
	}

	h1 {
		font-size: 36px;
	}

	.form-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		row-gap: 10px;
	}

	.textfield-container {
		display: flex;
		flex-direction: column;

		justify-content: center;
		row-gap: 10px;
	}

	input[type='text'],
	input[type='password'] {
		margin: 0 auto;
		height: 35px;
		width: 400px;
		background-color: #505ea3;
		color: white;
		border: 0.2px solid white;
		border-radius: 10px;
		outline: none;

		&::placeholder {
			color: #ffffff80;
			font-family: 'Jua', sans-serif;
		}
	}

	.button-container {
		margin: 0 auto;
		.checkbox {
			margin: 10px 0 0;
		}
	}

	button {
		height: 50px;
		width: 400px;
		background-color: #d9d9d9;
		color: white;
		border: none;
		border-radius: 10px;
		cursor: pointer;
		font-size: 18px;
		margin-top: 10px;

		&:hover {
			background-color: #a6a6a6;
		}
	}

	.line {
		display: flex;
		flex-direction: row;

		& hr {
			width: 30%;
		}
	}
	.social-login {
		display: flex;
		justify-content: space-evenly;

		& img {
			cursor: pointer;
		}
	}
	h3 {
		line-height: 1.4;
		h6 {
			font-size: 14px;
			& a:hover,
			& a.active {
				text-decoration: underline;
			}
		}
	}

	@media (max-width: 770px) {
		.cover-img {
			display: none;
		}
	}
`;
