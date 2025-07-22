function UserForm() {
    return (
        <form className="user-form" action="">
            {/* Login */}

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />

            <label htmlFor="password">Password</label>
            <input type="password" />

            <input type="submit" value="Sign up" className="button" />

            {/* Sign up */}

            <label htmlFor="username">Username</label>
            <input type="text" />

            <label htmlFor="email">Email</label>
            <input type="email" />

            <label htmlFor="password">password</label>
            <input type="password" />

            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" />

            <label htmlFor="location">Location</label>
            <div className="flex justify-between w-full">
                <input type="text" placeholder="Country" />
                <input type="text" placeholder="City" />
                <input type="text" placeholder="County" />
            </div>

            <input type="submit" value="Sign up" className="button" />
        </form>
    );
}

export default UserForm;
