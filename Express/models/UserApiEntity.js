
class UserApiEntity {
    id;
    fullName;
    email;
    createdAt;
    updatedAt;

    constructor(databaseUser) {
        this.id = databaseUser.id;
        this.fullName = databaseUser.fullName;
        this.email = databaseUser.email;
        this.createdAt = databaseUser.createdAt;
        this.updatedAt = databaseUser.updatedAt;
    }
}

module.exports = {UserApiEntity};
