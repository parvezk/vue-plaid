<template>
  <button
    id="link-btn"
    class="primary"
    v-bind:class="[effects]"
    @click="handler"
    @mouseover="onEffects"
    @mouseleave="offEffects"
  >Add Account</button>
</template>

<script>
import axios from "axios";
import { serverBus } from "../main";

export default {
  name: "PlaidLink",
  props: ['itemData'],
  data: () => {
    const self = this;

    return {
      effects: {
        env: 'sandbox',
        highlight: false,
        active: false
      },
      plaid: window.Plaid.create({

        apiVersion: "v2",
        clientName: "Plaid Quickstart",
        // Optional, specify an array of ISO-3166-1 alpha-2 country
        // codes to initialize Link; European countries will have GDPR
        // consent panel
        countryCodes: ["US"],
        env: "sandbox",
        key: "84a7445d0079ac82674a4ce1d831e3",
        product: ["auth"],
        // Optional, use webhooks to get transaction and error updates
        webhook: "https://requestb.in",
        // Optional, specify a language to localize Link
        language: "en",
        // Optional, specify userLegalName and userEmailAddress to
        // enable all Auth features
        userLegalName: "John Appleseed",
        userEmailAddress: "jappleseed@yourapp.com",

        onLoad: function() {
          // Optional, called when Link loads
        },
        onSuccess: async function( public_token, { institution, accounts, link_session_id }) {
          console.log("---success-->");
          console.log(public_token, { institution, accounts, link_session_id });
          const instId = institution.institution_id;
          // Send the public_token to your app server.
          // The metadata object contains info about the institution the
          // user selected and the account ID or IDs, if the
          // Select Account view is enabled.
          let itemData;
          await axios
            .post("/get_access_token", { public_token })
            .then(function(response) {
              itemData = {
                access_token: response.data.access_token,
                item_id: response.data.item_id,
                institution: {
                  institution_id: institution
                }
              }
              
            })
            .catch(function(error) {
              console.log(error);
            });

          await axios
            .get('/item')
            .then(function(response) {
              const {institution_id, logo, name, primary_color} = response.data;

              itemData.institution = {
                ...itemData.institution,
                ...{
                institution_id,
                logo,
                name,
                primary_color
              }
              }

              serverBus.$emit('itemAdded', {...itemData});
            })
            .catch(function(error) {
              console.log(error);
          });

        },
        onExit: function(err) {
          // The user exited the Link flow.
          if (err != null) {
            // The user encountered a Plaid API error prior to exiting.
          }
          // metadata contains information about the institution
          // that the user selected and the most recent API request IDs.
          // Storing this information can be helpful for support.
        },
        onEvent: function() {
          // Optionally capture Link flow events, streamed through
          // this callback as your users connect an Item to Plaid.
          // For example:
          // eventName = "TRANSITION_VIEW"
          // metadata  = {
          //   link_session_id: "123-abc",
          //   mfa_type:        "questions",
          //   timestamp:       "2017-09-14T14:42:19.350Z",
          //   view_name:       "MFA",
          // }
        }
      })
    }
  },
  methods: {
    handler: function() {
      this.plaid.open();
    },
    addItem(itemData) {
      //serverBus.$emit("itemAdded", this.itemData);
    },
    onEffects: function() {
      this.effects.highlight = !this.effects.highlight;
    },
    offEffects: function() {
      this.effects.highlight = !this.effects.highlight;
    }
  }
};
</script>

<style scoped>
button,
.button {
  border-bottom-width: 0;
  border-radius: 4px;
  border-width: 0;
  display: inline-block;
  font-size: 1.6rem;
  height: 4.8rem;
  line-height: 4.8rem;
  padding-bottom: 0;
  padding-left: 2.4rem;
  padding-right: 2.4rem;
  padding-top: 0;
  position: relative;
  text-decoration: none;
}

#link-btn {
  cursor: pointer;
  background-color: #174f7c;
  box-shadow: 0 1px 2px rgba(3, 49, 86, 0.3), inset 0 -1px 0 #0d3f68,
    inset 0 1px 0 #2f6089;
  color: #fff;
  font-weight: 500;
  text-shadow: 0 1px 1px rgba(3, 49, 86, 0.8);
  outline: 0;
  box-sizing: border-box;
}

.primary {
  background-color: #174f7c;
  color: #fff;
}

.highlight {
  border-color: #fff;
  background-color: #174fa2;
}

.active {
  background-color: 174f7c;
  border-color: #ddd;
  color: #444;
}
</style>