(function () {
  'use strict';

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function conditionalClass(element, classToAdd, conditional, yesCondition) {
    if (typeof yesCondition !== 'object') yesCondition = [yesCondition];

    for (let i = 0; i < yesCondition.length; i++) {
      if (conditional === yesCondition[i]) {
        element.classList.add(classToAdd);
        return;
      }
    }

    element.classList.remove(classToAdd);
  }

  const showBadges = "Yes";
  const wrapper = document.querySelector('#wrapper');
  conditionalClass(wrapper, 'no-badges', showBadges.toLowerCase(), 'no');
})();
