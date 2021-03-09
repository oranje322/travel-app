import React, { Component } from "react";

interface Props {
  lang: string;
	timeZone: string;
}

interface State {
  datetime: string;
}

class Clock extends Component<Props, State> {
  state = {
    datetime: this.getCountryDatetime(this.props.lang, this.props.timeZone),
  };

  intervalId: any;
	componentDidMount() {
    this.intervalId = setInterval(this.tick, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  tick = () => {
    this.setState({
      datetime: this.getCountryDatetime(this.props.lang, this.props.timeZone),
    });
  }

	getCountryDatetime(lang: string, timeZone: string) {
		const today = new Date().toLocaleString("RU", { timeZone });
		const date = new Date(today);
		const formatter = new Intl.DateTimeFormat(lang, {
			day: "numeric",
			month: "short",
			weekday: "short",
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
		});
		return formatter.format(date);
	};

  render() {
    return <span>{this.state.datetime}</span>;
  }
}

export default Clock;
