'use client';

import dynamic from 'next/dynamic';

const MobileMenu = dynamic(() => import('./MobileMenu'), {
    ssr: false,
});

const MobileMenuWrapper = () => {
    return <MobileMenu />;
};

export default MobileMenuWrapper;
