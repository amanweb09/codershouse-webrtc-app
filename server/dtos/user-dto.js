class UserDto {

    constructor(user) {
        this._id = user._id;
        this.phone = user.phone;
        this.activated = user.activated;
        this.createdAt = user.createdAt;
        this.name = user.name ? user.name : null;
        user.avatar ? this.avatar = `${process.env.BASE_URL}${user.avatar}` : this.avatar = null
    }

}

module.exports = UserDto