export class LoginModel {
    public tenancyName: string;
    public usernameOrEmailAddress: string;
    public password: string;

    constructor(tenancyName: string, usernameOrEmailAddress: string, password: string){
        this.tenancyName = tenancyName;
        this.usernameOrEmailAddress = usernameOrEmailAddress;
        this.password = password;
    }

}