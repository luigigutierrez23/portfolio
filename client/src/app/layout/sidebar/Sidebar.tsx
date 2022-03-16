import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SideBarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/store';
import { SideBarItem } from '../../models/sidebar';

interface Props {
    sidebar?:boolean;
}

const Nav = styled.div`
    background: #15171c;
    height: 80px;
    display:flex;
    justify-content:flex-start;
    align-items:center;
`;

const NavIcon = styled(Link)`
    margin-left: 2rem;
    font-size: 2rem;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const SidebarNav = styled.nav<Props>`
  background: #15171c;
  width: 226px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

export default observer(function Sidebar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const {
        userStore: { user, logout, isLoggedIn },
    } = useStore();

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
            {/* <Nav> */}
            {/* <NavIcon to='#'>
                <FaIcons.FaBars onClick={showSidebar} />
            </NavIcon> */}
            {/* </Nav> */}
            <SidebarNav sidebar={true}>
                <SidebarWrap>
                    <NavIcon to='#'>
                    {/* <AiIcons.AiOutlineClose onClick={showSidebar} /> */}
                    </NavIcon>
                    {SideBarData.map((item:SideBarItem, index:any) => {
                    return <SubMenu item={item} key={index} />;
                    })}
                </SidebarWrap>
            </SidebarNav>
        </IconContext.Provider>
        </>

    );
});