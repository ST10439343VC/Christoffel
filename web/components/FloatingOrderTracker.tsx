import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

type OrderStatus =
  | 'received'
  | 'preparing'
  | 'ready'
  | 'completed';

type Order = {
  id: string;
  items: { [key: string]: number };
  paymentMethod: string;
  subtotal: number;
  serviceFee: number;
  total: number;
  status: OrderStatus;
  createdAt: number;
  estimatedReadyAt: number;
};

const ORDERS_STORAGE_KEY = '@christoffel_orders';

const statusLabels: Record<OrderStatus, string> = {
  received: 'ORDER RECEIVED',
  preparing: 'PREPARING',
  ready: 'READY FOR COLLECTION',
  completed: 'COMPLETED',
};

const statusDescriptions: Record<OrderStatus, string> = {
  received: 'Your order has been received.',
  preparing: 'Chef Christoffel is preparing your meal.',
  ready: 'Your meal is ready for collection.',
  completed: 'Your order has been completed.',
};

export default function FloatingOrderTracker() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [hasMoreThanTwoActiveOrders, setHasMoreThanTwoActiveOrders] = useState(false);
  const [remaining, setRemaining] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [isHiddenPage, setIsHiddenPage] = useState(false);

  const knownOrderIds = useRef<string[]>([]);

  const [dragOffset, setDragOffset] = useState({
    x: 0,
    y: 0,
  });

  const dragStart = useRef({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handlePageChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ page?: string }>;
      const page = customEvent.detail?.page;
      setIsHiddenPage(
        page === 'allOrders' ||
        page === 'tracking'
      );
    };

    window.addEventListener(
      'christoffel-page-change',
      handlePageChange
    );

    return () => {
      window.removeEventListener(
        'christoffel-page-change',
        handlePageChange
      );
    };
  }, []);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const savedOrders =
          await AsyncStorage.getItem(
            ORDERS_STORAGE_KEY
          );

        if (!savedOrders) {
          setOrders([]);
          setHasMoreThanTwoActiveOrders(false);
          knownOrderIds.current = [];
          return;
        }

        const parsedOrders: Order[] =
          JSON.parse(savedOrders);

        // NORMALIZE THE SAVED ORDER STATUS FIRST.
        const normalizedOrders = parsedOrders.map(
          order => ({
            ...order,
            status: String(order.status)
              .trim()
              .toLowerCase() as OrderStatus,
          })
        );

        // THE FLOATING TRACKER ONLY KNOWS ABOUT ACTIVE ORDERS.
        // COMPLETED ORDERS ARE NEVER PUT INTO THE TRACKER.
        const allActiveOrders = normalizedOrders
          .filter(
            order =>
              order.status === 'received' ||
              order.status === 'preparing' ||
              order.status === 'ready'
          )
          .sort(
            (a, b) =>
              b.createdAt - a.createdAt
          )
          // One order ID = one order.
          // This prevents duplicate saved records from making
          // ORDER HISTORY appear when only two real orders exist.
          .filter(
            (order, index, array) =>
              array.findIndex(
                current =>
                  current.id === order.id
              ) === index
          );

        const activeOrderIds =
          allActiveOrders.map(
            order => order.id
          );

        setHasMoreThanTwoActiveOrders(
          allActiveOrders.length > 2
        );

        // NO ACTIVE ORDERS = NO TRACKER.
        if (allActiveOrders.length === 0) {
          knownOrderIds.current = [];
          setOrders([]);
          setRemaining({});
          setHasMoreThanTwoActiveOrders(false);
          return;
        }

        // SHOW ONE ORDER, TWO ORDERS, OR THE TWO MOST RECENT
        // WHEN THERE ARE MORE THAN TWO. NEVER SHOW EMPTY SLOTS.
        setOrders(
          allActiveOrders.slice(0, 2)
        );
      } catch (error) {
        console.log(
          'Could not load floating order tracker:',
          error
        );
      }
    };

    loadOrders();

    // Keep the tracker synchronized with the same persisted
    // @christoffel_orders data used by WebApp.
    const refresh = setInterval(
      loadOrders,
      1000
    );

    return () =>
      clearInterval(refresh);
  }, []);

  useEffect(() => {
    if (!orders.length) {
      return;
    }

    const updateCountdowns = () => {
      const nextRemaining: Record<
        string,
        string
      > = {};

      orders.forEach(order => {
        if (order.status === 'completed') {
          nextRemaining[order.id] = 'DONE';
          return;
        }

        if (order.status === 'ready') {
          nextRemaining[order.id] =
            'READY NOW';
          return;
        }

        const difference =
          order.estimatedReadyAt -
          Date.now();

        if (difference <= 0) {
          nextRemaining[order.id] =
            'READY NOW';
          return;
        }

        const minutes = Math.floor(
          difference / 60000
        );

        const seconds = Math.floor(
          (difference % 60000) / 1000
        );

        nextRemaining[order.id] =
          `${minutes}:${seconds
            .toString()
            .padStart(2, '0')}`;
      });

      setRemaining(nextRemaining);
    };

    updateCountdowns();

    const timer = setInterval(
      updateCountdowns,
      1000
    );

    return () =>
      clearInterval(timer);
  }, [orders]);

  const dragPointer = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    startLeft: 0,
    startTop: 0,
    baseLeft: 0,
    baseTop: 0,
    width: 292,
    height: 200,
    moved: false,
  });

  const cardRef = useRef<any>(null);

  const dragOffsetRef = useRef(dragOffset);

  useEffect(() => {
    dragOffsetRef.current = dragOffset;
  }, [dragOffset]);

  const clampPosition = (
    nextX: number,
    nextY: number,
    width: number,
    height: number
  ) => {
    if (typeof window === 'undefined') {
      return { x: nextX, y: nextY };
    }

    const baseLeft =
      window.innerWidth - 20 - width;
    const baseTop =
      window.innerHeight - 20 - height;

    const desiredLeft = baseLeft + nextX;
    const desiredTop = baseTop + nextY;

    const maxLeft = Math.max(0, window.innerWidth - width);
    const maxTop = Math.max(0, window.innerHeight - height);

    return {
      x: Math.min(
        Math.max(0, desiredLeft),
        maxLeft
      ) - baseLeft,
      y: Math.min(
        Math.max(0, desiredTop),
        maxTop
      ) - baseTop,
    };
  };

  const handlePointerDown = (event: any) => {
    if (typeof window === 'undefined') {
      return;
    }

    event.preventDefault?.();

    /*
     * IMPORTANT:
     * The pointer starts on the small DRAG HERE handle, but the
     * position calculations must use the WHOLE CARD's rectangle.
     * Using the handle's rectangle here makes the tracker jump when
     * dragging starts because the handle is much smaller than the card.
     */
    const cardElement =
      cardRef.current as HTMLElement | null;

    if (!cardElement?.getBoundingClientRect) {
      return;
    }

    const rect =
      cardElement.getBoundingClientRect();

    const width = rect.width || 292;
    const height = rect.height || 200;

    const baseLeft =
      window.innerWidth - 20 - width;
    const baseTop =
      window.innerHeight - 20 - height;

    dragPointer.current = {
      active: true,
      pointerId: event.pointerId ?? -1,
      startX: event.clientX,
      startY: event.clientY,
      startLeft: rect.left,
      startTop: rect.top,
      baseLeft,
      baseTop,
      width,
      height,
      moved: false,
    };

    setIsDragging(true);

    try {
      event.currentTarget?.setPointerCapture?.(
        event.pointerId
      );
    } catch {}
  };

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const drag = dragPointer.current;

      if (!drag.active) {
        return;
      }

      if (
        drag.pointerId !== -1 &&
        event.pointerId !== drag.pointerId
      ) {
        return;
      }

      const dx = event.clientX - drag.startX;
      const dy = event.clientY - drag.startY;

      if (
        Math.abs(dx) > 4 ||
        Math.abs(dy) > 4
      ) {
        drag.moved = true;
      }

      const startOffsetX =
        drag.startLeft - drag.baseLeft;
      const startOffsetY =
        drag.startTop - drag.baseTop;

      const position = clampPosition(
        startOffsetX + dx,
        startOffsetY + dy,
        drag.width,
        drag.height
      );

      setDragOffset(position);
    };

    const finishDragging = (event?: PointerEvent) => {
      const drag = dragPointer.current;

      if (!drag.active) {
        return;
      }

      if (
        event &&
        drag.pointerId !== -1 &&
        event.pointerId !== drag.pointerId
      ) {
        return;
      }

      drag.active = false;
      setIsDragging(false);
    };

    document.addEventListener(
      'pointermove',
      handlePointerMove
    );
    document.addEventListener(
      'pointerup',
      finishDragging
    );
    document.addEventListener(
      'pointercancel',
      finishDragging
    );

    return () => {
      document.removeEventListener(
        'pointermove',
        handlePointerMove
      );
      document.removeEventListener(
        'pointerup',
        finishDragging
      );
      document.removeEventListener(
        'pointercancel',
        finishDragging
      );
    };
  }, []);

  const handleClickCapture = (event: any) => {
    if (dragPointer.current.moved) {
      event.preventDefault?.();
      event.stopPropagation?.();
      dragPointer.current.moved = false;
    }
  };

  const openTracking = (
    orderId: string
  ) => {
    if (
      typeof window === 'undefined'
    ) {
      return;
    }

    window.dispatchEvent(
      new CustomEvent(
        'christoffel-track-order',
        {
          detail: {
            orderId,
          },
        }
      )
    );
  };

  const openAllOrders = () => {
    if (
      typeof window === 'undefined'
    ) {
      return;
    }

    window.dispatchEvent(
      new CustomEvent(
        'christoffel-view-all-orders'
      )
    );
  };

  if (!orders.length || isHiddenPage) {
    return null;
  }

  return (
    <View
      style={[
        styles.wrapper,
        {
          transform: [
            {
              translateX: dragOffset.x,
            },
            {
              translateY: dragOffset.y,
            },
          ],
        },
      ]}
    >
      <View
        ref={cardRef}
        style={styles.card}
      >

        {/* DRAG HANDLE / HEADER */}

        <View style={styles.header}>

          {/* CHRISTOFFEL BRAND — NOT A DRAG AREA */}

          <View style={styles.headerLeft}>

            <Text style={styles.brandMark}>
              ♨
            </Text>

            <View>
              <Text style={styles.brand}>
                CHRISTOFFEL
              </Text>

              <Text style={styles.headerTitle}>
                LIVE ORDER
              </Text>
            </View>

          </View>

          {/* LARGE DEDICATED DRAG AREA */}

          <View
            style={[
              styles.dragZone,
              isDragging && styles.dragZoneDragging,
            ]}
            {...({
              onPointerDown: handlePointerDown,
            } as any)}
          >
            <Text style={styles.dragZoneText}>
              DRAG TO MOVE
            </Text>

            <Text style={styles.dragZoneHint}>
              GRAB HERE
            </Text>
          </View>

          <Text style={styles.orderCount}>
            {orders.length}
          </Text>

        </View>

        {/* RECENT ORDERS */}

        <View style={styles.ordersList}>

          {orders.map((order, index) => (
            <Pressable
              key={order.id}
              onPress={() =>
                openTracking(order.id)
              }
              style={({ pressed }) => [
                styles.orderRow,
                index ===
                  orders.length - 1 &&
                  styles.orderRowLast,
                pressed &&
                  styles.orderRowPressed,
              ]}
            >

              <View style={styles.orderMain}>

                <View style={styles.orderTitleRow}>

                  <Text
                    style={styles.orderNumber}
                  >
                    {order.id}
                  </Text>

                  <View
                    style={styles.statusDot}
                  />

                  <Text
                    style={styles.status}
                  >
                    {statusLabels[
                      order.status
                    ]}
                  </Text>

                </View>

                <View style={styles.trackButton}>
                  <Text style={styles.trackText}>
                    VIEW ORDER
                  </Text>

                  <Text style={styles.trackArrow}>
                    →
                  </Text>
                </View>

              </View>

              <View style={styles.timeArea}>

                <Text
                  style={styles.timeLabel}
                >
                  {order.status ===
                    'received' ||
                  order.status ===
                    'preparing'
                    ? 'READY IN'
                    : 'STATUS'}
                </Text>

                <Text
                  style={styles.time}
                >
                  {remaining[
                    order.id
                  ] || '--'}
                </Text>

              </View>

            </Pressable>
          ))}

        </View>

        {/* FOOTER */}

        {hasMoreThanTwoActiveOrders && orders.length === 2 && (
          <Pressable
            onPress={openAllOrders}
            style={({ pressed }) => [
              styles.allOrders,
              pressed &&
                styles.allOrdersPressed,
            ]}
          >
            <View style={styles.allOrdersButton}>
              <Text
                style={styles.allOrdersText}
              >
                ORDER HISTORY
              </Text>

              <Text
                style={styles.allOrdersArrow}
              >
                →
              </Text>
            </View>
          </Pressable>
        )}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  wrapper: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    zIndex: 9999,
    elevation: 9999,
  },

  card: {
    width: 292,
    backgroundColor:
      'rgba(7, 10, 8, 0.78)',
    borderWidth: 1,
    borderColor:
      'rgba(212, 175, 55, 0.48)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 16,
  },

  header: {
    height: 46,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor:
      'rgba(212, 175, 55, 0.18)',
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  brandMark: {
    color: '#D4AF37',
    fontSize: 20,
    marginRight: 8,
    lineHeight: 22,
  },

  brand: {
    color: '#F5F1E8',
    fontSize: 9,
    fontWeight: '500',
    letterSpacing: 2.2,
  },

  headerTitle: {
    color: '#D4AF37',
    fontSize: 6,
    fontWeight: '700',
    letterSpacing: 1.7,
    marginTop: 2,
  },

  orderCount: {
    color: '#D4AF37',
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1,
  },

  /*
   * This entire area is the drag handle.
   * It sits between the untouched Christoffel branding
   * and the order count.
   */
  dragZone: {
    flex: 1,
    cursor: 'grab' as any,
    touchAction: 'none',
    userSelect: 'none',
    height: 34,
    marginLeft: 12,
    marginRight: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.42)',
    borderRadius: 5,
    backgroundColor: 'rgba(212, 175, 55, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  } as any,

  dragZoneDragging: {
    cursor: 'grabbing' as any,
  } as any,

  dragZoneText: {
    color: '#D4AF37',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.8,
    lineHeight: 11,
  },

  dragZoneHint: {
    color: '#F5F1E8',
    fontSize: 5,
    fontWeight: '700',
    letterSpacing: 1.4,
    marginTop: 1,
    opacity: 0.72,
  },

  ordersList: {
    paddingHorizontal: 13,
  },

  orderRow: {
    minHeight: 54,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor:
      'rgba(255,255,255,0.07)',
  },

  orderRowLast: {
    borderBottomWidth: 0,
  },

  orderMain: {
    flex: 1,
    paddingRight: 8,
  },

  orderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  orderNumber: {
    color: '#E8E5DD',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
  },

  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#D4AF37',
    marginHorizontal: 6,
  },

  status: {
    color: '#A9A69C',
    fontSize: 6,
    fontWeight: '700',
    letterSpacing: 1.1,
    flexShrink: 1,
  },

  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },

  orderRowPressed: {
    opacity: 0.72,
  },

  trackText: {
    color: '#D4AF37',
    fontSize: 6,
    fontWeight: '700',
    letterSpacing: 1.3,
  },

  trackArrow: {
    color: '#D4AF37',
    fontSize: 10,
    marginLeft: 5,
  },

  timeArea: {
    width: 65,
    alignItems: 'flex-end',
  },

  timeLabel: {
    color: '#65665F',
    fontSize: 5,
    fontWeight: '700',
    letterSpacing: 1.1,
    marginBottom: 2,
  },

  time: {
    color: '#D4AF37',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  allOrders: {
    height: 34,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor:
      'rgba(212, 175, 55, 0.18)',
  },

  allOrdersPressed: {
    opacity: 0.72,
  },

  allOrdersButton: {
    height: 24,
    minWidth: 126,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor:
      'rgba(212, 175, 55, 0.65)',
    borderRadius: 4,
    backgroundColor:
      'rgba(212, 175, 55, 0.10)',
  },

  allOrdersText: {
    color: '#D4AF37',
    fontSize: 7,
    fontWeight: '900',
    letterSpacing: 1.4,
  },

  allOrdersArrow: {
    color: '#D4AF37',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 7,
  },

});


