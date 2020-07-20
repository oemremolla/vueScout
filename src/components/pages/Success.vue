<script>
import { mapState, mapActions } from 'vuex';
import Lineup from '../shared/Lineup';
import Substitutes from '../shared/Substitutes';

export default {
  components: {
    Lineup,
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
  },
  created() {
    this.fetchPlayers();
  },
};
</script>

<template>
  <div>
    <section id="page">
      <div class="container listing">
        <div class="success-header">
          <img src="../../assets/images/ok-sign.png" alt="">
          <h1>Squad saved successfully</h1>
        </div>
        <div class="listing-wrapper">
          <div class="player-list-wrapper logo-list-wrapper">
            <div class="team-logo">
              <img src="../../assets/images/logo-2.png" alt="">
              <span>Besiktas JK</span>
            </div>
          </div>
          <lineup :players="lineupPlayers" />
          <substitutes :players="substitutes" :substitution="false" />
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
    margin: 30px auto 20px auto;
    border-radius: 12px;
    box-sizing: border-box;
    background-color: $white;
    &-wrapper{
      display: flex;
      justify-content: space-between;

      @media (max-width: 768px) {
        flex-direction: column;
      }

      .logo-list-wrapper{
        display: flex;
        justify-content: center;

        .team-logo{
          display: flex;
          text-align: center;
          flex-direction: column;

          img{
            width: 64px;
            margin: auto;
          }
          span{
            font-size: 20px;
            margin-top: 10px;
            color: $night-blue;
          }
        }
      }
    }

    .success-header{
      display: flex;
      margin: 50px 0;
      align-items: center;
      justify-content: center;

      img{
        width: 40px;
        margin-right: 10px;
      }
      h1{
        font-size: 20px;
        color: $night-blue;
        font-weight: normal;
      }
    }

    @media (max-width: 768px) {
      width: 95%;
    }
  }
</style>
