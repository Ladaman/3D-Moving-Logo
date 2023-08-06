const logoWrapper = document.querySelector(".logo-wrapper");
const logoImages = logoWrapper.querySelectorAll(".logo-element");

const getActive = () => {
  document.body.dataset.active === "true";
};
const setActiveTo = (active) => {
  document.body.dataset.active = active;
};

const move = (image, index, rangeX, rangeY) => {
  const active = getActive();

  const translationIntensity = active ? 24 : 4;
  const maxTranslation = translationIntensity * (index + 1);
  const currentTranslation = `${maxTranslation * rangeX}% ${
    maxTranslation * rangeY
  }%`;
  const scale = active ? 1 + index * 0.4 : 1;

  image.animate(
    {
      translate: currentTranslation,
      scale,
    },
    { duration: 750, fill: "forwards", easing: "ease" }
  );
};

const moveAll = (images, rangeX, rangeY) => {
  images.forEach((image, index) => move(image, index, rangeX, rangeY));
};

const moveLogo = (e, logoImages) => {
  //area of mouse movement in pixels
  const radius = 500;

  const rect = logoWrapper.getBoundingClientRect();

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const rangeX = (e.clientX - centerX) / radius;
  const rangeY = (e.clientY - centerY) / radius;

  moveAll(logoImages, rangeX, rangeY);
};

const resetLogo = () => {
  setActiveTo(false);
  moveAll(logoImages, 0.4, -0.7);
};

document.body.onmouseleave = () => {
  if (!getActive()) resetLogo();
};

addEventListener("mousemove", (e) => moveLogo(e, logoImages));
