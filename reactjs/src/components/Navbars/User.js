// components/Navbar/index.js

import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./navbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />

                <NavMenu>
                    <NavLink to="/News" >
                        Tin Tức
                    </NavLink>
                    <NavLink to="/product" activeStyle>
                        Sản phẩm
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/login">
                        Đăng nhập/Đăng ký
                    </NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;