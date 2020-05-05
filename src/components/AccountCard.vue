<template>
  <div>
    <div class="account-card">
    <div class="account-card-left">
      <div class="name">{{account.name}}</div>
      <div class="balance">{{account.subtype}} • Balance ${{account.balances && account.balances.current.toFixed(2) }}</div>
    </div>
    <div class="account-card-right"></div>
  </div>
  </div>
</template>

<script>
export default {
  name: "AccountCard",
  props: ["account"],
  data: function() {
    return {};
  },
  coumputed: {},
  methods: {

  }
};
</script>

<style>
.account-card {
  border-bottom: 1px solid #e3e9ef;
  padding-top: 2px;
  padding-bottom: 20px;
  padding-left: 24px;
  padding-right: 24px;
}
.account-card-left {
  width: 75%;
  /*float: left;*/
}
.account-card-right {
  width: 20%;
  float: right;
}

.name {
  font-size: 16px;
    line-height: 32px;
    display: inline-block;
    font-weight: 500;
    color: #033156;
}
.balance {

}
</style>