import { show } from 'js-snackbar';

export default {
	show(message) {
		show({
			text: message,
			pos: 'bottom-right',
			duration: 2000,
		});
	}
}