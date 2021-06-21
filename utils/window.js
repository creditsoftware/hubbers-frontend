import {
  Promise
} from './promise';

export const openPopupCenter = (url, title, w, h, redirect) => {
  return new Promise((resolve) => {
    // Fixes dual-screen position                         Most browsers      Firefox
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth ?
      window.innerWidth :
      document.documentElement.clientWidth ?
        document.documentElement.clientWidth :
        screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ?
      document.documentElement.clientHeight : screen.height;

    const left = ((width / 2) - (w / 2)) + dualScreenLeft;
    const top = ((height / 2) - (h / 2)) + dualScreenTop;
    const newWindow = window.open(
      url,
      title,
      'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (newWindow && newWindow.focus) {
      newWindow.focus();
    }

    if (redirect) {
      // Listen to message from child window
      const linkedinCallback = (e) => {
        if (e.origin !== process.env.API_URL) {
          return;
        }
        newWindow.close();
        window.removeEventListener('message', linkedinCallback);
        resolve(e.data);
      };
      window.addEventListener('message', linkedinCallback, false);
    }
  });
};