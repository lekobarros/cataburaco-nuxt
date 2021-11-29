<template>
  <div class="mt-4">
    <b-container>
      <b-row class="px-3" cols="1">
        <b-form @submit.prevent="onDispatch">
          <h2>Adicionar Evento</h2>
          <p>Hello</p>

          <!-- Field Address -->
          <b-form-group id="input-adress" label="Endereço:" label-for="input-adress">
            <b-form-input id="input-adress" type="text" placeholder="(Requerido)" v-model="form.address.address" />
            <!-- <b-form-invalid-feedback>
              {{ isValideAddress }}
            </b-form-invalid-feedback> -->
          </b-form-group>
          <!-- / Field Address -->

          <!-- BAIRRO E ETC ? -->

          <!-- Field Number -->
          <b-form-group id="input-address-number" label="Número:" label-for="input-address-number">
            <b-form-input id="input-address-number" placeholder="(Requerido)" v-model="form.address.number" />
          </b-form-group>
          <!-- / Field Number -->

          <!-- Field Observation -->
          <b-form-group id="input-address-number" label="Observação:" label-for="input-address-number">
            <b-form-textarea id="textarea" v-model="form.observation" placeholder="Observação" rows="6" max-rows="12" />
          </b-form-group>

          <b-button variant="dark" block>Anexar Mídia</b-button>
          <b-button variant="primary" block type="submit" @click="onDispatch">Enviar</b-button>
        </b-form>
      </b-row>
    </b-container>

    <b-button v-b-modal.modal-1>Launch demo modal</b-button>

    {{ listEvents }}

    <!-- Modal -->
    <b-modal id="modal-1" title="Informação" centered>
      <h2>Evento Adicionado</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum.
        Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
        turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis,
        felis ut adipiscing.
      </p>

      <p>Id: 312321321323</p>
      <p>Data e Horário: 312321321323</p>

      <b-button variant="primary" block>Compartilhar</b-button>
      <b-button variant="primary" block>Voltar ao início</b-button>
    </b-modal>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapState } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  head: function () {
    return {
      title: 'Adicionar Evento',
    };
  },
  data() {
    return {
      form: {
        address: {
          address: null,
          number: null,
        },
        observation: null,
        submitted: false,
      },
      dispatch: {
        error: false,
        dispatched: false,
      },
    };
  },

  validations: {
    form: {
      address: {
        address: {
          required,
        },
        number: {
          required,
        },
      },
    },
  },

  computed: {
    ...mapState('global', ['listEvents']),

    isValideAddress: function () {
      const err = this.dispatch.submitted && this.$v.form.address.address.$invalid;
      if (err) {
        const listErr = {
          'Campo obrigatorio.': !this.$v.installation.address.address.required,
          // 'Informe o endereço por completo.': this.$v.installation.address.address.verifyRegex,
        };
        return _.keys(_.pickBy(listErr));
      } else return false;
    },
  },

  methods: {
    doResetForm: function () {
      const form =  {
        address: {
          address: null,
          number: null,
        },
        observation: null,
        submitted: false,
      };

      this.form = form;
    },

    onDispatch: function () {
      if (this.dispatch.dispatched) return;

      // Validate the form
      this.dispatch.submitted = true;
      this.$v.form.$reset();
      this.$v.form.$touch();

      // Check error on form
      if (this.$v.form.$invalid) return;
      else this.dispatch.dispatched = true;

  console.log('ok')
      try {
        const { address } = this.form;
        const payload = { address };

        this.$store.commit('global/updateListEvent', payload);

        // Reset Form
        this.doResetForm();

        // abrir o modal
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
.css {
  background: red;
}
</style>