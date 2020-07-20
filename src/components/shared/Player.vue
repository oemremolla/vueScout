<script>
import { mapActions, mapState } from 'vuex';
import playerDetail from '../../mixins/playerDetail';
import image from '../../mixins/image';
import Modal from './Modal';


export default {
  mixins: [playerDetail, image],
  components: {
    Modal,
  },
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    ...mapState(['lineupPlayers']),
  },
  methods: {
    ...mapActions([
      'addLineup',
    ]),
    addPlayerToLineup(player) {
      if (this.lineupPlayers.length === 11) {
        this.showModal = true;

        return;
      }
      this.addLineup(player);
    },
  },
};
</script>

<template>
  <div
    class="player-box"
  >
    <modal v-if="showModal" @close="showModal = false" />
    <div class="player-detail">
      <div class="player-logo">
        <img
          :src="player.image_url"
          :alt="player.firstname"
          ref="logo"
          loading="lazy"
          @error="handleImageError"
          class="tag-post-link"
        >
      </div>
      <div class="player-info">
        <span>{{ player.firstname }}   {{ player.lastname }}</span>
        <span> {{ player.position && player.position.name }}</span>
      </div>
    </div>
    <div class="minute" v-if="player.minute">
      <span v-if="player.minuteIcon === 'green'">
        <i class="green fa fa-long-arrow-up" />
        {{ player.minute }} '
      </span>
      <span v-else>
        <i class="red fa fa-long-arrow-down" />
        {{ player.minute }} '
      </span>
    </div>
    <div class="player-action" v-if="pickable">
      <span @click="addPlayerToLineup(player)">
        PICK
      </span>
    </div>
  </div>
</template>

<style lang="scss">
  @import 'src/assets/css/variables';

  .player {
    &-box {
      width: 100%;
      display: flex;
      max-width: 100%;
      margin-bottom: 10px;
      align-items: center;
      box-sizing: border-box;
      justify-content: space-between;

      .minute{
        .green{
          color: $aqua-green;
        }
        .red{
          color: $faded-red;
        }
      }
    }

    &-detail{
      display: flex;
      align-items: center;
    }

    &-logo {
      display: flex;
      margin-right: 10px;
      img {
        width: 35px;
        height: 35px;
        border-radius: 20px;
      }
    }

    &-info{
      display: flex;
      flex-direction: column;

      span{
        line-height: normal;

        &:first-child{
          font-size: 16px;
          color: $night-blue;
        }

        &:last-child{
          font-size: 14px;
          color: rgba(17, 50, 96, 0.7);
        }
      }
    }

    &-action{
      span{
        font-size: 12px;
        cursor: pointer;
        color: $light-royal-blue;
      }
    }
  }
</style>
