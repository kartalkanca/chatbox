(function () { 
  'use strict';

  // Yalnızca düz metni escape et
  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Eğer HTML tag içeriyorsa escape etme
  function safeMessage(message) {
    const isPlainText = !/<[a-z][\s\S]*>/i.test(message);
    return isPlainText ? escapeHtml(message) : message;
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

  // Fazladan renderlanmış emoji <img> öğelerini sil
  function removeDuplicateEmojis(domElement) {
    const duplicates = domElement.querySelectorAll('img.emoji');
    duplicates.forEach(el => el.remove());
  }

  // Test mesajı ekleme fonksiyonu
  window.addTestMessage = function (from, message) {
    const template = document.querySelector('#chatlist_item').innerHTML;
    const log = document.querySelector('#log');

    const div = document.createElement('div');
    div.innerHTML = template
      .replace('{from}', escapeHtml(from))
      .replace('{message}', safeMessage(message));

    removeDuplicateEmojis(div); // görünmeyen kopyaları temizle
    log.appendChild(div);
  };
})();
