import styled from 'styled-components'
import PropTypes from 'prop-types'

const InputBase = styled.input`
	width: 100%;
	padding: 15px;
	border: 1px solid ${ ( { theme } ) => theme.colors.primary };
	color: ${ ( { theme } ) => theme.colors.contrastText };
	background-color: ${ ( { theme } ) => { theme.colors.mainBg } };
	border-radius: ${ ( { theme } ) => { theme.colors.mainBg } };
	outline: 0;
	margin-bottom: 25px;
`;

export default function Input( { onChange, placeholder } ) {
	return (
		<div>
			<InputBase onChange={ onChange } 
						placeholder={ placeholder }
			/>
		</div>
	);
}

Input.defaultProps = {
	value: '',
};

Input.propTypes = {
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
};