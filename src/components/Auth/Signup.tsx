import React, { useState } from "react";
import classes from "./Auth.module.scss";
import { Link, useHistory } from "react-router-dom";
import { Button, Input } from "@material-ui/core";
import { Api } from "../../api/api";
import Airplane from "../Airplane/Airplane.js";
import { setUserData } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";

function Signup() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    photo: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ photo: string; password: string; server: string[] | null }>({
    photo: "",
    password: "",
    server: null,
  });

  const dispatch = useDispatch();

  const { email, password, name, photo } = formData;

  const onSubmitHandler = async (event: any) => {
    event.preventDefault();
    setIsFormSubmitted(true);
    if (!errors.password && !errors.photo) {
      setErrors({ ...errors, server: null });
      try {
        let res = await Api.signup(JSON.stringify(formData));
        localStorage.setItem("userData", JSON.stringify(res.data));
        dispatch(setUserData(res.data));
        history.goBack();
      } catch (err) {
        setErrors({ ...errors, server: err.response.data.errors.map((err: any) => err.msg) });
      }
    }
  };

  const onChangeHandler = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });

    if (name === "password" && value.length < 6) {
      setErrors({ ...errors, password: "Пароль должен содержать более 6 символов" });
      return;
    } else {
      setErrors({ ...errors, password: "" });
    }
  };

  const onPhotoLoadHandler = (event: any) => {
    const file = event.target.files[0];

    if (file === undefined) {
      return;
    } else if (!file.type.match(/^image\/\w*$/)) {
      setErrors({ ...errors, photo: "Загрузить можно только картинку" });
      return;
    } else if (file.size / 1024 / 1024 > 1) {
      setErrors({ ...errors, photo: "Превышен максимальный размер файла 1МБ" });
      return;
    } else {
      setErrors({ ...errors, photo: "" });

      const reader = new FileReader();
      console.log(reader);
      reader.onloadend = function () {
        if (typeof reader.result === "string") {
          setFormData({ ...formData, photo: reader.result });
        } else {
          setFormData({ ...formData, photo: "" });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Airplane />
      <div className={classes.formContainer}>
        <Button className={classes.backBtn} onClick={() => history.push("/")}>
          На главную
        </Button>
        <h2>Регистрация</h2>
        <form className={classes.form} onSubmit={onSubmitHandler}>
          <Input type="text" name="name" placeholder="Имя" value={name} onChange={onChangeHandler} required />
          <Input type="email" name="email" placeholder="Почта" value={email} onChange={onChangeHandler} required />
          <Input
            type="password"
            name="password"
            placeholder="Пароль"
            value={password}
            onChange={onChangeHandler}
            required
          />
          <div className={classes.uploadBtn} >
            <label htmlFor="upload-photo">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={(event) => onPhotoLoadHandler(event)}
              />
              <Button variant="outlined" component="span">
                Загрузить фото
              </Button>
              {photo && <img src={photo} width="50" alt="" title="Ваше фото" />}
            </label>
          </div>
          {(errors.password || errors.server || errors.photo) && isFormSubmitted && (
            <p className={classes.helperText}>{Object.values(errors).join("\r\n")}</p>
          )}
          <Button type="submit">Подтвердить</Button>
        </form>
        <p className={classes.text}>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
