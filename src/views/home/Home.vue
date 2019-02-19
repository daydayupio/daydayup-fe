<template>
  <div class="home">{{ users.map(user => user.name) }}</div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "home",
  apollo: {
    users: gql`
      query {
        users {
          email
          name
        }
      }
    `
  }
};
</script>
