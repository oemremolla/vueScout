<script>
import { mapState, mapActions } from 'vuex';
import Lineup from '../shared/Lineup';
import AllPlayer from '../shared/AllPlayer';
import Substitutes from '../shared/Substitutes';

export default {
  components: {
    Lineup,
    AllPlayer,
    Substitutes,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    ...mapState(['allPlayers', 'lineupPlayers', 'substitutes']),
  },
  methods: {
    ...mapActions(['fetchAllPlayers']),
    fetchPlayers() {
      this.fetchAllPlayers('4029').then(() => {
        this.isLoading = false;
      });
    },
    successPage() {
      this.$router.push('/success');
    },
  },
  created() {
    this.fetchPlayers();
  },
};
</script>

<template>
  <div>
    <section id="page">
      <div class="container listing" :class="{ empty: !allPlayers.length }">
        <div class="listing-header">
          <div class="team-logo">
            <img src="../../assets/images/logo.png" alt="">
            <span>Besiktas JK</span>
          </div>
          <div class="confirm-button">
            <button @click="successPage()" :disabled="lineupPlayers.length < 11">
              Confirm
            </button>
          </div>
        </div>
        <div class="listing-wrapper">
          <all-player :is-loading="isLoading"
                      :players="allPlayers"
          />
          <lineup :players="lineupPlayers" />
          <substitutes :players="substitutes" :substitution="true" />
        </div>
      </div>
    </section>
  </div>
</template>


<style lang="scss">
  @import 'src/assets/css/variables';
  @import '../shared/style/list-component';

  .listing{
    padding: 20px;
    margin-top: 30px;
    border-radius: 12px;
    box-sizing: border-box;
    background-color: $white;
    &-wrapper{
      display: flex;
      justify-content: space-between;

      @media (max-width: 768px) {
        flex-direction: column;
      }
    }

    &-header{
      display: flex;
      margin-bottom: 15px;
      justify-content: space-between;

      .team-logo{
        display: flex;
        align-items: center;

        span{
          font-size: 20px;
          padding-left: 10px;
          color: $night-blue;
        }
      }
      .confirm-button{
        button{
          width: 225px;
          border-radius: 8px;
          text-transform: capitalize;
          background-color: $light-royal-blue;

          &:disabled{
            background-color: $bluey-grey;
          }

          @media (max-width: 768px) {
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          width: 50%;
        }
      }
    }
    @media (max-width: 768px) {
      width: 95%;
    }
  }
</style>
