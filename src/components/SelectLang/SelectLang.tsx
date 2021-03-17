import React, {useState} from 'react';
import Select, {ValueType} from 'react-select';
import {useDispatch, useSelector} from "react-redux";
import {setLang} from "../../redux/actions/actions";
import {useTranslation} from "react-i18next";
import {IState} from "../../redux/reducers/reducerTypes";

interface IOptions {
	value: string,
	label: string
}

const options: IOptions[] = [
	{value: 'ru', label: 'RU'},
	{value: 'en', label: 'EN'},
	{value: 'de', label: 'DE'},
];

const customStyles = {
	menu: (provided: any, state: any) => ({
		...provided,
		width: state.selectProps.width,
		borderBottom: '1px dotted pink',
		color: state.selectProps.menuColor,
		background: 'rgba(239, 239, 239, 0.49)',
	}),
	container: (provided: any, state: any) => ({
		...provided,
		minWidth: '50px'
	}),
	control: (provided: any, state: any) => ({
		...provided,
		background: 'rgba(239, 239, 239, 0.49)',
		minHeight: 42,
		cursor: 'pointer',
	}),
	dropdownIndicator: (provided: any, state: any) => ({
		display: 'none'
	}),
	indicatorSeparator: (provided: any, state: any) => ({
		display: 'none'
	}),
}

const SelectLang = () => {

	const lang = useSelector((state: IState) => state.lang)

	const dispatch = useDispatch()
	const {i18n} = useTranslation();

	const filterLang = () => {
		if (lang === 'ru') {
			return 0
		} else if (lang === 'en') {
			return 1
		} else {
			return 2
		}
	}

	const [selectedOption, setSelectedOption] = useState<ValueType<IOptions, any>>(options[filterLang()])

	const handleChangeLang = (option: IOptions | null) => {
		if (option !== null) {
			dispatch(setLang(option.value))
			i18n.changeLanguage(option.value);
			setSelectedOption(option)
		}
	}

	return (
		<div className={'select-lang'}>
			<Select options={options}
							styles={customStyles}
							value={selectedOption}
							onChange={(e) => handleChangeLang(e)}
							isSearchable={false}
			/>
		</div>
	)
		;
};

export default SelectLang;