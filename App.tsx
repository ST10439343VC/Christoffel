import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './screens/HomeScreen';
import StartersScreen from './screens/StartersScreen';
import MainsScreen from './screens/MainsScreen';
import DessertsScreen from './screens/DessertsScreen';
import DrinksScreen from './screens/DrinksScreen';
import SelectionScreen from './screens/SelectionScreen';
import PaymentScreen from './screens/PaymentScreen';
import PaymentSuccessScreen from './screens/PaymentSuccessScreen';
import CardPaymentScreen from './screens/CardPaymentScreen';
import MobilePaymentScreen from './screens/MobilePaymentScreen';
import OrderTrackingScreen from './screens/OrderTrackingScreen';
import AllOrdersScreen from './screens/AllOrdersScreen';
import ManageMenuScreen from './screens/ManageMenuScreen';
import SignIn from './account/SignIn';
import CreateAccount from './account/CreateAccount';
import HelpSupport from './support/HelpSupport';
import About from './about/About';

import FloatingOrderTracker from './Components/FloatingOrderTracker';

import {
  menuData,
  MenuItem,
  Course,
} from './data/menuData';

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

type SignedInAccount = {
  email: string;
};

const ORDERS_STORAGE_KEY =
  '@christoffel_orders';

const MENU_STORAGE_KEY =
  '@christoffel_menu';

const ACCOUNT_STORAGE_KEY =
  '@christoffel_account';

const RESTAURANT_BACKGROUND =
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85';

type AccountStatusScreenProps = {
  mode: 'signingOut' | 'signedOut';
  onContinue: () => void;
};

function AccountStatusScreen({
  mode,
  onContinue,
}: AccountStatusScreenProps) {
  const isSignedOut = mode === 'signedOut';

  return (
    <SafeAreaView style={styles.accountStatusContainer}>
      <ImageBackground
        source={{ uri: RESTAURANT_BACKGROUND }}
        style={styles.accountStatusBackground}
        resizeMode="cover"
      >
        <View style={styles.accountStatusOverlay} />

        <View style={styles.accountStatusContent}>

          {isSignedOut ? (
            <View style={styles.accountStatusSuccessCircle}>
              <Text style={styles.accountStatusSuccessCheck}>
                ✓
              </Text>
            </View>
          ) : (
            <Text style={styles.accountStatusChefIcon}>
              ♨
            </Text>
          )}

          <Text style={styles.accountStatusTitle}>
            CHRISTOFFEL
          </Text>

          <View style={styles.accountStatusLineRow}>
            <View style={styles.accountStatusGoldLine} />

            <Text style={styles.accountStatusAccount}>
              ACCOUNT
            </Text>

            <View style={styles.accountStatusGoldLine} />
          </View>

          {isSignedOut ? (
            <>
              <Text style={styles.accountStatusHeading}>
                SUCCESSFULLY SIGNED OUT
              </Text>

              <Text style={styles.accountStatusSubheading}>
                You have been safely signed out of Christoffel.
              </Text>

              <TouchableOpacity
                style={styles.accountStatusButton}
                onPress={onContinue}
                activeOpacity={0.85}
              >
                <Text style={styles.accountStatusButtonText}>
                  CONTINUE
                </Text>

                <Text style={styles.accountStatusButtonArrow}>
                  ›
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <ActivityIndicator
                size="large"
                color="#D4AF37"
                style={styles.accountStatusSpinner}
              />

              <Text style={styles.accountStatusHeading}>
                SIGNING YOU OUT
              </Text>

              <Text style={styles.accountStatusSubheading}>
                Please wait while we safely sign you out.
              </Text>
            </>
          )}

        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default function App() {
  const [screen, setScreen] =
    useState('home');

  const [screenHistory, setScreenHistory] =
    useState<string[]>([]);

  const [selected, setSelected] =
    useState<{ [key: string]: number }>({});

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [currentOrder, setCurrentOrder] =
    useState<Order | null>(null);

  const [nextOrderNumber, setNextOrderNumber] =
    useState(1024);

  /*
   * LIVE MENU
   */
  const [menuItems, setMenuItems] =
    useState<MenuItem[]>(menuData);

  /*
   * SIGNED-IN ACCOUNT
   */
  const [signedInAccount, setSignedInAccount] =
    useState<SignedInAccount | null>(null);

  /*
   * LOAD SAVED MENU, ORDERS AND ACCOUNT
   */
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        /*
         * LOAD MENU
         */
        const savedMenu =
          await AsyncStorage.getItem(
            MENU_STORAGE_KEY
          );

        if (savedMenu) {
          const parsedMenu: MenuItem[] =
            JSON.parse(savedMenu);

          /*
           * KEEP SAVED MENU DATA, BUT ALWAYS USE THE
           * CURRENT DEFAULT IMAGE FOR EXISTING DEFAULT
           * MENU ITEMS. THIS ALLOWS UPDATED FOOD/DRINK
           * IMAGES IN menuData.ts TO APPEAR WITHOUT
           * OVERWRITING ADMIN-EDITED NAMES, DESCRIPTIONS
           * OR PRICES.
           */
          const mergedMenu = parsedMenu.map(savedItem => {
            const defaultItem = menuData.find(
              item => item.id === savedItem.id
            );

            return defaultItem
              ? {
                  ...savedItem,
                  image: defaultItem.image,
                }
              : savedItem;
          });

          const newDefaultItems = menuData.filter(
            defaultItem =>
              !parsedMenu.some(
                savedItem =>
                  savedItem.id === defaultItem.id
              )
          );

          setMenuItems([
            ...mergedMenu,
            ...newDefaultItems,
          ]);
        }

        /*
         * LOAD SIGNED-IN ACCOUNT
         */
        const savedAccount =
          await AsyncStorage.getItem(
            ACCOUNT_STORAGE_KEY
          );

        if (savedAccount) {
          const parsedAccount: SignedInAccount =
            JSON.parse(savedAccount);

          setSignedInAccount(parsedAccount);
        }

        /*
         * LOAD ORDERS
         */
        const savedOrders =
          await AsyncStorage.getItem(
            ORDERS_STORAGE_KEY
          );

        if (savedOrders) {
          const parsedOrders: Order[] =
            JSON.parse(savedOrders);

          setOrders(parsedOrders);

          if (parsedOrders.length > 0) {
            const highestOrderNumber =
              Math.max(
                ...parsedOrders.map(order => {
                  const number =
                    parseInt(
                      order.id.replace('CH', ''),
                      10
                    );

                  return isNaN(number)
                    ? 1023
                    : number;
                })
              );

            setNextOrderNumber(
              Math.max(
                1024,
                highestOrderNumber + 1
              )
            );
          }
        }
      } catch (error) {
        console.log(
          'Could not load saved data:',
          error
        );
      }
    };

    loadSavedData();
  }, []);

  /*
   * SAVE MENU EVERY TIME IT CHANGES
   */
  useEffect(() => {
    const saveMenu = async () => {
      try {
        await AsyncStorage.setItem(
          MENU_STORAGE_KEY,
          JSON.stringify(menuItems)
        );
      } catch (error) {
        console.log(
          'Could not save menu:',
          error
        );
      }
    };

    saveMenu();
  }, [menuItems]);

  /*
   * SAVE ORDERS EVERY TIME THEY CHANGE
   */
  useEffect(() => {
    const saveOrders = async () => {
      try {
        await AsyncStorage.setItem(
          ORDERS_STORAGE_KEY,
          JSON.stringify(orders)
        );
      } catch (error) {
        console.log(
          'Could not save orders:',
          error
        );
      }
    };

    saveOrders();
  }, [orders]);

  /*
   * ADD MENU ITEM
   */
  const addMenuItem = (
    name: string,
    description: string,
    course: Course,
    price: number,
    image: string
  ) => {
    const newItem: MenuItem = {
      id: `${course
        .toLowerCase()
        .replace(/\s+/g, '-')}-${Date.now()}`,
      name,
      description,
      course,
      price,
      image,
    };

    setMenuItems(current => [
      ...current,
      newItem,
    ]);
  };

  /*
   * UPDATE MENU ITEM
   */
  const updateMenuItem = (
    id: string,
    name: string,
    description: string,
    course: Course,
    price: number,
    image: string
  ) => {
    setMenuItems(current =>
      current.map(item =>
        item.id === id
          ? {
              ...item,
              name,
              description,
              course,
              price,
              image,
            }
          : item
      )
    );
  };

  /*
   * DELETE MENU ITEM
   */
  const deleteMenuItem = (id: string) => {
    setMenuItems(current =>
      current.filter(item => item.id !== id)
    );
  };

  /*
   * CART
   */
  const addItem = (name: string) => {
    setSelected(current => ({
      ...current,
      [name]: (current[name] || 0) + 1,
    }));
  };

  const removeItem = (name: string) => {
    setSelected(current => {
      const newSelection = {
        ...current,
      };

      const newQuantity =
        (newSelection[name] || 0) - 1;

      if (newQuantity <= 0) {
        delete newSelection[name];
      } else {
        newSelection[name] =
          newQuantity;
      }

      return newSelection;
    });
  };

  const totalSelected =
    Object.values(selected).reduce(
      (total, quantity) =>
        total + quantity,
      0
    );

  /*
   * CREATE ORDER
   */
  const createOrder = (
    paymentMethod: string
  ) => {
    if (totalSelected === 0) {
      return;
    }

    const selectedItems =
      menuItems.filter(
        item => selected[item.name]
      );

    const subtotal =
      selectedItems.reduce(
        (total, item) =>
          total +
          item.price *
            selected[item.name],
        0
      );

    const serviceFee =
      subtotal * 0.10;

    const total =
      subtotal + serviceFee;

    const now = Date.now();

    const preparationMinutes =
      Math.min(
        20,
        Math.max(
          8,
          8 + totalSelected * 1.5
        )
      );

    const estimatedReadyAt =
      now +
      preparationMinutes *
        60 *
        1000;

    const newOrder: Order = {
      id: `CH${nextOrderNumber}`,
      items: { ...selected },
      paymentMethod,
      subtotal,
      serviceFee,
      total,
      status: 'received',
      createdAt: now,
      estimatedReadyAt,
    };

    setOrders(current => [
      ...current,
      newOrder,
    ]);

    setCurrentOrder(newOrder);

    setNextOrderNumber(
      current => current + 1
    );

    setSelected({});

    setScreen('success');
  };

  /*
   * UPDATE ORDER STATUS
   */
  useEffect(() => {
    const timer =
      setInterval(() => {
        const now = Date.now();

        setOrders(currentOrders => {
          let changed = false;

          const updatedOrders =
            currentOrders.map(
              order => {
                const totalPreparationTime =
                  order.estimatedReadyAt -
                  order.createdAt;

                const elapsed =
                  now -
                  order.createdAt;

                let newStatus: OrderStatus =
                  order.status;

                if (
                  elapsed >=
                    totalPreparationTime *
                      0.20 &&
                  now <
                    order.estimatedReadyAt
                ) {
                  newStatus =
                    'preparing';
                }

                if (
                  now >=
                  order.estimatedReadyAt
                ) {
                  newStatus =
                    'ready';
                }

                if (
                  now >=
                  order.estimatedReadyAt +
                    60 * 1000
                ) {
                  newStatus =
                    'completed';
                }

                if (
                  newStatus !==
                  order.status
                ) {
                  changed = true;

                  return {
                    ...order,
                    status:
                      newStatus,
                  };
                }

                return order;
              }
            );

          return changed
            ? updatedOrders
            : currentOrders;
        });
      }, 1000);

    return () =>
      clearInterval(timer);
  }, []);

  /*
   * KEEP CURRENT ORDER UPDATED
   */
  useEffect(() => {
    if (!currentOrder) {
      return;
    }

    const latestOrder =
      orders.find(
        order =>
          order.id ===
          currentOrder.id
      );

    if (
      latestOrder &&
      latestOrder.status !==
        currentOrder.status
    ) {
      setCurrentOrder(
        latestOrder
      );
    }
  }, [orders, currentOrder]);

  /*
   * ORDER TRACKING
   */
  const openOrderTracking = (
    order: Order
  ) => {
    setCurrentOrder(order);

    setScreenHistory(current => [
      ...current,
      screen,
    ]);

    setScreen('tracking');
  };

  const goBack = () => {
    setScreenHistory(current => {
      if (current.length === 0) {
        setScreen('home');
        return [];
      }

      const previousScreen =
        current[
          current.length - 1
        ];

      setScreen(previousScreen);

      return current.slice(0, -1);
    });
  };

  const openAllOrders = () => {
    setScreen('allOrders');
  };

  /*
   * ACCOUNT
   */
  const handleSignedIn = async (
    email: string
  ) => {
    const account: SignedInAccount = {
      email,
    };

    setSignedInAccount(account);

    try {
      await AsyncStorage.setItem(
        ACCOUNT_STORAGE_KEY,
        JSON.stringify(account)
      );
    } catch (error) {
      console.log(
        'Could not save signed-in account:',
        error
      );
    }

    setScreen('home');
  };

  const handleSignOut = async () => {
    setSignedInAccount(null);

    try {
      await AsyncStorage.removeItem(
        ACCOUNT_STORAGE_KEY
      );
    } catch (error) {
      console.log(
        'Could not remove signed-in account:',
        error
      );
    }

    setScreen('signingOut');

    setTimeout(() => {
      setScreen('signedOut');
    }, 3000);
  };

  /*
   * SIGNING OUT
   */
  if (screen === 'signingOut') {
    return (
      <AccountStatusScreen
        mode="signingOut"
        onContinue={() =>
          setScreen('home')
        }
      />
    );
  }

  /*
   * SIGNED OUT
   */
  if (screen === 'signedOut') {
    return (
      <AccountStatusScreen
        mode="signedOut"
        onContinue={() =>
          setScreen('home')
        }
      />
    );
  }

  /*
   * SIGN IN
   */
  if (screen === 'signIn') {
    return (
      <SignIn
        onBack={() =>
          setScreen('home')
        }
        onSignedIn={handleSignedIn}
      />
    );
  }

  /*
   * CREATE ACCOUNT
   */
  if (screen === 'createAccount') {
    return (
      <CreateAccount
        onBack={() =>
          setScreen('home')
        }
        onAccountCreated={handleSignedIn}
      />
    );
  }

  /*
   * HELP & SUPPORT
   */
  if (screen === 'helpSupport') {
    return (
      <HelpSupport
        onBack={() =>
          setScreen('home')
        }
        onHome={() =>
          setScreen('home')
        }
      />
    );
  }

  /*
   * ABOUT
   */
  if (screen === 'about') {
    return (
      <About
        onBack={() =>
          setScreen('home')
        }
        onHome={() =>
          setScreen('home')
        }
      />
    );
  }

  /*
   * MANAGE MENU
   */
  if (screen === 'manageMenu') {
    return (
      <View
        style={styles.appContainer}
      >
        <ManageMenuScreen
          onBack={() =>
            setScreen('home')
          }
          menuItems={menuItems}
          onAddMenuItem={
            addMenuItem
          }
          onUpdateMenuItem={
            updateMenuItem
          }
          onDeleteMenuItem={
            deleteMenuItem
          }
        />
      </View>
    );
  }

  /*
   * STARTERS
   */
  if (screen === 'starters') {
    return (
      <View
        style={styles.appContainer}
      >
        <StartersScreen
          onHome={() =>
            setScreen('home')
          }
          onMains={() =>
            setScreen('mains')
          }
          onDesserts={() =>
            setScreen('desserts')
          }
          onDrinks={() =>
            setScreen('drinks')
          }
          onSelection={() =>
            setScreen('selection')
          }
          menuItems={menuItems}
          selected={selected}
          addItem={addItem}
          removeItem={removeItem}
          totalSelected={
            totalSelected
          }
        />

        <FloatingOrderTracker
          orders={orders}
          onPress={
            openOrderTracking
          }
          onViewAllOrders={
            openAllOrders
          }
        />
      </View>
    );
  }

  /*
   * MAINS
   */
  if (screen === 'mains') {
    return (
      <View
        style={styles.appContainer}
      >
        <MainsScreen
          onHome={() =>
            setScreen('home')
          }
          onStarters={() =>
            setScreen('starters')
          }
          onDesserts={() =>
            setScreen('desserts')
          }
          onDrinks={() =>
            setScreen('drinks')
          }
          onSelection={() =>
            setScreen('selection')
          }
          menuItems={menuItems}
          selected={selected}
          addItem={addItem}
          removeItem={removeItem}
          totalSelected={
            totalSelected
          }
        />

        <FloatingOrderTracker
          orders={orders}
          onPress={
            openOrderTracking
          }
          onViewAllOrders={
            openAllOrders
          }
        />
      </View>
    );
  }

  /*
   * DESSERTS
   */
  if (screen === 'desserts') {
    return (
      <View
        style={styles.appContainer}
      >
        <DessertsScreen
          onHome={() =>
            setScreen('home')
          }
            onDesserts={() =>
    setScreen('desserts')
  }
          onStarters={() =>
            setScreen('starters')
          }
          onMains={() =>
            setScreen('mains')
          }
          onDrinks={() =>
            setScreen('drinks')
          }
          onSelection={() =>
            setScreen('selection')
          }
          menuItems={menuItems}
          selected={selected}
          addItem={addItem}
          removeItem={removeItem}
          totalSelected={
            totalSelected
          }
        />

        <FloatingOrderTracker
          orders={orders}
          onPress={
            openOrderTracking
          }
          onViewAllOrders={
            openAllOrders
          }
        />
      </View>
    );
  }

  /*
   * DRINKS
   */
  if (screen === 'drinks') {
    return (
      <View
        style={styles.appContainer}
      >
        <DrinksScreen
          onHome={() =>
            setScreen('home')
          }
          onMains={() =>
            setScreen('mains')
          }
          onDesserts={() =>
            setScreen('desserts')
          }
          onSelection={() =>
            setScreen('selection')
          }
            onStarters={() =>
    setScreen('starters')
  }
  onDrinks={() =>
    setScreen('drinks')
  }
          menuItems={menuItems}
          selected={selected}
          addItem={addItem}
          removeItem={removeItem}
          totalSelected={
            totalSelected
          }
        />

        <FloatingOrderTracker
          orders={orders}
          onPress={
            openOrderTracking
          }
          onViewAllOrders={
            openAllOrders
          }
        />
      </View>
    );
  }

  /*
   * SELECTION
   */
  if (screen === 'selection') {
    return (
      <View
        style={styles.appContainer}
      >
        <SelectionScreen
          onHome={() =>
            setScreen('home')
          }
          onStarters={() =>
            setScreen('starters')
          }
          onMains={() =>
            setScreen('mains')
          }
          onDesserts={() =>
            setScreen('desserts')
          }
          onDrinks={() =>
  setScreen('drinks')
}
          onPayment={() =>
            setScreen('payment')
          }
          menuItems={menuItems}
          selected={selected}
          removeItem={removeItem}
          addItem={addItem}
          totalSelected={
            totalSelected
          }
        />

        <FloatingOrderTracker
          orders={orders}
          onPress={
            openOrderTracking
          }
          onViewAllOrders={
            openAllOrders
          }
        />
      </View>
    );
  }

  /*
   * PAYMENT
   */
  if (screen === 'payment') {
    return (
      <PaymentScreen
        onBack={() =>
          setScreen('selection')
        }
        onHome={() =>
          setScreen('home')
        }
        onStarters={() =>
          setScreen('starters')
        }
        onMains={() =>
          setScreen('mains')
        }
        onDesserts={() =>
          setScreen('desserts')
        }
        onPaymentSuccess={() =>
          createOrder('Cash')
        }
        onCardPayment={() =>
          setScreen('cardPayment')
        }
        onMobilePayment={() =>
          setScreen('mobilePayment')
        }
        selected={selected}
        menuItems={menuItems}
        totalSelected={
          totalSelected
        }
      />
    );
  }

  /*
   * CARD PAYMENT
   */
  if (screen === 'cardPayment') {
    return (
      <CardPaymentScreen
        onBack={() =>
          setScreen('payment')
        }
        onPaymentSuccess={() =>
          createOrder('Card')
        }
        selected={selected}
        menuItems={menuItems}
      />
    );
  }

  /*
   * MOBILE PAYMENT
   */
  if (
    screen === 'mobilePayment'
  ) {
    return (
      <MobilePaymentScreen
        onBack={() =>
          setScreen('payment')
        }
        onPaymentSuccess={() =>
          createOrder(
            'Mobile Payment'
          )
        }
        selected={selected}
        menuItems={menuItems}
      />
    );
  }

  /*
   * SUCCESS
   */
  if (screen === 'success') {
    return (
      <PaymentSuccessScreen
        onHome={() =>
          setScreen('home')
        }
        onTrackOrder={() =>
          openOrderTracking(
            currentOrder as Order
          )
        }
      />
    );
  }

  /*
   * ORDER TRACKING
   */
  if (
    screen === 'tracking' &&
    currentOrder
  ) {
    return (
      <OrderTrackingScreen
        order={currentOrder}
        onBack={goBack}
      />
    );
  }

  /*
   * ALL ORDERS
   */
  if (screen === 'allOrders') {
    return (
      <AllOrdersScreen
        orders={orders}
        menuItems={menuItems}
        onSelectOrder={
          openOrderTracking
        }
        onBack={() =>
          setScreen('home')
        }
      />
    );
  }

  /*
   * HOME
   */
  return (
    <View
      style={styles.appContainer}
    >
      <HomeScreen
        onViewMenu={() =>
          setScreen('starters')
        }
        onManageMenu={() =>
          setScreen('manageMenu')
        }
        onMyOrders={() =>
          setScreen('allOrders')
        }
        onSignIn={() =>
          setScreen('signIn')
        }
        onCreateAccount={() =>
          setScreen('createAccount')
        }
        onHelpSupport={() =>
          setScreen('helpSupport')
        }
        onAbout={() =>
          setScreen('about')
        }
        signedInAccount={signedInAccount}
        onSignOut={handleSignOut}
      />

      <FloatingOrderTracker
        orders={orders}
        onPress={
          openOrderTracking
        }
        onViewAllOrders={
          openAllOrders
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  accountStatusContainer: {
    flex: 1,
    backgroundColor: '#0B100D',
  },

  accountStatusBackground: {
    flex: 1,
  },

  accountStatusOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(5, 18, 11, 0.88)',
  },

  accountStatusContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },

  accountStatusChefIcon: {
    color: '#D4AF37',
    fontSize: 42,
    marginBottom: 6,
  },

  accountStatusSuccessCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 1.5,
    borderColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },

  accountStatusSuccessCheck: {
    color: '#D4AF37',
    fontSize: 42,
    fontWeight: '300',
    lineHeight: 46,
  },

  accountStatusTitle: {
    color: '#F5F1E8',
    fontSize: 30,
    fontWeight: '500',
    letterSpacing: 5,
  },

  accountStatusLineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  accountStatusGoldLine: {
    width: 38,
    height: 1,
    backgroundColor: '#D4AF37',
    opacity: 0.75,
    marginHorizontal: 10,
  },

  accountStatusAccount: {
    color: '#D4AF37',
    fontSize: 11,
    letterSpacing: 4,
  },

  accountStatusSpinner: {
    marginTop: 54,
    marginBottom: 28,
  },

  accountStatusHeading: {
    color: '#F5F1E8',
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 2.5,
    textAlign: 'center',
    marginTop: 48,
  },

  accountStatusSubheading: {
    color: '#A5ADA7',
    fontSize: 11,
    marginTop: 9,
    textAlign: 'center',
  },

  accountStatusButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    backgroundColor: '#D4AF37',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 34,
  },

  accountStatusButtonText: {
    flex: 1,
    color: '#0B100D',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2.5,
    textAlign: 'center',
    marginLeft: 28,
  },

  accountStatusButtonArrow: {
    color: '#0B100D',
    fontSize: 29,
    fontWeight: '300',
  },

  appContainer: {
    flex: 1,
  },
});
