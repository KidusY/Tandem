import './App.css';
import React from 'react';
import Question from './component/question';
import questions from './Apprentice_TandemFor400_Data.json';
class App extends React.Component {
	constructor() {
		super();
		this.state = {
			start: false,
			end: false,
			currentQuestion: {},
			currentAnswers: [],
			currentQuestionNumber: 0,
			showModal: false,
			score: 0,
			showStartBtn: true
		};
	}
	shuffleArray = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[ array[i], array[j] ] = [ array[j], array[i] ];
		}
	};
	componentDidMount() {
		this.setState({ currentQuestion: questions[this.state.currentQuestionNumber] });
		let Answers = [
			...questions[this.state.currentQuestionNumber].incorrect,
			questions[this.state.currentQuestionNumber].correct
		];
		this.shuffleArray(Answers);
	}
	getQuestion = () => {
		this.setState({ start: true, showStartBtn: false });
		this.setState({ currentQuestion: questions[this.state.currentQuestionNumber] });
		let Answers = [
			...questions[this.state.currentQuestionNumber].incorrect,
			questions[this.state.currentQuestionNumber].correct
		];
		this.shuffleArray(Answers);
		this.setState({ currentAnswers: Answers });
		if (this.state.currentQuestionNumber < 20)
			this.setState({ currentQuestionNumber: this.state.currentQuestionNumber + 1 });
		else this.setState({ end: true });
	};
	validateQuestion = (input) => {
		let selectedAnswer;

		for (const selectedInput of input) {
			if (selectedInput.checked) {
				selectedAnswer = selectedInput.value;
			}
		}

		if (selectedAnswer === questions[this.state.currentQuestionNumber - 1].correct) {
			this.setState({ score: this.state.score + 1 });
			this.getQuestion();
		} else {
			this.setState({ showModal: true });
		}

		for (const selectedInput of input) {
			selectedInput.checked = false;
		}
	};
	render() {
		console.log(this.state.score);
		return (
			<div className="App">
				<h2 className="score">
					Score: {this.state.score} / {questions.length - 1}
				</h2>
				<div className="container">
					<div>
						{this.state.showStartBtn ? (
							<div>
								<h1> Welcome To Tandem Trivia </h1>
								<button id="startBtn" onClick={() => this.getQuestion()}>
									{' '}
									Start{' '}
								</button>
							</div>
						) : (
							<div />
						)}
						{this.state.start && !this.state.end ? (
							<Question
								currentQuestion={this.state.currentQuestion}
								validateQuestion={this.validateQuestion}
								Answers={this.state.currentAnswers}
								currentQuestionNumber={this.state.currentQuestionNumber - 1}
							/>
						) : (
							<div />
						)}

						{this.state.showModal ? (
							<div className="modal">
								<div>
									The correct Answer is : {questions[this.state.currentQuestionNumber - 1].correct}
									<br />
									<button
										onClick={() => {
											this.getQuestion();
											this.setState({ showModal: false });
										}}
									>
										Next
									</button>
								</div>
							</div>
						) : (
							<div />
						)}

						{this.state.end ? (
							<div className="modal">
								<div>
									Your Total Score is : {this.state.score}
									<br />
									<button
										onClick={() => {
											this.setState({
												end: false,
												currentQuestionNumber: 0,
												start: false,
												showStartBtn: true,
                        score:0
											});
										}}
									>
										Next
									</button>
								</div>
							</div>
						) : (
							<div />
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
