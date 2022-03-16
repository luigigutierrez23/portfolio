import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import styled from 'styled-components';
import { IconContext } from 'react-icons/lib';

const Nav = styled.div`
    background: #ffff;
    height: 60px;
    display:flex;
    align-items:center;
`;

const NavIcon = styled(Link)`
    margin-left: 1rem;
    font-size: 1.5rem;
    height: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

function NavBar() {
    return (
        <IconContext.Provider value={{ color: '#000' }}>
            <Nav>
                <NavIcon to='#'>
                    <FaIcons.FaBars />
                </NavIcon>

            </Nav>
        </IconContext.Provider>
    )
}

export default NavBar;