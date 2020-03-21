import React from 'react';
import { notification, Button, message } from 'antd';
// import { formatMessage } from 'umi/locale';
import defaultSettings from './defaultSettings';

window.React = React;

const { pwa } = defaultSettings;

// if pwa is true
if (pwa) {
  // Notify user if offline now
  window.addEventListener('sw.offline', () => {
    // message.warning(formatMessage({ id: 'app.pwa.offline' }));
    message.warning('当前处于离线状态')
  });

  // Pop up a prompt on the page asking the user if they want to use the latest version
  window.addEventListener('sw.updated', e => {
    const reloadSW = async () => {
      // Check if there is sw whose state is waiting in ServiceWorkerRegistration
      // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration
      const worker = e.detail && e.detail.waiting;
      if (!worker) {
        return Promise.resolve();
      }
      // Send skip-waiting event to waiting SW with MessageChannel
      await new Promise((resolve, reject) => {
        const channel = new MessageChannel();
        channel.port1.onmessage = event => {
          if (event.data.error) {
            reject(event.data.error);
          } else {
            resolve(event.data);
          }
        };
        worker.postMessage({ type: 'skip-waiting' }, [channel.port2]);
      });
      // Refresh current page to use the updated HTML and other assets after SW has skiped waiting
      window.location.reload(true);
      return true;
    };
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        type="primary"
        onClick={() => {
          notification.close(key);
          reloadSW();
        }}
      >
        刷新
        {/* {formatMessage({ id: 'app.pwa.serviceworker.updated.ok' })} */}
      </Button>
    );
    notification.open({
      // message: formatMessage({ id: 'app.pwa.serviceworker.updated' }),
      message: '有新内容',
      description: '请点击“刷新”按钮或者手动刷新页面',
      // description: formatMessage({ id: 'app.pwa.serviceworker.updated.hint' }),
      btn,
      key,
      onClose: async () => {},
    });
  });
}
