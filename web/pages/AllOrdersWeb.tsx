import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';

import { MenuItem } from '../../data/menuData';

const backgroundImage = require('../../assets/christoffel-background.png');

type OrderStatus =
  | 'received'
  | 'preparing'
  | 'ready'
  | 'completed';

export type Order = {
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

type Props = {
  orders: Order[];
  menuItems: MenuItem[];
  onSelectOrder: (order: Order) => void;
  onBack: () => void;
};

type Tab = 'active' | 'past';

export default function AllOrdersWeb({
  orders,
  menuItems,
  onSelectOrder,
  onBack,
}: Props) {
  const [currentTime, setCurrentTime] =
    useState(Date.now());

  const [activeTab, setActiveTab] =
    useState<Tab>('active');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getStatusText = (
    status: OrderStatus
  ) => {
    switch (status) {
      case 'received':
        return 'Order Received';

      case 'preparing':
        return 'Preparing';

      case 'ready':
        return 'Ready for Collection';

      case 'completed':
        return 'Delivered';

      default:
        return 'Order';
    }
  };

  const getStatusColor = (
    status: OrderStatus
  ) => {
    return status === 'completed'
      ? '#8F958F'
      : '#D4AF37';
  };

  const getTimeRemaining = (
    order: Order
  ) => {
    if (order.status === 'completed') {
      return 'Completed';
    }

    if (order.status === 'ready') {
      return 'Ready now';
    }

    const remaining =
      order.estimatedReadyAt -
      currentTime;

    if (remaining <= 0) {
      return 'Ready now';
    }

    const totalSeconds = Math.ceil(
      remaining / 1000
    );

    const minutes = Math.floor(
      totalSeconds / 60
    );

    const seconds =
      totalSeconds % 60;

    if (minutes > 0) {
      return `${minutes}m ${seconds
        .toString()
        .padStart(2, '0')}s`;
    }

    return `${seconds}s`;
  };

  const getItemCount = (
    order: Order
  ) => {
    return Object.values(
      order.items
    ).reduce(
      (total, quantity) =>
        total + quantity,
      0
    );
  };

  const formatOrderTime = (
    timestamp: number
  ) => {
    return new Date(
      timestamp
    ).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getMenuItem = (
    name: string
  ) => {
    return menuItems.find(
      item => item.name === name
    );
  };

  const sortedOrders =
    [...orders].sort(
      (a, b) =>
        b.createdAt -
        a.createdAt
    );

  const activeOrders =
    sortedOrders.filter(
      order =>
        order.status !==
        'completed'
    );

  const completedOrders =
    sortedOrders.filter(
      order =>
        order.status ===
        'completed'
    );

  const displayedOrders =
    activeTab === 'active'
      ? activeOrders
      : completedOrders;

  const getProgressStep = (
    status: OrderStatus
  ) => {
    switch (status) {
      case 'received':
        return 0;

      case 'preparing':
        return 1;

      case 'ready':
        return 2;

      case 'completed':
        return 4;

      default:
        return 0;
    }
  };

  const renderProgress = (
    status: OrderStatus
  ) => {
    const currentStep =
      getProgressStep(status);

    const steps = [
      {
        label: 'Received',
        icon: '✓',
      },
      {
        label: 'Preparing',
        icon: '♨',
      },
      {
        label: 'Ready',
        icon: '✓',
      },
      {
        label: 'Collection',
        icon: '⌖',
      },
      {
        label: 'Delivered',
        icon: '✓',
      },
    ];

    return (
      <View
        style={styles.progressContainer}
      >
        {steps.map(
          (step, index) => {
            const completed =
              index <=
              currentStep;

            const isCurrent =
              index ===
              currentStep;

            return (
              <React.Fragment
                key={step.label}
              >
                <View
                  style={
                    styles.progressStep
                  }
                >
                  <View
                    style={[
                      styles.progressCircle,
                      completed &&
                        styles.progressCircleActive,
                      isCurrent &&
                        styles.progressCircleCurrent,
                    ]}
                  >
                    <Text
                      style={[
                        styles.progressIcon,
                        completed &&
                          styles.progressIconActive,
                      ]}
                    >
                      {step.icon}
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.progressLabel,
                      completed &&
                        styles.progressLabelActive,
                    ]}
                    numberOfLines={1}
                  >
                    {step.label}
                  </Text>
                </View>

                {index <
                  steps.length - 1 && (
                  <View
                    style={[
                      styles.progressLine,
                      index <
                        currentStep &&
                        styles.progressLineActive,
                    ]}
                  />
                )}
              </React.Fragment>
            );
          }
        )}
      </View>
    );
  };

  const renderFoodPreview = (
    order: Order
  ) => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={
          false
        }
        style={styles.foodScroll}
        contentContainerStyle={
          styles.foodScrollContent
        }
      >
        {Object.entries(
          order.items
        ).map(
          ([name, quantity]) => {
            const menuItem =
              getMenuItem(name);

            if (!menuItem) {
              return null;
            }

            return (
              <View
                key={name}
                style={styles.foodItem}
              >
                <View
                  style={
                    styles.foodImageWrapper
                  }
                >
                  <Image
                    source={{
                      uri: menuItem.image,
                    }}
                    style={
                      styles.foodImage
                    }
                  />

                  <View
                    style={
                      styles.quantityBadge
                    }
                  >
                    <Text
                      style={
                        styles.quantityText
                      }
                    >
                      {quantity}
                    </Text>
                  </View>
                </View>

                <Text
                  style={
                    styles.foodName
                  }
                  numberOfLines={1}
                >
                  {name}
                </Text>
              </View>
            );
          }
        )}
      </ScrollView>
    );
  };

  const renderOrderCard = (
    order: Order
  ) => {
    const statusColor =
      getStatusColor(
        order.status
      );

    return (
      <Pressable
        key={order.id}
        style={({ pressed }) => [
          styles.orderCard,
          pressed &&
            styles.orderCardPressed,
        ]}
        onPress={() =>
          onSelectOrder(order)
        }
      >
        <View
          style={styles.cardHeader}
        >
          <View>
            <Text
              style={styles.orderId}
            >
              {order.id}
            </Text>

            <Text
              style={styles.orderDate}
            >
              Placed at{' '}
              {formatOrderTime(
                order.createdAt
              )}
            </Text>
          </View>

          <View
            style={[
              styles.liveBadge,
              order.status ===
                'completed' &&
                styles.completedBadge,
            ]}
          >
            <View
              style={[
                styles.liveDot,
                {
                  backgroundColor:
                    statusColor,
                },
              ]}
            />

            <Text
              style={[
                styles.liveText,
                order.status ===
                  'completed' &&
                  styles.completedText,
              ]}
            >
              {order.status ===
              'completed'
                ? 'DELIVERED'
                : 'LIVE'}
            </Text>
          </View>
        </View>

        <View
          style={styles.statusMainRow}
        >
          <View
            style={
              styles.statusIcon
            }
          >
            <Text
              style={
                styles.statusIconText
              }
            >
              {order.status ===
              'preparing'
                ? '♨'
                : order.status ===
                    'ready'
                  ? '✓'
                  : order.status ===
                      'completed'
                    ? '✓'
                    : '●'}
            </Text>
          </View>

          <View
            style={
              styles.statusContent
            }
          >
            <Text
              style={
                styles.statusTitle
              }
            >
              {getStatusText(
                order.status
              )}
            </Text>

            <Text
              style={
                styles.statusDescription
              }
            >
              {order.status ===
              'received'
                ? 'Your order has been received and confirmed.'
                : order.status ===
                    'preparing'
                  ? 'Your delicious food is being prepared.'
                  : order.status ===
                      'ready'
                    ? 'Your order is ready for collection.'
                    : 'Your order has been completed.'}
            </Text>
          </View>

          <View
            style={
              styles.timeContainer
            }
          >
            <Text
              style={styles.clock}
            >
              ◷
            </Text>

            <Text
              style={styles.timer}
            >
              {getTimeRemaining(
                order
              )}
            </Text>
          </View>
        </View>

        {renderFoodPreview(order)}

        {renderProgress(
          order.status
        )}

        <View
          style={styles.divider}
        />

        <View
          style={styles.bottomRow}
        >
          <View
            style={styles.itemSection}
          >
            <Text
              style={styles.bagIcon}
            >
              ♧
            </Text>

            <View>
              <Text
                style={
                  styles.itemCount
                }
              >
                {getItemCount(
                  order
                )}{' '}
                {getItemCount(
                  order
                ) === 1
                  ? 'item'
                  : 'items'}
              </Text>

              <Text
                style={
                  styles.viewDetails
                }
              >
                View details
              </Text>
            </View>
          </View>

          <View
            style={
              styles.totalSection
            }
          >
            <Text
              style={
                styles.totalLabel
              }
            >
              Total
            </Text>

            <Text
              style={styles.total}
            >
              R{order.total.toFixed(2)}
            </Text>
          </View>

          <Pressable
            onPress={() =>
              onSelectOrder(order)
            }
            style={({ pressed }) => [
              styles.trackButton,
              pressed &&
                styles.trackButtonPressed,
            ]}
          >
            <Text
              style={
                styles.trackIcon
              }
            >
              ⌖
            </Text>

            <Text
              style={
                styles.trackText
              }
            >
              Track Order
            </Text>

            <Text
              style={
                styles.trackArrow
              }
            >
              ›
            </Text>
          </Pressable>
        </View>
      </Pressable>
    );
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View
        style={styles.header}
      >
        <Pressable
          style={styles.backButton}
          onPress={onBack}
        >
          <Text
            style={styles.backText}
          >
            ‹
          </Text>
        </Pressable>

        <View
          style={styles.headerCenter}
        >
          <Text
            style={styles.brand}
          >
            CHRISTOFFEL
          </Text>

          <Text
            style={styles.brandSub}
          >
            RESTAURANT
          </Text>

          <View
            style={styles.brandLine}
          />

          <Text
            style={styles.title}
          >
            My Orders
          </Text>

          <Text
            style={styles.subtitle}
          >
            Track, manage and view your orders
          </Text>
        </View>

        <View
          style={styles.headerSpacer}
        />
      </View>

      <View
        style={styles.tabsWrapper}
      >
        <Pressable
          style={[
            styles.tab,
            activeTab ===
              'active' &&
              styles.activeTab,
          ]}
          onPress={() =>
            setActiveTab(
              'active'
            )
          }
        >
          <Text
            style={[
              styles.tabText,
              activeTab ===
                'active' &&
                styles.activeTabText,
            ]}
          >
            Active Orders
            {activeOrders.length >
            0
              ? ` (${activeOrders.length})`
              : ''}
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.tab,
            activeTab === 'past' &&
              styles.activeTab,
          ]}
          onPress={() =>
            setActiveTab('past')
          }
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'past' &&
                styles.activeTabText,
            ]}
          >
            Past Orders
          </Text>
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.content
        }
      >
        {orders.length === 0 ? (
          <View
            style={
              styles.emptyContainer
            }
          >
            <Text
              style={
                styles.emptyIcon
              }
            >
              ◇
            </Text>

            <Text
              style={
                styles.emptyTitle
              }
            >
              No Orders Yet
            </Text>

            <Text
              style={
                styles.emptyText
              }
            >
              Your orders will appear here
              once you place one.
            </Text>
          </View>
        ) : displayedOrders.length ===
          0 ? (
          <View
            style={
              styles.emptyContainer
            }
          >
            <Text
              style={
                styles.emptyIcon
              }
            >
              ✓
            </Text>

            <Text
              style={
                styles.emptyTitle
              }
            >
              No Past Orders
            </Text>

            <Text
              style={
                styles.emptyText
              }
            >
              Completed orders will appear
              here.
            </Text>
          </View>
        ) : (
          <>
            <View
              style={
                styles.sectionHeader
              }
            >
              <View>
                <Text
                  style={
                    styles.sectionTitle
                  }
                >
                  {activeTab ===
                  'active'
                    ? 'Active Orders'
                    : 'Past Orders'}
                </Text>

                <Text
                  style={
                    styles.sectionSubtitle
                  }
                >
                  {displayedOrders.length}{' '}
                  {displayedOrders.length ===
                  1
                    ? 'order'
                    : 'orders'}
                </Text>
              </View>

              <View
                style={
                  styles.countBadge
                }
              >
                <Text
                  style={
                    styles.countText
                  }
                >
                  {
                    displayedOrders.length
                  }
                </Text>
              </View>
            </View>

            {displayedOrders.map(
              renderOrderCard
            )}

            <View
              style={
                styles.footerCard
              }
            >
              <Text
                style={
                  styles.footerTitle
                }
              >
                Great Food Brings People Together
              </Text>

              <Text
                style={
                  styles.footerSubtitle
                }
              >
                Thank you for choosing Christoffel
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(5, 18, 11, 0.82)',
  },

  header: {
    minHeight: 142,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 6,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor:
      'rgba(212,175,55,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:
      'rgba(0,0,0,0.35)',
  },

  backText: {
    color: '#D4AF37',
    fontSize: 36,
    lineHeight: 38,
    fontWeight: '300',
    marginTop: -4,
  },

  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },

  headerSpacer: {
    width: 42,
  },

  brand: {
    color: '#E8D9A7',
    fontSize: 10,
    letterSpacing: 4,
    fontWeight: '600',
  },

  brandSub: {
    color: '#AFA58D',
    fontSize: 7,
    letterSpacing: 2,
    marginTop: 2,
  },

  brandLine: {
    width: 42,
    height: 1,
    backgroundColor: '#D4AF37',
    marginTop: 8,
    marginBottom: 8,
    opacity: 0.75,
  },

  title: {
    color: '#F4F0E7',
    fontSize: 29,
    fontWeight: '500',
    letterSpacing: 0.2,
  },

  subtitle: {
    color: '#A6A59D',
    fontSize: 10,
    marginTop: 4,
  },

  tabsWrapper: {
    height: 58,
    marginHorizontal: 18,
    borderRadius: 30,
    borderWidth: 1,
    borderColor:
      'rgba(212,175,55,0.65)',
    flexDirection: 'row',
    padding: 4,
    backgroundColor:
      'rgba(10,11,10,0.92)',
  },

  tab: {
    flex: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeTab: {
    backgroundColor: '#E4C26A',
  },

  tabText: {
    color: '#C5C0B3',
    fontSize: 12,
    fontWeight: '500',
  },

  activeTabText: {
    color: '#11110F',
    fontWeight: '700',
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 35,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  sectionTitle: {
    color: '#F1EEE5',
    fontSize: 19,
    fontWeight: '600',
  },

  sectionSubtitle: {
    color: '#777A74',
    fontSize: 10,
    marginTop: 3,
  },

  countBadge: {
    minWidth: 36,
    height: 36,
    paddingHorizontal: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor:
      'rgba(212,175,55,0.5)',
    backgroundColor: '#151713',
    alignItems: 'center',
    justifyContent: 'center',
  },

  countText: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: '700',
  },

  orderCard: {
    backgroundColor:
      'rgba(14,16,14,0.97)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor:
      'rgba(212,175,55,0.55)',
    padding: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 7,
  },

  orderCardPressed: {
    opacity: 0.92,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  orderId: {
    color: '#E0BC58',
    fontSize: 21,
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  orderDate: {
    color: '#777B75',
    fontSize: 10,
    marginTop: 3,
  },

  liveBadge: {
    minWidth: 76,
    height: 31,
    paddingHorizontal: 10,
    borderRadius: 18,
    borderWidth: 1,
    borderColor:
      'rgba(212,175,55,0.75)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },

  completedBadge: {
    borderColor: '#474A45',
  },

  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },

  liveText: {
    color: '#EAE6DC',
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  completedText: {
    color: '#858A83',
  },

  statusMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor:
      'rgba(212,175,55,0.18)',
  },

  statusIcon: {
    width: 43,
    height: 43,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  statusIconText: {
    color: '#D4AF37',
    fontSize: 19,
    fontWeight: '500',
  },

  statusContent: {
    flex: 1,
  },

  statusTitle: {
    color: '#F1EEE5',
    fontSize: 15,
    fontWeight: '600',
  },

  statusDescription: {
    color: '#858A84',
    fontSize: 9.5,
    marginTop: 4,
    lineHeight: 14,
  },

  timeContainer: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },

  clock: {
    color: '#D4AF37',
    fontSize: 18,
  },

  timer: {
    color: '#D4AF37',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },

  foodScroll: {
    marginTop: 14,
  },

  foodScrollContent: {
    paddingRight: 5,
  },

  foodItem: {
    width: 78,
    marginRight: 10,
  },

  foodImageWrapper: {
    position: 'relative',
  },

  foodImage: {
    width: 78,
    height: 68,
    borderRadius: 13,
    backgroundColor: '#111410',
  },

  quantityBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    minWidth: 21,
    height: 21,
    paddingHorizontal: 4,
    borderRadius: 11,
    backgroundColor: '#D4AF37',
    borderWidth: 2,
    borderColor: '#0E100E',
    alignItems: 'center',
    justifyContent: 'center',
  },

  quantityText: {
    color: '#11110F',
    fontSize: 9,
    fontWeight: '800',
  },

  foodName: {
    color: '#BDBDB4',
    fontSize: 8.5,
    marginTop: 5,
    textAlign: 'center',
  },

  progressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 17,
    paddingHorizontal: 1,
  },

  progressStep: {
    width: 46,
    alignItems: 'center',
  },

  progressCircle: {
    width: 27,
    height: 27,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#4A4D48',
    backgroundColor: '#111310',
    alignItems: 'center',
    justifyContent: 'center',
  },

  progressCircleActive: {
    borderColor: '#D4AF37',
  },

  progressCircleCurrent: {
    backgroundColor:
      'rgba(212,175,55,0.13)',
  },

  progressIcon: {
    color: '#656963',
    fontSize: 11,
    fontWeight: '700',
  },

  progressIconActive: {
    color: '#D4AF37',
  },

  progressLabel: {
    color: '#696D67',
    fontSize: 7.5,
    marginTop: 5,
    textAlign: 'center',
  },

  progressLabelActive: {
    color: '#D8D3C6',
  },

  progressLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#353934',
    marginTop: 13,
  },

  progressLineActive: {
    backgroundColor: '#D4AF37',
  },

  divider: {
    height: 1,
    backgroundColor:
      'rgba(212,175,55,0.18)',
    marginTop: 15,
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 13,
  },

  itemSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  bagIcon: {
    color: '#D4AF37',
    fontSize: 25,
    marginRight: 8,
  },

  itemCount: {
    color: '#E5E1D7',
    fontSize: 11,
    fontWeight: '500',
  },

  viewDetails: {
    color: '#747870',
    fontSize: 8,
    marginTop: 2,
  },

  totalSection: {
    paddingHorizontal: 10,
    marginRight: 8,
    borderLeftWidth: 1,
    borderLeftColor:
      'rgba(212,175,55,0.35)',
  },

  totalLabel: {
    color: '#777A74',
    fontSize: 8,
  },

  total: {
    color: '#E3BF5D',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 1,
  },

  trackButton: {
    height: 43,
    minWidth: 128,
    borderRadius: 23,
    backgroundColor: '#E5C36B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 11,
  },

  trackButtonPressed: {
    opacity: 0.82,
  },

  trackIcon: {
    color: '#11110F',
    fontSize: 18,
    marginRight: 5,
  },

  trackText: {
    color: '#11110F',
    fontSize: 10,
    fontWeight: '700',
  },

  trackArrow: {
    color: '#11110F',
    fontSize: 21,
    marginLeft: 5,
    marginTop: -2,
  },

  footerCard: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor:
      'rgba(212,175,55,0.35)',
    backgroundColor: '#10120F',
    paddingVertical: 18,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginTop: 3,
  },

  footerTitle: {
    color: '#E5DCC8',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },

  footerSubtitle: {
    color: '#777A73',
    fontSize: 9,
    marginTop: 5,
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 130,
    paddingHorizontal: 30,
  },

  emptyIcon: {
    color: '#D4AF37',
    fontSize: 42,
    marginBottom: 15,
  },

  emptyTitle: {
    color: '#F2F0EA',
    fontSize: 21,
    fontWeight: '600',
  },

  emptyText: {
    color: '#777C76',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 8,
  },
});
