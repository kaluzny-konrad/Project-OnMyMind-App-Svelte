module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleFileExtensions: ['js', 'ts', 'svelte'],
	transform: {
		'\\.(ts|tsx)$': '@swc/jest',
		'^.+\\.svelte$': ['svelte-jester', { preprocess: true }],
	},
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
	maxWorkers: '50%',
};
