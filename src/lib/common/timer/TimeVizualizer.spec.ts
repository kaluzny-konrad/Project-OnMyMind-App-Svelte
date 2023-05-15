import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import ms from 'ms';

import TimeVizualizer from './TimeVizualizer.svelte';

describe('TimeVizualizer Component', () => {
	const testCases = [
		{ time: ms('0ms'), formattedTime: '00:00' },
		{ time: ms('1ms'), formattedTime: '00:00' },
		{ time: ms('999ms'), formattedTime: '00:00' },
		{ time: ms('0s'), formattedTime: '00:00' },
		{ time: ms('1s'), formattedTime: '00:01' },
		{ time: ms('9s'), formattedTime: '00:09' },
		{ time: ms('59s'), formattedTime: '00:59' },
		{ time: ms('1m'), formattedTime: '01:00' },
		{ time: ms('1m') + ms('1s'), formattedTime: '01:01' },
		{ time: ms('9m') + ms('1s'), formattedTime: '09:01' },
		{ time: ms('1m') + ms('59s'), formattedTime: '01:59' },
		{ time: ms('59m'), formattedTime: '59:00' },
		{ time: ms('59m') + ms('1s'), formattedTime: '59:01' },
		{ time: ms('59m') + ms('59s'), formattedTime: '59:59' },
		{ time: ms('1h'), formattedTime: '01:00:00' },
		{ time: ms('1h') + ms('1s'), formattedTime: '01:00:01' },
		{ time: ms('1h') + ms('1m') + ms('1s'), formattedTime: '01:01:01' },
		{ time: ms('1h') + ms('1m') + ms('59s'), formattedTime: '01:01:59' },
		{ time: ms('1h') + ms('59m'), formattedTime: '01:59:00' },
		{ time: ms('1h') + ms('59m') + ms('1s'), formattedTime: '01:59:01' },
		{ time: ms('1h') + ms('59m') + ms('59s'), formattedTime: '01:59:59' },
		{ time: ms('9h'), formattedTime: '09:00:00' },
		{ time: ms('9h') + ms('1s'), formattedTime: '09:00:01' },
		{ time: ms('9h') + ms('1m') + ms('1s'), formattedTime: '09:01:01' },
		{ time: ms('9h') + ms('1m') + ms('59s'), formattedTime: '09:01:59' },
		{ time: ms('9h') + ms('59m'), formattedTime: '09:59:00' },
		{ time: ms('9h') + ms('59m') + ms('1s'), formattedTime: '09:59:01' },
		{ time: ms('9h') + ms('59m') + ms('59s'), formattedTime: '09:59:59' },
		{ time: ms('99h'), formattedTime: '99:00:00' },
		{ time: ms('99h') + ms('1s'), formattedTime: '99:00:01' },
		{ time: ms('99h') + ms('1m') + ms('1s'), formattedTime: '99:01:01' },
		{ time: ms('99h') + ms('1m') + ms('59s'), formattedTime: '99:01:59' },
		{ time: ms('99h') + ms('59m'), formattedTime: '99:59:00' },
		{ time: ms('99h') + ms('59m') + ms('1s'), formattedTime: '99:59:01' },
		{ time: ms('99h') + ms('59m') + ms('59s'), formattedTime: '99:59:59' },
		{ time: ms('999h'), formattedTime: '999:00:00' },
		{ time: ms('999h') + ms('1s'), formattedTime: '999:00:01' },
		{ time: ms('999h') + ms('1m') + ms('1s'), formattedTime: '999:01:01' },
		{ time: ms('999h') + ms('1m') + ms('59s'), formattedTime: '999:01:59' },
		{ time: ms('999h') + ms('59m'), formattedTime: '999:59:00' },
		{ time: ms('999h') + ms('59m') + ms('1s'), formattedTime: '999:59:01' },
		{ time: ms('999h') + ms('59m') + ms('59s'), formattedTime: '999:59:59' },
		{ time: ms('876000h'), formattedTime: '876000:00:00' },
	];

	test.each(testCases)(
		'renders value ($time) to formatted time: ($formattedTime)',
		({ time, formattedTime }) => {
			render(TimeVizualizer, { time });

			const timeElement = screen.getByTestId('time-vizualizer');
			expect(timeElement).toHaveTextContent(formattedTime);
		},
	);
});
