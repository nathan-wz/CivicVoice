function Navbar() {
    return (
        <nav className="z-999 sticky top-0 h-15 px-2 bg-primary flex justify-between items-center ">
            <div>
                <div></div>
                <div className="text-secondary-alt">CivicVoice</div>
            </div>

            <div>
                <button className="nav-btn">Login</button>
                <button className="nav-btn">Sign Up</button>
            </div>
        </nav>
    );
}

export default Navbar;
