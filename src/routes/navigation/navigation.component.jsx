import {Fragment, useContext} from "react";
import {Outlet, Link } from "react-router-dom";

import { ReactComponent as CrwnLogo }  from "../../assets/crown.svg";

import {UserContext} from "../../contexts/user.context";
import {CartContext} from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase/firbase.utils";

import CartIcon from "../../components/cart-icon/cart-icon.component";

import "./navigation.styles.scss";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { IsCartOpen, setIsCartOpen } = useContext(CartContext);

    const signOutHandler = async () => await signOutUser();

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <CrwnLogo className="logo" />
                </Link>

                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">
                        SHOP
                    </Link>
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={signOutHandler}> {' '}SIGN OUT{' '}</span>
                        ) : (
                            <Link className="nav-link" to="/auth">
                                SIGNIN
                            </Link>
                        )
                    }

                    <CartIcon />
                </div>

                { IsCartOpen && <CartDropdown /> }
            </div>

            <Outlet />
        </Fragment>
    )
}

export default Navigation;