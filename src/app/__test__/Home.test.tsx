import { render, screen } from '@testing-library/react';
import mockNavigation from 'next/navigation';
import Home from '@/app/page';

jest.mock('next/navigation', () => ({
    redirect: jest.fn()
}));

describe('Home', () => {
    it('should render the heading', () => {
        render(<Home />);
        const heading = screen.getByTestId('HOME_DESC');

        expect(mockNavigation.redirect).toHaveBeenCalledWith('/notes');
    });
});
