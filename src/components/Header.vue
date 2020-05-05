<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="banner">
        <header>
          <div class="banner">
            <h3>Manage External Account</h3>
            <plaid-link-button></plaid-link-button>
          </div>
          <p class="paragraph">Below is a list of items. Click on an item to view its associated accounts.</p>
        </header>
      </div>
    </div>
  </div>
</template>

<script>
import PlaidLink from "./PlaidLink.vue";

export default {
  name: "Header",
  components: {
    "plaid-link-button": PlaidLink
  }
};
</script>

<style scoped>
header {
  border-bottom: 1px solid #e3e9ef;
  
  padding-bottom: 5px;
  width: 100%;
}

.banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

h3 {
  color: #033156;
  font-size: 2.2rem;
  font-weight: normal;
  line-height: 1.2rem;
  margin-bottom: 1rem;
}

.paragraph {
  color: #527084;
   font-size: 1.4rem;
  line-height: 2.4rem;
  margin-bottom: 0;
}
</style>