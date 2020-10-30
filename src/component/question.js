import React, { useState } from 'react';
import './question.css';

export const Question = (props) => {
	const [ numberOFAnswersSelected, selectionChecker ] = useState(0);

	return (
		<form
			onInput={() => {
				const input = document.querySelectorAll('input');
				let selectionCounter = 0;
				for (const selectedInput of input) {
					if (selectedInput.checked) {
						selectionCounter = selectionCounter + 1;
					}
				}

				selectionChecker(selectionCounter);
			}}
			onSubmit={(e) => {
				e.preventDefault();
				const input = document.querySelectorAll('input');
				props.validateQuestion(input);
			}}
		>
			<h1>
				{props.currentQuestionNumber + 1}) {props.currentQuestion.question}
			</h1>
			<div className="answers">
				{props.Answers.map((answer) => {
					return (
						<React.Fragment>
							<fieldset onClick={
                                ()=>{
                                    
                                }
                            }>
								<input type="checkbox" name={answer} value={answer} />
								<label for={answer}>{answer}</label>
							</fieldset>

							<br />
						</React.Fragment>
					);
				})}
			</div>
			<button type="submit" disabled={!(numberOFAnswersSelected === 1)}>
				Next
			</button>
		</form>
	);
};

export default Question;
