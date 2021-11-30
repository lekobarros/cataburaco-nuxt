<template>
  <div>
    <b-container>
      <b-row>
        <!-- List of Events -->
        <b-col>
          <h2 class="mb-4">Lista de Evento</h2>
          <b-container>
            <b-row>
              <b-col>
                <!-- v-for -->
                <b-card
                  :title="item.name"
                  img-src="https://picsum.photos/600/300/?image=25"
                  img-alt="Image"
                  img-top
                  tag="article"
                  style="max-width: 20rem"
                  class="mb-2 block w-100"
                  v-for="(item, index) in listEvents"
                  :key="index"
                >
                  <b-card-text v-if="item.observation">
                    {{ item.observation }}
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
        <!-- / List of Events -->
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  head: function () {
    return {
      title: 'Lista de Eventos',
    };
  },
  computed: {
    ...mapState('global', ['listEvents']),
  },
};
</script>

<style>
</style>