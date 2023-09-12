import { render, screen } from '@testing-library/react';
import Navbar from '@/components/Navbar';

jest.mock('../../lib/session.ts', () => ({
    getCurrentUser: jest.fn().mockResolvedValue({
        user: {
            name: 'Test User',
            email: 'user@gmail.com',
            image: 'https://via.placeholder.com/150',
        },
        expires: '1',
    }),
}));

jest.mock('next-auth/react', () => ({
    useSession: jest.fn().mockReturnValue([{ user: { name: 'Test User' } }, false]),
}));

it('should render the heading', async () => {

    render(await Navbar())
    const logo = screen.getByTestId('NAV_LOGO');

    expect(logo).toBeInTheDocument();
});
