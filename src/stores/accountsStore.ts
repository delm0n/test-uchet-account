import { defineStore } from 'pinia'
import type { Account } from "../types/account";

type State = {
    accounts: Account[];
}


export const useAccountsStore = defineStore('accounts', {
    state: (): State => ({
        accounts: []
    }),

    actions: {
        // Добавляет новую учетную запись
        addAccount(account: Omit<Account, 'id'>) {
            const newAccount: Account = {
                ...account,
                id: Date.now().toString(), // простой способ генерации уникального ID
            };
            this.accounts.push(newAccount);

        },

        // Обновляет существующую запись
        updateAccount(updatedAccount: Account) {

            const index = this.accounts.findIndex((acc: Account) => acc.id === updatedAccount.id);
            if (index !== -1) {
                this.accounts[index] = updatedAccount;
                this.saveToLocalStorage();
            }

        },

        // Удаляет запись по id
        deleteAccount(id: string) {
            this.accounts = this.accounts.filter((acc: Account) => acc.id !== id);
            this.saveToLocalStorage();
        },

        // Возвращает запись по id
        getAccountById(id: string): Account | undefined {
            return this.accounts.find((acc: Account) => acc.id === id);
        },

        // Сохраняет состояние в localStorage
        saveToLocalStorage() {
            localStorage.setItem('accounts', JSON.stringify(this.accounts));
        },

        // Загружает состояние из localStorage
        loadFromLocalStorage() {
            const saved = localStorage.getItem('accounts');
            if (saved) {
                try {
                    this.accounts = JSON.parse(saved);
                } catch (e) {
                    console.error('Ошибка при загрузке данных из localStorage', e);
                }
            }
        },


    }
})