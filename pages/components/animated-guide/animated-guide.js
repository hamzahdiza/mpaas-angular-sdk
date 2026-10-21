Page({
  data: {
    isLoading: true,
    coachmarkStep: 0,
    coachmarkSelector: '',
    coachmarkSelectorAdjust: false,
    coachmarkPlacement: 'bottom',
    coachmarkTitle: '',
    coachmarkDesc: ''
  },
  onLoad() {
    setTimeout(() => {
      this.setCoachmarkStep(1, '#segmen-1', 'bottom');
      this.setData({
        isLoading: false
      });
    }, 100);
  },

  setCoachmarkStep(step, selector = '', placement = 'bottom', selectorAdjust = false) {
    if (step <= 0) {
      this.setData({
        coachmarkStep: 0,
        coachmarkSelector: '',
        coachmarkTitle: '',
        coachmarkDesc: ''
      });
      return;
    }

    const stepContent = {
      1: {
        title: 'Segmen Utama',
        desc: 'Ini adalah berita utama di halaman ini.'
      },
      2: {
        title: 'Segmen Trending',
        desc: 'Berita kedua yang sedang ramai dibicarakan.'
      },
      3: {
        title: 'Segmen Update',
        desc: 'Info terbaru yang perlu kamu tahu.'
      },
      4: {
        title: 'Segmen Breaking',
        desc: 'Kabar penting yang baru masuk.'
      }
    };

    const content = stepContent[step] || {
      title: '',
      desc: ''
    };

    this.setData({
      coachmarkStep: step,
      coachmarkSelector: selector,
      coachmarkSelectorAdjust: selectorAdjust,
      coachmarkPlacement: placement,
      coachmarkTitle: content.title,
      coachmarkDesc: content.desc
    });
  },

  _scrollToSection(id, offset = 0, callback = null) {
    my.createSelectorQuery()
      .selectViewport().scrollOffset()
      .select(id).boundingClientRect()
      .exec((ret) => {
        if (ret && ret.length >= 2) {
          const scrollRes = Array.isArray(ret[0]) ? ret[0][0] : ret[0];
          const rectRes = Array.isArray(ret[1]) ? ret[1][0] : ret[1];
          if (scrollRes && rectRes) {
            const scrollTop = scrollRes.scrollTop || 0;
            const top = rectRes.top || 0;
            const targetY = Math.max(0, scrollTop + top - offset);
            my.pageScrollTo({
              scrollTop: targetY,
              duration: 300
            });
            if (callback) setTimeout(callback, 350);
          }
        }
      });
  },

  onCoachmarkNext() {
    const current = this.data.coachmarkStep;

    if (current === 1) {
      this.setCoachmarkStep(-1);
      this._scrollToSection('#segmen-2', 120, () => {
        this.setCoachmarkStep(2, '#segmen-2', 'bottom');
      });
    } else if (current === 2) {
      this.setCoachmarkStep(-1);
      this._scrollToSection('#segmen-3', 120, () => {
        this.setCoachmarkStep(3, '#segmen-3', 'bottom');
      });
    } else if (current === 3) {
      this.setCoachmarkStep(-1);
      this._scrollToSection('#segmen-4', 120, () => {
        this.setCoachmarkStep(4, '#segmen-4', 'top');
      });
    } else {
      // step 4 selesai, atau fallback
      this.setCoachmarkStep(0);
      my.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    }
  },

  onCoachmarkBack() {
    const current = this.data.coachmarkStep;

    if (current === 4) {
      this.setCoachmarkStep(-1);
      this._scrollToSection('#segmen-3', 120, () => {
        this.setCoachmarkStep(3, '#segmen-3', 'bottom');
      });
    } else if (current === 3) {
      this.setCoachmarkStep(-1);
      this._scrollToSection('#segmen-2', 120, () => {
        this.setCoachmarkStep(2, '#segmen-2', 'bottom');
      });
    } else if (current === 2) {
      this.setCoachmarkStep(-1);
      my.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
      setTimeout(() => this.setCoachmarkStep(1, '#segmen-1', 'bottom'), 350);
    } else {
      this.setCoachmarkStep(0);
      my.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    }
  },

  onFaqTap() {
    my.showToast({
      content: 'FAQ Tapped',
      type: 'none'
    });
  },

  onCoachmarkSkip() {
    this.setCoachmarkStep(0);
    my.pageScrollTo({
      scrollTop: 0,
      duration: 300
    });
  },
});