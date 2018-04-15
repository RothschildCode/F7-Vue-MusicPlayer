<template>
  <!-- App -->
  <div id="app">

  <div class="panel-overlay"></div>
    <!-- Main Views -->
    <f7-views>
      <f7-view id="main-view"  main>
        <f7-pages>
          <f7-page class="navbar-fixed">
            <f7-toolbar class="theme-a">
              <a href="#" data-panel="left" class="tab-link link open-panel">
                <label class="fa fa-bars fa-1x"></label>
              </a>
              <f7-link tab-link="#staranchor" active>星主播</f7-link>
              <f7-link tab-link="#newsong">新歌</f7-link>
              <f7-link tab-link="#singer">歌手</f7-link>
              <f7-link tab-link="#special">歌单</f7-link>
              <f7-link tab-link="#search" @click="searchClick">
                <span class="fa fa-search fa-1x"></span>
              </f7-link>
            </f7-toolbar>
            <f7-tabs>
              <f7-tab id="staranchor" active>
                <star-anchor-view></star-anchor-view>
              </f7-tab>
              <f7-tab id="newsong">
                <new-view></new-view>
              </f7-tab>
              <f7-tab id="special">
                <home-special-tab></home-special-tab>
              </f7-tab>
              <f7-tab id="singer">
                <library-singer-view></library-singer-view>
              </f7-tab>
            </f7-tabs>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-views>

    <menu-panel></menu-panel>
    <play-list-popup></play-list-popup>
    <play-popup></play-popup>
    <quality-popover></quality-popover>
    <mini-player></mini-player>

  </div>
</template>

<script>
///////////////////////////////////////////////////
// import LibraryView from './pages/library'     //
import NewView from './pages/NewSong.vue' //
///////////////////////////////////////////////////
import LibrarySingerView from './pages/library-singer'
import SongSheetView from './pages/song-sheet'
import CenterView from './pages/center'
import PlayPopup from './pages/play'
import PlayListPopup from './pages/play-list'
import Navbar from './components/Navbar'
import MiniPlayer from './pages/mini-player'
import QualityPopover from './pages/quality-popover'
import StarAnchorView from './pages/StarAnchorList'
import MenuPanel from './pages/MenuPanel'
import HomeSpecialTab from './pages/HomeSpecialTab'
export default {
  data() {
    return {
      activedTab: 'library'
    }
  },
  // computed: {
  //   navbarTitle() {
  //     switch(this.activedTab) {
  //     case 'home':
  //       return this.$t('app.app_name')
  //     case 'ranking':
  //       return this.$t('app.ranking')
  //     }
  //   }
  // },
  methods: {
    tabActived(tab) {
      this.activedTab = tab
    },
    searchClick() {
      this.$f7.mainView.router.load({url: `/search/`})
    }
  },
  components: {
    // LibraryView,
    NewView,
    MenuPanel,
    LibrarySingerView,
    SongSheetView,
    CenterView,
    PlayPopup,
    PlayListPopup,
    Navbar,
    MiniPlayer,
    QualityPopover,
    StarAnchorView,
    HomeSpecialTab
  }
}
</script>