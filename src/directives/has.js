export default {
  inserted(el, bindings, vnode) {
    if (vnode.context.$store.getters.userInfo) {
      let boolean = vnode.context.$store.getters.userInfo.adminType;
      !boolean && el.parentNode.removeChild(el)
    } else {
      el.parentNode.removeChild(el)
    }
  }
}