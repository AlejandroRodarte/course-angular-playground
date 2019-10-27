// user model
export class UserModel {

    // email, user id, token and token expiration date
    // underscore naming is a convention to indicate these are private variables
    constructor(public email: string, public id: string,
                private _token: string, private _tokenExpirationDate: Date) {

    }

    // getter for the token (access it as if it were a property but the value we receive depends
    // on this method logic)
    get token() {

        // if the token expiration date does not even exist or it already expired, return null
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }

        // if not, return the token
        return this._token;

    }

}