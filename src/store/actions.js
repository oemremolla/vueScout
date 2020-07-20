import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';
import * as constants from './constants';

const http = axios.create({
  baseURL: 'https://api.scoutium.com/api/',
  adapter: cacheAdapterEnhancer(axios.defaults.adapter),
});

export default {
  toggleLoading({ commit }) {
    commit(constants.TOGGLE_LOADING);
  },
  addLineup: ({ commit }, product = {}) => commit(constants.ADD_PLAYER_LINEUP, product),
  addSubstition: ({ commit }, player) => {
    commit(constants.ADD_SUBSTITUTES, player);
  },
  fetchAllPlayers({ commit }, id) {
    return http.get(`/clubs/${id}/players?count=100`)
      .then((res) => {
        const { data: { players } } = res;
        commit(constants.FETCH_PLAYERS, players);

        return players;
      });
  },
};
