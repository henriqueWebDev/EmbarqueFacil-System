
const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') }
    ]
  },
  {
    path: '/create-account',
    component: () => import('layouts/CreateAccountLayout.vue'),
    children: [
      { path: 'type-account', component: () => import('pages/AccountTypeRegistrationPage.vue') },
      { path: 'type-account/client', component: () => import('pages/RegisterClientPage.vue') },
      { path: 'type-account/enterprise', component: () => import('pages/RegisterEnterprisePage.vue') }
    ]
  },
  {
    path: '/screen',
    component: () => import('layouts/ScreenLayout.vue'),
    children: [
      { path: 'admin', component: () => import('pages/AdminPage.vue')},
      { path: 'admin/edit', component: () => import('pages/AdminEditPage.vue')},
      { path: 'admin/dashboard', component: () => import('pages/DashboardPage.vue') },
      { path: 'admin/client-report', component: () => import('pages/ClientReportPage.vue') },
      { path: 'admin/client-report/client/:id', component: () => import('pages/ClientDataViewPage.vue'), props: true },
      { path: 'admin/default-report', component: () => import('pages/DefaultReportPage.vue') },
      { path: 'admin/usage-report', component: () => import('pages/UsageReportPage.vue') },
      { path: 'admin/registered-drivers', component: () => import('pages/RegisteredDriversPage.vue') },
      { path: 'admin/registered-drivers/register', component: () => import('pages/RegisterDriverPage.vue') },
      { path: 'client', component: () => import('pages/ClientPage.vue') },
      { path: 'client/edit', component: () => import('pages/ClientEditPage.vue') },
      { path: 'client/cards', component: () => import('pages/CardsPage.vue') },
      { path: 'client/help', component: () => import('pages/HelpPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  }
]

export default routes
