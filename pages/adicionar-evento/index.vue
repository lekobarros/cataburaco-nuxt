<template>
  <div class="mt-4">
    <b-container>
      <b-row class="px-3" cols="1">
        <b-form @submit.prevent="onDispatch">
          <h2>Adicionar Evento</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et</p>

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
            <b-form-textarea id="textarea" v-model="form.observation" placeholder="Observação sobre a localização do buraco. (Opcional)" rows="6" max-rows="12" />
          </b-form-group>

          <!-- <b-button variant="dark" block>Anexar Mídia</b-button> -->
          <b-button variant="primary" block type="submit" @click="onDispatch">Enviar</b-button>
        </b-form>
      </b-row>
    </b-container>

    <!-- Modal -->
    <b-modal ref="modalRefs" id="modal-1" title="Informação" centered>
      <h2>Evento Adicionado</h2>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum.
        Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
        turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis,
        felis ut adipiscing.
      </p>

      <p>ID: {{ currentEvent.hash }}</p>
      <p>Data e Horário: {{ $dayjs(currentEvent.date).format('HH:mm:ss - DD/MM/YYYY') }}</p>

      <b-button variant="primary" block>Compartilhar</b-button>
      <b-button variant="primary" block>Voltar ao início</b-button>
    </b-modal>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapState } from 'vuex';
import { required } from 'vuelidate/lib/validators';

// substituri o lorem impusion
// falta adicionar localizacao
// validacao dos inputs
// anexo documentos
// gerar a hash de id unico
// bug do store

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

        // gerar um código numerico, a data, hora e a coordenada geográfica do local onde o denunciante visualizou o “evento”;
        // const {
        //   coords: { latitude, longitude },
        // } = window.navigator.geolocation.getCurrentPosition();
        // const geo = { latitude, longitude };
        // const geo = await window.navigator.geolocation.getCurrentPosition(({ coords }) => coords);
        // console.log(geo);

        // Get const information
        const hash = '984798374878923948324'; // ! Fn
        const date = this.$dayjs().tz("America/Sao_Paulo").valueOf();
        const { name, observation } = this.form;

        // Create the payload
        let payload = { hash, date, name };
        if (observation) payload = { ...payload, observation };

        // Commit on store
        this.$store.commit('global/updateListEvents', payload);
        this.currentEvent = payload;

        // 
        this.$refs['modalRefs'].show()

        // Reset Form
        this.doResetForm();

        // abrir o modal
      } catch (err) {
        // show alert
        console.log(err);
      }
    },
  },
};
</script>