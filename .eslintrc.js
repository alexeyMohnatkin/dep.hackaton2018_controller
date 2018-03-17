module.exports = {
	extends: 'airbnb-base',
	"parser": "babel-eslint",
	rules: {
		'no-tabs': 0,
		'indent': ['error', 'tab', {
			SwitchCase: 1,
		}],
		'max-len': ['error', 120],
		semi: ["error", "always"],
		'class-methods-use-this': 0,
	}
};