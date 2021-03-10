import React from "react";
import logo from "../assets/img/logo.png";
import userImg from "../assets/img/log.png";
import {Link} from "react-router-dom";
import {IState} from "../redux/reducers/reducerTypes";
import {changeSearchThunk} from "../redux/thunk/thunk";
import {useDispatch, useSelector} from "react-redux";

interface IHeader {
	inputVisible: boolean;
}

const Header = ({inputVisible}: IHeader) => {

	const dispatch = useDispatch()
	const searchValue = useSelector((state: IState) => state.searchValue)

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(changeSearchThunk(e.target.value))
	}

	const handleKeyPressInput = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			dispatch((changeSearchThunk(searchValue)))
		}
	}

	return (
		<div className="container header">
			<header className={"header"}>
				<Link to={'/'}>
					<div className="logo-block">
						<img className={"logo"} src={logo} alt="logo"/>
					</div>
				</Link>
				<div className="side-block">
					{
						inputVisible && <input onChange={handleChangeInput}
						                       onKeyPress={handleKeyPressInput}
						                       value={searchValue}
						                       autoFocus
						                       className={"search-input"}
						                       placeholder={"поиск"}
						                       type="search"/>
					}
					<select onChange={() => alert('не ругаюсь')} className={"select-lang"} value={"ru"} name="" id="">
						<option value="ru">ru</option>
						<option value="en">en</option>
						<option value="de">de</option>
					</select>
					<img className={"user-img"} src={userImg} alt="user"/>

				</div>
			</header>
		</div>
	);
};

export default Header;