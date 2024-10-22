"use strict";
window.addEventListener("load", () => {
  loadInitialSetup();
});
const loadInitialSetup = () => {
    setupClickEvents(),
      setupScrollEvents(),
      setupResizeEvents(),
      closeModal(),
      currentYear(),
      scrollUp(),
      toggleInput(),
      tabInputs(),
      startCounter(),
      tabs(),
      textareaExpansible(),
      counter(),
      restrictNumberInput(),
      expandables(),
      accordion(),
      carrousel(),
      rater(),
      priceRange(),
      filtering(),
      parallax(),
      emailJs();
  },
  setupClickEvents = () => {
    window.addEventListener("click", ({ target: e }) => {
      showModal(e), btnWishlist(e), clickOverlay(e);
    });
  },
  setupScrollEvents = () => {
    window.addEventListener("scroll", () => {
      floatingHeader(), scrollUpButton();
    });
  },
  setupResizeEvents = () => {
    window.addEventListener("resize", ({ target: e }) => {
      resizeModal(e);
    });
  },
  showModal = (e) => {
    const t = e.getAttribute("data-target");
    if (t) {
      const e = `${t}.modal-container`,
        r = document.querySelector(e);
      if (r) {
        const e = r.querySelector(".modal-content");
        [
          "modal-top",
          "modal-right",
          "modal-left",
          "modal-center",
          "modal-center-top",
        ].forEach((t) => {
          e.classList.toggle(`${t}_active`, e.classList.contains(t));
        }),
          r.classList.toggle("modal-overlay_active"),
          document.body.classList.toggle("overflow-hidden");
      }
    }
  },
  closeModal = () => {
    document.querySelectorAll(".close-modal").forEach((e) => {
      e.addEventListener("click", ({ target: e }) => {
        const t = e.closest(".modal-container");
        t
          .querySelector(".modal-content")
          .classList.remove(
            "modal-top_active",
            "modal-right_active",
            "modal-left_active",
            "modal-center_active",
            "modal-center-top_active"
          ),
          t.classList.remove("modal-overlay_active"),
          document.body.classList.remove("overflow-hidden");
      });
    });
  },
  clickOverlay = (e) => {
    const t = e.classList.contains("modal-overlay"),
      r = e.querySelector(".modal-content");
    if (t && r) {
      const e = r.querySelector(".close-modal");
      e && e.click();
    }
  },
  btnWishlist = (e) => {
    if (e.classList.contains("btn-wishlist")) {
      const t = e.querySelector("svg"),
        r = e.querySelector("span");
      t.classList.contains("fill-none")
        ? (t.classList.replace("fill-none", "fill-current"),
          t.classList.add("animate-heart"),
          r && (r.textContent = "Remove to wishlist"))
        : (t.classList.replace("fill-current", "fill-none"),
          t.classList.remove("animate-heart"),
          r && (r.textContent = "Add to wishlist"));
    }
  },
  resizeModal = (e) => {
    if (e.innerWidth > 1023) {
      document
        .querySelectorAll(".resize-close.modal-overlay_active .close-modal")
        .forEach((e) => {
          e && e.click();
        });
    }
  },
  floatingHeader = () => {
    const e = document.documentElement.scrollTop,
      t = document.querySelector("header"),
      r = document.querySelector(".header"),
      o = document.querySelector(".scroll-up");
    e > 100
      ? ((r.style.cssText = `height: ${t.offsetHeight}px;`),
        t.classList.replace("relative", "header-fixed"),
        o.classList.replace("opacity-0", "opacity-100"),
        o.classList.replace("invisible", "visible"))
      : ((r.style.cssText = "height: 0px;"),
        t.classList.replace("header-fixed", "relative"),
        o.classList.replace("opacity-100", "opacity-0"),
        o.classList.replace("visible", "invisible"));
  },
  scrollUpButton = () => {
    const e = document.querySelector(".scroll-up");
    document.documentElement.scrollTop > 500
      ? (e.classList.remove("-bottom-16"), e.classList.add("z-40", "bottom-8"))
      : (e.classList.remove("z-40", "bottom-8"), e.classList.add("-bottom-16"));
  },
  scrollUp = () => {
    const e = document.querySelector(".scroll-up");
    e &&
      e.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  },
  toggleInput = () => {
    document.querySelectorAll(".toggle-input-container").forEach((e) => {
      e.querySelectorAll(".toggle-input").forEach((t) => {
        const r = e.querySelector(".button-toggle");
        r &&
          r.addEventListener("click", () => {
            const e =
              "password" === t.getAttribute("type") ? "text" : "password";
            t.setAttribute("type", e),
              (r.querySelector("svg").innerHTML =
                "password" === e
                  ? '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>'
                  : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>');
          });
      });
    });
  },
  currentYear = () => {
    document.querySelectorAll(".current-year").forEach((e) => {
      e.textContent = new Date().getFullYear();
    });
  },
  tabInputs = () => {
    const e = document.querySelectorAll(".container-tab-inputs");
    e.forEach((t) => {
      const r = t.querySelectorAll(".tab-input");
      r.length <= 0 ||
        (1 === e.length && r[0].focus(),
        r.forEach((e, t) => {
          e.addEventListener("input", (o) => {
            1 === e.value.length &&
              (t < r.length - 1 ? r[t + 1].focus() : e.blur());
          }),
            e.addEventListener("keydown", (o) => {
              "Backspace" === o.key &&
                0 === e.value.length &&
                t > 0 &&
                r[t - 1].focus();
            });
        }));
    });
  },
  startCounter = () => {
    const e = document.querySelector(".time-left");
    if (!e) return;
    let t = 180;
    const r = setInterval(() => {
      const o = Math.floor(t / 60);
      let s = t % 60;
      const n = `${o}:${s < 10 ? "0" : ""}${s}`;
      (e.textContent = n), t--, t < 0 && (clearInterval(r), iniciarContador());
    }, 1e3);
  },
  tabs = () => {
    document.querySelectorAll(".tab-container").forEach((e) => {
      const t = e.querySelectorAll(".tab-item"),
        r = e.querySelectorAll(".tab-content-item");
      t &&
        t.forEach((e, o) => {
          e.addEventListener("click", () => {
            t.forEach((e, t) => {
              r[t].classList.remove("active"), e.classList.remove("active");
            }),
              r[o].classList.add("active"),
              e.classList.add("active");
          });
        });
    });
  },
  textareaExpansible = () => {
    document.querySelectorAll(".form-content").forEach((e) => {
      e.addEventListener("input", () => {
        (e.style.height = "auto"), (e.style.height = `${e.scrollHeight}px`);
      });
    });
  },
  counter = () => {
    document.querySelectorAll(".counter").forEach((e) => {
      const t = e.querySelector(".counter-value");
      e.addEventListener("click", ({ target: e }) => {
        e.classList.contains("increment")
          ? t.value++
          : e.classList.contains("decrement") && t.value > 0 && t.value--;
      });
    });
  },
  restrictNumberInput = () => {
    document.querySelectorAll('input[type="number"]').forEach((e) => {
      e.addEventListener("onpaste", (e) => e.preventDefault()),
        e.addEventListener("keydown", (e) => {
          if (isNaN(parseInt(e.key)) && 8 != e.keyCode)
            return e.preventDefault();
        });
    });
  },
  expandables = () => {
    document.querySelectorAll(".expandable-container").forEach((e) => {
      const t = e.querySelector(".expandable-toggle"),
        r = e.querySelector(".expandable-content"),
        o = e.querySelector(".expandable-subcontent");
      t &&
        r &&
        (o.offsetHeight <= r.clientHeight &&
          ((t.style.display = "none"), r.classList.toggle("expanded")),
        t.addEventListener("click", () => {
          const e = t.querySelector("svg");
          r.classList.toggle("expanded"),
            r.classList.contains("expanded")
              ? (e.classList.add("rotate-180"),
                (r.style.maxHeight = `${o.offsetHeight}px`))
              : (e.classList.remove("rotate-180"), (r.style.maxHeight = ""));
        }));
    });
  },
  carrousel = () => {
    const e = document.querySelector(".swiper");
    e &&
      new Swiper(".swiper-hero", {
        spaceBetween: 30,
        centeredSlides: !0,
        loop: !0,
        fadeEffect: { crossFade: !0 },
        pagination: { el: ".swiper-pagination", clickable: !0 },
        navigation: { nextEl: ".button-next", prevEl: ".button-prev" },
      }),
      e &&
        new Swiper(".swiper-cards", {
          slidesPerView: 1,
          spaceBetween: 20,
          loop: !0,
          autoplay: { delay: 5e3, disableOnInteraction: !1 },
          breakpoints: {
            560: { slidesPerView: 2 },
            760: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          },
          navigation: { nextEl: ".button-next", prevEl: ".button-prev" },
        }),
      e &&
        new Swiper(".swiper-categories", {
          slidesPerView: 1,
          spaceBetween: 2,
          breakpoints: {
            400: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 7 },
          },
          pagination: { el: ".swiper-pagination", clickable: !0 },
        }),
      e &&
        new Swiper(".swiper-testimonials", {
          slidesPerView: 1,
          spaceBetween: 20,
          loop: !0,
          autoplay: { delay: 3e3, disableOnInteraction: !1 },
          breakpoints: { 640: { slidesPerView: 2 } },
          pagination: { el: ".swiper-pagination", clickable: !0 },
        }),
      e &&
        new Swiper(".swiper-gridcard", {
          slidesPerView: 1,
          spaceBetween: 20,
          breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          },
          navigation: { nextEl: ".button-next", prevEl: ".button-prev" },
        }),
      e &&
        new Swiper(".swiper-brands", {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: !0,
          autoplay: { delay: 2e3, disableOnInteraction: !1 },
          breakpoints: {
            340: { slidesPerView: 2, spaceBetween: 20 },
            440: { slidesPerView: 3, spaceBetween: 20 },
            540: { slidesPerView: 4, spaceBetween: 20 },
            640: { slidesPerView: 5, spaceBetween: 20 },
            1024: { slidesPerView: 7, spaceBetween: 20 },
          },
        });
    const t = document.querySelectorAll(".swiper-thumbs"),
      r = document.querySelectorAll(".swiper-product");
    t &&
      t.forEach((e, t) => {
        if (!e) return;
        const o = new Swiper(e, {
          slidesPerView: 5,
          spaceBetween: 10,
          slideToClickedSlide: !0,
          breakpoints: {
            0: { direction: "horizontal" },
            1024: { direction: "vertical" },
          },
          watchSlidesVisibility: !0,
          watchSlidesProgress: !0,
        });
        new Swiper(r[t], {
          spaceBetween: 10,
          loop: !0,
          effect: "fade",
          allowTouchMove: !1,
          fadeEffect: { crossFade: !0 },
          navigation: { nextEl: ".button-next", prevEl: ".button-prev" },
          thumbs: { swiper: o },
        });
      });
  },
  accordion = () => {
    document.querySelectorAll(".metismenu").forEach((e) => {
      e &&
        (new MetisMenu(e, {
          triggerElement: ".sub-metismenu",
          subMenu: ".metismenu-content",
        }),
        document.addEventListener("click", (t) => {
          if (!e.contains(t.target)) {
            e.querySelectorAll('[aria-expanded="true"]').forEach((e) => {
              e.click();
            });
          }
        }));
    });
  },
  rater = () => {
    document.querySelectorAll("[data-rater]").forEach((e) => {
      const t = parseInt(e.getAttribute("data-rater"));
      new raterJs({
        element: e,
        showToolTip: !1,
        max: 5,
        starSize: 14,
        readOnly: !0,
      }).setRating(t);
    });
    const e = document.querySelector("#rater");
    if (!e) return;
    let t = raterJs({
      element: e,
      rateCallback: function (e, t) {
        this.setRating(e), t();
      },
      starSize: 20,
      step: 0.5,
    });
    const r = document.querySelector(".form-review");
    r &&
      r.addEventListener("submit", (e) => {
        document.querySelector(".rating-value").value = t.getRating();
      });
  },
  priceRange = () => {
    const e = document.querySelector(".slider-handles");
    if (!e) return;
    noUiSlider.create(e, {
      start: [200, 700],
      connect: !0,
      step: 100,
      range: { min: [0], max: [2e3] },
    });
    const t = [
        document.querySelector(".min-price"),
        document.querySelector(".max-price"),
      ],
      r = [
        document.querySelector(".span-min-price"),
        document.querySelector(".span-max-price"),
      ];
    e.noUiSlider.on("update", function (e, o) {
      (t[o].value = parseInt(e[o])), (r[o].innerHTML = `$${parseInt(e[o])}`);
    });
  },
  filtering = () => {
    if (!document.querySelector(".mix-container")) return;
    const e = mixitup(".mix-container", {
      selectors: { target: ".mix" },
      animation: { duration: 300 },
    });
    document.querySelector(".mix-shop")
      ? e.filter(".mix-grid")
      : e.filter(".mix-all");
  },
  parallax = () => {
    const e = document.querySelector(".parallax");
    e &&
      new simpleParallax(e, {
        orientation: "up",
        delay: 0.4,
        transition: "cubic-bezier(0,0,0,1)",
      });
  },
  notifyMessage = () => {
    iziToast.show({
      message: "Message sent successfully!",
      position: "topRight",
      backgroundColor: "white",
      icon: "bi-check-circle-fill",
      iconColor: "#3F5EDF",
      titleColor: "inherit",
      messageColor: "inherit",
    });
  },
  emailJs = () => {
    const e = document.querySelector("#submit-button"),
      t = document.querySelector("#contact-form");
    t &&
      t.addEventListener("submit", (r) => {
        r.preventDefault(),
          (e.innerHTML =
            '<svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">\n      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>\n      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>\n    </svg> Sending');
        emailjs.sendForm("default_service", "template_s5sx8ip", t).then(
          () => {
            (e.textContent = "Send message"),
              iziToast.show({
                message: "Message sent successfully!",
                position: "topRight",
                backgroundColor: "white",
                icon: "bi-check-circle-fill",
                iconColor: "#3F5EDF",
                titleColor: "inherit",
                messageColor: "inherit",
              });
          },
          (t) => {
            (e.textContent = "Send message"), alert(JSON.stringify(t));
          }
        );
      });
  };
