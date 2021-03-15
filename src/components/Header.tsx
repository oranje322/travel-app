import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import logo from "../assets/img/logo.png";
import userImg from "../assets/img/log.png";
import { Link } from "react-router-dom";
import { IState } from "../redux/reducers/reducerTypes";
import { changeSearchThunk, logoutThunk } from "../redux/thunk/thunk";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { setLang, setUserData } from "../redux/actions/actions";

interface IHeader {
  inputVisible: boolean;
}

const Header = ({ inputVisible }: IHeader) => {
  const userData = useSelector((state: IState) => state.userData);
  const searchValue = useSelector((state: IState) => state.searchValue);
  const selectLang = useSelector((state: IState) => state.lang)

  const dispatch = useDispatch();

  useEffect(() => {
    const localUserData = localStorage.getItem("userData");
    if (localUserData) {
      dispatch(setUserData(JSON.parse(localUserData)));
    }
  }, []);
  const { t, i18n } = useTranslation();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchThunk(e.target.value));

  };

  const handleKeyPressInput = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      dispatch(changeSearchThunk(searchValue));
    }
  };

  const logout = () => {
    dispatch(logoutThunk());
  };

  const handleChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLang(e.target.value))
    i18n.changeLanguage(e.target.value);
  }

  return (
    <div className="container header">
      <header className={"header"}>
        <Link to={"/"}>
          <div className="logo-block">
            <img className={"logo"} src={logo} alt="logo" />
          </div>
        </Link>
        <div className="side-block">
          {inputVisible && (
            <input
              onChange={handleChangeInput}
              onKeyPress={handleKeyPressInput}
              value={searchValue}
              autoFocus
              className={"search-input"}
              placeholder={t("search")}
              type="search"
            />
          )}
          <select onChange={(e) => handleChangeLang(e)} className={"select-lang"} value={selectLang}>
            <option value="ru">ru</option>
            <option value="en">en</option>
            <option value="de">de</option>
          </select>
          {userData.name && (
            <img className={"user-img"} src={userData.photo || userImg} alt={userData.name} title={userData.name} />
          )}

          {userData.name ? (
            <Button size="large" onClick={logout}>
              {t("exit")}
            </Button>
          ) : (
              <Link style={{ textDecoration: "none" }} to="/login">
                <Button size="large">{t("enter")}</Button>
              </Link>
            )}
        </div>
      </header>
    </div>
  );
};

export default Header;
