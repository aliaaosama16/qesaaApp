import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ShowBoardingPageGuard } from './guards/boarding/show-boarding-page.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'boarding',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./../app/pages/tabs-pages/tabs/tabs.module').then(
        (m) => m.TabsPageModule
      ),
  },
  {
    path: 'boarding',
    canActivate: [ShowBoardingPageGuard],
    loadChildren: () =>
      import('./pages/boarding/on-boarding/on-boarding.module').then(
        (m) => m.OnBoardingPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/auth/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'forget-password',
    loadChildren: () =>
      import('./pages/auth/forget-password/forget-password.module').then(
        (m) => m.ForgetPasswordPageModule
      ),
  },
  {
    path: 'verification-code/:userID',
    loadChildren: () =>
      import('./pages/auth/verification-code/verification-code.module').then(
        (m) => m.VerificationCodePageModule
      ),
  },
  {
    path: 'change-password/:userID',
    loadChildren: () =>
      import('./pages/auth/change-password/change-password.module').then(
        (m) => m.ChangePasswordPageModule
      ),
  },
  {
    path: 'image-modal',
    loadChildren: () =>
      import('./pages/modals/image-modal/image-modal.module').then(
        (m) => m.ImageModalPageModule
      ),
  },
  {
    path: 'driver-location',
    loadChildren: () =>
      import('./pages/modals/driver-location/driver-location.module').then(
        (m) => m.DriverLocationPageModule
      ),
  },
  {
    path: 'login-modal',
    loadChildren: () =>
      import('./pages/modals/login-modal/login-modal.module').then(
        (m) => m.LoginModalPageModule
      ),
  },
  {
    path: 'rules',
    loadChildren: () =>
      import('./pages/menu/rules/rules.module').then(
        (m) => m.RulesPageModule
      ),
  },
  {
    path: 'custom-modal',
    loadChildren: () => import('./pages/modals/custom-modal/custom-modal.module').then( m => m.CustomModalPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/modals/splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'notice-modal',
    loadChildren: () => import('./pages/modals/notice-modal/notice-modal.module').then( m => m.NoticeModalPageModule)
  },
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
