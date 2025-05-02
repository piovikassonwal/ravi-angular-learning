export interface LoginResponse{
    jwtToken: string;
    username: string;
    firstName : string;
    roles : string[];
}