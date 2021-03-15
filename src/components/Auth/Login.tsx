import React, { useState } from "react";
import classes from "./Auth.module.scss";
import { Link, useHistory } from "react-router-dom";
import { Button, Input } from "@material-ui/core";
import { Api } from "../../api/api";
import Airplane from "../Airplane/Airplane.js";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/actions/actions";

const Login = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<any>([]);
  const { email, password } = formData;

  const dispatch = useDispatch();

  const onSubmitHandler = async (event: any) => {
    event.preventDefault();
    try {
      let res = await Api.login(JSON.stringify(formData));
      localStorage.setItem("userData", JSON.stringify(res.data));
      dispatch(setUserData(res.data));
      history.goBack();
    } catch (err) {
      setErrors(err.response.data.errors.map((err: any) => err.msg));
    }
  };

  const onChangeHandler = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors([]);
  };

  return (
    <div className={classes.wrapper}>
      <Airplane />
      <div className={classes.formContainer}>
        <Button className={classes.backBtn} onClick={() => history.push("/")}>
          На главную
        </Button>
        <h2>Войти</h2>
        <form className={classes.form} onSubmit={onSubmitHandler}>
          <Input type="email" name="email" placeholder="Почта" value={email} onChange={onChangeHandler} required />
          <Input
            type="password"
            name="password"
            placeholder="Пароль"
            value={password}
            onChange={onChangeHandler}
            required
          />
          {errors.length > 0 && <p className={classes.helperText}>{errors.join("\r\n")}</p>}
          <Button type="submit">Подтвердить</Button>
        </form>
        <p className={classes.text}>
          Нет аккаунта? <Link to="/join">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
