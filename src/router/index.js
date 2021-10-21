import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Blog from "../views/Blog.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Profile from "../views/Profile.vue";
import Admin from "../views/Admin.vue";
import CreatePost from "../views/CreatePost.vue";
import PostPreview from "../views/PostPreview.vue";
import ViewPost from "../views/ViewPost.vue";
import EditPost from "../views/EditPost.vue";
// import firebase from "firebase/app";
// import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
      requiresAuth: false,
    },
  },
  {
    path: "/blog",
    name: "Blog",
    component: Blog,
    meta: {
      title: "Blog",
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
      requiresAuth: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register",
      requiresAuth: false,
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: "Forgot Password",
      requiresAuth: false,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: "Profile",
      requiresAuth: true,
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      title: "Admin",
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      title: "Create Post",
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: "/post-preview",
    name: "PostPreview",
    component: PostPreview,
    meta: {
      title: "Preview Blog Post",
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: "/view-post/:blogid",
    name: "ViewPost",
    component: ViewPost,
    meta: {
      title: "View Blog Post",
      requiresAuth: false,
    },
  },
  {
    path: "/edit-post/:blogid",
    name: "EditPost",
    component: EditPost,
    meta: {
      title: "Edit Blog Post",
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | _vault`;
  next();
});

// router.beforeEach(async (to, from, next) => {
//   let user = firebase.auth().currentUser;
//   let admin = null;
//   if (user) {
//     let token = await user.getIdTokenResult();
//     admin = token.claims.admin;
//   }
//   if (to.matched.some((res) => res.meta.requiresAuth)) {
//     if (user) {
//       if (to.matched.some((res) => res.meta.requiresAdmin)) {
//         if (admin) {
//           return next();
//         }
//         return next({ name: "Home" });
//       }
//       return next();
//     }
//     return next({ name: "Home" });
//   }
//   return next();
// });

export default router;
