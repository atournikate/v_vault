import Vue from "vue";
import Vuex from "vuex";
// import createPersistedState from "vuex-persistedstate";
// import auth from "./modules/auth";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // sampleBlogCards: [
    //   {
    //     blogTitle: "Blog Card 1",
    //     blogCoverPhoto: "firos-desk",
    //     blogDate: "September 29, 2021",
    //   },
    //   {
    //     blogTitle: "Blog Card 2",
    //     blogCoverPhoto: "nilsson-bw",
    //     blogDate: "September 29, 2021",
    //   },
    //   {
    //     blogTitle: "Blog Card 3",
    //     blogCoverPhoto: "lagos-techie",
    //     blogDate: "September 29, 2021",
    //   },
    //   {
    //     blogTitle: "Blog Card 4",
    //     blogCoverPhoto: "gower-desk",
    //     blogDate: "September 29, 2021",
    //   },
    // ],

    blogPosts: [],
    postLoaded: null,

    blogHTML: "Tell us about the treasures you found here...",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFileURL: null,
    blogPhotoPreview: null,

    editPost: null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
  },
  getters: {
    blogPostFeed(state) {
      return state.blogPosts.slice(0, 2);
    },
    blogPostCards(state) {
      return state.blogPosts.slice(2, 6);
    },
  },
  mutations: {
    newBlogPost(state, payload) {
      state.blogHTML = payload;
    },

    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
    },

    fileNameChange(state, payload) {
      state.blogPhotoName = payload;
    },

    createFileURL(state, payload) {
      state.blogPhotoFileURL = payload;
    },

    openPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },

    toggleEditPost(state, payload) {
      state.editPost = payload;
      // console.log(state.editPost);
    },

    setBlogState(state, payload) {
      state.blogTitle = payload.blogTitle;
      state.blogHTML = payload.blogHTML;
      state.blogPhotoFileURL = payload.blogPhotoFileURL;
      state.blogPhotoName = payload.blogCoverPhotoName;
    },

    filterBlogPost(state, payload) {
      state.blogPosts = state.blogPosts.filter(
        (post) => post.blogID !== payload
      );
    },

    updateUser(state, payload) {
      state.user = payload;
    },

    // setProfileAdmin(state, payload) {
    //   state.profileAdmin = payload;
    //   console.log(state.admin);
    // },

    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().username;
    },

    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("");
    },

    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },

    changeLastName(state, payload) {
      state.profileLastName = payload;
    },

    changeUsername(state, payload) {
      state.profileUsername = payload;
    },
  },
  actions: {
    async getCurrentUser({ commit }) {
      const dataBase = await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      commit("setProfileInfo", dbResults);
      commit("setProfileInitials");
      // const token = await user.getIdTokenResult();
      // const admin = await token.claims.admin();
      // commit("setProfileAdmin", admin);
    },

    async getPost({ state }) {
      const dataBase = await db.collection("blogPosts").orderBy("date", "desc");

      const dbResults = await dataBase.get();

      dbResults.forEach((doc) => {
        if (!state.blogPosts.some((post) => post.blogId === doc.id)) {
          const data = {
            blogID: doc.data().blogID,
            blogHTML: doc.data().blogHTML,
            blogCoverPhoto: doc.data().blogCoverPhoto,
            blogTitle: doc.data().blogTitle,
            blogDate: doc.data().blogDate,
            blogCoverPhotoName: doc.data().blogCoverPhotoName,
          };
          state.blogPosts.push(data);
        }
      });
      state.postLoaded = true;
      // console.log(state.blogPosts);
    },

    async updatePost({ commit, dispatch }, payload) {
      commit("filterBlogPost", payload);
      await dispatch("getPost");
    },

    async deletePost({ commit }, payload) {
      const getPost = await db.collection("blogPosts").doc(payload);
      await getPost.delete();
      commit("filterBlogPost", payload);
    },

    async updateUserSettings({ commit, state }) {
      const dataBase = await db.collection("users").doc(state.profileId);
      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        username: state.profileUsername,
      });
      commit("setProfileInitials");
    },
  },
});
