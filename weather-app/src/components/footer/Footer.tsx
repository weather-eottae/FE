import React from 'react';
import styled from 'styled-components';
import git from '../../assets/footer/GitHub-logo.png';
import notion from '../../assets/footer/Notion-logo.svg.png';

const Footer = () => {
	return (
		<footer>
			<FooterLayer_01>
				<FooterContent>
					<address>
						상호명 및 호스팅 서비스 제공 : 날씨어때?(주)
						<br />
						대표이사 : 슈퍼코딩
						<br />
						통신판매업신고 : 2023-슈퍼코딩-1021
						<br />
						<a href="#">사업자정보 확인 &gt;</a>
					</address>
					<div className="contact-info">
						<a href="#">
							<img id="git" src={git} />
						</a>
						<a href="#">
							<img id="notion" src={notion} />
						</a>
					</div>
				</FooterContent>
			</FooterLayer_01>
		</footer>
	);
};

export default Footer;

const FooterLayer_01 = styled.div`
	max-width: 1440px;
	width: 100%;

	border-top: 1px solid #dddbdb;
	padding-bottom: 30px;
	margin: 0 auto;
	font-size: 12px;
	color: #555;
	line-height: 150%;
	@media screen and (max-width: 768px) {
		font-size: 0.4rem;
	}
	h1 {
		a {
			background-position: -19px -34px;
			width: 117px;
			height: 34px;
		}
	}
`;

const FooterContent = styled.div`
	width: 40%;
	margin: 0 auto;
	margin-top: 20px;

	display: flex;
	justify-content: flex-end;
	div {
		margin-left: 50px;
	}
	@media screen and (max-width: 768px) {
		width: 90vw;
	}

	a {
		text-decoration: none;
		color: #555;
		&:last-child {
		}
		strong {
			font-weight: bold;
		}
		em {
			font-size: 24px;
			font-family: Tahoma;
			font-weight: bold;
			display: block;
			margin: 9px 0 11px 0;
		}
	}
	img {
		width: 2rem;
	}
	#git {
		width: 4rem;
		margin-right: 10px;
	}
`;
