import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test } from '@jest/globals';
import React from 'react';
import Convert from './Convert';

//testing usdHandler function.

describe('Convert component', () => {
	test('usdHandler function works correctly', () => {
		const inputCurrency = 1;
		const selected = 'usd';

		render(<Convert inputCurrency={inputCurrency} selected={selected} />);

		const usdButton = screen.getByText('USD-BTC');
		fireEvent.click(usdButton);

		const updatedUsdButton = screen.getByText('BTC-USD');
		expect(updatedUsdButton).toBeInTheDocument();
	});
});
