<template>
  <div class="item-list">
    <div class="row">
      <transition-group>
        <app-item-card
        v-for="item in items"
        :key="item.item_id"
        :item="item"
        >
          Item card here
        </app-item-card>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { serverBus } from '../main';
import ItemCard from "./ItemCard.vue";

export default {
  name: "itemList",
  components: {
    "app-item-card": ItemCard
  },
  
  data: function() {
    return {
      items: []
    }
  },

  watch: {
    items: function() {    
    }
  },
  
  created () {
    serverBus.$on('itemAdded', (itemAccess) => {
      const {access_token, item_id, institution} = itemAccess;

      this.items.push({
        access_token,
        item_id,
        institution
      });
      
    });
  },

  methods: {},
}
</script>

<style>

</style>