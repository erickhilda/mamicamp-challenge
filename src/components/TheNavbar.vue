<template>
  <header class="header" id="header">
    <router-link :to="{ name: 'Home' }" class="logo">
      <img src="../assets/img/vueschool-logo.svg" />
    </router-link>

    <div class="btn-hamburger">
      <div class="top bar"></div>
      <div class="middle bar"></div>
      <div class="bottom bar"></div>
    </div>

    <nav class="navbar">
      <ul>
        <li class="navbar-user" v-if="user">
          <router-link :to="{ name: 'Profile' }" class="logo">
            <img class="avatar-small" :src="user.avatar" alt="avatar-img" />
            <span>
              {{ user.name }}
              <img
                class="icon-profile"
                src="../assets/img/arrow-profile.svg"
                alt=""
              />
            </span>
          </router-link>
          <div id="user-dropdown">
            <div class="triangle-drop"></div>
            <ul class="dropdown-menu">
              <li class="dropdown-menu-item">
                <a href="profile.html">View profile</a>
              </li>
              <li class="dropdown-menu-item"><a href="#">Log out</a></li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      user: "authenticatedUser"
    })
  }
};
</script>
