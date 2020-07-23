# Vue-Plaid
This is a reference Vue.js application demonstrating an end-to-end [plaid] integration, focussed on linking items and fetching transaction data.

## Getting Started

1. Clone the repo.
    ```shell
    git clone https://github.com/parvezk/vue-plaid.git
    cd pattern
    ```

2. Project setup
    ```
    npm install
    ```

3. Generate payment token in the sandbox environment / initiate payments
    ```
    PLAID_CLIENT_ID='CLIENT_ID' \
    PLAID_SECRET='SECRET' \
    PLAID_PUBLIC_KEY='PUBLIC_KEY' \
    PLAID_ENV='sandbox' \
    PLAID_PRODUCTS='payment_initiation' \
    PLAID_COUNTRY_CODES='US' \
    node index.js

    # Go to http://localhost:8000
    ```

4. Exchanging the public token for an access token

#. Compiles and hot-reloads for development
```
npm run serve
```

#. Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## License

[MIT](LICENSE)
[plaid]: https://plaid.com