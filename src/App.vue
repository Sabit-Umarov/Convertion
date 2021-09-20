<template>
  <v-app style="background-color: rgb(38, 155, 255)" class="wrapper">
      <div class="main-wrapper">
        <v-card :elevation="6">
        <div class="main-wrapper__header">
          <v-tabs>
            <v-tab to="/">Список валют</v-tab>
            <v-tab to="/converter">Конвертер</v-tab>
          </v-tabs>
        </div>
          <router-view></router-view>
        </v-card>
      </div>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({}),
};
</script>

<style lang="scss">
.wrapper {
  padding: 24px;
}
.inside-wrapper {
  padding: 24px;
}
.main-wrapper{
  width: 100%;
  max-width: 1400px;
  min-width: 300px;
  margin: auto;

  &__header {
    width: 100%;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    overflow: hidden;
  }
}
</style>