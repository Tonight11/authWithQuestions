export class SetQuestion {
	static create(question) {
		return fetch('https://image-pr-default-rtdb.europe-west1.firebasedatabase.app/question.json', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(question)
		})
			.then(response => response.json())
			.then(response => {
				question.id = response.name;
				return question
			})
			.then(getToLocalStorage)
			.then(SetQuestion.renderQuestion)
	}

	static listToHTML(question) {
		if (question.length) {
			return `<ol>${question.map(list => `<li>${list.text}</li>`).join('')}</ol>`
		} else {
			return '<p>There is no question</p>'
		}
	}

	static fetchQuestion(token) {
		if (!token) {
			return Promise.resolve('<p>Wrong email or password</p>')
		}

		return fetch(`https://image-pr-default-rtdb.europe-west1.firebasedatabase.app/question.json?auth=${token}`)
			.then(response => response.json())
			.then(response => {
				if (response.error) {
					return `<p>${response.error}</p>`
				}

				return response ? Object.keys(response).map(key => ({
					...response[key],
					id: key
				})) : []
			})
	}

	static renderQuestion() {
		const all = getQuestionFromLocalStorage()
		const row = document.querySelector('.questions__row')
		const title = document.querySelector('.questions__title')

		if (all.length > 0) {

			const render = all.map(function (single) {

				const date = `${new Date(single.date).getDate()}.${new Date(single.date).getMonth() + 1}.${new Date(single.date).getFullYear()}`;
				const hour = new Date(single.date).getHours()
				const minute = new Date(single.date).getMinutes()

				return `
			<div class="questions__column">
				<div class="questions__date">${date} ${hour}:${minute}</div>
				<div class="questions__item">${single.text}</div>
			</div>
			`
			})

			title.innerText = 'Questions'
			row.innerHTML = render.join('')
		} else {
			title.innerText = 'There is no questions. Please enter your question above'
		}
	}

}

function getToLocalStorage(question) {
	const all = getQuestionFromLocalStorage()

	all.push(question)

	localStorage.setItem('questions', JSON.stringify(all))
}
function getQuestionFromLocalStorage() {
	return JSON.parse(localStorage.getItem('questions') || '[]')
}