<template>
  <div class="language_select">
    <ul>
      <li
        v-for="(site, index) in siteList"
        :key="index"
        :class="{ current: currentSite === site.abbr }"
        @click="selectLanguage(site)"
      >
        <a :href="site.url">
          <i :class="'icon_language_' + site.abbr"></i>
          <span class="country">{{ site.country }} </span>
          <span class="currency"> &nbsp;- {{ site.currency }}</span></a
        >
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
          url: 'https://www.cupshe.com/',
        },
        {
          abbr: 'au',
          country: 'Australia',
          currency: '$ AUD',
          url: 'https://au.cupshe.com/',
        },
        {
          abbr: 'de',
          country: 'Deutschland',
          currency: '€ EUR',
          url: 'https://de.cupshe.com/',
        },
        {
          abbr: 'es',
          country: 'España',
          currency: '€ EUR',
          url: 'https://es.cupshe.com/',
        },
        {
          abbr: 'fr',
          country: 'France',
          currency: '€ EUR',
          url: 'https://fr.cupshe.com/',
        },
        {
          abbr: 'it',
          country: 'Italia',
          currency: '€ EUR',
          url: 'https://it.cupshe.com/',
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

<style lang="scss" scoped>
.language_select {
  padding: 7px 16px 25px 16px;
  ul {
    li {
      margin-top: 18px;
      min-width: 220px;
      text-align: left;
      font-family: $fontRegular;
      font-weight: normal;
      line-height: 22px;
      display: block;
      white-space: nowrap;
      word-break: keep-all;
      i {
        width: 18px !important;
        height: 18px !important;
        vertical-align: text-bottom;
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
        word-wrap: nowrap;
        word-break: keep-all;
      }
      &.current {
        font-family: Muli-Bold, Muli;
        font-weight: bold;
      }
    }
  }
}
</style>
