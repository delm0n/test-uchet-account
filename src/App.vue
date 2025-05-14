<script setup lang="ts">
import AccountList from "./components/AccountsList.vue";

import { useAccountsStore } from "./stores/accountsStore";
const accountsStore = useAccountsStore();

function addNewAccount() {
  accountsStore.addAccount({
    labelTags: [],
    type: "LDAP",
    login: "",
    password: null,
  });
}
</script>

<template>
  <div>
    <div class="d-flex align-items-center gap-3">
      <h1 class="m-0 fs-1">Учётные записи</h1>
      <button @click="addNewAccount" class="btn btn-primary fw-medium">
        +
      </button>
    </div>

    <div
      class="d-flex gap-3 align-items-center rounded-3 p-3 bg-light mb-4 mt-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="flex-shrink-0"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
        ></path>
        <path
          d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"
        ></path>
      </svg>

      <p class="mb-0 fs-6">
        Для указания нескольких меток для одной пары логин/пароль используйте
        разделитель ;
      </p>
    </div>

    <AccountList />
  </div>
</template>

<style lang="scss">
body {
  font-family: "Arial";
  padding: 20px;

  button,
  section {
    cursor: pointer;
  }
}
</style>
