<template>
<transition name="slide" mode="out-in">
  <div class="box">
    <div 
    class="item-card"
    v-bind:style="textColor"
    @click="getAuthData">
      <div class="item-card-inner">
        <img alt="" class="item-card__img" :src="`data:image/jpeg;base64,${institution.logo}`">
        <p class="name">{{ institution.name }}</p>
      </div>
  </div>
  <div>
    <div v-if="showAccounts">
      <app-accounts :accounts="authData && authData.accounts">
      </app-accounts>
    </div>
    <div v-else>
      <div></div>
    </div>

  </div>
  </div>
  </transition>
</template>

<script>
import axios from "axios";
import Accounts from "./Accounts.vue";

export default {
  name: "itemCard",
  props: ['item'],

  components: {
    appAccounts: Accounts
  },

  data: function() {
    return {
      showAccounts: true,
      authData: null,
      institution: null,
      textColor: {
        color: '#174f7c'
      }
    }
  },

  created () {
    this.institution = this.item.institution;
    this.textColor.color = this.institution.primary_color;
  },
 
  methods: {
    async getAuthData() {
      this.showAccounts = !this.showAccounts;
      if (this.authData != null) return

      // Get Auth data
      const self = this;
      await axios
        .get("/auth", { access_token: this.item.access_token })
        .then(function(response) {
          //console.log(response)
          self.authData = response.data.auth;
          self.showAccounts = true;
          console.log('self', self)
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style>
.item-card {
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px 0 0;
  background-color: rgb(247, 249, 251);
  border-bottom: #e3e9ef;

  border-width: 1px;
    border-color: #e3e9ef;
    border-style: solid;
    border-radius: 4px;
    margin-bottom: 24px;
    box-shadow: 0 2px 4px 0 rgba(19, 49, 69, 0.2);
}

.item-card-inner {
  padding: 20px 0 20px 20px;
  width: 100%;
  display: flex;
  align-items: center;
}

.item-card__img {
    height: 32px;
    padding-right: 1rem;
}

.name {
  margin: 0;
}

.slide-enter-active {
  animation: slide-in 500ms ease-out forwards;
  animation-delay: 1s
}
.slide-leave-active {
  animation: slide-out 500ms ease-out forwards;
  animation-delay: 1s
}

@keyframes slide-in {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
    opacity: 0;
  }
  to {
    transform: translateY(-40px);
    opacity: 1;
  }
}

</style>