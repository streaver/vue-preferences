<template>
  <v-flex xs12 md6 align-end flexbox pr-5>
    <v-tooltip v-model="show" top color="green" open-delay="500">
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="myPersistentMessage"
          label="Write your persistent text here..."
          class="persistant-text"
          v-on="on"
        ></v-text-field>

        <v-text-field
          v-model="myTemporaryMessage"
          label="Write your temporary text here, wait 5 seconds and reload, it will be gone..."
          class="temporary-text"
          v-on="on"
        ></v-text-field>
      </template>
      <span>
        This use can be really useful for multi-input forms. i.e: To avoid loosing what the
        <br />user already filled if they accidentally navigate to other page or refresh it.
      </span>
    </v-tooltip>

    <v-card-text class="blue--text" v-on="on">⬆️ Try refreshing the page after changing it... ⬆️</v-card-text>
  </v-flex>
</template>

<script>
import { preference } from 'vue-preferences';

export default {
  name: 'PersistantText',
  props: {
    on: String,
  },
  computed: {
    myPersistentMessage: preference('persistedMessage', { reactive: false }),
    myTemporaryMessage: preference('temporaryMessage', {
      reactive: false,
      ttl: 5,
    }),
  },
  data() {
    return {
      show: null,
    };
  },
};
</script>

<style scoped>
.persistant-text {
  font-size: 20px;
}
</style>
