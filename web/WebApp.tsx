import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import StartersWeb from './StartersWeb';
import MainsWeb from './MainsWeb';
import DessertsWeb from './DessertsWeb';
import DrinksWeb from './DrinksWeb';
import SignIn from '../account/SignIn';
import CreateAccount from '../account/CreateAccount';
import HelpSupport from '../support/HelpSupport';
import About from '../about/About';
import ManageMenuWeb from './pages/ManageMenuWeb';
import AllOrdersWeb from './pages/AllOrdersWeb';
import OrderTrackingWeb from './pages/OrderTrackingWeb';
import { WebSelectionProvider, useWebSelection } from './context/WebSelectionContext';
import { menuData, MenuItem, Course } from '../data/menuData';
import CartDropdown from './components/CartDropdown';
import FloatingOrderTracker from './components/FloatingOrderTracker';
import {
  createOrder,
  updateOrderStatuses,
  type Order,
} from './OrderLogic';
import PaymentWeb from './pages/PaymentWeb';
import PaymentSuccessWeb from './pages/PaymentSuccessWeb';

// ============================================================
// LOCAL CHRISTOFFEL RESTAURANT BACKGROUND
// ============================================================
const backgroundImage = require('../assets/christoffel-background.png');

// ============================================================
// REUSABLE WEB HOVER WRAPPER
// ============================================================
type HoverableProps = {
  children: React.ReactNode;
  style?: any;
  onPress?: () => void;
};

function Hoverable({
  children,
  style,
  onPress,
}: HoverableProps) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setHovered(true)}
      onPressOut={() => setHovered(false)}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={[
        style,
        hovered && styles.hoverEffect,
      ]}
    >
      {children}
    </Pressable>
  );
}

// ============================================================
// DEALS MARQUEE
// ============================================================
function DealsBanner() {
  const translateX = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(translateX, {
        toValue: -900,
        duration: 18000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [translateX]);

  return (
    <View style={styles.dealsBanner}>
      <Animated.View
        style={[
          styles.dealsTrack,
          {
            transform: [
              {
                translateX,
              },
            ],
          },
        ]}
      >
        <Text style={styles.dealsText}>
          🔥 TODAY'S SPECIAL  •  20% OFF ALL MAINS  •  FREE DRINK WITH EVERY COMBO  •  WEEKEND SPECIALS  •  ORDER NOW & SAVE  •  🔥 TODAY'S SPECIAL  •  20% OFF ALL MAINS  •  FREE DRINK WITH EVERY COMBO  •  WEEKEND SPECIALS  •  ORDER NOW & SAVE  •
        </Text>
      </Animated.View>
    </View>
  );
}


// ============================================================
// CHRISTOFFEL MOMENTS — MOVING PHOTO SECTION
// ============================================================
function RestaurantMoments() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const fade = React.useRef(new Animated.Value(1)).current;

  const moments = [
    {
      image:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=85',
      label: 'THE CHRISTOFFEL TABLE',
      title: 'Good food. Great people.',
    },
    {
      image:
        'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1800&q=85',
      label: 'FRESH FROM THE KITCHEN',
      title: 'Made to be shared.',
    },
    {
      image:
        'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1800&q=85',
      label: 'GOOD COMPANY',
      title: 'Moments worth remembering.',
    },
    {
      image:
        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1800&q=85',
      label: 'AROUND THE TABLE',
      title: 'Come hungry. Leave happy.',
    },
    {
      image:
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1800&q=85',
      label: 'THE CHRISTOFFEL EXPERIENCE',
      title: 'Where every visit feels special.',
    },
    {
      image:
        'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=1800&q=85',
      label: 'DINNER WITH US',
      title: 'Stay for the atmosphere.',
    },
    {
      image:
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=85',
      label: 'BEAUTIFULLY SERVED',
      title: 'Every plate tells a story.',
    },
    {
      image:
        'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1800&q=85',
      label: 'WELCOME TO CHRISTOFFEL',
      title: 'Your table is waiting.',
    },
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      Animated.sequence([
        Animated.timing(fade, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(fade, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();

      setActiveIndex(current =>
        current + 1 >= moments.length ? 0 : current + 1
      );
    }, 4200);

    return () => clearInterval(timer);
  }, [fade, moments.length]);

  const activeMoment = moments[activeIndex];

  return (
    <View style={styles.momentsSection}>
      <Animated.View
        style={[
          styles.momentsImageWrap,
          { opacity: fade },
        ]}
      >
        <Image
          source={{ uri: activeMoment.image }}
          style={styles.momentsImage}
        />
        <View style={styles.momentsOverlay} />
      </Animated.View>

      <View style={styles.momentsContent}>
        <Text style={styles.momentsEyebrow}>
          INSIDE CHRISTOFFEL
        </Text>

        <Text style={styles.momentsTitle}>
          {activeMoment.title}
        </Text>

        <Text style={styles.momentsSubtitle}>
          {activeMoment.label}
        </Text>

        <View style={styles.momentsLine} />
      </View>

      <View style={styles.momentsDots}>
        {moments.map((moment, index) => (
          <View
            key={`${moment.label}-${index}`}
            style={[
              styles.momentsDot,
              index === activeIndex &&
                styles.momentsDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}


// ============================================================
// MAIN WEB APP
// ============================================================
type SignedInAccount = {
  email: string;
};

const ORDERS_STORAGE_KEY = '@christoffel_orders';
const MENU_STORAGE_KEY = '@christoffel_menu';
const ACCOUNT_STORAGE_KEY = '@christoffel_account';

function WebAppContent() {
  const [currentPage, setCurrentPage] = React.useState<
    'home' | 'starters' | 'mains' | 'desserts' | 'drinks' |
    'signIn' | 'createAccount' | 'helpSupport' | 'about' |
    'manageMenu' | 'allOrders' | 'tracking' | 'payment' | 'paymentSuccess'
  >('home');
  const [signedInAccount, setSignedInAccount] = React.useState<SignedInAccount | null>(null);
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = React.useState<Order | null>(null);
  const [menuItems, setMenuItems] = React.useState<MenuItem[]>(menuData);
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const [showCartDropdown, setShowCartDropdown] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.dispatchEvent(
      new CustomEvent('christoffel-page-change', {
        detail: { page: currentPage },
      })
    );
  }, [currentPage]);

  React.useEffect(() => {
    const loadWebData = async () => {
      try {
        const [savedAccount, savedOrders, savedMenu] = await Promise.all([
          AsyncStorage.getItem(ACCOUNT_STORAGE_KEY),
          AsyncStorage.getItem(ORDERS_STORAGE_KEY),
          AsyncStorage.getItem(MENU_STORAGE_KEY),
        ]);

        if (savedAccount) setSignedInAccount(JSON.parse(savedAccount));
        if (savedOrders) setOrders(JSON.parse(savedOrders));
        if (savedMenu) {
          const parsedMenu: MenuItem[] = JSON.parse(savedMenu);
          const mergedMenu = parsedMenu.map(savedItem => {
            const defaultItem = menuData.find(item => item.id === savedItem.id);
            return defaultItem ? { ...savedItem, image: defaultItem.image } : savedItem;
          });
          const newDefaultItems = menuData.filter(item => !parsedMenu.some(saved => saved.id === item.id));
          setMenuItems([...mergedMenu, ...newDefaultItems]);
        }
      } catch (error) {
        console.log('Could not load saved web data:', error);
      }
    };
    loadWebData();
  }, []);

  React.useEffect(() => {
    AsyncStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(menuItems)).catch(() => {});
  }, [menuItems]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setOrders(currentOrders =>
        updateOrderStatuses(currentOrders)
      );
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  React.useEffect(() => {
    AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders)).catch(() => {});
  }, [orders]);

  const handleSignedIn = async (email: string) => {
    const account = { email };
    setSignedInAccount(account);
    await AsyncStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(account)).catch(() => {});
    setCurrentPage('home');
  };

  const handleSignOut = async () => {
    setSignedInAccount(null);
    setShowProfileMenu(false);
    await AsyncStorage.removeItem(ACCOUNT_STORAGE_KEY).catch(() => {});
    setCurrentPage('home');
  };

  const addMenuItem = (name: string, description: string, course: Course, price: number, image: string) => {
    setMenuItems(current => [...current, {
      id: `${String(course).toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      name, description, course, price, image,
    }]);
  };

  const updateMenuItem = (id: string, name: string, description: string, course: Course, price: number, image: string) => {
    setMenuItems(current => current.map(item => item.id === id ? { ...item, name, description, course, price, image } : item));
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(current => current.filter(item => item.id !== id));
  };

  const openOrderTracking = (order: Order) => {
    setCurrentOrder(order);
    setCurrentPage('tracking');
  };

  // ============================================================
  // FLOATING ORDER TRACKER
  // ============================================================
  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleFloatingTracker = (
      event: Event
    ) => {
      const customEvent =
        event as CustomEvent<{ orderId?: string }>;

      const orderId =
        customEvent.detail?.orderId;

      if (!orderId) {
        return;
      }

      const order = orders.find(
        currentOrder =>
          currentOrder.id === orderId
      );

      if (!order) {
        return;
      }

      setCurrentOrder(order);
      setCurrentPage('tracking');
    };

    const handleViewAllOrders = () => {
      setCurrentPage('allOrders');
    };

    window.addEventListener(
      'christoffel-track-order',
      handleFloatingTracker
    );

    window.addEventListener(
      'christoffel-view-all-orders',
      handleViewAllOrders
    );

    return () => {
      window.removeEventListener(
        'christoffel-track-order',
        handleFloatingTracker
      );

      window.removeEventListener(
        'christoffel-view-all-orders',
        handleViewAllOrders
      );
    };
  }, [orders]);

  const {
    selection,
    addToSelection,
    increaseQuantity,
    decreaseQuantity,
    removeFromSelection,
    clearSelection,
    totalItems,
  } = useWebSelection();

  const selected = selection.reduce(
    (acc, entry) => {
      acc[entry.item.name] = entry.quantity;
      return acc;
    },
    {} as { [key: string]: number }
  );

  const addItem = (name: string) => {
    const item = menuData.find(
      (menuItem: MenuItem) => menuItem.name === name
    );

    if (!item) {
      return;
    }

    const existingItem = selection.find(
      entry => entry.item.id === item.id
    );

    if (existingItem) {
      increaseQuantity(item.id);
    } else {
      addToSelection(item);
    }
  };

  const removeItem = (name: string) => {
    const item = menuData.find(
      (menuItem: MenuItem) => menuItem.name === name
    );

    if (!item) {
      return;
    }

    const existingItem = selection.find(
      entry => entry.item.id === item.id
    );

    if (!existingItem) {
      return;
    }

    if (existingItem.quantity > 1) {
      decreaseQuantity(item.id);
    } else {
      removeFromSelection(item.id);
    }
  };

  if (currentPage === 'signIn') {
    return <SignIn onBack={() => setCurrentPage('home')} onSignedIn={handleSignedIn} />;
  }

  if (currentPage === 'createAccount') {
    return <CreateAccount onBack={() => setCurrentPage('home')} onAccountCreated={handleSignedIn} />;
  }

  if (currentPage === 'helpSupport') {
    return <HelpSupport onBack={() => setCurrentPage('home')} onHome={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'about') {
    return <About onBack={() => setCurrentPage('home')} onHome={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'manageMenu') {
    return <ManageMenuWeb
      onBack={() => setCurrentPage('home')}
      menuItems={menuItems}
      onAddMenuItem={addMenuItem}
      onUpdateMenuItem={updateMenuItem}
      onDeleteMenuItem={deleteMenuItem}
    />;
  }

  if (currentPage === 'allOrders') {
    return <AllOrdersWeb
      orders={orders}
      menuItems={menuItems}
      onSelectOrder={openOrderTracking}
      onBack={() => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent(
              'christoffel-show-order-tracker'
            )
          );
        }

        setCurrentPage('home');
      }}
    />;
  }

  if (currentPage === 'tracking' && currentOrder) {
    return (
      <OrderTrackingWeb
        order={currentOrder}
        menuItems={menuItems}
        onBack={() => setCurrentPage('allOrders')}
        onHome={() => setCurrentPage('home')}
      />
    );
  }

  if (currentPage === 'payment') {
    return (
      <PaymentWeb
        onBack={() => setCurrentPage('home')}
        onHome={() => setCurrentPage('home')}
        onPaymentSuccess={(paymentMethod) => {
          const selected = selection.reduce(
            (acc, entry) => {
              acc[entry.item.name] = entry.quantity;
              return acc;
            },
            {} as { [key: string]: number }
          );

          const newOrder = createOrder(
            menuItems,
            selected,
            paymentMethod,
            orders
          );

          if (!newOrder) {
            return;
          }

          setOrders(current => [
            ...current,
            newOrder,
          ]);
          setCurrentOrder(newOrder);
          clearSelection();
          setCurrentPage('paymentSuccess');
        }}
        menuItems={menuItems}
      />
    );
  }

  if (currentPage === 'paymentSuccess' && currentOrder) {
    return (
      <PaymentSuccessWeb
        order={currentOrder}
        menuItems={menuItems}
        onHome={() => setCurrentPage('home')}
        onContinueShopping={() => setCurrentPage('starters')}
        onTrackOrder={() => setCurrentPage('tracking')}
      />
    );
  }

  if (currentPage === 'starters') {
    return (
      <StartersWeb
        menuItems={menuItems}
        onHome={() => setCurrentPage('home')}
        onMains={() => setCurrentPage('mains')}
        onDesserts={() => setCurrentPage('desserts')}
        onDrinks={() => setCurrentPage('drinks')}
        onSelection={() => {}}
        onCheckout={() => setCurrentPage('payment')}
        selected={selected}
        addItem={addItem}
        removeItem={removeItem}
        totalSelected={totalItems}
      />
    );
  }

  if (currentPage === 'mains') {
    return (
      <MainsWeb
        menuItems={menuItems}
        onHome={() => setCurrentPage('home')}
        onStarters={() => setCurrentPage('starters')}
        onDesserts={() => setCurrentPage('desserts')}
        onDrinks={() => setCurrentPage('drinks')}
        onSelection={() => {}}
        onCheckout={() => setCurrentPage('payment')}
      />
    );
  }

  if (currentPage === 'desserts') {
    return (
      <DessertsWeb
        menuItems={menuItems}
        onHome={() => setCurrentPage('home')}
        onStarters={() => setCurrentPage('starters')}
        onMains={() => setCurrentPage('mains')}
        onDrinks={() => setCurrentPage('drinks')}
        onSelection={() => {}}
        onCheckout={() => setCurrentPage('payment')}
      />
    );
  }

  if (currentPage === 'drinks') {
    return (
      <DrinksWeb
        menuItems={menuItems}
        onHome={() => setCurrentPage('home')}
        onStarters={() => setCurrentPage('starters')}
        onMains={() => setCurrentPage('mains')}
        onDesserts={() => setCurrentPage('desserts')}
        onSelection={() => {}}
        onCheckout={() => setCurrentPage('payment')}
      />
    );
  }

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      resizeMode="cover"
    >
      {/* Main dark overlay */}
      <View style={styles.overlay} />

      {/* Scrollable website page */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.pageContent}
        showsVerticalScrollIndicator={true}
        stickyHeaderIndices={[0]}
      >

        {/* ====================================================
            CHRISTOFFEL WEB HEADER
            ==================================================== */}
        <View style={styles.header}>

          {/* CHRISTOFFEL BRAND + LOGIN */}
          <View style={styles.brandArea}>

            <View style={styles.logoContainer}>
              <Text style={styles.logoIcon}>♨</Text>

              <View>
                <Text style={styles.logoText}>
                  CHRISTOFFEL
                </Text>

                <View style={styles.menuLogoRow}>
                  <View style={styles.logoLine} />

                  <Text style={styles.menuText}>
                    MENU
                  </Text>

                  <View style={styles.logoLine} />
                </View>
              </View>
            </View>

            <View style={styles.profileArea}>
              <Hoverable
                style={styles.loginButton}
                onPress={() => setShowProfileMenu(current => !current)}
              >
                <Ionicons name="person-outline" size={17} color="#F5F1E8" />
                <Text style={styles.loginText}>
                  {signedInAccount ? 'ACCOUNT' : 'LOGIN'}
                </Text>
              </Hoverable>

              {showProfileMenu && (
                <View style={styles.profileDropdown}>
                  {signedInAccount ? (
                    <>
                      <Text style={styles.profileStatus}>SIGNED IN</Text>
                      <Text style={styles.profileEmail}>{signedInAccount.email}</Text>
                      <Hoverable style={styles.profileItem} onPress={() => { setShowProfileMenu(false); setCurrentPage('allOrders'); }}>
                        <Text style={styles.profileItemText}>ORDER HISTORY</Text>
                      </Hoverable>
                      <Hoverable style={styles.profileItem} onPress={handleSignOut}>
                        <Text style={styles.profileItemText}>SIGN OUT</Text>
                      </Hoverable>
                    </>
                  ) : (
                    <>
                      <Hoverable style={styles.profileItem} onPress={() => { setShowProfileMenu(false); setCurrentPage('signIn'); }}>
                        <Text style={styles.profileItemText}>SIGN IN</Text>
                      </Hoverable>
                      <Hoverable style={styles.profileItem} onPress={() => { setShowProfileMenu(false); setCurrentPage('createAccount'); }}>
                        <Text style={styles.profileItemText}>CREATE ACCOUNT</Text>
                      </Hoverable>
                    </>
                  )}
                  <Hoverable style={styles.profileItem} onPress={() => { setShowProfileMenu(false); setCurrentPage('helpSupport'); }}>
                    <Text style={styles.profileItemText}>HELP & SUPPORT</Text>
                  </Hoverable>
                  <Hoverable style={styles.profileItem} onPress={() => { setShowProfileMenu(false); setCurrentPage('about'); }}>
                    <Text style={styles.profileItemText}>ABOUT</Text>
                  </Hoverable>
                </View>
              )}
            </View>

          </View>

          {/* MAIN MENU NAVIGATION */}
          <View style={styles.navigation}>

            <Hoverable>
              <Text style={[styles.navItem, styles.activeNav]}>
                HOME
              </Text>
            </Hoverable>

            <Hoverable onPress={() => setCurrentPage('starters')}>
              <Text style={styles.navItem}>
                STARTERS
              </Text>
            </Hoverable>

            <Hoverable onPress={() => setCurrentPage('mains')}>
              <Text style={styles.navItem}>
                MAINS
              </Text>
            </Hoverable>

            <Hoverable onPress={() => setCurrentPage('desserts')}>
              <Text style={styles.navItem}>
                DESSERTS
              </Text>
            </Hoverable>

            <Hoverable onPress={() => setCurrentPage('drinks')}>
              <Text style={styles.navItem}>
                DRINKS
              </Text>
            </Hoverable>

          </View>

          {/* CART */}
          <View style={styles.cartArea}>
            <Hoverable
              style={styles.cartButton}
              onPress={() => setShowCartDropdown(!showCartDropdown)}
            >
              <Ionicons
                name="cart-outline"
                size={21}
                color="#F5F1E8"
              />

              <Text style={styles.cartText}>
                CART
              </Text>

              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>
                  {totalItems}
                </Text>
              </View>
            </Hoverable>

            {showCartDropdown && (
              <CartDropdown
                onClose={() => setShowCartDropdown(false)}
                onCheckout={() => setCurrentPage('payment')}
              />
            )}
          </View>

        </View>


        {/* ====================================================
            HERO SECTION
            ==================================================== */}
        <View style={styles.hero}>

          {/* HERO TEXT */}
          <View style={styles.heroTextArea}>

            <Text style={styles.welcome}>
              WELCOME
            </Text>

            <Text style={styles.heroTitle}>
              Delicious food,
            </Text>

            <Text style={styles.heroTitle}>
              made with <Text style={styles.goldText}>love.</Text>
            </Text>

            <Text style={styles.description}>
              Fresh ingredients. Incredible flavours.
            </Text>

            <Text style={styles.description}>
              A better dining experience, every time.
            </Text>

            {/* HERO ACTION BUTTONS */}
            <View style={styles.heroButtons}>

              {/* VIEW MENU */}
              <Hoverable style={styles.viewMenuButton} onPress={() => setCurrentPage('starters')}>
                <Text style={styles.viewMenuIcon}>
                  ♜
                </Text>

                <Text style={styles.viewMenuText}>
                  View Menu
                </Text>

                <Text style={styles.buttonArrow}>
                  →
                </Text>
              </Hoverable>

              {/* MANAGE MENU */}
              <Hoverable style={styles.secondaryButton} onPress={() => setCurrentPage('manageMenu')}>
                <Text style={styles.secondaryIcon}>
                  ⚙
                </Text>

                <Text style={styles.secondaryText}>
                  Manage Menu
                </Text>

                <Text style={styles.secondaryArrow}>
                  →
                </Text>
              </Hoverable>

              {/* MY ORDERS */}
              <Hoverable style={styles.secondaryButton} onPress={() => setCurrentPage('allOrders')}>
                <Text style={styles.secondaryIcon}>
                  ◉
                </Text>

                <Text style={styles.secondaryText}>
                  My Orders
                </Text>

                <Text style={styles.secondaryArrow}>
                  →
                </Text>
              </Hoverable>

            </View>

            <Text style={styles.heroTagline}>
              GOOD FOOD  •  GREAT PEOPLE  •  ALWAYS HERE
            </Text>

          </View>


          {/* FEATURED FOOD */}
          <View style={styles.foodArea}>

            <View style={styles.foodCircle}>

              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85',
                }}
                style={styles.foodImage}
              />

            </View>

            <View style={styles.foodBadge}>

              <Text style={styles.badgeText}>
                GREAT
              </Text>

              <Text style={styles.badgeText}>
                FOOD
              </Text>

              <Text style={styles.badgeGoldText}>
                BRIGHTER
              </Text>

              <Text style={styles.badgeText}>
                DAYS
              </Text>

              <View style={styles.badgeLine} />

            </View>

            <View style={styles.foodSlogan}>

              <Text style={styles.foodSloganText}>
                Good Food
              </Text>

              <Text style={styles.foodSloganText}>
                Brighter Days
              </Text>

            </View>

          </View>

        </View>


        {/* ====================================================
            MOVING DEALS BANNER
            ==================================================== */}
        <DealsBanner />


        {/* ====================================================
            MOVING CHRISTOFFEL MOMENTS
            ==================================================== */}
        <RestaurantMoments />


        {/* ====================================================
            ABOUT CHRISTOFFEL
            ==================================================== */}
        <View style={styles.aboutSection}>

          <View style={styles.aboutTextArea}>

            <Text style={styles.sectionEyebrow}>
              ABOUT CHRISTOFFEL
            </Text>

            <Text style={styles.aboutTitle}>
              More than a meal,
            </Text>

            <Text style={styles.aboutTitle}>
              it's a <Text style={styles.goldText}>story.</Text>
            </Text>

            <Text style={styles.aboutDescription}>
              Established in 2024, Christoffel was built on a simple belief:
              great food brings people together. We wanted to create a warm
              place where incredible meals, genuine hospitality and memorable
              moments could come together.
            </Text>

            <Text style={styles.aboutDescription}>
              From the first ingredient to the final plate, everything we do
              is about creating an experience that feels special while still
              feeling like home.
            </Text>

            <Hoverable style={styles.storyButton}>
              <Text style={styles.storyButtonText}>
                DISCOVER OUR STORY →
              </Text>
            </Hoverable>

          </View>


          <View style={styles.aboutImageArea}>

            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
              }}
              style={styles.aboutImage}
            />

            <View style={styles.aboutImageFrame} />

            <View style={styles.aboutImageBadge}>
              <Text style={styles.aboutBadgeSmall}>
                EST.
              </Text>

              <Text style={styles.aboutBadgeYear}>
                2024
              </Text>

              <Text style={styles.aboutBadgeSmall}>
                DURBAN
              </Text>
            </View>

          </View>

        </View>


        {/* ====================================================
            WHY CHRISTOFFEL
            ==================================================== */}
        <View style={styles.whySection}>

          <Text style={styles.sectionEyebrowCenter}>
            THE CHRISTOFFEL EXPERIENCE
          </Text>

          <Text style={styles.whyTitle}>
            WHY CHRISTOFFEL
          </Text>

          <Text style={styles.whySubtitle}>
            Great food is only the beginning.
          </Text>


          <View style={styles.valuesLargeRow}>

            {/* FRESH */}
            <Hoverable style={styles.valueLargeCard}>
              <Text style={styles.valueLargeIcon}>
                ♧
              </Text>

              <Text style={styles.valueLargeTitle}>
                FRESH INGREDIENTS
              </Text>

              <Text style={styles.valueLargeDescription}>
                Carefully selected ingredients prepared fresh for every service.
              </Text>
            </Hoverable>


            {/* CRAFT */}
            <Hoverable style={styles.valueLargeCard}>
              <Text style={styles.valueLargeIcon}>
                ✦
              </Text>

              <Text style={styles.valueLargeTitle}>
                CRAFTED WITH LOVE
              </Text>

              <Text style={styles.valueLargeDescription}>
                Every dish receives the attention and care it deserves.
              </Text>
            </Hoverable>


            {/* SERVICE */}
            <Hoverable style={styles.valueLargeCard}>
              <Text style={styles.valueLargeIcon}>
                ♡
              </Text>

              <Text style={styles.valueLargeTitle}>
                GREAT PEOPLE
              </Text>

              <Text style={styles.valueLargeDescription}>
                Friendly service and a welcoming atmosphere from the moment you arrive.
              </Text>
            </Hoverable>


            {/* EXPERIENCE */}
            <Hoverable style={styles.valueLargeCard}>
              <Text style={styles.valueLargeIcon}>
                ☆
              </Text>

              <Text style={styles.valueLargeTitle}>
                MEMORABLE MOMENTS
              </Text>

              <Text style={styles.valueLargeDescription}>
                We create experiences worth remembering long after the last bite.
              </Text>
            </Hoverable>

          </View>

        </View>


        {/* ====================================================
            EXPLORE OUR MENU
            ==================================================== */}
        <View style={styles.exploreSection}>

          <Text style={styles.exploreTitle}>
            EXPLORE OUR MENU
          </Text>

          <Text style={styles.exploreSubtitle}>
            Freshly prepared. Beautifully served.
          </Text>

          <View style={styles.categoryRow}>

            {/* STARTERS */}
            <Hoverable
              style={styles.categoryCard}
              onPress={() => setCurrentPage('starters')}
            >
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=700&q=85',
                }}
                style={styles.categoryImage}
              />

              <View style={styles.categoryOverlay} />

              <View style={styles.categoryContent}>
                <Text style={styles.categoryIcon}>
                  ♧
                </Text>

                <Text style={styles.categoryTitle}>
                  STARTERS
                </Text>

                <Text style={styles.categoryDescription}>
                  Light bites, big flavours.
                </Text>

                <Text style={styles.categoryLink}>
                  Explore →
                </Text>
              </View>
            </Hoverable>


            {/* MAINS */}
            <Hoverable
              style={styles.categoryCard}
              onPress={() => setCurrentPage('mains')}
            >
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=85',
                }}
                style={styles.categoryImage}
              />

              <View style={styles.categoryOverlay} />

              <View style={styles.categoryContent}>
                <Text style={styles.categoryIcon}>
                  ◉
                </Text>

                <Text style={styles.categoryTitle}>
                  MAINS
                </Text>

                <Text style={styles.categoryDescription}>
                  Hearty meals, always fresh.
                </Text>

                <Text style={styles.categoryLink}>
                  Explore →
                </Text>
              </View>
            </Hoverable>


            {/* DESSERTS */}
            <Hoverable
              style={styles.categoryCard}
              onPress={() => setCurrentPage('desserts')}
            >
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=700&q=85',
                }}
                style={styles.categoryImage}
              />

              <View style={styles.categoryOverlay} />

              <View style={styles.categoryContent}>
                <Text style={styles.categoryIcon}>
                  ♜
                </Text>

                <Text style={styles.categoryTitle}>
                  DESSERTS
                </Text>

                <Text style={styles.categoryDescription}>
                  Sweet moments, every time.
                </Text>

                <Text style={styles.categoryLink}>
                  Explore →
                </Text>
              </View>
            </Hoverable>


            {/* DRINKS */}
            <Hoverable
              style={styles.categoryCard}
              onPress={() => setCurrentPage('drinks')}
            >
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=700&q=85',
                }}
                style={styles.categoryImage}
              />

              <View style={styles.categoryOverlay} />

              <View style={styles.categoryContent}>
                <Text style={styles.categoryIcon}>
                  ♡
                </Text>

                <Text style={styles.categoryTitle}>
                  DRINKS
                </Text>

                <Text style={styles.categoryDescription}>
                  Refreshing choices.
                </Text>

                <Text style={styles.categoryLink}>
                  Explore →
                </Text>
              </View>
            </Hoverable>

          </View>

        </View>


        {/* ====================================================
            SIGNATURE DISHES
            ==================================================== */}
        <View style={styles.signatureSection}>

          <View style={styles.sectionHeadingRow}>

            <View>
              <Text style={styles.sectionEyebrow}>
                FROM OUR KITCHEN
              </Text>

              <Text style={styles.signatureTitle}>
                SIGNATURE DISHES
              </Text>

              <Text style={styles.signatureSubtitle}>
                The flavours our guests keep coming back for.
              </Text>
            </View>

            <Hoverable style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>
                VIEW FULL MENU →
              </Text>
            </Hoverable>

          </View>


          {/* DISH ROW */}
          <View style={styles.dishesRow}>

            {/* DISH 1 */}
            <Hoverable style={styles.dishCard}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85',
                }}
                style={styles.dishImage}
              />

              <View style={styles.dishBody}>

                <View style={styles.dishTopRow}>
                  <Text style={styles.dishName}>
                    Christoffel Grill
                  </Text>

                  <Text style={styles.dishPrice}>
                    R189
                  </Text>
                </View>

                <Text style={styles.dishDescription}>
                  Flame-grilled beef served with roasted vegetables and house sauce.
                </Text>

                <View style={styles.dishBottomRow}>
                  <Text style={styles.dishRating}>
                    ★★★★★
                  </Text>

                  <Text style={styles.dishCategory}>
                    SIGNATURE
                  </Text>
                </View>

              </View>
            </Hoverable>


            {/* DISH 2 */}
            <Hoverable style={styles.dishCard}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=85',
                }}
                style={styles.dishImage}
              />

              <View style={styles.dishBody}>

                <View style={styles.dishTopRow}>
                  <Text style={styles.dishName}>
                    Herb Chicken
                  </Text>

                  <Text style={styles.dishPrice}>
                    R149
                  </Text>
                </View>

                <Text style={styles.dishDescription}>
                  Tender chicken breast, garden vegetables and creamy herb sauce.
                </Text>

                <View style={styles.dishBottomRow}>
                  <Text style={styles.dishRating}>
                    ★★★★★
                  </Text>

                  <Text style={styles.dishCategory}>
                    POPULAR
                  </Text>
                </View>

              </View>
            </Hoverable>


            {/* DISH 3 */}
            <Hoverable style={styles.dishCard}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=85',
                }}
                style={styles.dishImage}
              />

              <View style={styles.dishBody}>

                <View style={styles.dishTopRow}>
                  <Text style={styles.dishName}>
                    Creamy Pasta
                  </Text>

                  <Text style={styles.dishPrice}>
                    R139
                  </Text>
                </View>

                <Text style={styles.dishDescription}>
                  Handmade pasta tossed in a rich creamy sauce with parmesan.
                </Text>

                <View style={styles.dishBottomRow}>
                  <Text style={styles.dishRating}>
                    ★★★★★
                  </Text>

                  <Text style={styles.dishCategory}>
                    FAVOURITE
                  </Text>
                </View>

              </View>
            </Hoverable>

          </View>


          {/* SECOND DISH ROW */}
          <View style={styles.dishesRow}>

            {/* DISH 4 */}
            <Hoverable style={styles.dishCard}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=85',
                }}
                style={styles.dishImage}
              />

              <View style={styles.dishBody}>

                <View style={styles.dishTopRow}>
                  <Text style={styles.dishName}>
                    Chocolate Dessert
                  </Text>

                  <Text style={styles.dishPrice}>
                    R89
                  </Text>
                </View>

                <Text style={styles.dishDescription}>
                  Decadent chocolate dessert finished with vanilla cream.
                </Text>

                <View style={styles.dishBottomRow}>
                  <Text style={styles.dishRating}>
                    ★★★★★
                  </Text>

                  <Text style={styles.dishCategory}>
                    SWEET
                  </Text>
                </View>

              </View>
            </Hoverable>


            {/* DISH 5 */}
            <Hoverable style={styles.dishCard}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=85',
                }}
                style={styles.dishImage}
              />

              <View style={styles.dishBody}>

                <View style={styles.dishTopRow}>
                  <Text style={styles.dishName}>
                    Garden Plate
                  </Text>

                  <Text style={styles.dishPrice}>
                    R119
                  </Text>
                </View>

                <Text style={styles.dishDescription}>
                  Fresh seasonal vegetables prepared with herbs and olive oil.
                </Text>

                <View style={styles.dishBottomRow}>
                  <Text style={styles.dishRating}>
                    ★★★★★
                  </Text>

                  <Text style={styles.dishCategory}>
                    FRESH
                  </Text>
                </View>

              </View>
            </Hoverable>


            {/* DISH 6 */}
            <Hoverable style={styles.dishCard}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=85',
                }}
                style={styles.dishImage}
              />

              <View style={styles.dishBody}>

                <View style={styles.dishTopRow}>
                  <Text style={styles.dishName}>
                    House Special
                  </Text>

                  <Text style={styles.dishPrice}>
                    R169
                  </Text>
                </View>

                <Text style={styles.dishDescription}>
                  Our chef's special creation, prepared fresh every day.
                </Text>

                <View style={styles.dishBottomRow}>
                  <Text style={styles.dishRating}>
                    ★★★★★
                  </Text>

                  <Text style={styles.dishCategory}>
                    CHEF'S PICK
                  </Text>
                </View>

              </View>
            </Hoverable>

          </View>

        </View>




        {/* ====================================================
            RESTAURANT GALLERY
            ==================================================== */}
        <View style={styles.gallerySection}>

          <View style={styles.galleryHeading}>

            <View>
              <Text style={styles.sectionEyebrow}>
                INSIDE CHRISTOFFEL
              </Text>

              <Text style={styles.galleryTitle}>
                THE GALLERY
              </Text>

              <Text style={styles.gallerySubtitle}>
                A glimpse into the food, people and atmosphere.
              </Text>
            </View>

            <Hoverable style={styles.galleryButton}>
              <Text style={styles.galleryButtonText}>
                VIEW GALLERY →
              </Text>
            </Hoverable>

          </View>


          <View style={styles.galleryGrid}>

            <Hoverable style={styles.galleryLarge}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
                }}
                style={styles.galleryImage}
              />

              <View style={styles.galleryOverlay}>
                <Text style={styles.galleryLabel}>
                  THE RESTAURANT
                </Text>
              </View>
            </Hoverable>


            <View style={styles.gallerySide}>

              <Hoverable style={styles.gallerySmall}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85',
                  }}
                  style={styles.galleryImage}
                />

                <View style={styles.galleryOverlay}>
                  <Text style={styles.galleryLabel}>
                    SIGNATURE FOOD
                  </Text>
                </View>
              </Hoverable>

              <Hoverable style={styles.gallerySmall}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85',
                  }}
                  style={styles.galleryImage}
                />

                <View style={styles.galleryOverlay}>
                  <Text style={styles.galleryLabel}>
                    SWEET MOMENTS
                  </Text>
                </View>
              </Hoverable>

            </View>


            <View style={styles.gallerySide}>

              <Hoverable style={styles.gallerySmall}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85',
                  }}
                  style={styles.galleryImage}
                />

                <View style={styles.galleryOverlay}>
                  <Text style={styles.galleryLabel}>
                    REFRESHMENTS
                  </Text>
                </View>
              </Hoverable>

              <Hoverable style={styles.gallerySmall}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=85',
                  }}
                  style={styles.galleryImage}
                />

                <View style={styles.galleryOverlay}>
                  <Text style={styles.galleryLabel}>
                    FRESH INGREDIENTS
                  </Text>
                </View>
              </Hoverable>

            </View>

          </View>

        </View>


        {/* ====================================================
            CUSTOMER REVIEWS
            ==================================================== */}
        <View style={styles.reviewsSection}>

          <Text style={styles.sectionEyebrowCenter}>
            GUEST EXPERIENCES
          </Text>

          <Text style={styles.reviewsTitle}>
            WHAT OUR GUESTS SAY
          </Text>

          <Text style={styles.reviewsSubtitle}>
            Good food brings people together.
          </Text>


          <View style={styles.reviewsRow}>

            {/* REVIEW 1 */}
            <Hoverable style={styles.reviewCard}>

              <Text style={styles.reviewStars}>
                ★★★★★
              </Text>

              <Text style={styles.reviewQuote}>
                “Absolutely incredible food and atmosphere. The steak was
                perfectly cooked and the service made the whole evening special.”
              </Text>

              <View style={styles.reviewDivider} />

              <Text style={styles.reviewerName}>
                Sarah M.
              </Text>

              <Text style={styles.reviewerLocation}>
                DURBAN
              </Text>

            </Hoverable>


            {/* REVIEW 2 */}
            <Hoverable style={styles.reviewCard}>

              <Text style={styles.reviewStars}>
                ★★★★★
              </Text>

              <Text style={styles.reviewQuote}>
                “One of the best dining experiences I've had. Everything felt
                carefully considered, from the food to the atmosphere.”
              </Text>

              <View style={styles.reviewDivider} />

              <Text style={styles.reviewerName}>
                Thabo K.
              </Text>

              <Text style={styles.reviewerLocation}>
                UMHLANGA
              </Text>

            </Hoverable>


            {/* REVIEW 3 */}
            <Hoverable style={styles.reviewCard}>

              <Text style={styles.reviewStars}>
                ★★★★★
              </Text>

              <Text style={styles.reviewQuote}>
                “The food was unbelievable and the atmosphere was beautiful.
                Christoffel is definitely somewhere I will return to.”
              </Text>

              <View style={styles.reviewDivider} />

              <Text style={styles.reviewerName}>
                Michael D.
              </Text>

              <Text style={styles.reviewerLocation}>
                DURBAN
              </Text>

            </Hoverable>

          </View>

        </View>


        {/* ====================================================
            RESERVATION SECTION
            ==================================================== */}
        <View style={styles.reservationSection}>

          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1800&q=85',
            }}
            style={styles.reservationBackground}
          />

          <View style={styles.reservationOverlay} />

          <View style={styles.reservationContent}>

            <Text style={styles.reservationEyebrow}>
              YOUR TABLE STARTS HERE
            </Text>

            <Text style={styles.reservationTitle}>
              Make tonight
            </Text>

            <Text style={styles.reservationTitle}>
              something <Text style={styles.goldText}>special.</Text>
            </Text>

            <Text style={styles.reservationDescription}>
              Reserve your table and enjoy an evening of great food,
              great people and unforgettable moments.
            </Text>


            <View style={styles.reservationFields}>

              <View style={styles.reservationField}>
                <Text style={styles.reservationFieldLabel}>
                  DATE
                </Text>

                <Text style={styles.reservationFieldValue}>
                  Select date
                </Text>
              </View>

              <View style={styles.reservationField}>
                <Text style={styles.reservationFieldLabel}>
                  TIME
                </Text>

                <Text style={styles.reservationFieldValue}>
                  Select time
                </Text>
              </View>

              <View style={styles.reservationField}>
                <Text style={styles.reservationFieldLabel}>
                  GUESTS
                </Text>

                <Text style={styles.reservationFieldValue}>
                  2 guests
                </Text>
              </View>

              <Hoverable style={styles.reservationButton}>
                <Text style={styles.reservationButtonText}>
                  CHECK AVAILABILITY →
                </Text>
              </Hoverable>

            </View>

          </View>

        </View>


        {/* ====================================================
            DELIVERY / ORDER CTA
            ==================================================== */}
        <View style={styles.deliverySection}>

          <View style={styles.deliveryImageArea}>

            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=85',
              }}
              style={styles.deliveryImage}
            />

            <View style={styles.deliveryImageBorder} />

          </View>


          <View style={styles.deliveryTextArea}>

            <Text style={styles.sectionEyebrow}>
              CHRISTOFFEL AT HOME
            </Text>

            <Text style={styles.deliveryTitle}>
              Good food.
            </Text>

            <Text style={styles.deliveryTitle}>
              Wherever <Text style={styles.goldText}>you are.</Text>
            </Text>

            <Text style={styles.deliveryDescription}>
              Your favourite Christoffel dishes are just a few clicks away.
              Order your favourites for collection or enjoy them from the
              comfort of home.
            </Text>

            <View style={styles.deliveryButtons}>

              <Hoverable style={styles.deliveryPrimaryButton}>
                <Text style={styles.deliveryPrimaryText}>
                  ORDER NOW →
                </Text>
              </Hoverable>

              <Hoverable style={styles.deliverySecondaryButton}>
                <Text style={styles.deliverySecondaryText}>
                  DOWNLOAD APP
                </Text>
              </Hoverable>

            </View>

          </View>

        </View>


        {/* ====================================================
            NEWSLETTER CTA
            ==================================================== */}
        <View style={styles.newsletterSection}>

          <View style={styles.newsletterContent}>

            <Text style={styles.newsletterEyebrow}>
              STAY IN THE LOOP
            </Text>

            <Text style={styles.newsletterTitle}>
              Get the good stuff.
            </Text>

            <Text style={styles.newsletterDescription}>
              Be the first to hear about new dishes, special events,
              seasonal menus and exclusive Christoffel offers.
            </Text>

            <View style={styles.newsletterLargeBox}>

              <Text style={styles.newsletterLargePlaceholder}>
                Enter your email address
              </Text>

              <Hoverable style={styles.newsletterLargeButton}>
                <Text style={styles.newsletterLargeButtonText}>
                  JOIN US →
                </Text>
              </Hoverable>

            </View>

          </View>

        </View>


/* ====================================================
            CHRISTOFFEL FOOTER
            ==================================================== */
        <View style={styles.footer}>

          <View style={styles.footerMain}>

            <View style={styles.footerBrandSection}>
              <View style={styles.footerLogoRow}>
                <Text style={styles.footerLogoIcon}>♨</Text>
                <View>
                  <Text style={styles.footerLogoText}>CHRISTOFFEL</Text>
                  <View style={styles.footerMenuRow}>
                    <View style={styles.footerLogoLine} />
                    <Text style={styles.footerMenuText}>MENU</Text>
                    <View style={styles.footerLogoLine} />
                  </View>
                </View>
              </View>

              <Text style={styles.footerTagline}>
                GOOD FOOD  •  GREAT PEOPLE  •  ALWAYS HERE
              </Text>

              <Text style={styles.footerDescription}>
                Great food, good company, and a warm Christoffel experience.
              </Text>

              <View style={styles.socialRow}>
                <Hoverable style={styles.socialButton}>
                  <Text style={styles.socialText}>f</Text>
                </Hoverable>
                <Hoverable style={styles.socialButton}>
                  <Text style={styles.socialText}>◎</Text>
                </Hoverable>
                <Hoverable style={styles.socialButton}>
                  <Text style={styles.socialText}>𝕏</Text>
                </Hoverable>
                <Hoverable style={styles.socialButton}>
                  <Text style={styles.socialText}>▶</Text>
                </Hoverable>
              </View>
            </View>

            <View style={styles.footerColumn}>
              <Text style={styles.footerColumnTitle}>MENU</Text>

              <Hoverable><Text style={styles.footerLink}>Home</Text></Hoverable>
              <Hoverable><Text style={styles.footerLink}>Starters</Text></Hoverable>
              <Hoverable><Text style={styles.footerLink}>Mains</Text></Hoverable>
              <Hoverable><Text style={styles.footerLink}>Desserts</Text></Hoverable>
              <Hoverable><Text style={styles.footerLink}>Drinks</Text></Hoverable>
              <Hoverable><Text style={styles.footerLink}>Selection</Text></Hoverable>
            </View>

            <View style={styles.footerColumn}>
              <Text style={styles.footerColumnTitle}>CONTACT</Text>

              <View style={styles.contactRow}>
                <Text style={styles.contactIcon}>●</Text>
                <Text style={styles.contactText}>
                  123 Restaurant Street{'\n'}
                  Durban, KZN 4001{'\n'}
                  South Africa
                </Text>
              </View>

              <View style={styles.contactRow}>
                <Text style={styles.contactIcon}>☎</Text>
                <Text style={styles.contactText}>+27 31 123 4567</Text>
              </View>

              <View style={styles.contactRow}>
                <Text style={styles.contactIcon}>✉</Text>
                <Text style={styles.contactText}>info@christoffel.co.za</Text>
              </View>
            </View>

          </View>

          <View style={styles.footerDivider} />

          <View style={styles.footerBottom}>
            <View style={styles.downloadSection}>
              <Text style={styles.downloadTitle}>DOWNLOAD OUR APP</Text>
              <Text style={styles.downloadSubtitle}>Order faster. Enjoy more.</Text>

              <View style={styles.appButtons}>
                <Hoverable style={styles.appButton}>
                  <Ionicons
                    name="logo-google-playstore"
                    size={23}
                    color="#F5F1E8"
                    style={styles.appButtonIcon}
                  />
                  <View>
                    <Text style={styles.appButtonSmall}>GET IT ON</Text>
                    <Text style={styles.appButtonLarge}>Google Play</Text>
                  </View>
                </Hoverable>

                <Hoverable style={styles.appButton}>
                  <Ionicons
                    name="logo-apple"
                    size={23}
                    color="#F5F1E8"
                    style={styles.appButtonIcon}
                  />
                  <View>
                    <Text style={styles.appButtonSmall}>Download on the</Text>
                    <Text style={styles.appButtonLarge}>App Store</Text>
                  </View>
                </Hoverable>
              </View>
            </View>

            <View style={styles.footerSlogan}>
              <Text style={styles.footerSloganLine}>Good Food</Text>
              <Text style={styles.footerSloganLine}>Brighter Days</Text>
              <View style={styles.sloganUnderline} />
            </View>
          </View>

          <View style={styles.copyrightBar}>
            <Text style={styles.copyrightText}>
              © 2026 Christoffel. All rights reserved.
            </Text>
            <Text style={styles.copyrightTagline}>
              GOOD FOOD  •  GREAT PEOPLE  •  ALWAYS HERE
            </Text>
          </View>

        </View>

      </ScrollView>

    </ImageBackground>
  );
}


const styles = StyleSheet.create({

  /* =========================================================
     MAIN WEB CANVAS
     ========================================================= */

  container: {
    flex: 1,
    minHeight: 700,
    backgroundColor: '#07130F',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(3, 12, 8, 0.38)',
  },

  scrollView: {
    flex: 1,
  },

  pageContent: {
    paddingBottom: 45,
  },


  /* =========================================================
     HEADER
     ========================================================= */

  header: {
    height: 82,
    paddingHorizontal: 68,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(3, 10, 7, 0.48)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 175, 55, 0.18)',
    zIndex: 100,
    elevation: 10,
  },

  brandArea: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 330,
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoIcon: {
    fontSize: 38,
    color: '#D4AF37',
    marginRight: 17,
  },

  logoText: {
    fontSize: 21,
    fontWeight: '400',
    letterSpacing: 4,
    color: '#F5F1E8',
  },

  menuLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },

  logoLine: {
    width: 34,
    height: 1,
    backgroundColor: '#D4AF37',
    opacity: 0.8,
  },

  menuText: {
    marginHorizontal: 10,
    fontSize: 9,
    letterSpacing: 3,
    color: '#D4AF37',
  },

  loginButton: {
    marginLeft: 24,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(212, 175, 55, 0.35)',
  },

  loginText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.8,
    color: '#F5F1E8',
  },

  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 36,
  },

  navItem: {
    fontSize: 11,
    fontWeight: '400',
    letterSpacing: 1.5,
    color: '#F5F1E8',
  },

  activeNav: {
    color: '#D4AF37',
  },

  cartButton: {
    minWidth: 112,
    height: 42,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.7)',
    borderRadius: 22,
    backgroundColor: 'rgba(3, 10, 7, 0.42)',
  },

  cartText: {
    marginLeft: 8,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#F5F1E8',
  },

  cartBadge: {
    minWidth: 21,
    height: 21,
    marginLeft: 8,
    paddingHorizontal: 5,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D4AF37',
  },

  cartBadgeText: {
    color: '#07130F',
    fontSize: 10,
    fontWeight: '700',
  },

  cartArea: {
    position: 'relative',
  },


  /* =========================================================
     HERO
     ========================================================= */

  hero: {
    minHeight: 650,
    paddingHorizontal: 105,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  heroTextArea: {
    width: '47%',
    maxWidth: 620,
  },

  welcome: {
    color: '#D4AF37',
    fontSize: 15,
    letterSpacing: 5,
    marginBottom: 16,
  },

  heroTitle: {
    color: '#F5F1E8',
    fontSize: 58,
    fontWeight: '400',
    lineHeight: 65,
  },

  goldText: {
    color: '#D4AF37',
  },

  description: {
    color: '#C0C5C0',
    fontSize: 16,
    lineHeight: 25,
    marginTop: 7,
  },

  heroButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 34,
    gap: 12,
    flexWrap: 'wrap',
  },

  viewMenuButton: {
    minWidth: 180,
    height: 52,
    paddingHorizontal: 22,
    borderRadius: 27,
    borderWidth: 1,
    borderColor: '#D4AF37',
    backgroundColor: 'rgba(3, 10, 7, 0.55)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  viewMenuIcon: {
    color: '#D4AF37',
    fontSize: 17,
    marginRight: 10,
  },

  viewMenuText: {
    color: '#F5F1E8',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.2,
  },

  buttonArrow: {
    color: '#D4AF37',
    fontSize: 22,
    marginLeft: 13,
  },

  secondaryButton: {
    minWidth: 155,
    height: 52,
    paddingHorizontal: 18,
    borderRadius: 27,
    borderWidth: 1,
    borderColor: '#D4AF37',
    backgroundColor: 'rgba(3, 10, 7, 0.35)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryIcon: {
    color: '#D4AF37',
    fontSize: 16,
    marginRight: 9,
  },

  secondaryText: {
    color: '#F5F1E8',
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 1,
  },

  secondaryArrow: {
    color: '#D4AF37',
    fontSize: 20,
    marginLeft: 10,
  },

  heroTagline: {
    color: '#A6AEA8',
    fontSize: 9,
    letterSpacing: 3,
    marginTop: 36,
  },


  /* =========================================================
     FEATURED FOOD
     ========================================================= */

  foodArea: {
    width: '45%',
    minHeight: 560,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  foodCircle: {
    width: 440,
    height: 440,
    borderRadius: 220,
    borderWidth: 3,
    borderColor: '#D4AF37',
    padding: 8,
    backgroundColor: '#111712',
  },

  foodImage: {
    width: '100%',
    height: '100%',
    borderRadius: 220,
  },

  foodBadge: {
    position: 'absolute',
    top: 55,
    right: 5,
    width: 125,
    height: 125,
    borderRadius: 63,
    borderWidth: 1.5,
    borderColor: '#D4AF37',
    backgroundColor: 'rgba(7, 13, 10, 0.94)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeText: {
    color: '#D9D5CA',
    fontSize: 10,
    letterSpacing: 3,
    lineHeight: 15,
  },

  badgeGoldText: {
    color: '#D4AF37',
    fontSize: 10,
    letterSpacing: 3,
    lineHeight: 15,
  },

  badgeLine: {
    width: 34,
    height: 1,
    backgroundColor: '#D4AF37',
    marginTop: 7,
  },

  foodSlogan: {
    position: 'absolute',
    right: -15,
    bottom: 5,
    alignItems: 'flex-start',
  },

  foodSloganText: {
    color: '#D4AF37',
    fontSize: 28,
    fontWeight: '300',
    fontStyle: 'italic',
    lineHeight: 34,
  },


  /* =========================================================
     DEALS BANNER
     ========================================================= */

  dealsBanner: {
    height: 48,
    overflow: 'hidden',
    backgroundColor: 'rgba(7, 19, 15, 0.72)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'rgba(212, 175, 55, 0.35)',
    borderBottomColor: 'rgba(212, 175, 55, 0.35)',
    justifyContent: 'center',
  },

  dealsTrack: {
    flexDirection: 'row',
    width: 1800,
  },

 dealsText: {
  color: '#D4AF37',
  fontSize: 11,
  letterSpacing: 2,
},


  /* =========================================================
     MOVING CHRISTOFFEL MOMENTS
     ========================================================= */

  momentsSection: {
    height: 500,
    marginHorizontal: 70,
    marginTop: 70,
    marginBottom: 70,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.38)',
    backgroundColor: '#050D08',
    overflow: 'hidden',
    position: 'relative',
  },

  momentsImageWrap: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  momentsImage: {
    width: '100%',
    height: '100%',
  },

  momentsOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(3, 12, 8, 0.58)',
  },

  momentsContent: {
    position: 'absolute',
    left: 65,
    bottom: 65,
    maxWidth: 700,
  },

  momentsEyebrow: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 4,
    marginBottom: 14,
  },

  momentsTitle: {
    color: '#F5F1E8',
    fontSize: 42,
    fontWeight: '400',
    lineHeight: 50,
  },

  momentsSubtitle: {
    color: '#D0D4D0',
    fontSize: 11,
    letterSpacing: 3,
    marginTop: 15,
  },

  momentsLine: {
    width: 55,
    height: 2,
    backgroundColor: '#D4AF37',
    marginTop: 18,
  },

  momentsDots: {
    position: 'absolute',
    right: 45,
    bottom: 45,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  momentsDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: 'rgba(245, 241, 232, 0.45)',
  },

  momentsDotActive: {
    width: 25,
    borderRadius: 4,
    backgroundColor: '#D4AF37',
  },

  /* =========================================================
     EXPLORE MENU
     ========================================================= */

  exploreSection: {
    minHeight: 430,
    paddingHorizontal: 80,
    paddingVertical: 48,
    backgroundColor: 'rgba(3, 10, 7, 0.34)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 175, 55, 0.2)',
  },

  exploreTitle: {
    color: '#D4AF37',
    fontSize: 24,
    letterSpacing: 6,
    textAlign: 'center',
  },

  exploreSubtitle: {
    color: '#C0C5C0',
    fontSize: 14,
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 30,
  },

  categoryRow: {
    flexDirection: 'row',
    gap: 18,
    justifyContent: 'center',
  },

  categoryCard: {
    flex: 1,
    maxWidth: 330,
    minHeight: 260,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.55)',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(7, 19, 15, 0.72)',
    position: 'relative',
  },

  categoryImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  categoryOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(3, 10, 7, 0.58)',
  },

  categoryContent: {
    flex: 1,
    minHeight: 260,
    padding: 20,
    justifyContent: 'flex-end',
  },

  categoryIcon: {
    color: '#D4AF37',
    fontSize: 30,
    marginBottom: 8,
  },

  categoryTitle: {
    color: '#F5F1E8',
    fontSize: 15,
    letterSpacing: 3,
    marginBottom: 7,
  },

  categoryDescription: {
    color: '#D0D4D0',
    fontSize: 12,
    marginBottom: 12,
  },

  categoryLink: {
    color: '#D4AF37',
    fontSize: 13,
    letterSpacing: 1,
  },


  /* =========================================================
     SIGNATURE DISHES
     ========================================================= */

  signatureSection: {
    paddingHorizontal: 80,
    paddingVertical: 70,
    backgroundColor: 'rgba(3, 10, 7, 0.34)',
  },

  sectionHeadingRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 35,
  },

  sectionEyebrow: {
    color: '#D4AF37',
    fontSize: 10,
    letterSpacing: 4,
    marginBottom: 10,
  },

  signatureTitle: {
    color: '#F5F1E8',
    fontSize: 34,
    letterSpacing: 2,
  },

  signatureSubtitle: {
    color: '#A8B0AA',
    fontSize: 14,
    marginTop: 8,
  },

  viewAllButton: {
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 13,
  },

  viewAllText: {
    color: '#D4AF37',
    fontSize: 11,
    letterSpacing: 1.5,
  },

  dishesRow: {
    flexDirection: 'row',
    gap: 22,
    marginBottom: 22,
  },

  dishCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.25)',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(7, 19, 15, 0.72)',
  },

  dishImage: {
    width: '100%',
    height: 220,
  },

  dishBody: {
    padding: 18,
  },

  dishTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
  },

  dishName: {
    color: '#F5F1E8',
    fontSize: 17,
    fontWeight: '500',
  },

  dishPrice: {
    color: '#D4AF37',
    fontSize: 15,
    fontWeight: '600',
  },

  dishDescription: {
    color: '#9FA8A1',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 9,
    minHeight: 38,
  },

  dishBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  dishRating: {
    color: '#D4AF37',
    fontSize: 12,
    letterSpacing: 2,
  },

  dishCategory: {
    color: '#7D877F',
    fontSize: 8,
    letterSpacing: 2,
  },


  /* =========================================================
     ABOUT
     ========================================================= */

  aboutSection: {
    minHeight: 580,
    paddingHorizontal: 80,
    paddingVertical: 75,
    backgroundColor: 'rgba(3, 10, 7, 0.34)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 70,
  },

  aboutTextArea: {
    flex: 1,
    maxWidth: 540,
  },

  aboutTitle: {
    color: '#F5F1E8',
    fontSize: 42,
    lineHeight: 49,
    fontWeight: '300',
  },

  aboutDescription: {
    color: '#A8B0AA',
    fontSize: 14,
    lineHeight: 23,
    marginTop: 20,
  },

  storyButton: {
    alignSelf: 'flex-start',
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 24,
    paddingHorizontal: 23,
    paddingVertical: 13,
  },

  storyButtonText: {
    color: '#D4AF37',
    fontSize: 11,
    letterSpacing: 1.5,
  },

  aboutImageArea: {
    flex: 1,
    height: 430,
    maxWidth: 680,
    position: 'relative',
  },

  aboutImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },

  aboutImageFrame: {
    position: 'absolute',
    top: 14,
    right: -14,
    bottom: -14,
    left: 14,
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 5,
    pointerEvents: 'none',
  },

  aboutImageBadge: {
    position: 'absolute',
    bottom: 25,
    left: 25,
    width: 115,
    height: 115,
    borderRadius: 58,
    backgroundColor: 'rgba(3, 10, 7, 0.93)',
    borderWidth: 1,
    borderColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
  },

  aboutBadgeSmall: {
    color: '#C7CBC7',
    fontSize: 8,
    letterSpacing: 2,
  },

  aboutBadgeYear: {
    color: '#D4AF37',
    fontSize: 24,
    marginVertical: 4,
  },


  /* =========================================================
     WHY CHRISTOFFEL
     ========================================================= */

  whySection: {
    paddingHorizontal: 80,
    paddingVertical: 75,
    backgroundColor: 'rgba(3, 10, 7, 0.34)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'rgba(212, 175, 55, 0.15)',
    borderBottomColor: 'rgba(212, 175, 55, 0.15)',
  },

  sectionEyebrowCenter: {
    color: '#D4AF37',
    fontSize: 10,
    letterSpacing: 4,
    textAlign: 'center',
    marginBottom: 10,
  },

  whyTitle: {
    color: '#F5F1E8',
    fontSize: 32,
    letterSpacing: 4,
    textAlign: 'center',
  },

  whySubtitle: {
    color: '#A8B0AA',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 9,
    marginBottom: 40,
  },

  valuesLargeRow: {
    flexDirection: 'row',
    gap: 20,
  },

  valueLargeCard: {
    flex: 1,
    minHeight: 220,
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    borderRadius: 16,
    backgroundColor: 'rgba(7, 19, 15, 0.72)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  valueLargeIcon: {
    color: '#D4AF37',
    fontSize: 42,
    marginBottom: 20,
  },

  valueLargeTitle: {
    color: '#F5F1E8',
    fontSize: 12,
    letterSpacing: 2,
    textAlign: 'center',
  },

  valueLargeDescription: {
    color: '#929B94',
    fontSize: 12,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 12,
    maxWidth: 220,
  },


  /* =========================================================
     GALLERY
     ========================================================= */

  gallerySection: {
    paddingHorizontal: 80,
    paddingVertical: 75,
    backgroundColor: 'rgba(3, 10, 7, 0.34)',
  },

  galleryHeading: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 35,
  },

  galleryTitle: {
    color: '#F5F1E8',
    fontSize: 34,
    letterSpacing: 3,
  },

  gallerySubtitle: {
    color: '#A8B0AA',
    fontSize: 14,
    marginTop: 8,
  },

  galleryButton: {
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 24,
    paddingHorizontal: 23,
    paddingVertical: 13,
  },

  galleryButtonText: {
    color: '#D4AF37',
    fontSize: 11,
    letterSpacing: 1.5,
  },

  galleryGrid: {
    minHeight: 520,
    flexDirection: 'row',
    gap: 14,
  },

  galleryLarge: {
    flex: 1.5,
    minHeight: 520,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },

  gallerySide: {
    flex: 1,
    gap: 14,
  },

  gallerySmall: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },

  galleryImage: {
    width: '100%',
    height: '100%',
  },

  galleryOverlay: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    minHeight: 75,
    paddingHorizontal: 20,
    paddingBottom: 18,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(3, 10, 7, 0.62)',
  },

  galleryLabel: {
    color: '#F5F1E8',
    fontSize: 10,
    letterSpacing: 3,
  },


  /* =========================================================
     REVIEWS
     ========================================================= */

  reviewsSection: {
    paddingHorizontal: 80,
    paddingVertical: 75,
    backgroundColor: 'rgba(3, 10, 6, 0.34)',
  },

  reviewsTitle: {
    color: '#F5F1E8',
    fontSize: 32,
    letterSpacing: 3,
    textAlign: 'center',
  },

  reviewsSubtitle: {
    color: '#A8B0AA',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 9,
    marginBottom: 40,
  },

  reviewsRow: {
    flexDirection: 'row',
    gap: 22,
  },

  reviewCard: {
    flex: 1,
    minHeight: 290,
    padding: 30,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.28)',
    borderRadius: 16,
    backgroundColor: 'rgba(7, 19, 15, 0.72)',
  },

  reviewStars: {
    color: '#D4AF37',
    fontSize: 16,
    letterSpacing: 4,
  },

  reviewQuote: {
    color: '#D4D7D3',
    fontSize: 14,
    lineHeight: 24,
    marginTop: 25,
    flex: 1,
  },

  reviewDivider: {
    height: 1,
    width: 45,
    backgroundColor: '#D4AF37',
    marginVertical: 20,
  },

  reviewerName: {
    color: '#F5F1E8',
    fontSize: 13,
    letterSpacing: 1,
  },

  reviewerLocation: {
    color: '#7F8981',
    fontSize: 8,
    letterSpacing: 2,
    marginTop: 5,
  },


  /* =========================================================
     RESERVATION
     ========================================================= */

  reservationSection: {
    minHeight: 540,
    position: 'relative',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  reservationBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  reservationOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(3, 10, 7, 0.75)',
  },

  reservationContent: {
    paddingHorizontal: 90,
    paddingVertical: 70,
    maxWidth: 1250,
  },

  reservationEyebrow: {
    color: '#D4AF37',
    fontSize: 10,
    letterSpacing: 4,
    marginBottom: 15,
  },

  reservationTitle: {
    color: '#F5F1E8',
    fontSize: 44,
    lineHeight: 52,
    fontWeight: '300',
  },

  reservationDescription: {
    color: '#B7BDB8',
    fontSize: 14,
    lineHeight: 23,
    marginTop: 18,
    maxWidth: 520,
  },

  reservationFields: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 35,
    flexWrap: 'wrap',
  },

  reservationField: {
    width: 155,
    height: 68,
    paddingHorizontal: 18,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.65)',
    borderRadius: 7,
    backgroundColor: 'rgba(3, 10, 7, 0.7)',
  },

  reservationFieldLabel: {
    color: '#D4AF37',
    fontSize: 8,
    letterSpacing: 2,
  },

  reservationFieldValue: {
    color: '#E1E3DF',
    fontSize: 12,
    marginTop: 6,
  },

  reservationButton: {
    height: 68,
    paddingHorizontal: 27,
    borderRadius: 7,
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
  },

  reservationButtonText: {
    color: '#07130F',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },


  /* =========================================================
     DELIVERY
     ========================================================= */

  deliverySection: {
    minHeight: 560,
    paddingHorizontal: 80,
    paddingVertical: 75,
    backgroundColor: 'rgba(3, 10, 7, 0.34)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 75,
  },

  deliveryImageArea: {
    flex: 1,
    height: 400,
    maxWidth: 650,
    position: 'relative',
  },

  deliveryImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },

  deliveryImageBorder: {
    position: 'absolute',
    top: 14,
    right: -14,
    bottom: -14,
    left: 14,
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 6,
    pointerEvents: 'none',
  },

  deliveryTextArea: {
    flex: 1,
    maxWidth: 560,
  },

  deliveryTitle: {
    color: '#F5F1E8',
    fontSize: 43,
    lineHeight: 50,
    fontWeight: '300',
  },

  deliveryDescription: {
    color: '#A8B0AA',
    fontSize: 14,
    lineHeight: 23,
    marginTop: 20,
  },

  deliveryButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 30,
  },

  deliveryPrimaryButton: {
    height: 50,
    paddingHorizontal: 25,
    borderRadius: 25,
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
  },

  deliveryPrimaryText: {
    color: '#07130F',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },

  deliverySecondaryButton: {
    height: 50,
    paddingHorizontal: 25,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#D4AF37',
    justifyContent: 'center',
  },

  deliverySecondaryText: {
    color: '#D4AF37',
    fontSize: 11,
    letterSpacing: 1,
  },


  /* =========================================================
     LARGE NEWSLETTER
     ========================================================= */

  newsletterSection: {
    paddingHorizontal: 80,
    paddingVertical: 75,
    backgroundColor: 'rgba(7, 19, 15, 0.42)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'rgba(212, 175, 55, 0.18)',
    borderBottomColor: 'rgba(212, 175, 55, 0.18)',
  },

  newsletterContent: {
    alignItems: 'center',
    maxWidth: 760,
    alignSelf: 'center',
  },

  newsletterEyebrow: {
    color: '#D4AF37',
    fontSize: 10,
    letterSpacing: 4,
  },

  newsletterTitle: {
    color: '#F5F1E8',
    fontSize: 38,
    marginTop: 10,
  },

  newsletterDescription: {
    color: '#A8B0AA',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 10,
    maxWidth: 620,
  },

  newsletterLargeBox: {
    width: '100%',
    maxWidth: 620,
    height: 58,
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 30,
    paddingLeft: 22,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#07130F',
  },

  newsletterLargePlaceholder: {
    flex: 1,
    color: '#777F79',
    fontSize: 13,
  },

  newsletterLargeButton: {
    height: 58,
    minWidth: 130,
    paddingHorizontal: 25,
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
  },

  newsletterLargeButtonText: {
    color: '#07130F',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },


  /* =========================================================
     PROFESSIONAL FOOTER
     ========================================================= */

  footer: {
    backgroundColor: '#030A06',
    paddingTop: 55,
  },

  footerMain: {
    paddingHorizontal: 70,
    paddingBottom: 45,
    flexDirection: 'row',
    gap: 45,
  },

  footerBrandSection: {
    flex: 1.5,
    maxWidth: 390,
  },

  footerLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  footerLogoIcon: {
    color: '#D4AF37',
    fontSize: 50,
    marginRight: 15,
  },

  footerLogoText: {
    color: '#F5F1E8',
    fontSize: 27,
    letterSpacing: 5,
  },

  footerMenuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },

  footerLogoLine: {
    width: 38,
    height: 1,
    backgroundColor: '#D4AF37',
  },

  footerMenuText: {
    color: '#D4AF37',
    fontSize: 11,
    letterSpacing: 4,
    marginHorizontal: 10,
  },

  footerTagline: {
    color: '#D4AF37',
    fontSize: 9,
    letterSpacing: 2.5,
    marginTop: 25,
  },

  footerDescription: {
    color: '#A8B0AA',
    fontSize: 13,
    lineHeight: 22,
    marginTop: 25,
    maxWidth: 350,
  },

  footerOrderButton: {
    width: 155,
    height: 45,
    marginTop: 25,
    borderWidth: 1.5,
    borderColor: '#D4AF37',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  footerOrderText: {
    color: '#D4AF37',
    fontSize: 13,
    letterSpacing: 1,
  },

  footerOrderArrow: {
    color: '#D4AF37',
    fontSize: 20,
    marginLeft: 12,
  },

  socialRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 30,
  },

  socialButton: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: '#A78B2D',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },

  socialText: {
    color: '#F5F1E8',
    fontSize: 20,
    fontWeight: '500',
  },

  footerColumn: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(212, 175, 55, 0.3)',
    paddingLeft: 28,
  },

  footerColumnTitle: {
    color: '#D4AF37',
    fontSize: 13,
    letterSpacing: 3,
    marginBottom: 23,
  },

  footerLink: {
    color: '#C4C9C5',
    fontSize: 13,
    marginBottom: 15,
  },

  contactRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 22,
  },

  contactIcon: {
    color: '#D4AF37',
    fontSize: 15,
    width: 28,
  },

  contactText: {
    color: '#C4C9C5',
    fontSize: 13,
    lineHeight: 21,
    flex: 1,
  },

  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    gap: 15,
  },

  hoursDay: {
    color: '#C4C9C5',
    fontSize: 12,
  },

  hoursTime: {
    color: '#C4C9C5',
    fontSize: 12,
  },

  stayConnectedTitle: {
    color: '#D4AF37',
    fontSize: 13,
    letterSpacing: 3,
    marginTop: 30,
    marginBottom: 12,
  },

  newsletterText: {
    color: '#A8B0AA',
    fontSize: 12,
    lineHeight: 19,
    marginBottom: 18,
  },

  newsletterBox: {
    height: 45,
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 18,
    overflow: 'hidden',
  },

  newsletterPlaceholder: {
    flex: 1,
    color: '#777F79',
    fontSize: 12,
  },

  newsletterButton: {
    width: 48,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
  },

  newsletterArrow: {
    color: '#07130F',
    fontSize: 21,
  },


  /* =========================================================
     FOOTER BOTTOM
     ========================================================= */

  footerDivider: {
    height: 1,
    backgroundColor: 'rgba(212, 175, 55, 0.3)',
    marginHorizontal: 70,
  },

  footerBottom: {
    paddingHorizontal: 70,
    paddingTop: 55,
    paddingBottom: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 35,
  },

  downloadSection: {
    flex: 1,
  },

  downloadTitle: {
    color: '#D4AF37',
    fontSize: 13,
    letterSpacing: 3,
  },

  downloadSubtitle: {
    color: '#A8B0AA',
    fontSize: 12,
    marginTop: 7,
    marginBottom: 18,
  },

  appButtons: {
    flexDirection: 'row',
    gap: 10,
  },

  appButton: {
    height: 48,
    minWidth: 145,
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: '#8C938D',
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },

  appButtonIcon: {
    color: '#F5F1E8',
    fontSize: 22,
    marginRight: 9,
  },

  appButtonSmall: {
    color: '#B8BDB9',
    fontSize: 7,
  },

  appButtonLarge: {
    color: '#F5F1E8',
    fontSize: 13,
    fontWeight: '600',
  },

  valuesSection: {
    flex: 1.2,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
  },

  valueItem: {
    alignItems: 'center',
    minWidth: 90,
  },

  valueIcon: {
    color: '#D4AF37',
    fontSize: 28,
    marginBottom: 8,
  },

  valueTitle: {
    color: '#F5F1E8',
    fontSize: 10,
    letterSpacing: 2,
  },

  valueSubtitle: {
    color: '#A8B0AA',
    fontSize: 8,
    letterSpacing: 2,
    marginTop: 4,
  },

  footerSlogan: {
    flex: 0.8,
    alignItems: 'center',
  },

  footerSloganLine: {
    color: '#D4AF37',
    fontSize: 25,
    fontStyle: 'italic',
    lineHeight: 31,
  },

  sloganUnderline: {
    width: 40,
    height: 2,
    backgroundColor: '#D4AF37',
    marginTop: 10,
  },


  /* =========================================================
     COPYRIGHT
     ========================================================= */

  copyrightBar: {
    minHeight: 70,
    paddingVertical: 18,
    paddingHorizontal: 70,
    backgroundColor: '#020805',
    borderTopWidth: 1,
    borderTopColor: 'rgba(212, 175, 55, 0.15)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  copyrightText: {
    color: '#7E8780',
    fontSize: 11,
  },

  copyrightTagline: {
    color: '#7E8780',
    fontSize: 9,
    letterSpacing: 2,
  },


  profileArea: {
    position: 'relative',
    zIndex: 50,
  },

  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#53645A',
    borderRadius: 22,
    backgroundColor: 'rgba(10, 18, 13, 0.82)',
  },

  profileButtonText: {
    color: '#F5F1E8',
    fontSize: 11,
    letterSpacing: 2,
  },

  profileDropdown: {
    position: 'absolute',
    top: 48,
    right: 0,
    width: 230,
    padding: 14,
    borderWidth: 1,
    borderColor: '#53645A',
    backgroundColor: '#0B100D',
    borderRadius: 12,
    zIndex: 100,
  },

  profileStatus: {
    color: '#D4AF37',
    fontSize: 10,
    letterSpacing: 2,
    marginBottom: 6,
  },

  profileEmail: {
    color: '#F5F1E8',
    fontSize: 12,
    marginBottom: 10,
  },

  profileItem: {
    paddingVertical: 11,
    borderTopWidth: 1,
    borderTopColor: '#1E2A22',
  },

  profileItemText: {
    color: '#F1EEE5',
    fontSize: 11,
    letterSpacing: 1.5,
  },

  /* =========================================================
     SHARED HOVER EFFECT
     ========================================================= */

  hoverEffect: {
    backgroundColor: 'rgba(212, 175, 55, 0.18)',
    borderColor: '#F2D35E',
    opacity: 1,
    transform: [{ translateY: -3 }],
  },

});

// ============================================================
// WEB APPLICATION PROVIDER
//
// The provider sits above the entire website so every web page
// can use the same web-only selection/cart.
// ============================================================
export default function WebApp() {
  return (
    <WebSelectionProvider>
      <View style={{ flex: 1 }}>
        <WebAppContent />

        <FloatingOrderTracker />
      </View>
    </WebSelectionProvider>
  );
}
