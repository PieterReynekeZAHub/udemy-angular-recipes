import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import * as fromApp from "../store/app.reducer"
import * as authActions from "../auth/store/auth.actions"
import {Store} from "@ngrx/store";
import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  private closeSub: Subscription;
  private storeSub: Subscription;


  constructor(private authService: AuthService, private componentFactoryResolver: ComponentFactoryResolver, private router: Router, private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    console.log('AUTH Component')
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        console.log("WHat is error ", this.error)
        this.showErrorAlert(this.error)
      }
    })
  }

  ngOnDestroy() {
    if(this.storeSub){
      this.storeSub.unsubscribe()
    }
    if(this.closeSub){
      this.closeSub.unsubscribe()
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  protected readonly onsubmit = onsubmit;

  onSubmit(form: NgForm) {
    this.error = null;

    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;


    if (this.isLoginMode) {
      // authObs = this.authService.login(email, password);
      this.store.dispatch(authActions.loginStart({email: email, password: password}))
    } else {
      this.store.dispatch(authActions.signupStart({email: email, password: password}))
    }


    form.reset();
  }

  private showErrorAlert(message: string) {

    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
