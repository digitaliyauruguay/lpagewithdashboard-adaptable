import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Hook para touch gestures optimizados
 */
export function useTouchGestures(options = {}) {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onTap,
    onLongPress,
    swipeThreshold = 50,
    longPressDelay = 500,
    preventDefault = true
  } = options;

  const [touchState, setTouchState] = useState({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    startTime: 0,
    isLongPress: false,
    isSwiping: false
  });

  const longPressTimer = useRef(null);
  const touchElement = useRef(null);

  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    const startTime = Date.now();
    
    setTouchState({
      startX: touch.clientX,
      startY: touch.clientY,
      endX: touch.clientX,
      endY: touch.clientY,
      startTime,
      isLongPress: false,
      isSwiping: false
    });

    // Iniciar timer para long press
    if (onLongPress) {
      longPressTimer.current = setTimeout(() => {
        setTouchState(prev => ({ ...prev, isLongPress: true }));
        onLongPress(e);
      }, longPressDelay);
    }

    if (preventDefault) {
      e.preventDefault();
    }
  }, [onLongPress, longPressDelay, preventDefault]);

  const handleTouchMove = useCallback((e) => {
    const touch = e.touches[0];
    
    setTouchState(prev => ({
      ...prev,
      endX: touch.clientX,
      endY: touch.clientY,
      isSwiping: true
    }));

    // Cancelar long press si hay movimiento
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    if (preventDefault && touchState.isSwiping) {
      e.preventDefault();
    }
  }, [preventDefault, touchState.isSwiping]);

  const handleTouchEnd = useCallback((e) => {
    const { startX, startY, endX, endY, startTime, isLongPress } = touchState;
    const endTime = Date.now();
    const duration = endTime - startTime;

    // Limpiar timer de long press
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    // Si fue long press, no procesar otros gestures
    if (isLongPress) {
      return;
    }

    // Calcular distancias
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Determinar el tipo de swipe
    if (duration < 1000) { // Máximo 1 segundo para swipe
      if (absDeltaX > absDeltaY && absDeltaX > swipeThreshold) {
        // Swipe horizontal
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight(e, deltaX);
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft(e, absDeltaX);
        }
      } else if (absDeltaY > swipeThreshold) {
        // Swipe vertical
        if (deltaY > 0 && onSwipeDown) {
          onSwipeDown(e, deltaY);
        } else if (deltaY < 0 && onSwipeUp) {
          onSwipeUp(e, absDeltaY);
        }
      } else if (absDeltaX < 10 && absDeltaY < 10 && onTap) {
        // Tap (movimiento mínimo)
        onTap(e);
      }
    }

    if (preventDefault) {
      e.preventDefault();
    }
  }, [touchState, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onTap, swipeThreshold, preventDefault]);

  // Asignar event listeners
  useEffect(() => {
    const element = touchElement.current;
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: !preventDefault });
    element.addEventListener('touchmove', handleTouchMove, { passive: !preventDefault });
    element.addEventListener('touchend', handleTouchEnd, { passive: !preventDefault });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, preventDefault]);

  return {
    touchRef: touchElement,
    touchState
  };
}

/**
 * Hook para swipeable carousel
 */
export function useSwipeableCarousel(itemCount, onSwipe) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handleSwipeLeft = useCallback(() => {
    if (currentIndex < itemCount - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      onSwipe?.(nextIndex);
    }
  }, [currentIndex, itemCount, onSwipe]);

  const handleSwipeRight = useCallback(() => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      onSwipe?.(prevIndex);
    }
  }, [currentIndex, onSwipe]);

  const { touchRef } = useTouchGestures({
    onSwipeLeft: handleSwipeLeft,
    onSwipeRight: handleSwipeRight,
    swipeThreshold: 80
  });

  return {
    touchRef,
    currentIndex,
    setCurrentIndex,
    next: handleSwipeLeft,
    prev: handleSwipeRight
  };
}

/**
 * Hook para pull-to-refresh
 */
export function usePullToRefresh(onRefresh, options = {}) {
  const { threshold = 100, debounce = 500 } = options;
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { touchRef, touchState } = useTouchGestures({
    onSwipeDown: (e, distance) => {
      if (window.scrollY === 0) {
        setIsPulling(true);
        setPullDistance(Math.min(distance, threshold + 50));
      }
    }
  });

  useEffect(() => {
    if (isPulling && pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      onRefresh?.().finally(() => {
        setIsRefreshing(false);
        setIsPulling(false);
        setPullDistance(0);
      });
    }
  }, [isPulling, pullDistance, threshold, isRefreshing, onRefresh]);

  const resetPull = useCallback(() => {
    setIsPulling(false);
    setPullDistance(0);
  }, []);

  return {
    touchRef,
    isPulling,
    pullDistance,
    isRefreshing,
    resetPull
  };
}

/**
 * Hook para detectar dispositivo móvil
 */
export function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
      setOrientation(width > height ? 'landscape' : 'portrait');
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  return {
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
    orientation
  };
}

/**
 * Hook para haptic feedback (vibración)
 */
export function useHapticFeedback() {
  const vibrate = useCallback((pattern) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }, []);

  const tap = useCallback(() => vibrate(10), [vibrate]);
  const success = useCallback(() => vibrate([10, 50, 10]), [vibrate]);
  const warning = useCallback(() => vibrate([100, 50, 100]), [vibrate]);
  const error = useCallback(() => vibrate([100, 50, 100, 50, 100]), [vibrate]);

  return {
    vibrate,
    tap,
    success,
    warning,
    error,
    isSupported: 'vibrate' in navigator
  };
}
