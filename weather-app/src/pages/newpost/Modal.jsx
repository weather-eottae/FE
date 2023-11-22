import React from 'react';
import styled from 'styled-components';

const Modal = ({ message, onConfirm, onCancel }) => {
	return (
		<ModalBackground>
			<ModalContainer>
				<ModalMessage>{message}</ModalMessage>
				<ModalActions>
					<Button onClick={onConfirm}>확인</Button>
					<Button onClick={onCancel}>취소</Button>
				</ModalActions>
			</ModalContainer>
		</ModalBackground>
	);
};

export default Modal;

const ModalBackground = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 10;
`;

const ModalContainer = styled.div`
	background: white;
	padding: 50px;
	border-radius: 10px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
`;

const ModalMessage = styled.p`
	margin-bottom: 20px;
`;

const ModalActions = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const Button = styled.button`
	border: none;
	padding: 10px 15px;
	margin-right: 10px;
	border-radius: 5px;
	background-color: #5d6dbe;
	color: white;
	cursor: pointer;

	&:hover {
		background-color: #4b59c1;
	}
`;
