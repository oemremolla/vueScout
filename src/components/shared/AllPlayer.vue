<script>
import PlayerInfo from './Player';
import Loader from './Loader';

export default {
  props: {
    isLoading: {
      type: Boolean,
      required: false,
      default: true,
    },
    players: {
      type: Array,
      required: true,
    },
    pick: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  components: {
    PlayerInfo,
    Loader,
  },
};
</script>

<template>
  <div class="player-list-wrapper">
    <div class="player-list-header">
      All Players
    </div>
    <div class="all-player-list">
      <loader v-if="isLoading" />
      <player-info
        v-for="player in players"
        :key="player.id"
        :player="player"
        :pickable="pick"
      />
    </div>
  </div>
</template>

<style lang="scss">
  @import 'src/assets/css/variables';
</style>
