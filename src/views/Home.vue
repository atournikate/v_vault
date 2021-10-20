<template>
  <div class="home">
    <BlogPost v-if="!user" :post="welcomeScreen" />
    <BlogPost :post="post" v-for="(post, index) in blogPostFeed" :key="index" />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Posts</h3>
        <div class="blog-cards">
          <BlogCard
            :post="post"
            v-for="(post, index) in blogPostCards"
            :key="index"
          />
        </div>
      </div>
    </div>
    <div v-if="!user" class="updates">
      <div class="container">
        <h2>
          Find your gems. Share your treasure. Register for your free account
          today!
        </h2>
        <router-link class="router-button" :to="{ name: 'Register' }"
          >Enter the _vault <Arrow class="arrow arrow-light" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from "../components/BlogPost";
import BlogCard from "../components/BlogCard";
import Arrow from "../assets/Icons/arrow-right-light.svg";

export default {
  name: "Home",
  components: { BlogPost, BlogCard, Arrow },
  data() {
    return {
      welcomeScreen: {
        title: "Welcome!",
        blogPost:
          "A resource for articles, tutorials, and hidden gems in web design. Register now and never miss a post!",
        welcomeScreen: true,
        photo: "baciu-lifebegins",
      },

      // sampleBlogPost: [
      //   {
      //     title: "Sample Title 1",
      //     blogHTML: "sample blog post 1",
      //     blogCoverPhoto: "ash-edmonds-Koxa-GX_5zs-unsplash",
      //   },
      //   {
      //     title: "Sample Title 2",
      //     blogHTML: "sample blog post 2",
      //     blogCoverPhoto: "thisisengineering-raeng-8hgmG03spF4-unsplash",
      //   },
      // ],
    };
  },
  computed: {
    blogPostFeed() {
      return this.$store.getters.blogPostFeed;
    },

    blogPostCards() {
      return this.$store.getters.blogPostCards;
    },

    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }

    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;
      @media (min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;

      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>
