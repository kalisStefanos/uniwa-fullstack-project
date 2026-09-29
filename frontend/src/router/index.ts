import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: () => import('@/views/WelcomeView.vue'),
      meta: { hideNavbar: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/RegisterView.vue'),
      meta: { hideNavbar: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
      meta: { hideNavbar: true }
    },
    {
      path: '/error',
      name: 'Error',
      component: () => import('@/views/ErrorView.vue'),
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/DashboardView.vue'),
    },
    {
      path: '/add-building',
      name: 'AddBuilding',
      component: () => import('@/views/AddBuildingView.vue'),
    }, 
    {
      path:'/buildings/:id',
      name: 'BuildingView',
      component: () => import('@/views/BuildingView.vue'),
    },
    {
      path:'/buildings/:id/add-apartment/:floor',
      name: 'AddApartment',
      component: () => import('@/views/AddApartmentView.vue')
    },
    {
      path:'/buildings',
      name:'MyBuildingsView',
      component: () => import('@/views/MyBuildingsView.vue')
    },
    {
      path:'/apartments',
      name:'MyApartmentsView',
      component: () => import('@/views/MyApartmentsView.vue')
    },
    {
      path:'/apartments/:aid',
      name: 'ApartmentView',
      component: () => import('@/views/ApartmentView.vue'),
    },
    {
      path: '/buildings/:id/apartments/:aid',
      name: 'BuildingApartmentView',
      component: () => import('@/views/BuildingApartmentView.vue'),
    },
    {
      path:'/buildings/:id/apartments/:aid/edit',
      name: 'EditApartmentView',
      component: () => import('@/views/EditApartmentView.vue'),
    },
    {
      path:'/buildings/:id/apartments/:aid/bills',
      name: 'ApartmentBillsView',
      component: () => import('@/views/ApartmentBillsView.vue'),
    },
    {
      path: '/buildings/:id/expenses',
      name: 'ExpensesView',
      component: () => import('@/views/ExpensesView.vue')
    },
    {
      path: '/buildings/:id/add-expense',
      name: 'AddExpenseView',
      component: () => import('@/views/AddExpenseView.vue')
    },
    {
      path: '/buildings/:id/add-category',
      name: 'AddExpenseCategoryView',
      component: () => import('@/views/AddExpenseCategoryView.vue')
    },
    {
      path: '/buildings/:id/issue',
      name: 'IssueView',
      component: () => import('@/views/IssueView.vue')
    },
    {
      path: '/buildings/:id/reports',
      name: 'ReportsView',
      component: () => import('@/views/ReportsView.vue')
    }
  ],
});

export default router;
