<script>
import { mapState } from 'vuex';
import Modal from './Modal';
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
      default: 'Please pick 11 players for lineup before creating any substitutions',
    },
    pick: {
      type: Boolean,
      required: false,
      default: false,
    },
    substitution: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  components: {
    Modal,
    PlayerInfo,
  },
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    ...mapState(['substitutes', 'lineupPlayers']),
  },
};
</script>

<template>
  <div class="player-list-wrapper">
    <modal v-if="showModal" @close="showModal = false" />
    <div class="player-list-header">
      Substitutes
    </div>
    <div class="all-player-list" :class="{ empty_list: lineupPlayers.length !== 11 }">
      <div class="player-list" v-if="lineupPlayers.length === 11">
        <player-info
          v-for="player in players"
          :key="player.id"
          :player="player"
          :pickable="pick"
        />
        <div v-if="substitution" class="substitution" @click="showModal = true">
          + Add Substitution
        </div>
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
  .substitution{
    font-size: 14px;
    cursor: pointer;
    color: $aqua-green;
  }
</style>
