// userService.js

module.exports = {
    createUser: async ({username, email, password}) => {
        const payload = {
            username,
            email,
            password
        };
        await validateRegister(payload);…
        payload.password = await bcrypt.hash(password, 10);
        let newUser = await UserModel.create(payload);
        await scheduler.scheduleActiveEmail({username, email, url: newUser.activeLink});
        return newUser;
    }
};