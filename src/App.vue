<template>
  <v-app>
    <Header />
    <v-main>
      <Container />
    </v-main>
  </v-app>
</template>

<script>
import Container from "@/components/Container";
import Header from "@/components/header/Header.vue";

export default {
  name: "App",

  components: {
    Container,
    Header,
  },
  data: () => ({}),
};
</script>
