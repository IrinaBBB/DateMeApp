import { Component, OnInit } from '@angular/core'
import { AccountService } from '../_services/account.service'
import { Router } from '@angular/router'
import { Toast, ToastrService } from 'ngx-toastr'

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
    model: any = {}

    constructor(
        public accountService: AccountService,
        private router: Router,
        private toaster: ToastrService
    ) {}

    ngOnInit(): void {}

    login() {
        this.accountService.login(this.model).subscribe({
            next: (_) => this.router.navigateByUrl('/members').then(),
            error: (error) => this.toaster.error(error.error),
        })
    }

    logout() {
        this.accountService.logout()
        this.router.navigateByUrl('/').then()
    }
}
