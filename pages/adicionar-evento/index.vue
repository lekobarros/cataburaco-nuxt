<template>
  <div>
    <b-container>
      <b-row class="px-3" cols="1">
        <b-form @submit.prevent="onDispatch">
          <h2>Adicionar Evento</h2>
          <p>Informe o nome do local onde encontrou o buraco.</p>

          <!-- Field Address -->
          <b-form-group id="input-adress" label="Nome do Buraco:" label-for="input-adress">
            <b-form-input id="input-adress" type="text" placeholder="Descreva a localização" v-model="form.name" />
            <!-- <b-form-invalid-feedback>
              {{ isValideAddress }}
            </b-form-invalid-feedback> -->
          </b-form-group>
          <!-- / Field Address -->

          <!-- Field Observation -->
          <b-form-group id="input-address-number" label="Observação:" label-for="input-address-number">
            <b-form-textarea
              id="textarea"
              v-model="form.observation"
              placeholder="Observação sobre a localização do buraco. (Opcional)"
              rows="6"
              max-rows="12"
            />
          </b-form-group>

          <!-- <b-button variant="dark" block>Anexar Mídia</b-button> -->
          <b-button variant="primary" block type="submit" @click="onDispatch">Enviar</b-button>
        </b-form>
      </b-row>
    </b-container>

    <!-- Modal -->
    <b-modal ref="modalRefs" id="modal-1" title="Informação" centered>
      <b-container fluid>
        <h2>Evento Adicionado</h2>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum.
          Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis,
          felis ut adipiscing.
        </p>

        <p>ID: {{ currentEvent.id }}</p>
        <p>Data e Horário: {{ $dayjs(currentEvent.date).format('HH:mm:ss - DD/MM/YYYY') }}</p>

        <b-button variant="primary" block to="/lista-de-eventos">Lista de Eventos</b-button>
        <b-button variant="primary" block to="/">Voltar ao início</b-button>
      </b-container>
      <template #modal-footer> <div></div> </template>
    </b-modal>

    <!-- Notifications -->
    <notifications group="notifications" position="top right" />
  </div>
</template>

<script>
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { mapState } from 'vuex';
import { required } from 'vuelidate/lib/validators';

// substituri o lorem impusion
// validacao dos inputs
// anexo documentos

export default {
  head: function () {
    return {
      title: 'Adicionar Evento',
    };
  },
  data() {
    return {
      form: {
        name: null,
        address: {
          address: null,
          number: null,
        },
        observation: null,
        submitted: false,
      },
      currentEvent: false,
      dispatch: {
        error: false,
        dispatched: false,
      },
    };
  },

  validations: {
    form: {
      name: {
        required,
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
    doRandNumeber: function () {},
    doResetForm: function () {
      const form = {
        address: {
          address: null,
          number: null,
        },
        observation: null,
        submitted: false,
      };

      this.form = form;
    },
    getGeolocalization: function () {
      return new Promise((resolve, reject) => {
        try {
          window.navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          });
        } catch (err) {
          reject(err);
        }
      });
    },
    // GET
    onDispatch: async function () {
      if (this.dispatch.dispatched) return;

      // Validate the form
      this.dispatch.submitted = true;
      this.$v.form.$reset();
      this.$v.form.$touch();

      // Check error on form
      if (this.$v.form.$invalid) return;
      else this.dispatch.dispatched = true;

      try {
        const isAvaibleLocalization = window.navigator.geolocation;

        // If isn't avaible geolozalization
        if (!isAvaibleLocalization) throw new Error('API Geolocalização indisponivel');

        // Get const information
        const id = uuidv4();
        const date = this.$dayjs().tz('America/Sao_Paulo').valueOf();
        const geoPos = await this.getGeolocalization();
        const { name, observation } = this.form;

        // Create the payload
        let payload = { id, date, geoPos, name };
        if (observation) payload = { ...payload, observation };

        // Commit on store
        this.$store.commit('global/updateListEvents', payload);
        this.currentEvent = payload;

        // Open the modal
        this.$refs['modalRefs'].show();

        // Reset Form
        this.doResetForm();
      } catch (err) {
        // Show error with notification
        this.$notify({
          group: 'notifications',
          title: 'Error!',
          text: err.menssage,
        });
      } finally {
        this.dispatch.dispatched = false;
      }
    },
  },
};
</script>

<style lang="scss">
.vue-notification {
  padding: 10px;
  margin: 0 5px 5px;

  font-size: 12px;

  color: #ffffff;
  background: #44a4fc;
  border-left: 5px solid #187fe7;

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    background: #e54d42;
    border-left-color: #b82e24;
  }

  &.success {
    background: #68cd86;
    border-left-color: #42a85f;
  }
}
</style>