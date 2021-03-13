import React, { useState } from "react";
import classes from "./Auth.module.scss";
import { Link, useHistory } from "react-router-dom";
import { Button, Input } from "@material-ui/core";
import { Api } from '../../api/api';

function Signup() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    photo: "",
  });
  const [isFromTouched, setIsFromTouched] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>([]);

  const { email, password, name, photo } = formData;

  const onSubmitHandler = async (event: any) => {
    event.preventDefault();
    setIsFromTouched(true);
    if (errors.length === 0) {
      try {
        let res = await Api.signup(JSON.stringify(formData));
        localStorage.setItem("userData", JSON.stringify(res.data));
        history.push("/");
      } catch (err) {
        setErrors(err.response.data.errors.map((err: any) => err.msg));
      }
    }
  };

  const onChangeHandler = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
    
    if (name === "photo" && (!value.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/) && value.length > 0)) {
      setErrors(["Ссылка на аватар некорректна"]);
      return;
    } else if (name === "password" && value.length < 6) {
      setErrors(["Пароль должен содержать более 6 символов"]);
      return;
    } else {
      setErrors([]);
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.formContainer}>
        <Button className={classes.backBtn} onClick={() => history.push("/")}>
          На главную
        </Button>
        <h2>Регистрация</h2>
        <form className={classes.form} onSubmit={onSubmitHandler}>
          <Input type="text" name="name" placeholder="Имя" value={name} onChange={onChangeHandler} required />
          <Input type="email" name="email" placeholder="Почта" value={email} onChange={onChangeHandler} required />
          <Input type="password" name="password" placeholder="Пароль" value={password} onChange={onChangeHandler} required />
          <Input type="text" name="photo" placeholder="Ссылка на аватар или ничего" value={photo} onChange={onChangeHandler} />
          {(errors.length > 0 && isFromTouched) && <p className={classes.helperText}>{errors.join("\r\n")}</p>}
          <Button type="submit" disabled={errors.length > 0 && isFromTouched}>
            Подтвердить
          </Button>
        </form>
        <p className={classes.text}>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
