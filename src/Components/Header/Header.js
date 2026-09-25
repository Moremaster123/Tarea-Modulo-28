
import React from 'react';
import { Link } from 'react-router-dom';
import {
    HeaderContainer,
    Title,
    Navigation,
    NavLink
} from './Header.styles';

function Header() {
    return (
        <HeaderContainer>
            <Title>Biblioteca Musical</Title>

            <Navigation>
                <NavLink as={Link} to="/">
                    Inicio
                </NavLink>
            </Navigation>
        </HeaderContainer>
    );
}

export default Header;