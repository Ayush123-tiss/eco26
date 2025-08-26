import { useState, useEffect } from 'react';
import { Workbox } from 'workbox-window';

interface ServiceWorkerUpdateInfo {
  isUpdateAvailable: boolean;
  isUpdateInstalling: boolean;
  isUpdateReady: boolean;
  updateServiceWorker: () => Promise<void>;
  skipWaiting: () => void;
}

export function useServiceWorkerUpdate(): ServiceWorkerUpdateInfo {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isUpdateInstalling, setIsUpdateInstalling] = useState(false);
  const [isUpdateReady, setIsUpdateReady] = useState(false);
  const [workbox, setWorkbox] = useState<Workbox | null>(null);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      const wb = new Workbox('/sw.js');

      // Listen for service worker events
      wb.addEventListener('waiting', () => {
        setIsUpdateAvailable(true);
      });

      wb.addEventListener('controlling', () => {
        setIsUpdateReady(true);
        setIsUpdateInstalling(false);
        // Reload to activate the new service worker
        window.location.reload();
      });

      wb.addEventListener('installed', (event) => {
        if (event.isUpdate) {
          setIsUpdateInstalling(true);
        }
      });

      // Register the service worker
      wb.register().catch((error) => {
        console.error('Service worker registration failed:', error);
      });

      setWorkbox(wb);

      return () => {
        // Clean up event listeners if needed
      };
    }
  }, []);

  const updateServiceWorker = async (): Promise<void> => {
    if (!workbox) {
      throw new Error('Service worker not available');
    }

    try {
      setIsUpdateInstalling(true);
      
      // Tell the waiting service worker to skip waiting and become active
      await workbox.messageSkipWaiting();
    } catch (error) {
      setIsUpdateInstalling(false);
      console.error('Failed to update service worker:', error);
      throw error;
    }
  };

  const skipWaiting = (): void => {
    if (workbox) {
      workbox.messageSkipWaiting();
    }
  };

  return {
    isUpdateAvailable,
    isUpdateInstalling,
    isUpdateReady,
    updateServiceWorker,
    skipWaiting
  };
}
