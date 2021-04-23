import {
  loginUser,
  getUserInfo,
  userLogout
} from '@/api/admin/user.js'
const userStore = {
  state: {
    token: sessionStorage.getItem('token'),
    userInfo: JSON.parse(sessionStorage.getItem('userInfo'))
  },
  getters: {
    token: state => state.token,
    userInfo: state => state.userInfo
  },
  mutations: {
    setToken(state, data) {
      state.token = data;
      if (data) {
        sessionStorage.setItem('token', data);
      } else {
        sessionStorage.removeItem('token');
      }
    },

    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      if (userInfo) {
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
      } else {
        sessionStorage.removeItem('userInfo');

      }
    }
  },
  actions: {
    // 登录，并存token
    login({
      commit
    }, params) {
      return new Promise((resolve, reject) => {
        loginUser(params).then(
          response => {
            commit('setToken', response.data.data.token);
            resolve(response);
          },
          error => {
            reject(error);
          }
        );
      });
    },
    // 根据token获取用户信息
    getUserInfo({
      commit,
    }, params) {
      return new Promise((resolve, reject) => {
        getUserInfo(params).then(
          response => {
            commit('setUserInfo', response.data.data);
            resolve(response);
          },
          error => {
            reject(error);
          }
        );
      });
    },
    // 退出登录
    logout({
      commit
    }) {
      return new Promise((resolve, reject) => {
        userLogout().then(
          response => {
            commit('setToken', null);
            commit('setUserInfo', null);

            resolve(response);
          },
          error => {
            reject(error);
          }
        );
      });
    },

  }
};

export default userStore;