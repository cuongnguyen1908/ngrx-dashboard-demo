import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-root-nav',
  templateUrl: './root-nav.component.html',
  styleUrls: ['./root-nav.component.scss']
})
export class RootNavComponent implements OnDestroy, OnInit{
  userSub: Subscription;
  isAuthenticated = false;
  toggleUser = false;
  logo = 'https://i.pinimg.com/originals/b9/91/4a/b9914a4b875a487b1c0a7a9359dc5ed7.png';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
  ngOnInit() {
    this.userSub = this.authService.user
    .subscribe(user =>
      {
        this.isAuthenticated = user ? true : false;
      });
  }

  onShowUserManage() {
    this.toggleUser = !this.toggleUser;
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
