import React from 'react'
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useUserContext } from '../hooks/useUserContext';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useUserContext();

    return (
        <header>
            <div className="container">
                <h1><Link to={'/'}>Workout Buddy</Link></h1>

                <nav>
                    {user && <div>
                        <span>{user.email}</span>
                        <button onClick={() => logout()}>Logout</button>
                    </div>}

                    {!user && <div>
                        <Link to={'/login'}>Login</Link>
                        <Link to={'/signup'}>Sign Up</Link>
                    </div>}
                </nav>

            </div>
        </header>
    )
}

export default Navbar