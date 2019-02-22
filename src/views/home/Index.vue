<template>
  <Layout class="home">
    <Header class="header">
      <img  
        :src="logo"
        alt="daydayup"
        class="logo"
        >
      <Input
        class="search"
        search
        enter-button
        placeholder="搜索感兴趣的话题..." 
        @on-search="searchHandler"
        />
      <Dropdown 
        class="options"
        @on-click="headerOptionsHandler"
        >
        <Avatar 
          class="g-pointer g-bg-primary">{{ profile.name }}</Avatar>
        <DropdownMenu slot="list">
          <DropdownItem name="logout">登出</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Header>
    <Layout class="content">
      <Sider hide-trigger :style="{background: '#fff'}">
        <Menu 
          :active-name="routeName" 
          width="auto" 
          @on-select="selectMenuHandler"
          >
          <MenuGroup>
            <MenuItem name="home">
              <Icon type="md-document" />
              主页
            </MenuItem>
            <MenuItem name="subjects">
              <Icon type="md-document" />
              知识库
            </MenuItem>
          </MenuGroup>
        </Menu>
      </Sider>
      <Layout :style="{padding: '24px'}">
        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff', overflow: 'auto'}">
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </Layout>
</template>

<script>
import gql from "graphql-tag";
import {onLogout} from '../../vue-apollo.js'
export default {
  name: "home",
  data() {
    return {
      profile: {
        name: '***'
      },
      logo: require('../../assets/logo.svg')
    }
  },
  computed: {
    routeName() {
      const currentRouteName = this.$route.name
      return this.$route.meta && this.$route.meta.group || 'home'
    }
  },
  methods: {
    headerOptionsHandler(action) {
      switch(action) {
        case 'logout': {
          onLogout(this.$apolloProvider.clients.defaultClient)
        }
      }
    },
    selectMenuHandler(name) {
      this.$router.push({name})
    },
    searchHandler(keyword) {
    },
  },
  apollo: {
    profile: {
      query: gql`
        query {
          profile {
            name
          }
        }
      `,
    }
  }
};
</script>

<style lang="less" scoped>
@header-height: 64px;
.home {
  .header {
    height: @header-height;
    display: flex;
    align-items: center;
    .logo {
      width: 128px;
    }
    .search {
      width: 480px;
      margin-left: 48px;
    }
    .options {
      margin-left: auto;
    }
  }
  .content {
    height: calc(~"100vh - @{header-height}");
    overflow: hidden;
  }
}
</style>

