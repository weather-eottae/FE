import React from 'react';
import styled from 'styled-components';
import profile from '../../assets/img/header/profile.png';
import dateicon from '../../assets/img/header/date.png';
import region from '../../assets/img/header/region.png';
import LocationComponent from '../location/Location';

const Header = () => {
	const date = new Date();
	const currentDate = `${date.getFullYear()}-${String(
		date.getMonth() + 1
	).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

	return (
		<Container>
			<CurrentInfo>
				<RegionInfo>
					<span>
						<img src={region} />
						<LocationComponent />
					</span>
				</RegionInfo>
				<DateInfo>
					<span>
						<img src={dateicon} /> {currentDate}
					</span>
				</DateInfo>
			</CurrentInfo>
			<ProfileWrap>
				<a href="#">
					<img src={profile} />
				</a>
			</ProfileWrap>
		</Container>
	);
};

export default Header;

const Container = styled.div`
	width: 86%;
	margin: 0 auto;
	height: 80px;
	align-items: center;
	display: flex;
	justify-content: space-between;
	@media (max-width: 1024px) {
	}
	@media (max-width: 768px) {
		height: auto;
	}
	@media (max-width: 430px) {
		display: none;
	}
`;

const CurrentInfo = styled.div`
	width: 40%;
	display: flex;
	justify-content: flex-start;
	font-size: 1rem;
	@media (max-width: 1024px) {
		font-size: 0.825rem;
	}
	@media (max-width: 768px) {
		width: 100%;
		justify-content: center;
		margin-bottom: 10px;
	}

	@media (max-width: 430px) {
		display: none;
	}
`;

const RegionInfo = styled.div`
	margin-right: 20px;
	span {
		display: flex;
		align-items: center;
		justify-content: space-around;

		color: #000;
		img {
			width: 30px;
			height: 30px;
			margin-right: 10px;
		}
	}
`;

const DateInfo = styled.div`
	span {
		display: flex;
		align-items: center;
		justify-content: space-around;

		color: #000;

		img {
			width: 30px;
			height: 30px;
			margin-right: 10px;
		}
	}

	@media (max-width: 430px) {
		span {
			justify-content: center;
			img {
				width: 25px;
				height: 25px;
			}
		}
	}
`;

const ProfileWrap = styled.div`
	img {
		width: 35px;
		height: 35px;
	}

	@media (max-width: 768px) {
		img {
			width: 30px;
			height: 30px;
		}
	}
`;
