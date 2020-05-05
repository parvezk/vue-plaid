<template>
  <div class="row">
    <app-account-card 
      v-for="account in accounts" 
      :key="account.account_id" 
      :account="account">
    </app-account-card>
  </div>
</template>

<script>
import AccountCard from "./AccountCard.vue";

export default {
  name: "Accounts",
  props: ["accounts"],
  components: {
    "app-account-card": AccountCard
  },
  data: function() {
    return {};
  },
  created: {},
  methods: {}
};
</script>

<style>
</style>