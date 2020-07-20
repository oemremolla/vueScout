const emptyLogo = require('../assets/images/no-image.png');

export default {
  methods: {
    handleImageError() {
      this.$refs.logo.src = emptyLogo;
    },
  },
};
