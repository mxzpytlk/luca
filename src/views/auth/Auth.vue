<template>
  <div class="container">
    <div class="auth">
        <span class="auth__logo">
          LUCA
        </span>
        <form class="auth__form">
          <input type="text" class="auth__input luca-input" name="login" placeholder="Login">
          <input type="password" class="auth__input luca-input" name="pass" placeholder="Password">
          <input type="submit" class="auth__submit" value="entry">
        </form>
      </div>
  </div>
</template>

<script>
import './auth.scss';

export default {};
</script>
