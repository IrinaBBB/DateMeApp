import { Injectable } from '@angular/core'
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http'
import { Observable, catchError } from 'rxjs'
import { NavigationExtras, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private toaster: ToastrService
    ) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error) => {
                if (error) {
                    switch (error.status) {
                        case 400:
                            if (error.error.errors) {
                                console.log(error)
                                const modelStateErrors = []
                                for (const key in error.error.errors) {
                                    if (error.error.errors[key]) {
                                        modelStateErrors.push(
                                            error.error.errors[key]
                                        )
                                    }
                                    this.toaster.error(error.error.errors[key], error.status)
                                }
                                throw modelStateErrors.flat()
                            } else {
                                this.toaster.error(error.error, error.status)
                            }
                            break
                        case 401:
                            this.toaster.error('Unauthorised', error.status)
                            break
                        case 404:
                            this.router.navigateByUrl('/not-found').then()
                            break
                        case 500:
                            const navigationExtras: NavigationExtras = {
                                state: { error: error.error },
                            }
                            this.router
                                .navigateByUrl(
                                    '/server-error',
                                    navigationExtras
                                )
                                .then()
                            break
                        default:
                            this.toaster.error(
                                'Something unexpected went wrong'
                            )
                            console.log(error)
                            break
                    }
                }
                throw error
            })
        )
    }
}
