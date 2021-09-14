import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "defaultLayout",
    component: () => import("@/views/layout/DefaultLayout.vue"),
    redirect: "/homepage",
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: "homepage",
        name: "homepage",
        component: () => import("@/views/home/Homepage.vue"),
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if(savedPosition){
      return savedPosition;
    } else {
      return { top: 0 }
    }
  },
});

export default router;
