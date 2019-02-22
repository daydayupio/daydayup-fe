import Vue from "vue";
import Router from "vue-router";
import Index from "./views/home/Index.vue";
import Home from './views/home/Home.vue';
import Auth from './views/auth/Auth.vue';
import SubjectIndex from './views/subject/Index.vue'
import SubjectDetail from './views/subject/Detail.vue'
import SubjectNew from './views/subject/New.vue'
import TopicDetail from './views/topic/Detail.vue'
import TopicNew from './views/topic/New.vue'

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: Index,
      children: [
        {
          path: '',
          name: 'home',
          meta: {group: 'home'},
          component: Home,
        },
        {
          path: 'subjects',
          name: 'subjects',
          meta: {group: 'subjects'},
          component: SubjectIndex
        },
        {
          path: 'subject/:name',
          name: 'subject',
          meta: {group: 'subjects'},
          component: SubjectDetail
        },
        {
          path: 'create/subject',
          name: 'createSubject',
          meta: {group: 'subjects'},
          component: SubjectNew
        },
        {
          path: 'subject/:subjectName/topics/:id',
          name: 'topic',
          meta: {group: 'subjects'},
          component: TopicDetail
        },
        {
          path: 'subject/:subjectName/create/topic',
          name: 'createTopic',
          meta: {group: 'subjects'},
          component: TopicNew
        },
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Auth
    },
    {
      path: "/register",
      name: "register",
      component: Auth
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});
