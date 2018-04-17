<template>
  <!-- App -->
  <div id="app" class="theme theme1">

  <div class="panel-overlay"></div>
    <!-- Main Views -->
    <f7-views>
      <f7-view id="main-view"  main>
        <f7-pages>
          <f7-page class="navbar-fixed">
            <f7-toolbar class="theme-a" theme-dynamic-render>
              <a href="#" data-panel="left" class="tab-link link open-panel">
                <label class="fa fa-bars fa-1x"></label>
              </a>
              <f7-link active tab-link="#newsong">新歌</f7-link>
              <f7-link tab-link="#search" @click="searchClick">
                <span class="fa fa-search fa-1x"></span>
              </f7-link>
            </f7-toolbar>
            <f7-tabs>
              <f7-tab active id="newsong">
                <new-songs-view></new-songs-view>
              </f7-tab>
            </f7-tabs>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-views>

    <menu-panel-view></menu-panel-view>
    <play-list-view></play-list-view>
    <player-view></player-view>
    <mini-player-view></mini-player-view>

  </div>
</template>

<script>
import NewSongsView from './views/NewSongsView'
import PlayerView from './views/PlayerView'
import PlayListView from './views/PlayListView'
import MiniPlayerView from './views/MiniPlayerView'
import MenuPanelView from './views/MenuPanelView'
export default {
  data() {
    return {
      activedTab: 'library'
    }
  },
  methods: {
    tabActived(tab) {
      this.activedTab = tab
    },
    searchClick() {
      this.$f7.mainView.router.load({url: `/search/`})
    }
  },
  components: {
    NewSongsView,
    PlayerView,
    PlayListView,
    MiniPlayerView,
    MenuPanelView
  }
}
</script>