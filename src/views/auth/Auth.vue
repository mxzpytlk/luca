<template>
  <div class="container">
    <div class="auth">
      <span class="auth__logo">
        LUCA
      </span>
      <form class="auth__form" @submit.prevent="login">
        <input type="text" class="auth__input luca-input" name="login" placeholder="Login" v-model="name" />
        <input type="password" class="auth__input luca-input" name="pass" placeholder="Password" v-model="pass" />
        <input type="submit" class="auth__submit" value="entry" />
      </form>
    </div>
  </div>
</template>

<script>
import './auth.scss';

export default {
  data() {
    return {
      name: '',
      pass: '',
    };
  },
  methods: {
    login() {
      const data = {
        name: this.name,
        pass: this.pass,
      };



      this.$store
        .dispatch('login', data)
        .then(() => this.$router.push('/'))
        // tslint:disable-next-line: no-console
        .catch((err) => console.log(err));
    },
  },
};
</script>
