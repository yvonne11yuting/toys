import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home', () => {
    it('should render the heading', () => {
        render(<Home />);
        const heading = screen.getByTestId('HOME_DESC');

        expect(heading).toBeInTheDocument();
    });
});
