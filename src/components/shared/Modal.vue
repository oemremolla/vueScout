<script>


import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      errors: [],
      out: null,
      inPlayer: null,
      minute: null,
    };
  },
  computed: {
    ...mapState(['lineupSelect', 'allPlayers', 'substitutes']),
  },
  methods: {
    ...mapActions(['addSubstition']),
    checkForm(e) {
      e.preventDefault();
      this.errors = [];

      if (!this.out) {
        this.errors.push('outPlayer required.');
      }
      if (!this.inPlayer) {
        this.errors.push('inPlayer required.');
      }
      if (!this.minute || this.minute > 120) {
        this.errors.push('Wrong Minute');
      }

      const substitution = {
        outPlayer: this.out,
        inPlayer: this.inPlayer,
        minute: this.minute,
      };

      if (!this.errors.length && this.substitutes.length !== 3) {
        this.addSubstition(substitution).then(() => {
          this.out = null;
          this.inPlayer = null;
          this.minute = null;
        });
      }
    },
  },
};
</script>

<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              Add Substition
            </slot>
          </div>

          <div class="red" v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
              <li :key="error.index" v-for="error in errors">
                {{ error }}
              </li>
            </ul>
          </div>

          <div class="modal-body">
            <slot name="body">
              <form
                id="app"
                @submit="checkForm"
                action="https://vuejs.org/"
                method="post"
                novalidate="true"
              >
                <p class="input-wrapper select-wrapper">
                  <label for="out">OUT PLAYER</label>
                  <select
                    id="out"
                    v-model="out"
                    name="out"
                  >
                    <option :value="null" disabled>
                      Enter player name
                    </option>
                    <option :key="player.id" v-for="player in lineupSelect" :value="player.id">
                      {{ player.firstname }}  {{ player.lastname }}
                    </option>
                  </select>
                </p>
                <p class="input-wrapper select-wrapper">
                  <label for="inPlayer">IN PLAYER</label>
                  <select
                    id="inPlayer"
                    v-model="inPlayer"
                    name="inPlayer"
                  >
                    <option :value="null" disabled>
                      Enter player name
                    </option>
                    <option :key="player.id" v-for="player in allPlayers" :value="player.id">
                      {{ player.firstname }}  {{ player.lastname }}
                    </option>
                  </select>
                </p>
                <p class="input-wrapper">
                  <label for="minute">SUBSTITUTION MINUTE</label>
                  <input
                    id="minute"
                    v-model="minute"
                    type="text"
                    name="minute"
                    placeholder="Enter minute of substitution"
                  >
                </p>
                <p class="form-footer">
                  <span class="modal-close-button" @click="$emit('close')">
                    Cancel
                  </span>
                  <input
                    type="submit"
                    value="Add"
                    :disabled="!minute"
                  >
                </p>
              </form>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
  @import 'src/assets/css/variables';

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 375px;
    padding: 20px;
    margin: 0 auto;
    border-radius: 8px;
    box-sizing: border-box;
    background-color: $white;
    border: solid 1px #707070;
    transition: all 0.3s ease;

    @media (max-width: 768px) {
      width: 100%;
      max-width: 100%;
      margin-top: 20px;
    }
  }

  .modal-header {
    font-size: 16px;
    color: $night-blue;
  }

  .modal-body {
    .input-wrapper{
      margin-top: 15px;
    }

    label {
      display: block;
      font-size: 12px;
      font-weight: 500;
      color: $slate-blue;
      text-transform: uppercase;
    }

    input[type='text'], select {
      width: 100%;
      height: 48px;
      font-size: 16px;
      padding-left: 25px;
      border-radius: 8px;
      color: $bluey-grey;
      box-sizing: border-box;
      background-color: $white;
      border: solid 1px $bluey-grey;

      &::placeholder{
        color: $bluey-grey;
      }
    }

    .select-wrapper{
      position: relative;
      select {
        z-index: 15;
        text-indent: 1px;
        text-overflow: '';
        position: relative;
        -moz-appearance: none;
        -webkit-appearance: none;
        background-color: transparent;
      }
      &:after{
        content: "\f053";
        right: 20px;
        bottom: 15px;
        color: $slate-blue;
        font-size: inherit;
        position: absolute;
        text-rendering: auto;
        display: inline-block;
        transform: rotate(-90deg);
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        font: normal normal normal 14px/1 FontAwesome;
      }
    }
  }

  .form-footer{
    display: flex;
    margin-top: 15px;
    align-items: center;
    justify-content: flex-end;

    input{
      width: 126px;
      border-radius: 8px;
      text-transform: capitalize;
      background-color: $night-blue;

      &:disabled{
        background-color: $bluey-grey;
      }
    }
  }

  .modal-close-button {
    font-size: 12px;
    cursor: pointer;
    color: $faded-red;
    padding-right: 35px;
  }

  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

</style>
