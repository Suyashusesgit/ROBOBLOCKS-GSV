import React from 'react';
import styled from 'styled-components';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import Feature3D from './Scene3D';
import PageTransition from './PageTransition';

const Main = styled.main`
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding-top: 0; /* Hero covers top */
`;

const Layout = () => {
    const location = useLocation();

    return (
        <>
            <Navbar />
            {/* <Scene3D /> */}
            <Main>
                <AnimatePresence mode="wait">
                    <PageTransition key={location.pathname}>
                        <Outlet />
                    </PageTransition>
                </AnimatePresence>
            </Main>
            <Footer />
        </>
    );
};

export default Layout;
