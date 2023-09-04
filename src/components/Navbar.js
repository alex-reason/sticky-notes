import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import logo from '../assets/calendar.png'
import './navbar.scss';

const Navbar = () => {
    const { logout, isPending } = useLogout();
    const { user } = useAuthContext();

    return (
        <nav className='navbar'>
            <Link to='/' className='title'>
                <img src={logo} alt='from blush' />
                <div>
                    <h3>Sticky Notes</h3>
                    <p> a team project tracker</p>
                </div>

            </Link>
            {!user && (
                <>
                    <Link to='/login'>Login</Link>
                    <Link to='/signup'>Signup</Link>
                </>
            )}
            {user &&
                <>
                    {!isPending && <button onClick={logout} className='btn'>Logout</button>}
                    {isPending && <button className='btn' disabled>logging out</button>}
                </>
            }
        </nav>
    )
};

export default Navbar;