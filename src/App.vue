<template>
  <v-app id="app">
    <v-app-bar
            color="primary"
            dark
            height="48px"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-items>
        <v-btn
          text
          v-for="(link, index) in links"
          :key="index"
        >
          <router-link :to="link.url">{{link.name}}</router-link>
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script>
  export default {
    name: "App",
    data(){
      return{
        links:[
          {
            name: 'home',
            url: '/'
          },
          {
            name: 'Database',
            url: '/database'
          }
        ]
      }
    }

  };
</script>
<style lang="scss">
  .v-application .v-toolbar__content{
    .v-btn__content{
      a{
        color: white;
        text-decoration: none;
        &.router-link-exact-active{
          color: black;
        }
      }
    }

  }

  .v-content{
    padding: 25px!important;
    height: 100%;
  }
</style>
