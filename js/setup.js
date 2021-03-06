'use strict';

(function () {
  var setupOpen = document.querySelector('.setup-open');
  var setupOpenBtn = setupOpen.querySelector('.setup-open-icon');
  var setupWindow = document.querySelector('.setup');
  var setupClose = setupWindow.querySelector('.setup-close');
  var fieldUserName = setupWindow.querySelector('.setup-user-name');
  var btnSubmit = setupWindow.querySelector('.setup-submit');
  var wizardCoat = setupWindow.querySelector('#wizard-coat');
  var wizardCoatColors = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var wizardEyes = setupWindow.querySelector('#wizard-eyes');
  var wizardEyesColors = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];
  var wizardFireball = setupWindow.querySelector('.setup-fireball-wrap');
  var wizardFireballColors = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  fieldUserName.required = true;
  fieldUserName.maxLength = 50;

  var enableSetup = function () {
    var onSetupOpen = null;

    var hideDialog = function () {
      setupWindow.classList.add('invisible');
      setupOpenBtn.setAttribute('aria-pressed', false);
      setupClose.setAttribute('aria-pressed', true);
      document.removeEventListener('keydown', escapePressHandler);
      setupClose.removeEventListener('click', hideDialog);
      setupClose.removeEventListener('keydown', offSetupKeydown);
      btnSubmit.removeEventListener('click', hideDialog);
      btnSubmit.removeEventListener('keydown', offSetupKeydown);

      if (typeof onSetupOpen === 'function') {
        onSetupOpen();
      }
    };

    var escapePressHandler = function (evt) {
      if (window.checkEvents.checkPressedEsc(evt)) {
        hideDialog();
      }
    };

    var offSetupKeydown = function (evt) {
      if (window.checkEvents.checkPressedEnter(evt)) {
        hideDialog();
      }
    };

    var showDialog = function () {
      document.addEventListener('keydown', escapePressHandler);
      setupWindow.classList.remove('invisible');
      setupOpenBtn.setAttribute('aria-pressed', true);
      setupClose.setAttribute('aria-pressed', false);

      setupClose.addEventListener('click', hideDialog);
      setupClose.addEventListener('keydown', offSetupKeydown);

      btnSubmit.addEventListener('click', hideDialog);
      btnSubmit.addEventListener('keydown', offSetupKeydown);
    };

    var colorizingType = function (element, colors, property) {
      var changeColor = function () {
        currentValue = window.utils.getRandomElementExcept(colors, currentValue);
        element.style[property] = currentValue;
      };
      var currentValue = element.style[property];
      element.addEventListener('click', changeColor);
      element.addEventListener('keydown', function (evt) {
        if (window.checkEvents.checkPressedEnter(evt)) {
          changeColor();
        }
      });
    };

    window.colorizeElement(function () {
      colorizingType(wizardCoat, wizardCoatColors, 'fill');
    });
    window.colorizeElement(function () {
      colorizingType(wizardEyes, wizardEyesColors, 'fill');
    });
    window.colorizeElement(function () {
      colorizingType(wizardFireball, wizardFireballColors, 'backgroundColor');
    });

    return function (callback) {
      onSetupOpen = callback;
      showDialog();
    };
  }();

  var onSetupKeydown = function (evt) {
    if (window.checkEvents.checkPressedEnter(evt)) {
      enableSetup(function () {
        setupOpenBtn.focus();
      });
    }
  };
  setupOpen.addEventListener('click', enableSetup);
  setupOpen.addEventListener('keydown', onSetupKeydown);
})();
