<template>
  <div class="container">
    <div class="auth">
      <span class="auth__logo">
        LUCA
      </span>
      <form class="auth__form" @submit.prevent="login">
        <input type="text" class="auth__input luca-input" name="login" placeholder="Login" v-model="name" />
        <input type="password" class="auth__input luca-input" name="pass" placeholder="Password" v-model="pass" />
        <div class="auth__error">{{ errText }}</div>
        <input type="submit" class="auth__submit" v-bind:value="curActionName" />
      </form>
      <router-link v-bind:to="`${otherActionName}`" custom class="auth__link-base auth__link-dotted">
        {{ otherActionName }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { RouterPath } from '@/core/enums/router-path';
import './auth.scss';

export default {
  data() {
    return {
      name: '',
      pass: '',
      errText: '',
    };
  },
  computed: {
    isPathRegister() {
      return this.$route.path === RouterPath.REGISTER;
    },
    curActionName() {
      return this.isPathRegister ? 'register' : 'entry';
    },
    otherActionName() {
      return this.isPathRegister ? 'entry' : 'register';
    },
  },
  methods: {
    login() {
      const path = this.$route.path;

      const loginAction = path === RouterPath.REGISTER ? 'register' : 'login';

      const data = {
        name: this.name,
        pass: this.pass,
      };

      this.$store
        .dispatch(loginAction, data)
        .then(() => {
          this.$router.push(this.isPathRegister ? RouterPath.AUTH : RouterPath.MAIN);
          this.name = '';
          this.pass = '';
          this.errText = '';
        })
        // tslint:disable-next-line: no-console
        .catch((err) => {
          this.errText = err.message;
          // tslint:disable-next-line: no-console
          console.trace();
          // tslint:disable-next-line: no-console
          console.error(err);
        });
    },
  },
};
</script>
