let oldScrollValue = 0;
let newScrollValue = 0;
let scrollDir = "down";

(function () {
  window.onload = function () {
    setTimeout(function () {
      // window.scrollTo(0, 18663);
    }, 1500);
    // window.setTimeout(fadeout, 0);

    window.addEventListener("scroll", (e) => {
      newScrollValue = window.pageYOffset;
      if (oldScrollValue < newScrollValue) {
        scrollDir = "up";
      } else if (oldScrollValue > newScrollValue) {
        scrollDir = "down";
      }
      oldScrollValue = newScrollValue;
    });
  };
  function fadeout() {
    document.querySelector(".page-loader").style.opacity = "0";
    document.querySelector(".page-loader").style.display = "none";
  }
  window.onscroll = function () {
    var header_navbar = document.querySelector(".navbar-area");
    var sticky = header_navbar.offsetTop;
    if (window.pageYOffset > sticky) {
      header_navbar.classList.add("sticky");
    } else {
      header_navbar.classList.remove("sticky");
    }
    var backToTo = document.querySelector(".scroll-top");
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      backToTo.style.display = "flex";
    } else {
      backToTo.style.display = "none";
    }
  };

  //===== mobile-menu-btn
  let navbarToggler = document.querySelector(".navbar-toggler");
  navbarToggler.addEventListener("click", function () {
    navbarToggler.classList.toggle("active");
  });

  /**
   * client slider
   */
  new Swiper(".client-slider", {
    speed: 1900,
    loop: true,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",

    breakpoints: {
      320: {
        slidesPerView: 3,
        spaceBetween: 20,
      },

      576: {
        slidesPerView: 3,
        spaceBetween: 0,
      },

      768: {
        slidesPerView: 3,
        spaceBetween: 0,
      },

      992: {
        slidesPerView: 4,
        spaceBetween: 0,
      },

      1200: {
        slidesPerView: 5,
        spaceBetween: 0,
      },
    },
  });

  /**
   * workout slider
   */
  //  new Swiper('.workout-slider', {
  //   speed: 1000,
  //   loop: false,
  //   autoplay: {
  //     delay: 1000,
  //     disableOnInteraction: false
  //   },
  //   slidesPerView: 'auto',

  //   breakpoints: {
  //     320: {
  //       slidesPerView: 1,
  //       spaceBetween: 20
  //     },

  //     576: {
  //       slidesPerView: 2,
  //       spaceBetween: 5
  //     },

  //     768: {
  //       slidesPerView: 2,
  //       spaceBetween: 10
  //     },

  //     992: {
  //       slidesPerView: 3,
  //       spaceBetween: 10
  //     },

  //     1200: {
  //       slidesPerView: 3,
  //       spaceBetween: 15
  //     }
  //   }
  // });

  /**
   * trainer-slider
   */
  new Swiper(".trainer-slider", {
    speed: 1000,
    loop: false,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },

      576: {
        slidesPerView: 2,
        spaceBetween: 5,
      },

      768: {
        slidesPerView: 2,
        spaceBetween: 10,
      },

      992: {
        slidesPerView: 3,
        spaceBetween: 10,
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
    },
  });

  const navBarEl = document.querySelector(".navbar-area");

  const wrapScrollEl1 = document.querySelector(".scroll-text-wrap");
  const mainScrollEl1 = document.querySelector(".scroll-text");
  const stepsCount1 = 7;
  let currStepNum1 = 1;

  const paintItems = (step) => {
    const allSpanEls = document.querySelectorAll(".scroll-text h2 span");

    if (allSpanEls) {
      allSpanEls.forEach((el, idx) => {
        el.classList.remove("painted");
        if (idx + 1 === step) {
          el.classList.add("painted");
        }
      });
    }
  };

  const changeSections = (
    animFunc,
    wrapScrollEl,
    mainScrollEl,
    stepsCount,
    currStepNum,
    scrollFunc = undefined
  ) => {
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
    const navBarHeight = navBarEl.getBoundingClientRect().height;
    const top = window.pageYOffset + wrapScrollEl.getBoundingClientRect().top;
    const scrolledAfterEl = window.pageYOffset - top;
    const mainElHeight = mainScrollEl.getBoundingClientRect().height;
    const parentHeight = stepsCount * 1000 + mainElHeight;
    wrapScrollEl.style.height = `${parentHeight}px`;
    const usableHeight = parentHeight;

    if (typeof scrollFunc === "function") {
      scrollFunc();
    }

    if (window.screen.height <= mainElHeight + navBarHeight) {
      mainScrollEl.style.top = navBarHeight + "px";
    } else {
      mainScrollEl.style.top =
        vh / 2 - mainElHeight / 2 + navBarHeight / 2 + "px";
    }

    if (scrolledAfterEl > 0 && scrolledAfterEl < usableHeight) {
      const currStep = Math.ceil(scrolledAfterEl / (usableHeight / stepsCount));

      if (currStep !== window[currStepNum]) {
        window[currStepNum] = currStep;

        animFunc(currStep);
      }
    }
  };

  if (wrapScrollEl1 && mainScrollEl1) {
    document.addEventListener(
      "scroll",
      changeSections.bind(
        this,
        paintItems,
        wrapScrollEl1,
        mainScrollEl1,
        stepsCount1,
        "currStepNum1"
      )
    );
  }

  const wrapScrollEl2 = document.querySelector(".members");
  const mainScrollEl2 = document.querySelector(".members > .container");
  const stepsCount2 = 5;
  let currStepNum2 = 0;

  function scrollFunc2() {
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
    const container = document.querySelector(".members > .container");

    if (container) {
      const navBarHeight = navBarEl.getBoundingClientRect().height;

      container.style.height = `${vh - navBarHeight}px`;
    }
  }

  function showIcons(step) {
    const manageMemEl = document.querySelector(".members .manage-mem");
    const manageMemElHeight = manageMemEl.getBoundingClientRect().height;
    const allMobEls = manageMemEl.querySelectorAll(".manage-mem > .mob-single");

    document.querySelectorAll("svg .animate").forEach((el) => {
      el.classList.remove("animate");
    });

    document.querySelectorAll("svg .unanimate").forEach((el) => {
      el.classList.remove("unanimate");
    });

    if (allMobEls) {
      allMobEls.forEach((el, idx) => {
        const elHeight = el.getBoundingClientRect().height;

        const animIcon1 = el.querySelector("#anim-icon-1 #biceps");
        const animIcon2_1 = el.querySelector("#anim-icon-2 #center-circle");
        const animIcon2_2 = el.querySelector("#anim-icon-2 #circle-checkmark");
        const animIcon3 = el.querySelector("#anim-icon-3 #curly-lines");
        const animIcon4 = el.querySelector("#anim-icon-4 #cup");
        const animIcon5_1 = el.querySelector("#anim-icon-5 #arrow-line-1");
        const animIcon5_2 = el.querySelector("#anim-icon-5 #arrow-line-2");
        const animIcon5_3 = el.querySelector("#anim-icon-5 #stats-line-1");
        const animIcon5_4 = el.querySelector("#anim-icon-5 #stats-line-2");
        const animIcon5_5 = el.querySelector("#anim-icon-5 #stats-line-3");
        const animIcon5_6 = el.querySelector("#anim-icon-5 #stats-line-4");
        const animIcon5_7 = el.querySelector("#anim-icon-5 #stats-line-5");
        const animIcon5_8 = el.querySelector("#anim-icon-5 #stats-line-6");

        function removeAnimateAccordingly() {
          if (animIcon1) {
            animIcon1.classList.remove("animate");
            animIcon1.classList.add("unanimate");
          }

          if (animIcon2_1) {
            animIcon2_1.classList.remove("animate");
            animIcon2_2.classList.remove("animate");

            animIcon2_1.classList.add("unanimate");
            animIcon2_2.classList.add("unanimate");
          }

          if (animIcon3) {
            animIcon3.classList.remove("animate");

            animIcon3.classList.add("unanimate");
          }

          if (animIcon4) {
            animIcon4.classList.remove("animate");

            animIcon4.classList.add("unanimate");
          }

          if (animIcon5_1) {
            animIcon5_1.classList.remove("animate");
            animIcon5_2.classList.remove("animate");
            animIcon5_3.classList.remove("animate");
            animIcon5_4.classList.remove("animate");
            animIcon5_5.classList.remove("animate");
            animIcon5_6.classList.remove("animate");
            animIcon5_7.classList.remove("animate");
            animIcon5_8.classList.remove("animate");

            animIcon5_1.classList.remove("unanimate");
            animIcon5_2.classList.remove("unanimate");
            animIcon5_3.classList.remove("unanimate");
            animIcon5_4.classList.remove("unanimate");
            animIcon5_5.classList.remove("unanimate");
            animIcon5_6.classList.remove("unanimate");
            animIcon5_7.classList.remove("unanimate");
            animIcon5_8.classList.remove("unanimate");
          }
        }

        function animateAccordingly() {
          if (animIcon1) {
            animIcon1.classList.remove("unanimate");

            setTimeout(function () {
              animIcon1.classList.add("animate");
            }, 10);
          }

          if (animIcon2_1) {
            animIcon2_1.classList.remove("unanimate");
            animIcon2_1.classList.remove("unanimate");

            setTimeout(function () {
              animIcon2_1.classList.add("animate");
              animIcon2_2.classList.add("animate");
            }, 10);
          }

          if (animIcon3) {
            animIcon3.classList.remove("unanimate");

            setTimeout(function () {
              animIcon3.classList.add("animate");
            }, 10);
          }

          if (animIcon4) {
            animIcon4.classList.remove("unanimate");

            setTimeout(function () {
              animIcon4.classList.add("animate");
            }, 10);
          }

          if (animIcon5_1) {
            animIcon5_1.classList.remove("unanimate");
            animIcon5_2.classList.remove("unanimate");
            animIcon5_3.classList.remove("unanimate");
            animIcon5_4.classList.remove("unanimate");
            animIcon5_5.classList.remove("unanimate");
            animIcon5_6.classList.remove("unanimate");
            animIcon5_7.classList.remove("unanimate");
            animIcon5_8.classList.remove("unanimate");

            setTimeout(function () {
              animIcon5_1.classList.add("animate");
              animIcon5_2.classList.add("animate");
              animIcon5_3.classList.add("animate");
              animIcon5_4.classList.add("animate");
              animIcon5_5.classList.add("animate");
              animIcon5_6.classList.add("animate");
              animIcon5_7.classList.add("animate");
              animIcon5_8.classList.add("animate");
            }, 10);
          }
        }

        if (scrollDir === "up") {
          if (el.classList.contains("animated")) {
            // ------------- IF USER IS SCROLLING DOWN (OTHER STEPS) ------------

            removeAnimateAccordingly();

            el.classList.remove("animated");
            gsap
              .fromTo(
                el,
                { top: manageMemElHeight / 2 - elHeight / 2, opacity: 1 },
                { top: -(manageMemElHeight / 2), opacity: 0 }
              )
              .duration(2.5);
          }
          if (idx === step - 1) {
            // ------------- IF USER IS SCROLLING DOWN (CURRENT STEP) ------------

            animateAccordingly();

            el.classList.add("animated");
            gsap
              .fromTo(
                el,
                { top: manageMemElHeight, opacity: 0 },
                { top: manageMemElHeight / 2 - elHeight / 2, opacity: 1 }
              )
              .duration(2.5);
          }
        } else {
          if (el.classList.contains("animated")) {
            // ------------- IF USER IS SCROLLING UP (OTHER STEPS) ------------

            removeAnimateAccordingly();

            el.classList.remove("animated");
            gsap
              .fromTo(
                el,
                { top: manageMemElHeight / 2 - elHeight / 2, opacity: 1 },
                { top: manageMemElHeight, opacity: 0 }
              )
              .duration(2.5);
          }
          if (idx === step - 1) {
            // ------------- IF USER IS SCROLLING UP (CURRENT STEP) ------------

            animateAccordingly();
            el.classList.add("animated");
            gsap
              .fromTo(
                el,
                { top: -(manageMemElHeight / 2), opacity: 0 },
                { top: manageMemElHeight / 2 - elHeight / 2, opacity: 1 }
              )
              .duration(2.5);
          }
        }
      });
    }
  }

  if (wrapScrollEl2 && mainScrollEl2) {
    document.addEventListener(
      "scroll",
      changeSections.bind(
        this,
        showIcons,
        wrapScrollEl2,
        mainScrollEl2,
        stepsCount2,
        "currStepNum2",
        scrollFunc2
      )
    );
  }
})();
