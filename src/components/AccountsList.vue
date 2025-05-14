<script setup lang="ts">
import { onMounted } from "vue";
import AccountItem from "./AccountItem.vue";
import { useAccountsStore } from ".././stores/accountsStore";
import type { Account } from "../types/account";

const accountsStore = useAccountsStore();

onMounted(() => {
  accountsStore.loadFromLocalStorage();
});

const updateAccount = (account: Account) => {
  accountsStore.updateAccount(account);
};
</script>

<template>
  <div class="accounts-list">
    <div v-for="account in accountsStore.accounts" :key="account.id">
      <AccountItem
        :account="account"
        @update="updateAccount"
        @delete="accountsStore.deleteAccount"
      />
    </div>
  </div>
</template>
