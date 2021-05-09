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

<script lang="ts">
import { RouterPath } from '@/core/enums/router-path';
import PassInput from '../pass-input/PassInput.vue';
import './acount.scss';
import { mapGetters } from 'vuex';
import { IAcount } from './acount.interface';

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
    isAcount(): boolean {
      const acount = this as unknown as IAcount;
      return acount.$route.path.endsWith(RouterPath.ACOUNT);
    },
  },

  methods: {
    close(): void {
      const acount = this as unknown as IAcount;
      acount.$router.push(RouterPath.MAIN);
    },

    changeFormVisibility(): void {
      const acount = this as unknown as IAcount;
      acount.showForm = !acount.showForm;
    },

    async logout(): Promise<void> {
      const acount = this as unknown as IAcount;
      if (confirm('Are you sure you want to leave your acount')) {
        await acount.$store.dispatch('logout');
        acount.$router.push(RouterPath.AUTH);
      }
    },

    async changePass(): Promise<void> {
      const acount = this as unknown as IAcount;
      const [oldPass, newPass, repeatPass] = acount.passField.map((field) => field.pass);
      if (newPass !== repeatPass) {
        acount.errorText = 'pass_are_diff';
        return;
      }
      try {
        await acount.$store.dispatch('changePass', { oldPass, newPass });
        for (const pass of acount.passField) {
          pass.pass = '';
        }
        this.changeFormVisibility();
        acount.errorText = '';
      } catch (e) {
        acount.errorText = e?.message;
      }
    },

  },
  components: { PassInput },
};
</script>
