import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  Animated,
  Dimensions,
  LayoutChangeEvent,
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

export default function FloatingOrderTracker({
  orders,
  onPress,
  onViewAllOrders,
}: {
  orders: Order[];
  onPress: (order: Order) => void;
  onViewAllOrders: () => void;
}) {
  const [currentTime, setCurrentTime] = useState(Date.now());

  const position = React.useRef(
    new Animated.ValueXY({ x: 0, y: 0 })
  ).current;

  const widgetWidth = React.useRef(0);
  const widgetHeight = React.useRef(0);

  const screenWidth =
    Dimensions.get('window').width;

  const screenHeight =
    Dimensions.get('window').height;

  const baseRight = 12;
  const baseTop = 105;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const activeOrders = orders.filter(
    order => order.status !== 'completed'
  );

  const recentOrders = [...activeOrders]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 2);

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case 'received':
        return 'Order Received';

      case 'preparing':
        return 'Preparing';

      case 'ready':
        return 'Ready for Collection';

      default:
        return 'Order';
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'received':
        return '#35C759';

      case 'preparing':
        return '#D4AF37';

      case 'ready':
        return '#D4AF37';

      default:
        return '#8C918C';
    }
  };

  const getTimeRemaining = (order: Order) => {
    if (order.status === 'ready') {
      return 'Ready now';
    }

    const remaining =
      order.estimatedReadyAt - currentTime;

    if (remaining <= 0) {
      return 'Ready now';
    }

    const totalSeconds = Math.ceil(
      remaining / 1000
    );

    const minutes = Math.floor(
      totalSeconds / 60
    );

    const seconds = totalSeconds % 60;

    if (minutes > 0) {
      return `${minutes}m ${seconds
        .toString()
        .padStart(2, '0')}s`;
    }

    return `${seconds}s`;
  };

  const handleWidgetLayout = (
    event: LayoutChangeEvent
  ) => {
    widgetWidth.current =
      event.nativeEvent.layout.width;

    widgetHeight.current =
      event.nativeEvent.layout.height;
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        position.setOffset({
          x: (position.x as any)._value,
          y: (position.y as any)._value,
        });

        position.setValue({
          x: 0,
          y: 0,
        });
      },

      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: position.x,
            dy: position.y,
          },
        ],
        {
          useNativeDriver: false,
        }
      ),

      onPanResponderRelease: () => {
        position.flattenOffset();

        const currentX =
          (position.x as any)._value;

        const currentY =
          (position.y as any)._value;

        const width =
          widgetWidth.current || 145;

        const height =
          widgetHeight.current || 150;

        const leftSafeArea = 10;
        const rightSafeArea = 10;
        const topSafeArea = 10;
        const bottomSafeArea = 15;

        const minX =
          -(
            screenWidth -
            width -
            baseRight -
            leftSafeArea
          );

        const maxX =
          rightSafeArea - baseRight;

        const minY =
          topSafeArea - baseTop;

        const maxY =
          screenHeight -
          height -
          bottomSafeArea -
          baseTop;

        const limitedX = Math.max(
          minX,
          Math.min(currentX, maxX)
        );

        const limitedY = Math.max(
          minY,
          Math.min(currentY, maxY)
        );

        Animated.spring(position, {
          toValue: {
            x: limitedX,
            y: limitedY,
          },
          useNativeDriver: false,
          tension: 80,
          friction: 9,
        }).start();
      },
    })
  ).current;

  if (recentOrders.length === 0) {
    return null;
  }

  return (
    <Animated.View
      onLayout={handleWidgetLayout}
      style={[
        styles.wrapper,
        {
          transform:
            position.getTranslateTransform(),
        },
      ]}
      {...panResponder.panHandlers}
    >
      <View style={styles.trackerCard}>

        {recentOrders.map((order, index) => (
          <TouchableOpacity
            key={order.id}
            activeOpacity={0.85}
            style={[
              styles.orderCard,
              index < recentOrders.length - 1 &&
                styles.orderCardDivider,
            ]}
            onPress={() => onPress(order)}
          >
            <View style={styles.topRow}>
              <View style={styles.orderInfo}>
                <View
                  style={[
                    styles.statusDot,
                    {
                      backgroundColor:
                        getStatusColor(order.status),
                    },
                  ]}
                />

                <Text style={styles.orderId}>
                  {order.id}
                </Text>
              </View>

              <Text style={styles.chevron}>
                ›
              </Text>
            </View>

            <Text style={styles.status}>
              {getStatusText(order.status)}
            </Text>

            <Text style={styles.timer}>
              {getTimeRemaining(order)}
            </Text>
          </TouchableOpacity>
        ))}

        {activeOrders.length > 2 && (
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.seeAllButton}
            onPress={onViewAllOrders}
          >
            <Text style={styles.seeAllText}>
              See all orders
            </Text>

            <Text style={styles.seeAllChevron}>
              ›
            </Text>
          </TouchableOpacity>
        )}

      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    right: 12,
    top: 105,
    width: 142,
    zIndex: 999,
    elevation: 999,
  },

  trackerCard: {
    backgroundColor: 'rgba(9, 13, 11, 0.97)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.55)',
    padding: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 7,
    elevation: 8,
  },

  orderCard: {
    backgroundColor: 'rgba(20, 25, 22, 0.72)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 7,
  },

  orderCardDivider: {
    marginBottom: 4,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  orderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },

  orderId: {
    color: '#D4AF37',
    fontFamily: 'serif',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.2,
  },

  chevron: {
    color: '#F4F0E7',
    fontFamily: 'serif',
    fontSize: 17,
    marginLeft: 3,
    opacity: 0.9,
  },

  status: {
    color: '#F0EDE5',
    fontFamily: 'serif',
    fontSize: 9,
    marginTop: 3,
    opacity: 0.94,
  },

  timer: {
    color: '#D4AF37',
    fontFamily: 'serif',
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },

  seeAllButton: {
    backgroundColor: '#D4AF37',
    borderRadius: 8,
    minHeight: 27,
    paddingHorizontal: 8,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#D4AF37',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 5,
  },

  seeAllText: {
    color: '#080907',
    fontFamily: 'serif',
    fontSize: 8,
    fontWeight: '600',
  },

  seeAllChevron: {
    color: '#080907',
    fontFamily: 'serif',
    fontSize: 15,
    lineHeight: 15,
    marginLeft: 4,
    fontWeight: '600',
  },
});