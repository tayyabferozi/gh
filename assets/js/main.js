let oldScrollValue = 0;
let newScrollValue = 0;
let scrollDir = "down";

(function () {
  window.onload = function () {
    setTimeout(function () {
      window.scrollTo(0, 20672);
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

      console.log(currStep, window["currStepNum"]);
      if (currStep !== window["currStepNum"]) {
        window["currStepNum"] = currStep;
        console.log(currStep, window["currStepNum"]);

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
  const stepsCount2 = 6;
  let currStepNum2 = 1;

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

    if (allMobEls) {
      allMobEls.forEach((el, idx) => {
        const elHeight = el.getBoundingClientRect().height;

        const animIcon1 = el.querySelector("#anim-icon-1 #biceps");

        if (animIcon1) {
          console.log(animIcon1);
          // gsap.to(animIcon1, { "stroke-dashoffset": 0, fill: "black" });
          gsap.fromTo
            animIcon1,
            // 5,
            { attr: { "stroke-dashoffset": 1 } },
            { attr: { "stroke-dashoffset": 0 } }
          );
          // gsap.from(animIcon1, {
          //   duration: 5,
          //   drawSVG: 0,
          //   repeat: -1,
          //   yoyo: true,
          // });
        }

        if (scrollDir === "up") {
          if (el.classList.contains("animated")) {
            el.classList.remove("animated");
            gsap
              .fromTo(
                el,
                { top: manageMemElHeight / 2 - elHeight / 2, opacity: 1 },
                { top: -(manageMemElHeight / 2), opacity: 0 }
              )
              .duration(1.5);
          }
          if (idx === step - 2) {
            el.classList.add("animated");
            gsap
              .fromTo(
                el,
                { top: manageMemElHeight, opacity: 0 },
                { top: manageMemElHeight / 2 - elHeight / 2, opacity: 1 }
              )
              .duration(1.5);
          }
        } else {
          if (el.classList.contains("animated")) {
            el.classList.remove("animated");
            gsap
              .fromTo(
                el,
                { top: manageMemElHeight / 2 - elHeight / 2, opacity: 1 },
                { top: manageMemElHeight, opacity: 0 }
              )
              .duration(1.5);
          }
          if (idx === step - 2) {
            el.classList.add("animated");
            gsap
              .fromTo(
                el,
                { top: -(manageMemElHeight / 2), opacity: 0 },
                { top: manageMemElHeight / 2 - elHeight / 2, opacity: 1 }
              )
              .duration(1.5);
          }
        }
        // if (scrollDir === "up") {
        //   if (el.classList.contains("enter")) {
        //     el.classList.remove("enter");
        //     el.classList.add("exit");
        //   }
        //   if (idx === step - 2) {
        //     if (el.classList.contains("exit")) {
        //       el.classList.remove("exit");
        //       el.classList.add("enter");
        //     } else {
        //       el.classList.add("enter");
        //     }
        //   }
        // } else {
        //   if (el.classList.contains("enter2")) {
        //     el.classList.remove("enter2");
        //     el.classList.add("exit2");
        //   }
        //   if (idx === step - 2) {
        //     if (el.classList.contains("exit2")) {
        //       el.classList.remove("exit2");
        //       el.classList.add("enter2");
        //     } else {
        //       el.classList.add("enter2");
        //     }
        //   }
        // }
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
