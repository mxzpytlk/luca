<template>
  <div class="acount" v-bind:class="{ 'acount__active' : isAcount }">
    <font-awesome-icon
        icon="arrow-alt-circle-right"
        size="3x"
        class="acount__icon_right"
        @click.prevent="close"
      />
      <div class="acount__content">
        <h2 class="acount__name">{{name}}</h2>
        <form class="acount__pass_form" :class="{ 'hide' : !showForm }" @submit.prevent="changePass">
          <pass-input
            class="acount__pass_input"
            v-for="field of passField"
            v-model="field.pass"
            :key="field.placeholder"
            :placeholder="field.placeholder | locale"
          />
          <span class="acount__pass_error">
            {{ errorText | locale }}
          </span>
          <input type="submit" :value="'send' | locale" class="acount__pass_send">
        </form>
        <button class="acount__pass_change" @click.prevent="changeFormVisibility">{{'change_pass' | locale}}</button>
      </div>
      <font-awesome-icon
        icon="sign-out-alt"
        size="3x"
        class="acount__icon_out"
        @click.prevent="logout"
      />
    </div>
</template>

<script>
import { RouterPath } from '@/core/enums/router-path';
import PassInput from '../pass-input/PassInput';
import './acount.scss';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      showForm: false,
      errorText: '',
      passField: [{
        placeholder: 'old_pass',
        pass: '',
      }, {
        placeholder: 'new_pass',
        pass: '',
      },
      {
        placeholder: 'repeat_pass',
        pass: '',
      }],
    };
  },
  computed: {
    ...mapGetters(['name']),
    isAcount() {
      return this.$route.path === `${RouterPath.MAIN}/${RouterPath.ACOUNT}`;
    },
  },
  methods: {
    close() {
      this.$router.push(RouterPath.MAIN);
    },
    changeFormVisibility() {
      this.showForm = !this.showForm;
    },
    async logout() {
      if (confirm('Are you sure you want to leave your acount')) {
        await this.$store.dispatch('logout');
        this.$router.push(RouterPath.AUTH);
      }
    },


    async changePass() {
      const [oldPass, newPass, repeatPass] = this.passField.map((field) => field.pass);
      if (newPass !== repeatPass) {
        this.errorText = 'pass_are_diff';
        return;
      }
      try {
        await this.$store.dispatch('changePass', { oldPass, newPass });
        for (const pass of this.passField) {
          pass.pass = '';
        }
        this.changeFormVisibility();
      } catch (e) {
        this.errorText = e?.message;
      }
    },
  },
  components: { PassInput },
};
</script>
