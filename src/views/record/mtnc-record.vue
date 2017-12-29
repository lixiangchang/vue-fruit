<template>
<div class="content">
  <div class="mtnc-top">
    <div class="stage">第{{stage}}期</div>
    <div class="tree-name">
      <div>{{treeName}}</div>
      <img src="../../assets/mtnc-border.png" alt="">
    </div>
    <div class="position">
      <img src="../../assets/mtnc-position.png" alt="">
      {{position}}
    </div>
  </div>
<!-- <scroller @on-scroller="scroller" :loading="isLoadingEnd"> -->
  <div class="mtnc-content">
    <ul class="list">
      <li>
        <div class="icon">
          <img src="../../assets/mtnc-icon-complete.png" alt="">
        </div>
        <div class="list-right green">
          <div>
            <p class="data">2017年12月24日 10:00</p>
            <p class="status">认养成功</p>
            <p class="person"></p>
          </div>
          <div>
          </div>
        </div>
      </li>
      <li>
        <div class="icon">
          <img src="../../assets/mtnc-icon-sow.png" alt="">
          <div class="dashed"></div>
        </div>
        <div class="list-right">
          <div>
            <p class="data">2017年12月24日 10:00</p>
            <p class="status">
              <b class="g3">【剪枝】</b>
              农民伯伯为果树施放了大桶的肥料。
            </p>
            <p class="person">
              <img src="../../assets/mtnc-person.png" alt="">
              <span>操作员：赵师傅</span>
            </p>
          </div>
          <div class="headImg">
            <img src="../../assets/mtnc-headImg.png" alt="">
          </div>
          <div class="my-gallery" data-pswp-uid="1">
            <figure data-index="0">
                <a class="btn-photoswipe" href="https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D220/sign=ebaac420b8fb4316051f7d7810a64642/5882b2b7d0a20cf4e76a5a347c094b36adaf9967.jpg">
                  <img src="../../assets/mtnc-img01.png">
                </a>
            </figure>
            <figure  data-index="1">
                <a class="btn-photoswipe" href="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514536682879&di=c493dc4e4876c098e4ceba7acd028877&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F622762d0f703918f54e427f05a3d269759eec4d7.jpg">
                  <img src="../../assets/mtnc-img01.png">
                </a>
            </figure>
            <figure data-index="2">
                <a class="btn-photoswipe" href="https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D220/sign=ebaac420b8fb4316051f7d7810a64642/5882b2b7d0a20cf4e76a5a347c094b36adaf9967.jpg">
                  <img src="../../assets/mtnc-img01.png">
                </a>
            </figure>
            <figure  data-index="3">
                <a class="btn-photoswipe" href="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514536682879&di=c493dc4e4876c098e4ceba7acd028877&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F622762d0f703918f54e427f05a3d269759eec4d7.jpg">
                  <img src="../../assets/mtnc-img01.png">
                </a>
            </figure>
            <figure data-index="4">
                <a class="btn-photoswipe" href="https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D220/sign=ebaac420b8fb4316051f7d7810a64642/5882b2b7d0a20cf4e76a5a347c094b36adaf9967.jpg">
                  <img src="../../assets/mtnc-img01.png">
                </a>
            </figure>
            <figure  data-index="5">
                <a class="btn-photoswipe" href="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514536682879&di=c493dc4e4876c098e4ceba7acd028877&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F622762d0f703918f54e427f05a3d269759eec4d7.jpg">
                  <img src="../../assets/mtnc-img01.png">
                </a>
            </figure>
          </div>
        </div>
      </li>
      <li>
        <div class="icon">
          <img src="../../assets/mtnc-icon-sow.png" alt="">
          <div class="dashed"></div>
        </div>
        <div class="list-right">
          <div>
            <p class="data">2017年12月24日 10:00</p>
            <p class="status">
              <b class="g3">【剪枝】</b>
              农民伯伯为果树施放了大桶的肥料。
            </p>
            <p class="person">
              <img src="../../assets/mtnc-person.png" alt="">
              <span>操作员：赵师傅</span>
            </p>
          </div>
          <div class="headImg">
            <img src="../../assets/mtnc-dftHeadImg.png" alt="">
          </div>
          <div class="my-gallery" data-pswp-uid="2">
            <figure data-index="0">
                <a class="btn-photoswipe" href="https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D220/sign=ebaac420b8fb4316051f7d7810a64642/5882b2b7d0a20cf4e76a5a347c094b36adaf9967.jpg">
                  <img src="https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D220/sign=ebaac420b8fb4316051f7d7810a64642/5882b2b7d0a20cf4e76a5a347c094b36adaf9967.jpg">
                </a>
            </figure>
            <figure  data-index="1">
                <a class="btn-photoswipe" href="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514536682879&di=c493dc4e4876c098e4ceba7acd028877&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F622762d0f703918f54e427f05a3d269759eec4d7.jpg">
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514536682879&di=c493dc4e4876c098e4ceba7acd028877&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F622762d0f703918f54e427f05a3d269759eec4d7.jpg">
                </a>
            </figure>
            <figure data-index="2">
                <a class="btn-photoswipe" href="https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D220/sign=ebaac420b8fb4316051f7d7810a64642/5882b2b7d0a20cf4e76a5a347c094b36adaf9967.jpg">
                  <img src="https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D220/sign=ebaac420b8fb4316051f7d7810a64642/5882b2b7d0a20cf4e76a5a347c094b36adaf9967.jpg">
                </a>
            </figure>
            <figure  data-index="3">
                <a class="btn-photoswipe" href="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514536682879&di=c493dc4e4876c098e4ceba7acd028877&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F622762d0f703918f54e427f05a3d269759eec4d7.jpg">
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514536682879&di=c493dc4e4876c098e4ceba7acd028877&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F622762d0f703918f54e427f05a3d269759eec4d7.jpg">
                </a>
            </figure>
            <figure data-index="4">
                <a class="btn-photoswipe" href="https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D220/sign=ebaac420b8fb4316051f7d7810a64642/5882b2b7d0a20cf4e76a5a347c094b36adaf9967.jpg">
                  <img src="https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D220/sign=ebaac420b8fb4316051f7d7810a64642/5882b2b7d0a20cf4e76a5a347c094b36adaf9967.jpg">
                </a>
            </figure>
            <figure  data-index="5">
                <a class="btn-photoswipe" href="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514536682879&di=c493dc4e4876c098e4ceba7acd028877&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F622762d0f703918f54e427f05a3d269759eec4d7.jpg">
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514536682879&di=c493dc4e4876c098e4ceba7acd028877&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F622762d0f703918f54e427f05a3d269759eec4d7.jpg">
                </a>
            </figure>
          </div>
        </div>
      </li>
      <li>
        <div class="icon"><img src="../../assets/mtnc-icon-success.png" alt=""></div>
        <div class="list-right">
          <div>
            <p class="data">2017年12月24日 10:00</p>
            <p class="status">认养成功</p>
            <p class="person"></p>
          </div>
          <div>
          </div>
        </div>
      </li>
    </ul>


    <!-- photoswipe的根元素。必须有阶级pswp。 -->
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="pswp__bg"></div>
    <div class="pswp__scroll-wrap">
      <div class="pswp__container">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>
      <div class="pswp__ui pswp__ui--hidden">
        <div class="pswp__top-bar">
          <div class="pswp__counter"></div> <button class="pswp__button pswp__button--close" title="Close (Esc)"></button> <button class="pswp__button pswp__button--share"
            title="Share"></button> <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
          <button
            class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
        </div>
        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div class="pswp__share-tooltip"></div>
        </div> <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
            </button> <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
            </button>
        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>
      </div>
    </div>
  </div>
  </div>
<!-- </scroller> -->
<!-- <ui-loading v-model="isLoading"/> -->
  </div>
</template>
<<script>
import { mapState, mapMutations } from 'vuex'
import { Scroller,UiHeader } from '~'
import Photoswipe from 'photoswipe'
import photoswipeUiDefault from 'photoswipe/dist/photoswipe-ui-default.min'
export default {
  name: 'MtncRecord',
  components: { Scroller,UiHeader },
  data(){
    return{
      stage:'1',
      treeName:'越南红心火龙果8年树',
      position:'越南 河内',
      currentPage: 1,
      data: [],
      isLoadingEnd: false,
      isLoading: false,
      index:0,
      items:[]
    }
  },
  methods: {
    onphotoswipe(){
      var _this = this;
      var btns = document.querySelectorAll('.btn-photoswipe');
        for (let i = 0; i < btns.length; i++) {
          const btn = btns[i];
          btn.addEventListener('click',function(e) {
            e.preventDefault();
            _this.items = []
            _this.getItems(this)
        })

      }

    },

    getItems(ele){
      var parent = ele.parentNode.parentNode
      var btns = parent.querySelectorAll('.btn-photoswipe')
      var index =  ele.parentNode.dataset.index
      ;[].forEach.call(btns,btn => {
          this.items.push({
              src: btn.href,
              w: 600,
              h: 400
          })

      });
      this.index = index
      this.initPhotoswipe()
    },

    initPhotoswipe(){
      var pswpElement = document.querySelector('.pswp');
      var options = {
          index: +this.index,
          history: true,
          focus: false,
          showAnimationDuration: 0,
          hideAnimationDuration: 0,
          shareEl: false,
          fullscreenEl: false
      };
      // Initializes and opens PhotoSwipe
      var gallery = new Photoswipe(pswpElement, photoswipeUiDefault, this.items, options);
      gallery.init();
    },

    // scroller(diff) {
    //   if (diff === 0 && !this.isLoading) {
    //     this.currentPage += 1
    //     this.isLoadingEnd = true
    //     this.getAjax()
    //   }
    // },
    // getAjax() {
    //   let _self = this
    //   this.isLoading = true
    //   this.$axios({
    //     method: 'get',
    //     url:
    //       '/wap/usercount/countUserCommissions?page=' +
    //       this.currentPage +
    //       '&showNum=15',
    //     headers: { 'X-Requested-With': 'XMLHttpRequest' }
    //   }).then(res => {
    //     if (res.data.result.state == '1') {
    //       _self.count = res.data.downUser || '0'
    //       if (res.data.dataList.length > 0) {
    //         _self.data = this.data.concat(res.data.dataList)
    //         _self.bonus = res.data.money
    //         this.$nextTick(function() {
    //           this.isLoadingEnd = false
    //           this.isLoading = false
    //         })
    //       } else {
    //         this.$nextTick(function() {
    //           this.isLoadingEnd = false
    //         })
    //       }
    //     }
    //   })
    // },

  },
  created() {
     var nlink = '<link href="https://cdn.bootcss.com/photoswipe/4.1.2/photoswipe.min.css" rel="stylesheet">'+
     '<link href="https://cdn.bootcss.com/photoswipe/4.1.2/default-skin/default-skin.min.css" rel="stylesheet">'
     document.head.insertAdjacentHTML('beforeend',nlink)
    // this.getAjax()

  },
  mounted(){
    this.onphotoswipe();
    //this.initPhotoSwipeFromDOM('.my-gallery')
  }
}
</script>
<style lang="scss" scoped>
.mtnc-top {
  position: relative;
  width: 100%;
  height: 376px;
  background-image: url('../../assets/mtnc-bg.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  color: #fff;
  .stage {
    position: absolute;
    top: 140px;
    left: 128px;
    width: 82px;
    height: 32px;
    border: 1px solid #fff;
    border-radius: 6px;
    font-size: 22px;
    text-align: center;
    line-height: 32px;
  }
  .tree-name {
    width: 41%;
    position: absolute;
    top: 206px;
    left: 128px;
    font-size: 32px;
    img {
      width: 100%;
    }
  }
  .position {
    position: absolute;
    top: 258px;
    left: 128px;
    font-size: 26px;
    img {
      width: 18px;
      height: 22px;
      vertical-align: middle;
      margin-top: -6px;
    }
  }
}
.mtnc-content {
  .list {
    > li {
      display: flex;
      padding-top: 30px;
      .icon {
        width: 84px;
        padding-left: 32px;
        img {
          width: 60px;
          height: 60px;
        }
        .dashed {
          width: 3px;
          height: 100%;
          border-left: 1px dashed #eee;
          margin-left: 30px;
        }
      }
      .list-right {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 596px;
        padding-bottom: 30px;
        color: #333;
        border-bottom: 1px solid #e3e3e3;
        .data {
          font-size: 28px;
          font-weight: bold;
          padding-bottom: 12px;
        }
        .status {
          font-size: 24px;
          padding-bottom: 10px;
        }
        .person {
          font-size: 24px;
          color: #666;
          img {
            width: 24px;
            height: 24px;
            vertical-align: middle;
            margin-top: -4px;
          }
        }
        .headImg {
          width: 76px;
          height: 76px;
          img {
            width: 100%;
          }
        }
        .my-gallery {
          display: flex;
          flex-wrap: wrap;
          margin-top: 24px;
          figure {
            margin: 0;
          }
          img {
            width: 160px;
            height: 160px;
            margin-bottom: 12px;
            margin-right: 12px;
          }
        }
      }
      .green {
        color: #30bf6c;
      }
    }
    li:last-child .list-right {
      border-bottom: 0px solid #e3e3e3;
      .status {
        color: #333;
      }
    }
  }
}
</style>
