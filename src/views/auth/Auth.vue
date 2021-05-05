<template>
  <div class="container">
    <div class="auth">
      <span class="auth__logo">
        LUCA
      </span>
      <form class="auth__form" @submit.prevent="login">
        <input type="text" class="auth__input luca-input" name="login" placeholder="Login" v-model="name" autocomplete="on" />
        <div class="auth__input" :key="key">
          <input
            v-bind:type="isPassVisible ? 'text' : 'password'"
            class="auth__input luca-input"
            name="pass"
            placeholder="Password"
            v-model="pass"
            autocomplete="new-password"
          />
          <font-awesome-icon icon="eye" class="auth__icon_eye" @click.prevent="changePassVisibility"/>
        </div>
        <div class="auth__input" v-if="isPathRegister" :key="keyRepeat">
          <input
            v-bind:type="isPassVisibleRepeat ? 'text' : 'password'"
            class="auth__input luca-input"
            name="pass"
            placeholder="Repeat password"
            v-model="repeatPass"
            autocomplete="new-password"
          />
          <font-awesome-icon icon="eye" class="auth__icon_eye" @click.prevent="changePassVisibility(false)"/>
        </div>
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
      repeatPass: '',
      errText: '',
      key: 1,
      keyRepeat: 0,
      isPassVisible: false,
      isPassVisibleRepeat: false,
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

      if (loginAction === 'register' && this.pass !== this.repeatPass) {
        this.errText = 'Passwords are different';
        return;
      }

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

    changePassVisibility(pass = true) {
      if (pass) {
        this.isPassVisible = !this.isPassVisible;
        this.key += 1;
      } else {
        this.isPassVisibleRepeat = !this.isPassVisibleRepeat;
        this.keyRepeat -= 1;
      }
    },
  },
};
</script>
