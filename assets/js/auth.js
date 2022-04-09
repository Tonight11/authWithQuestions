export function getAuthFormHTML() {
	return `
		<form class='popup__form' action='#'>

			<input type="email" placeholder="Email" class='popup__email popup__input'>
			<input type="password" placeholder="Password" class='popup__password popup__input'>

				<button class="popup__btn btn" type="submit">Войти</button>

		</form>
	`
}

export function getAuthWithEmailAndPassword(email, password) {
	const KEY = 'AIzaSyCCPjDXzS-Je3ggL2nuqX8DUq6U0qkpEVc'
	return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${KEY}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email, password,
			returnSecureToken: true
		})
	})
		.then(response => response.json())
		.then(token => token.idToken)

}