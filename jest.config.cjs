module.exports = {
	transform: {
		'^.+\\.jsx?$': 'babel-jest',
	},
	moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
	moduleNameMapper: {
		'\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
	},
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
	setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
	preset: './jest-preset.js',
};
