const pageviews = document.querySelector(".form__pageviews");
const price = document.querySelector(".price");
const discountText = document.querySelector(".form__discount");
const slider = document.querySelector(".form__slider");
const billingOptionCheckbox = document.querySelector(".option-checkbox");

let discount = 0.25;
let startingPageView = 100000;
let pageViewToPrice = {
  10000: 8.0,
  50000: 12.0,
  100000: 16.0,
  500000: 24.0,
  1000000: 35.0,
};

document.addEventListener("DOMContentLoaded", () => {
  setUpForm(startingPageView);
});

window.addEventListener("resize", () => {
  if (window.screen.width <= 375) {
    discountText.innerHTML = `-25%`;
  } else {
    discountText.innerHTML = `-25% discount`;
  }
});

slider.addEventListener("change", () => {
  startingPageView = getNextPageViewValue();
  setUpForm(startingPageView);
});

billingOptionCheckbox.addEventListener("change", () => {
  setUpForm(startingPageView);
});

function getNextPageViewValue() {
  const pageViewList = Object.keys(pageViewToPrice);
  return pageViewList[slider.value - 1];
}

function setUpForm(pageview) {
  pageviews.innerHTML = convertPageViewToText(pageview);
  price.innerHTML = calculatePrice(pageview);
}

function convertPageViewToText(pageview) {
  if (pageview >= 1000000) {
    return `${pageview / 1000000}M Pageviews`;
  } else {
    return `${pageview / 1000}K Pageviews`;
  }
}

function calculatePrice(pageview) {
  let pricePerMonth = pageViewToPrice[pageview];
  if (billingOptionCheckbox.checked) {
    pricePerMonth *= 1 - discount;
  }
  return `$ ${pricePerMonth.toFixed(2)}`;
}
