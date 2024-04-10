import React from 'react';

import './_Header.scss';

interface HeaderProps {
    children: React.ReactNode;
}

function Header({ children }: HeaderProps) {
    return <h1 className="headline">{children}</h1>;
}

export default Header;
