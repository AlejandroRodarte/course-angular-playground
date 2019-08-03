// dummy authentication service
export class AuthService {

    // logged in boolean
    loggedIn: boolean = false;

    // login
    login(): void {
        this.loggedIn = true;
    }

    // logout
    logout(): void {
        this.loggedIn = false;
    }

    // check for authentication
    isAuthenthicated(): Promise<boolean> {

        // return a new promise: set a fake timeout (reaching to server)
        // and later resolve to return the loggedIn boolean
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.loggedIn)
            }, 800);
        });

    }

}