export function validate(value) {
	return value.length >= 5;
}

const popup = document.createElement('div');
popup.classList.add('popup');
popup.setAttribute('id', 'popup')

export function modal(title, content) {


	popup.innerHTML =
		`
	<div class="popup__body">
		<div class="popup__content">
			<a class="popup__close">
				x
			</a>
			<div class="popup__title">${title}</div>
			<div class="popup__content">${content}</div>
		</div>
	</div>
	`




	document.body.appendChild(popup)
	const close = document.querySelector('.popup__close')
	close.addEventListener('click', () => {
		popup.remove();
	})
}