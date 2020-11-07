<template>
  <div class="language_select">
    <ul>
      <li
        v-for="(site, index) in siteList"
        :key="index"
        :class="{ current: currentSite === site.abbr }"
        @click="selectLanguage(site)"
      >
        <i :class="'icon_language_' + site.abbr"></i>
        <span class="country">{{ site.country }} </span>
        <span class="currency"> &nbsp;- {{ site.currency }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      siteList: [
        {
          abbr: 'en',
          country: 'International',
          currency: '$ USD',
        },
        {
          abbr: 'au',
          country: 'Australia',
          currency: '$ AUD',
        },
        {
          abbr: 'de',
          country: 'Deutschland',
          currency: '€ EUR',
        },
        {
          abbr: 'es',
          country: 'España',
          currency: '€ EUR',
        },
        {
          abbr: 'fr',
          country: 'France',
          currency: '€ EUR',
        },
        {
          abbr: 'it',
          country: 'Italia',
          currency: '€ EUR',
        },
      ],
      currentSite: this.$store.state.locale,
    }
  },
  methods: {
    selectLanguage(site) {
      this.$store.commit('SET_LANG', site.abbr)
      this.currentSite = site.abbr
    },
  },
}
</script>

<style lang="scss">
.language_select {
  padding: 7px 0 25px 16px;
  ul {
    li {
      margin-top: 18px;
      text-align: left;
      font-family: $fontRegular;
      font-weight: normal;
      line-height: 22px;
      display: flex;
      i {
        width: 22px !important;
        height: 22px !important;
      }
      .country {
        font-size: 14px;
        color: #333333;
        letter-spacing: 1px;
        margin-left: 10px;
      }
      .currency {
        font-size: 12px;
        color: #666666;
      }
      &.current {
        font-family: Muli-Bold, Muli;
        font-weight: bold;
      }
    }
  }
}
</style>
