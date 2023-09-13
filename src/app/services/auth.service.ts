import {BehaviorSubject, map, Observable} from "rxjs";
import {User} from "../models/user";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment';
import {Injectable} from "@angular/core";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({ providedIn: 'root' })
export class AuthService {

  helper = new JwtHelperService();
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    // @ts-ignore
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('token')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    console.log('this.userSubject.value.token ', this.userSubject.value)
    // decoder le token jwt
    let user: User;
    if(localStorage.getItem('token') && JSON.stringify(localStorage.getItem('token')))
     user = this.helper.decodeToken(JSON.stringify(localStorage.getItem('token'))) as User;
    // @ts-ignore
    this.userSubject.next(user);
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<User>(`${environment.apiUrl}/auth/signIn`, {username, password})
      .pipe(map(data => {
        console.log('user after login ', data.token);
        // decoder le token jwt
        const user = this.helper.decodeToken(data.token) as User;
        console.log('user ', user);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('token', JSON.stringify(data.token));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('token');
    // @ts-ignore
    this.userSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/auth/signUp`, user);
  }

}
