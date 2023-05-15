import httpPost from './sendMailApi';

describe('sendMailApi', () => {
	beforeAll(() => {
		jest.useFakeTimers();
	});

	afterAll(() => {
		jest.runOnlyPendingTimers();
		jest.useRealTimers();
	});

	afterEach(() => {
		waitCooldown();
	});

	it('correct data call fetch', async () => {
		setFetchResult(true);

		await httpPost(correctEmail, correctMessage);

		expect(fetch).toHaveBeenCalledWith(apiUrl, mockedFetch);
	});

	it('correct data returns success', async () => {
		setFetchResult(true);

		const result = await httpPost(correctEmail, correctMessage);

		expect(result).toEqual(successStatus);
	});

	it('wrong email returns error', async () => {
		setFetchResult(true);

		const result = await httpPost('wrong@email', correctMessage);

		expect(result).toEqual(invalidEmailError);
	});

	it('too many attempts returns error', async () => {
		setFetchResult(true);

		await httpPost(correctEmail, correctMessage);
		const result = await httpPost(correctEmail, correctMessage);

		expect(result).toEqual(tooManyAttemptsError);
	});

	it('post after wait cooldown returns success', async () => {
		setFetchResult(true);

		await httpPost(correctEmail, correctMessage);
		waitCooldown();
		const result = await httpPost(correctEmail, correctMessage);

		expect(result).toEqual(successStatus);
	});

	it('show error if fetch fails', async () => {
		setFetchResult(false);

		const result = await httpPost(correctEmail, correctMessage);

		expect(result).toEqual(fetchError);
	});
});

function setFetchResult(result: boolean) {
	global.fetch = jest.fn().mockResolvedValue({
		json: jest.fn().mockResolvedValue(result),
	});
}

function waitCooldown() {
	jest.advanceTimersByTime(cooldown + 1);
}

const correctEmail = 'test@test.pl';
const correctMessage = 'test message';
const cooldown = 1000 * 5; // 5 seconds

const apiUrl = '/api/send-email';

const successStatus = {
	status: 'success',
	message: '',
};

const invalidEmailError = {
	status: 'error',
	message: 'Invalid email address!',
};

const tooManyAttemptsError = {
	status: 'error',
	message: 'Too many attempts, please try again later.',
};

const fetchError = {
	status: 'error',
	message: 'Something went wrong. Please try again later.',
};

const mockedFetch = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		mailContent: `E-mail: ${correctEmail}\n Message:\n${correctMessage}`,
	}),
};
