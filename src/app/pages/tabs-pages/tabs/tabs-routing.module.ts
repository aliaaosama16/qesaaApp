import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthGuard } from 'src/app/guards/isAuth/is-auth.guard';
import { RoleGuard } from 'src/app/guards/Role/role.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./../../tabs-pages/home/home.module').then(
                (m) => m.HomePageModule
              ),
          },
          {
            path: 'info',
            loadChildren: () =>
              import(
                './../../charity-goals-message/charity-goals-message.module'
              ).then((m) => m.CharityGoalsMessagePageModule),
          },
          {
            path: 'families',
            loadChildren: () =>
              import(
                './../../productive-families/productive-families.module'
              ).then((m) => m.ProductiveFamiliesPageModule),
          },
          {
            path: 'families/:id',
            loadChildren: () =>
              import(
                './../../productive-families-details/productive-families-details.module'
              ).then((m) => m.ProductiveFamiliesDetailsPageModule),
          },
          {
            path: 'market',
            canActivate: [IsAuthGuard],
            children: [
              {
                path: '',
                loadChildren: () =>
                  import('./../../charity-market/charity-market.module').then(
                    (m) => m.CharityMarketPageModule
                  ),
              },
              {
                path: 'product/:id',
                loadChildren: () =>
                  import(
                    './../../charity-market-product/charity-market-product.module'
                  ).then((m) => m.CharityMarketProductPageModule),
              },
              {
                path: 'products',
                loadChildren: () =>
                  import(
                    './../../charity-market-products/charity-market-products.module'
                  ).then((m) => m.CharityMarketProductsPageModule),
              },
              {
                path: 'requests',
                loadChildren: () =>
                  import(
                    './../../charity-market-requests/charity-market-requests.module'
                  ).then((m) => m.CharityMarketRequestsPageModule),
              },
            ],
          },
        ],
      },
      {
        path: 'notifications',
        canActivate: [IsAuthGuard],
        loadChildren: () =>
          import('./../../tabs-pages/notifications/notifications.module').then(
            (m) => m.NotificationsPageModule
          ),
      },
      {
        path: 'donation-order',
        canActivate: [IsAuthGuard,RoleGuard],
        loadChildren: () =>
          import(
            './../../tabs-pages/donation-order/donation-order.module'
          ).then((m) => m.DonationOrderPageModule),
      },
      {
        path: 'my-orders',
        canActivate: [IsAuthGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./../../tabs-pages/my-orders/my-orders.module').then(
                (m) => m.MyOrdersPageModule
              ),
          },
          {
            path: 'details/:id',
            loadChildren: () =>
              import(
                './../../tabs-pages/my-order-details/my-order-details.module'
              ).then((m) => m.MyOrderDetailsPageModule),
          },
        ],
      },
      {
        path: 'account',
        canActivate: [IsAuthGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./../../tabs-pages/account/account.module').then(
                (m) => m.AccountPageModule
              ),
          },
          {
            path: 'edit',
            loadChildren: () =>
              import(
                './../../tabs-pages/account-edit/account-edit.module'
              ).then((m) => m.AccountEditPageModule),
          },
          {
            path: 'contact-with-admin',
            loadChildren: () =>
              import(
                './../../contact-with-admin/contact-with-admin.module'
              ).then((m) => m.ContactWithAdminPageModule),
          },
          {
            path: 'static-help-policy',
            loadChildren: () =>
              import(
                './../../static-help-policy/static-help-policy.module'
              ).then((m) => m.StaticHelpPolicyPageModule),
          },
        ],
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./../../menu/about/about.module').then(
            (m) => m.AboutPageModule
          ),
      },
      {
        path: 'our-services',
        children: [
          {
            path: '',
            loadChildren: () =>
              import(
                './../../menu/media/our-services/our-services.module'
              ).then((m) => m.OurServicesPageModule),
          },
          {
            path: 'details/:id',
            loadChildren: () =>
              import(
                './../../menu/media/media-details/media-details.module'
              ).then((m) => m.MediaDetailsPageModule),
          },
        ],
      },
      {
        path: 'news',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./../../menu/media/news/news.module').then(
                (m) => m.NewsPageModule
              ),
          },
          {
            path: 'details/:id',
            loadChildren: () =>
              import(
                './../../menu/media/media-details/media-details.module'
              ).then((m) => m.MediaDetailsPageModule),
          },
        ],
      },
      {
        path: 'our-projects',
        children: [
          {
            path: '',
            loadChildren: () =>
              import(
                './../../menu/media/our-projects/our-projects.module'
              ).then((m) => m.OurProjectsPageModule),
          },
          {
            path: 'details/:id',
            loadChildren: () =>
              import(
                './../../menu/media/media-details/media-details.module'
              ).then((m) => m.MediaDetailsPageModule),
          },
        ],
      },
      {
        path: 'gallery',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./../../menu/media/gallery/gallery.module').then(
                (m) => m.GalleryPageModule
              ),
          },
          {
            path: 'details/:id',
            loadChildren: () =>
              import(
                './../../menu/media/media-details/media-details.module'
              ).then((m) => m.MediaDetailsPageModule),
          },
        ],
      },
      {
        path: 'volunteer-with-us',
        loadChildren: () =>
          import(
            './../../menu/volunteer-with-us/volunteer-with-us.module'
          ).then((m) => m.VolunteerWithUsPageModule),
      },
      {
        path: 'support-productive-families',
        loadChildren: () =>
          import(
            './../../menu/support-productive-families/support-productive-families.module'
          ).then((m) => m.SupportProductiveFamiliesPageModule),
      },
      {
        path: 'our-presence',
        loadChildren: () =>
          import('./../../menu/our-presence/our-presence.module').then(
            (m) => m.OurPresencePageModule
          ),
      },
      {
        path: 'contact-with-us',
        loadChildren: () =>
          import('./../../menu/contact-with-us/contact-with-us.module').then(
            (m) => m.ContactWithUsPageModule
          ),
      },
      {
        path: 'suggestions',
        loadChildren: () =>
          import('./../../menu/suggestions/suggestions.module').then(
            (m) => m.SuggestionsPageModule
          ),
      },
      {
        path: 'rules',
        loadChildren: () =>
          import('./../../menu/rules/rules.module').then(
            (m) => m.RulesPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
