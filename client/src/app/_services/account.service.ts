import { User } from '../_models/user'
import { BehaviorSubject, map } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    baseUrl = 'http://localhost:5249/api/'
    private currentUserSource = new BehaviorSubject<User | null>(null)
    currentUser$ = this.currentUserSource.asObservable()

    constructor(private http: HttpClient) {}

    login(model: any) {
        return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
            map((response: User) => {
                const user = response
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user))
                    this.currentUserSource.next(user)
                }
            })
        )
    }

    register(model: any) {
        return this.http
            .post<User>(this.baseUrl + 'account/register', model)
            .pipe(
                map((response) => {
                    const user = response
                    if (user) {
                        localStorage.setItem('user', JSON.stringify(user))
                        this.currentUserSource.next(user)
                    }
                })
            )
    }

    setCurrentUser(user: User) {
        this.currentUserSource.next(user)
    }

    logout() {
        localStorage.removeItem('user')
        this.currentUserSource.next(null)
    }
}
