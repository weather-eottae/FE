import React, { ReactNode } from 'react';
import styled from 'styled-components';

// MainProps 인터페이스를 사용하여 props의 타입을 정의합니다.
interface MainProps {
	children?: ReactNode; // `children`은 ReactNode 타입이며, 이는 선택적입니다.
}

const Main: React.FC<MainProps> = ({ children }) => {
	return <StyledMain>{children}</StyledMain>;
};

export default Main;

const StyledMain = styled.div`
	width: 100%;
	height: 100%;

	/* padding 추가 */

	/* margin 수정 */
	margin: 0 auto;

	@media (max-width: 430px) {
		position: fixed;
		top: 80px;
		left: 10px;
		width: 100%;
		height: 100%;
	}
`;
