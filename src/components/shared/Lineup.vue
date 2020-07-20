<script>
import { mapState } from 'vuex';
import PlayerInfo from './Player';

export default {
  props: {
    players: {
      type: Array,
      required: true,
    },
    notFoundText: {
      type: String,
      required: false,
      default: 'You haven’t selected any player for lineup yet.',
    },
    pick: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {
    PlayerInfo,
  },
  computed: {
    ...mapState(['lineupPlayers']),
  },
};
</script>

<template>
  <div class="player-list-wrapper">
    <div class="player-list-header">
      Lineup
    </div>
    <div class="all-player-list lineup" :class="{ empty_list: !lineupPlayers.length }">
      <div class="player-list" v-if="players.length">
        <player-info
          v-for="player in players"
          :key="player.id"
          :player="player"
          :pickable="pick"
        />
      </div>
      <div v-else>
        <p>
          <span>{{ notFoundText }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import 'src/assets/css/variables';
</style>
