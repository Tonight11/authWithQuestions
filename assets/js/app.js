import { validate, modal } from './validate.js'
import { SetQuestion } from './bd.js'
import { getAuthFormHTML, getAuthWithEmailAndPassword } from './auth.js'


const form = document.querySelector('.add-question')
const input = document.querySelector('.inputText')
const btn = document.querySelector('.add-question__btn')
const btnModal = document.querySelector('.modal__btn')


btnModal.addEventListener('click', openModal)

input.addEventListener('input', (e) => {
	btn.disabled = !validate(input.value)
})

window.addEventListener('load', () => {
	SetQuestion.renderQuestion()
})

form.addEventListener('submit', (e) => {
	e.preventDefault();

	if (validate(input.value)) {
		const question = {
			text: (input.value).trim(),
			date: new Date().toJSON()
		}

		btn.disabled = true;

		SetQuestion.create(question).then(() => {
			input.value = '';
			btn.disabled = true;
		})
	}

})

function openModal() {
	modal('Авторизация для админа', getAuthFormHTML())

	document.querySelector('.popup__form').addEventListener('submit', getAuthForm)



}

function getAuthForm(e) {
	e.preventDefault()

	const email = e.target.querySelector('.popup__email').value
	const password = e.target.querySelector('.popup__password').value
	const modalBtn = e.target.querySelector('.popup__btn')

	getAuthWithEmailAndPassword(email, password)
		.then(SetQuestion.fetchQuestion)
		.then(renderQuestionList)
		.then(() => modalBtn.disabled = true)
}

function renderQuestionList(content) {
	if (typeof content === 'string') {
		modal("Авторизация для админа", content)
	} else {
		modal('Все вопросы', SetQuestion.listToHTML(content))

	}
}