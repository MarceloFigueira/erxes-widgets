/*
 * InApp message's embeddable script
 */

import settings from '../../../settings';

// css
import './index.css';

const API_URL = settings.API_URL;

// add iframe
let iframe = document.createElement('iframe');
iframe.id = 'erxes-iframe';
iframe.src = `${API_URL}/inapp`;
iframe.style.display = 'none';

document.body.appendChild(iframe);

// send erxes settings to iframe
iframe = document.querySelector('#erxes-iframe');

// after iframe load send connection info
iframe.onload = () => {
  iframe.style.display = 'inherit';

  iframe.contentWindow.postMessage({
    fromPublisher: true,
    settings: window.erxesSettings,
  }, '*');
};

// listen for widget toggle
window.addEventListener('message', (event) => {
  if (event.data.fromErxes) {
    iframe = document.querySelector('#erxes-iframe');

    iframe.className = 'erxes-messenger-shown';

    if (event.data.isMessengerVisible) {
      iframe.className = 'erxes-messenger-hidden';
    }
  }
});