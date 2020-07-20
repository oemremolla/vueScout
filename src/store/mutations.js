import * as constants from './constants';

export default {
  [constants.TOGGLE_LOADING](state) {
    state.isLoading = !state.isLoading;
  },
  [constants.ADD_PLAYER_LINEUP]: (state, post) => {
    const allPlayer = state.allPlayers.filter(player => player.id !== post.id);
    state.lineupPlayers.push(post);
    state.lineupSelect.push(post);
    state.allPlayers = allPlayer;
  },
  [constants.ADD_SUBSTITUTES]: (state, substitutes) => {
    const addPLayers = state.allPlayers.filter(player => player.id === substitutes.inPlayer);
    state.allPlayers = state.allPlayers.filter(player => player.id !== substitutes.inPlayer);
    const addMinute = {
      ...addPLayers[0],
      minute: substitutes.minute,
      minuteIcon: 'green',
    };
    state.substitutes.push(addMinute);

    // eslint-disable-next-line max-len
    const manipulatedLineupSelect = state.lineupSelect.filter(player => player.id !== substitutes.outPlayer);
    const manipulatedLineupPlayers = state.lineupPlayers.map((player) => {
      if (substitutes.outPlayer === player.id) {
        return {
          ...player,
          minute: substitutes.minute,
          minuteIcon: 'red',
        };
      }

      return {
        ...player,
      };
    });

    state.lineupPlayers = [...manipulatedLineupPlayers];
    state.lineupSelect = [...manipulatedLineupSelect];
  },
  [constants.FETCH_PLAYERS](state, allPlayers) {
    state.allPlayers = allPlayers.map(item => ({
      ...item,
      time: 0,
    }));
  },
};
