import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import SmoothScroll from '../animations/SmoothScroll';
import ParticleBackground from './ParticleBackground';

const Main = styled.main`
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding-top: 0; /* Hero covers top */
`;

const Layout = () => {
    return (
        <>
            <Navbar />
            <SmoothScroll>
                <ParticleBackground />
                <Main>
                    <Outlet />
                </Main>
                <Footer />
            </SmoothScroll>
        </>
    );
};

export default Layout;
