<script setup lang="ts">
import { ref, watchEffect, computed } from "vue";
import type { Account } from "../types/account";

// Пропсы для формы
const props = defineProps<{
  account: Account;
}>();

const emit = defineEmits<{
  (e: "update", account: Account): void;
  (e: "delete", id: string): void;
}>();

// Локальное состояние формы
const localAccount = ref<Account>({ ...props.account });

// Состояние ошибок
const errors = ref({
  login: "",
  password: "",
});

// Состояние использования
const touched = ref({
  login: false,
  password: false,
});

// Показывать пароль
const showPassword = ref(localAccount.value.type === "Локальная");
// Показывать текст пароля
const showPasswordText = ref(false);

// При изменении типа обновляем видимость пароля
watchEffect(() => {
  if (localAccount.value.type === "LDAP") {
    localAccount.value.password = null;
    showPassword.value = false;
  } else {
    showPassword.value = true;
  }
});

// Валидация полей
const validate = () => {
  let isValid = true;

  // Очищаем ошибки
  errors.value = {
    login: "",
    password: "",
  };

  if (!localAccount.value.login.trim()) {
    errors.value.login = "Логин обязателен";
    isValid = false;
  }

  if (
    localAccount.value.type === "Локальная" &&
    !localAccount.value.password?.trim()
  ) {
    errors.value.password = "Пароль обязателен";
    isValid = false;
  }

  return isValid;
};

// Сохранение при валидности
const saveAccount = () => {
  if (validate()) {
    emit("update", localAccount.value);
  }
};

// Парсер строки меток в массив объектов
const parseLabelTags = (label: string): { text: string }[] => {
  const trimmedLabel = label.slice(0, 50);

  return trimmedLabel
    .split(";")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0)
    .map((tag) => ({ text: tag }));
};

// Вычисляемое свойство для отображения в input
const labelTagsString = computed({
  get(): string {
    return localAccount.value.labelTags
      .map((tag: { text: string }) => tag.text)
      .join("; ");
  },
  set(newValue: string) {
    const parsedTags = parseLabelTags(newValue);
    localAccount.value.labelTags = parsedTags;
  },
});

// Триггер обрезки логина до 100 символов
const onLoginInput = () => {
  if (localAccount.value.login.length > 100) {
    localAccount.value.login = localAccount.value.login.slice(0, 100);
  }
};

// Триггер обрезки пароля до 100 символов
const onPasswordInput = () => {
  if (localAccount.value.password && localAccount.value.password.length > 100) {
    localAccount.value.password = localAccount.value.password.slice(0, 100);
  }
};
</script>

<template>
  <div class="account-form border p-3 mb-3 rounded shadow-sm">
    <!-- Метка -->
    <div class="mb-3">
      <label class="form-label">Метка</label>
      <input
        v-model="labelTagsString"
        type="text"
        class="form-control"
        placeholder="Введите метки через ;"
        @blur="saveAccount()"
      />
      <small class="text-muted d-block mt-1">
        Максимум 50 символов. Разделитель – точка с запятой.
        <span class="float-end">{{ labelTagsString.length || 0 }}/50</span>
      </small>
    </div>

    <!-- Тип записи -->
    <div class="mb-3">
      <label class="form-label">Тип записи</label>
      <select
        v-model="localAccount.type"
        class="form-select"
        @change="saveAccount()"
      >
        <option value="LDAP">LDAP</option>
        <option value="Локальная">Локальная</option>
      </select>
    </div>

    <!-- Логин -->
    <div class="mb-3">
      <label class="form-label">Логин</label>
      <input
        v-model="localAccount.login"
        type="text"
        class="form-control"
        :class="{ 'is-invalid': touched.login && errors.login }"
        @blur="
          saveAccount();
          touched.login = true;
        "
        @input="onLoginInput()"
        placeholder="Значение"
      />
      <small v-if="touched.login && errors.login" class="invalid-feedback">{{
        errors.login
      }}</small>
      <small v-else class="text-muted"
        >Обязательное к заполнению. Максимум 100 символов
        <span class="float-end"
          >{{ localAccount.login.length }}/100</span
        ></small
      >
    </div>

    <!-- Пароль -->
    <div v-if="showPassword" class="mb-3">
      <label class="form-label">Пароль</label>
      <div :class="{ 'is-invalid': errors.password }">
        <div class="input-group">
          <input
            v-model="localAccount.password"
            :type="showPasswordText ? 'text' : 'password'"
            class="form-control"
            :class="{ 'is-invalid': touched.password && errors.password }"
            @blur="
              saveAccount();
              touched.password = true;
            "
            @input="onPasswordInput"
          />
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="showPasswordText = !showPasswordText"
          >
            {{ showPasswordText ? "Скрыть" : "Показать" }}
          </button>
        </div>
      </div>
      <small
        v-if="touched.password && errors.password"
        class="invalid-feedback"
        >{{ errors.password }}</small
      >
      <small v-else class="text-muted"
        >Обязательное к заполнению. Максимум 100 символов

        <span class="float-end"
          >{{ localAccount.password?.length || 0 }}/100</span
        >
      </small>
    </div>

    <!-- Кнопка удаления -->
    <button
      @click="$emit('delete', account.id)"
      class="btn btn-danger btn-sm fw-medium"
    >
      Удалить
    </button>
  </div>
</template>
