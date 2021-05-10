<template>
  <div class="auth__container">
    <div class="auth">
      <span class="auth__logo">
        LUCA
      </span>
      <form class="auth__form" @submit.prevent="login">
        <input type="text" class="auth__input luca-input" name="login" placeholder="Login" v-model="name" autocomplete="on" />
        <pass-input
          class="auth__input"
          v-model="pass"
          :placeholder="'Password'"
        />
        <pass-input
          v-if="isPassRegister"
          class="auth__input"
          v-model="repeatPass"
          :placeholder="'Repeat password'"
        />
        <div class="auth__error">{{ errText }}</div>
        <input type="submit" class="auth__submit" v-bind:value="curActionName" />
      </form>
      <router-link v-bind:to="`${otherActionName}`" custom class="auth__link-base auth__link-dotted">
        {{ otherActionName }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { RouterPath } from '@/core/enums/router-path';
import './auth.scss';
import PassInput from '../../components/pass-input/PassInput.vue';
import { IAuthPage } from './auth-page.interface';

export default {
  data() {
    return {
      name: '',
      pass: '',
      repeatPass: '',
      errText: '',
    };
  },
  computed: {
    isPassRegister(): boolean {
      const authPage = this as unknown as IAuthPage;
      return authPage.$route.path === RouterPath.REGISTER;
    },

    curActionName(): 'register' | 'entry' {
      const authPage = this as unknown as IAuthPage;
      return authPage.isPassRegister ? 'register' : 'entry';
    },

    otherActionName(): 'register' | 'entry' {
      const authPage = this as unknown as IAuthPage;
      return authPage.isPassRegister ? 'entry' : 'register';
    },
  },
  methods: {
    async login(): Promise<void> {
      const authPage = this as unknown as IAuthPage;
      const loginAction = authPage.isPassRegister ? 'register' : 'login';

      if (loginAction === 'register' && authPage.pass !== authPage.repeatPass) {
        authPage.errText = 'Passwords are different';
        return;
      }

      const data = {
        name: authPage.name,
        pass: authPage.pass,
      };

      try {
        await authPage.$store.dispatch(loginAction, data);
        await authPage.$router.push(authPage.isPassRegister ? RouterPath.AUTH : RouterPath.MAIN);
        authPage.name = '';
        authPage.pass = '';
        authPage.errText = '';
      } catch (err) {
        authPage.errText = err.message;
      }
    },
  },
  components: { PassInput },
};
</script>
