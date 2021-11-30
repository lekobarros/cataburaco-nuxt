<template>
  <div>
    <b-container>
      <b-row>
        <!-- List of Events -->
        <b-col>
          <h2 class="mb-4">Lista de Evento</h2>
          <b-container>
            <b-row>
              <b-col class="mb-2" cols="12" v-for="(item, index) in listEvents" :key="index">
                <!-- v-for -->
                <b-card :title="item.name" tag="article">
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