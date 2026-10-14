import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  ImageBackground,
  Animated,
  Easing,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import {
  MenuItem,
} from '../data/menuData';

import { useWebSelection } from './context/WebSelectionContext';
import CartDropdown from './components/CartDropdown';

const backgroundImage = require('../assets/christoffel-background.png');

type MainsWebProps = {
  menuItems: MenuItem[];
  onHome?: () => void;
  onStarters?: () => void;
  onDesserts?: () => void;
  onDrinks?: () => void;
  onSelection?: () => void;
  onCheckout?: () => void;
};

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

function DealsBanner() {
  const translateX =
    React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(translateX, {
        toValue: -900,
        duration: 18000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
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
          🔥 TODAY'S SPECIAL  •  20% OFF ALL MAINS  •  FREE DRINK WITH EVERY COMBO  •  SIGNATURE DISHES  •  WEEKEND SPECIALS  •  ORDER NOW & SAVE  •  🔥 TODAY'S SPECIAL  •  20% OFF ALL MAINS  •  FREE DRINK WITH EVERY COMBO  •  SIGNATURE DISHES  •  WEEKEND SPECIALS  •  ORDER NOW & SAVE  •
        </Text>
      </Animated.View>
    </View>
  );
}


function LivingTableShowcase({ mains }: { mains: MenuItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const fade = React.useRef(new Animated.Value(1)).current;
  const scale = React.useRef(new Animated.Value(1.04)).current;

  useEffect(() => {
    if (mains.length < 2) return;

    const timer = setInterval(() => {
      Animated.parallel([
        Animated.timing(fade, {
          toValue: 0,
          duration: 550,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1.08,
          duration: 550,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        setActiveIndex(current => (current + 1) % mains.length);
        fade.setValue(0);
        scale.setValue(1.08);

        Animated.parallel([
          Animated.timing(fade, {
            toValue: 1,
            duration: 750,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1.02,
            duration: 4200,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start();
      });
    }, 5200);

    return () => clearInterval(timer);
  }, [mains.length, fade, scale]);

  if (!mains.length) return null;

  const activeMain = mains[activeIndex];

  return (
    <View style={styles.livingTableSide}>
      <View style={styles.livingTableFrame}>
        <Animated.Image
          source={{ uri: activeMain.image }}
          style={[
            styles.livingTableImage,
            {
              opacity: fade,
              transform: [{ scale }],
            },
          ]}
        />

        <View style={styles.livingTableShade} />

        <View style={styles.livingTableTopLabel}>
          <Text style={styles.livingTableTopLabelText}>
            CHRISTOFFEL · MAIN COURSE
          </Text>
        </View>

        <View style={styles.livingTableCaption}>
          <Text style={styles.livingTableCaptionEyebrow}>
            THE HEART OF THE TABLE
          </Text>
          <Text style={styles.livingTableCaptionTitle}>
            {activeMain.name}
          </Text>
          <View style={styles.livingTableCaptionLine} />
          <Text style={styles.livingTableCaptionNumber}>
            {String(activeIndex + 1).padStart(2, '0')} /{' '}
            {String(mains.length).padStart(2, '0')}
          </Text>
        </View>

        <View style={styles.livingTableFrameOffset} />
      </View>
    </View>
  );
}


function KitchenPulse({ mains }: { mains: MenuItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const pulse = React.useRef(new Animated.Value(0.92)).current;
  const lineWidth = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!mains.length) return;

    const animate = () => {
      pulse.setValue(0.92);
      lineWidth.setValue(0);

      Animated.parallel([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(lineWidth, {
          toValue: 1,
          duration: 1800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }),
      ]).start();
    };

    animate();

    const timer = setInterval(() => {
      setActiveIndex(current => (current + 1) % mains.length);
      animate();
    }, 4200);

    return () => clearInterval(timer);
  }, [mains.length, pulse, lineWidth]);

  if (!mains.length) return null;

  const activeMain = mains[activeIndex];

  return (
    <View style={styles.kitchenPulseSection}>
      <View style={styles.kitchenPulseInner}>
        <View style={styles.kitchenPulseHeader}>
          <View>
            <Text style={styles.kitchenPulseEyebrow}>
              FROM THE KITCHEN
            </Text>
            <Text style={styles.kitchenPulseTitle}>
              The dish has
              <Text style={styles.kitchenPulseItalic}> a moment.</Text>
            </Text>
          </View>

          <Text style={styles.kitchenPulseCounter}>
            {String(activeIndex + 1).padStart(2, '0')} /{' '}
            {String(mains.length).padStart(2, '0')}
          </Text>
        </View>

        <View style={styles.kitchenPulseDivider} />

        <View style={styles.kitchenPulseStage}>
          <View style={styles.kitchenPulseVisual}>
            <Animated.View
              style={[
                styles.kitchenPulseImageFrame,
                { transform: [{ scale: pulse }] },
              ]}
            >
              <Image
                source={{ uri: activeMain.image }}
                style={styles.kitchenPulseImage}
              />
            </Animated.View>

            <View style={styles.kitchenPulseStamp}>
              <Text style={styles.kitchenPulseStampSmall}>
                CHRISTOFFEL
              </Text>
              <Text style={styles.kitchenPulseStampLarge}>
                PLATE
              </Text>
              <Text style={styles.kitchenPulseStampSmall}>
                {String(activeIndex + 1).padStart(2, '0')}
              </Text>
            </View>
          </View>

          <View style={styles.kitchenPulseCopy}>
            <Text style={styles.kitchenPulseNumber}>
              0{activeIndex + 1}
            </Text>

            <Text style={styles.kitchenPulseDish}>
              {activeMain.name}
            </Text>

            <Text style={styles.kitchenPulseDescription}>
              {activeMain.description}
            </Text>

            <View style={styles.kitchenPulsePriceRow}>
              <Text style={styles.kitchenPulsePrice}>
                R{activeMain.price.toFixed(2)}
              </Text>
              <Text style={styles.kitchenPulseTag}>
                MAIN COURSE
              </Text>
            </View>

            <View style={styles.kitchenPulseProgressTrack}>
              <Animated.View
                style={[
                  styles.kitchenPulseProgress,
                  {
                    width: lineWidth.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              />
            </View>

            <Text style={styles.kitchenPulseHint}>
              THE KITCHEN'S CURRENT FOCUS
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function MainsWeb({
  onHome,
  onStarters,
  onDesserts,
  onDrinks,
  onSelection,
  onCheckout,
  menuItems,
}: MainsWebProps) {
  const [showCartDropdown, setShowCartDropdown] = useState(false);

  const {
    addToSelection,
    getQuantity,
    totalItems,
  } = useWebSelection();

  const mains: MenuItem[] =
    menuItems.filter(
      item => item.course === 'Main Course',
    );

  const remainingMains = mains;

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

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

            <Hoverable style={styles.loginButton}>
              <Text style={styles.loginText}>
                LOGIN
              </Text>
            </Hoverable>

          </View>

          {/* MAIN MENU NAVIGATION */}
          <View style={styles.navigation}>

            <Hoverable onPress={onHome}>
              <Text style={styles.navItem}>
                HOME
              </Text>
            </Hoverable>

            <Hoverable onPress={onStarters}>
              <Text style={styles.navItem}>
                STARTERS
              </Text>
            </Hoverable>

            <Hoverable>
              <Text style={[styles.navItem, styles.activeNav]}>
                MAINS
              </Text>
            </Hoverable>

            <Hoverable onPress={onDesserts}>
              <Text style={styles.navItem}>
                DESSERTS
              </Text>
            </Hoverable>

            <Hoverable onPress={onDrinks}>
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
                onCheckout={() => {
                  setShowCartDropdown(false);
                  onCheckout?.();
                }}
              />
            )}
          </View>

        </View>

        <DealsBanner />

        {/* ====================================================
            MAIN HERO
            ==================================================== */}

        <View style={styles.heroSection}>

          <View style={styles.heroCopy}>

            <Text style={styles.eyebrow}>
              CHRISTOFFEL MENU
            </Text>

            <Text style={styles.heroTitle}>
              The Main Event
            </Text>

            <Text style={styles.heroSubtitle}>
              Bold flavours. Beautiful plates.
              Mains created to take centre stage.
            </Text>

            <View style={styles.heroLine} />

            <Text style={styles.heroDescription}>
              This is where the experience becomes
              unforgettable. Explore our collection of
              carefully prepared main courses and choose
              the dish that becomes the centrepiece of
              your table.
            </Text>

            <View style={styles.heroMetaRow}>

              <View style={styles.heroMeta}>
                <Text style={styles.heroMetaNumber}>
                  {mains.length}
                </Text>

                <Text style={styles.heroMetaLabel}>
                  MAIN COURSES
                </Text>
              </View>

              <View style={styles.heroMetaDivider} />

              <View style={styles.heroMeta}>
                <Text style={styles.heroMetaNumber}>
                  01
                </Text>

                <Text style={styles.heroMetaLabel}>
                  CHOOSE YOUR FAVOURITE
                </Text>
              </View>

            </View>

          </View>

          <LivingTableShowcase mains={mains} />

        </View>

        {/* ====================================================
            SELECTION STATUS
            ==================================================== */}

        {totalItems > 0 && (
          <View style={styles.selectionBar}>

            <View style={styles.selectionBarLeft}>

              <View style={styles.selectionDot} />

              <Text style={styles.selectionBarText}>
                {totalItems}{' '}
                {totalItems === 1
                  ? 'item'
                  : 'items'}{' '}
                currently selected
              </Text>

            </View>

            <Hoverable
              style={styles.viewSelectionButton}
              onPress={onSelection}
            >
              <Text style={styles.viewSelectionText}>
                VIEW SELECTION
              </Text>

              <Text style={styles.viewSelectionArrow}>
                →
              </Text>
            </Hoverable>

          </View>
        )}

        {/* ====================================================
            SIGNATURE MAINS
            ==================================================== */}

        <View style={styles.collectionSection}>

          <View style={styles.collectionHeader}>

            <View>

              <Text style={styles.sectionEyebrow}>
                EXPLORE THE MENU
              </Text>

              <Text style={styles.collectionTitle}>
                Signature Mains
              </Text>

            </View>

            <View style={styles.collectionCount}>
              <Text style={styles.collectionCountNumber}>
                {String(mains.length).padStart(2, '0')}
              </Text>

              <Text style={styles.collectionCountLabel}>
                DISHES
              </Text>
            </View>

          </View>

          <View style={styles.collectionDivider} />

          <View style={styles.mainList}>

            {remainingMains.map((item, index) => {

              const quantity =
                getQuantity(item.id);

              return (
                <View
                  key={item.id}
                  style={styles.mainCard}
                >

                  <View style={styles.cardImageWrap}>

                    <Image
                      source={{
                        uri: item.image,
                      }}
                      style={styles.cardImage}
                    />

                    <View
                      style={styles.cardNumber}
                    >
                      <Text
                        style={styles.cardNumberText}
                      >
                        {String(index + 1).padStart(
                          2,
                          '0',
                        )}
                      </Text>
                    </View>

                    {quantity > 0 && (
                      <View
                        style={styles.cardQuantity}
                      >
                        <Text
                          style={
                            styles.cardQuantityText
                          }
                        >
                          {quantity}
                        </Text>
                      </View>
                    )}

                  </View>

                  <View style={styles.cardContent}>

                    <View style={styles.cardTop}>

                      <Text style={styles.cardName}>
                        {item.name}
                      </Text>

                      <Text style={styles.cardPrice}>
                        R{item.price.toFixed(2)}
                      </Text>

                    </View>

                    <Text
                      style={styles.cardDescription}
                      numberOfLines={3}
                    >
                      {item.description}
                    </Text>

                    <View style={styles.cardBottom}>

                      <Text style={styles.cardTag}>
                        MAIN COURSE
                      </Text>

                      <Pressable
                        onPress={() =>
                          addToSelection(item)
                        }
                        style={({ pressed }) => [
                          styles.cardAddButton,
                          pressed &&
                            styles.cardAddPressed,
                        ]}
                      >
                        {quantity > 0 ? (
                          <Text
                            style={
                              styles.cardQuantityButtonText
                            }
                          >
                            {quantity}
                          </Text>
                        ) : (
                          <Ionicons
                            name="add"
                            size={23}
                            color="#07130F"
                          />
                        )}
                      </Pressable>

                    </View>

                  </View>

                </View>
              );
            })}

          </View>

        </View>

        {/* ====================================================
            KITCHEN PULSE
            ==================================================== */}

        <KitchenPulse mains={mains} />

        {/* ====================================================
            CHRISTOFFEL EDITORIAL WEBSITE SECTIONS
            ==================================================== */}

        <View style={styles.editorialWebsiteSections}>
          {/* MENU INDEX */}
          <View style={styles.menuIndexSection}>
            <View style={styles.editorialWideInner}>
              <View style={styles.editorialSectionHeader}>
                <View>
                  <Text style={styles.editorialEyebrow}>
                    CHRISTOFFEL / MENU
                  </Text>
                  <Text style={styles.editorialLargeTitle}>
                    Menu Index
                  </Text>
                </View>

                <Text style={styles.editorialHeaderNote}>
                  THE COMPLETE CHRISTOFFEL TABLE
                </Text>
              </View>

              <View style={styles.editorialRule} />

              <View style={styles.menuIndexGrid}>
                <Hoverable onPress={onStarters} style={styles.menuIndexRow}>
                  <Text style={styles.menuIndexNumber}>01</Text>
                  <Text style={styles.menuIndexName}>STARTERS</Text>
                  <Text style={styles.menuIndexCount}>16 DISHES</Text>
                  <Text style={styles.menuIndexArrow}>→</Text>
                </Hoverable>

                <Hoverable style={[styles.menuIndexRow, styles.menuIndexRowActive]}>
                  <Text style={styles.menuIndexNumber}>02</Text>
                  <Text style={[styles.menuIndexName, styles.menuIndexNameActive]}>
                    MAINS
                  </Text>
                  <Text style={styles.menuIndexCount}>
                    {mains.length} DISHES
                  </Text>
                  <Text style={styles.menuIndexArrow}>→</Text>
                </Hoverable>

                <Hoverable onPress={onDesserts} style={styles.menuIndexRow}>
                  <Text style={styles.menuIndexNumber}>03</Text>
                  <Text style={styles.menuIndexName}>DESSERTS</Text>
                  <Text style={styles.menuIndexCount}>16 DISHES</Text>
                  <Text style={styles.menuIndexArrow}>→</Text>
                </Hoverable>

                <Hoverable onPress={onDrinks} style={styles.menuIndexRow}>
                  <Text style={styles.menuIndexNumber}>04</Text>
                  <Text style={styles.menuIndexName}>DRINKS</Text>
                  <Text style={styles.menuIndexCount}>32 DISHES</Text>
                  <Text style={styles.menuIndexArrow}>→</Text>
                </Hoverable>
              </View>
            </View>
          </View>

          {/* WHAT'S MOVING */}
          <View style={styles.whatsMovingSection}>
            <View style={styles.editorialWideInner}>
              <View style={styles.editorialSectionHeader}>
                <View>
                  <Text style={styles.editorialEyebrow}>
                    CHRISTOFFEL / CURRENT
                  </Text>
                  <Text style={styles.editorialLargeTitle}>
                    What's Moving
                  </Text>
                </View>

                <Text style={styles.editorialHeaderNote}>
                  A GLIMPSE AT THE TABLE
                </Text>
              </View>

              <View style={styles.editorialRule} />

              {mains.slice(0, 5).map((item, index) => (
                <View key={`moving-${item.id}`} style={styles.movingRow}>
                  <Text style={styles.movingRank}>
                    {String(index + 1).padStart(2, '0')}
                  </Text>

                  <View style={styles.movingMainCopy}>
                    <Text style={styles.movingName}>{item.name}</Text>
                    <Text style={styles.movingMeta}>
                      {index === 0
                        ? "HOUSE FAVOURITE"
                        : index === 1
                        ? "CHEF'S PICK"
                        : index === 2
                        ? "MOST REQUESTED"
                        : index === 3
                        ? "CHRISTOFFEL CLASSIC"
                        : "ON THE TABLE"}
                    </Text>
                  </View>

                  <Text style={styles.movingPrice}>
                    R{item.price.toFixed(2)}
                  </Text>

                  <Text style={styles.movingStars}>★★★★★</Text>
                </View>
              ))}
            </View>
          </View>

          {/* MENU STATISTICS */}
          <View style={styles.statisticsSection}>
            <View style={styles.editorialPhotoRail}>
              {mains.slice(0, 3).map((item, index) => (
                <Hoverable key={`rail-${item.id}`} style={styles.editorialPhotoCard}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.editorialPhotoImage}
                  />
                  <View style={styles.editorialPhotoShade} />
                  <View style={styles.editorialPhotoLabel}>
                    <Text style={styles.editorialPhotoNumber}>
                      0{index + 1}
                    </Text>
                    <Text style={styles.editorialPhotoName}>
                      {item.name}
                    </Text>
                    <Text style={styles.editorialPhotoMeta}>
                      CHRISTOFFEL / MAIN COURSE
                    </Text>
                  </View>
                </Hoverable>
              ))}
            </View>
            <View style={styles.editorialWideInner}>
              <Text style={styles.editorialEyebrow}>
                CHRISTOFFEL / THE NUMBERS
              </Text>

              <Text style={styles.statisticsTitle}>
                One menu.
                <Text style={styles.statisticsItalic}> A lot to discover.</Text>
              </Text>

              <View style={styles.statisticsGrid}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{mains.length}</Text>
                  <Text style={styles.statLabel}>MAIN COURSES</Text>
                </View>

                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>16</Text>
                  <Text style={styles.statLabel}>STARTERS</Text>
                </View>

                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>16</Text>
                  <Text style={styles.statLabel}>DESSERTS</Text>
                </View>

                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>32</Text>
                  <Text style={styles.statLabel}>DRINKS</Text>
                </View>

                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>80</Text>
                  <Text style={styles.statLabel}>TOTAL MENU ITEMS</Text>
                </View>

                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>04</Text>
                  <Text style={styles.statLabel}>SOUTH AFRICAN CITIES</Text>
                </View>
              </View>
            </View>
          </View>

          {/* CHRISTOFFEL SOUTH AFRICA */}
          <View style={styles.locationsSection}>
            <View style={styles.editorialWideInner}>
              <View style={styles.locationIntro}>
                <View>
                  <Text style={styles.editorialEyebrow}>
                    CHRISTOFFEL / SOUTH AFRICA
                  </Text>
                  <Text style={styles.locationTitle}>
                    Four cities.
                    <Text style={styles.locationItalic}> One table.</Text>
                  </Text>
                </View>

                <Text style={styles.locationDescription}>
                  From the coast to the city, Christoffel brings the same
                  table spirit to every destination.
                </Text>
              </View>

              <View style={styles.editorialRule} />

              <View style={styles.locationGrid}>
                <View style={styles.locationCard}>
                  <Text style={styles.locationNumber}>01</Text>
                  <Text style={styles.locationCity}>DURBAN</Text>
                  <Text style={styles.locationRegion}>KWAZULU-NATAL · FLAGSHIP</Text>
                  <Text style={styles.locationCoordinates}>29°51′S / 31°01′E</Text>
                </View>

                <View style={styles.locationCard}>
                  <Text style={styles.locationNumber}>02</Text>
                  <Text style={styles.locationCity}>CAPE TOWN</Text>
                  <Text style={styles.locationRegion}>WESTERN CAPE</Text>
                  <Text style={styles.locationCoordinates}>33°55′S / 18°25′E</Text>
                </View>

                <View style={styles.locationCard}>
                  <Text style={styles.locationNumber}>03</Text>
                  <Text style={styles.locationCity}>JOHANNESBURG</Text>
                  <Text style={styles.locationRegion}>GAUTENG</Text>
                  <Text style={styles.locationCoordinates}>26°12′S / 28°02′E</Text>
                </View>

                <View style={styles.locationCard}>
                  <Text style={styles.locationNumber}>04</Text>
                  <Text style={styles.locationCity}>PRETORIA</Text>
                  <Text style={styles.locationRegion}>GAUTENG</Text>
                  <Text style={styles.locationCoordinates}>25°44′S / 28°11′E</Text>
                </View>
              </View>

              <View style={styles.locationBottomLine}>
                <Text style={styles.locationBottomText}>
                  GOOD FOOD FROM SOUTH AFRICA
                </Text>
                <Text style={styles.locationBottomText}>
                  CHRISTOFFEL / 2026
                </Text>
              </View>
            </View>
          </View>

          {/* THE CHRISTOFFEL EDIT */}
          <View style={styles.editSection}>
            <View style={styles.editorialWideInner}>
              <View style={styles.editTop}>
                <View>
                  <Text style={styles.editorialEyebrow}>
                    CHRISTOFFEL / EDITORIAL
                  </Text>
                  <Text style={styles.editorialLargeTitle}>
                    The Christoffel Edit
                  </Text>
                </View>

                <Text style={styles.editIssue}>
                  ISSUE 01 · 2026
                </Text>
              </View>

              <View style={styles.editorialRule} />

              <View style={styles.editGrid}>
                <Hoverable style={styles.editCard}>
                  <Text style={styles.editNumber}>01</Text>
                  <Text style={styles.editTitle}>DINING</Text>
                  <Text style={styles.editDescription}>
                    The places, plates and moments that shape the Christoffel table.
                  </Text>
                  <Text style={styles.editArrow}>→</Text>
                </Hoverable>

                <Hoverable style={styles.editCard}>
                  <Text style={styles.editNumber}>02</Text>
                  <Text style={styles.editTitle}>INGREDIENTS</Text>
                  <Text style={styles.editDescription}>
                    A closer look at the flavours behind the menu.
                  </Text>
                  <Text style={styles.editArrow}>→</Text>
                </Hoverable>

                <Hoverable style={styles.editCard}>
                  <Text style={styles.editNumber}>03</Text>
                  <Text style={styles.editTitle}>THE TABLE</Text>
                  <Text style={styles.editDescription}>
                    Food, people and the details that make a night memorable.
                  </Text>
                  <Text style={styles.editArrow}>→</Text>
                </Hoverable>

                <Hoverable style={styles.editCard}>
                  <Text style={styles.editNumber}>04</Text>
                  <Text style={styles.editTitle}>THE CITY</Text>
                  <Text style={styles.editDescription}>
                    Four South African cities. One Christoffel point of view.
                  </Text>
                  <Text style={styles.editArrow}>→</Text>
                </Hoverable>
              </View>
            </View>
          </View>

          {/* VISUAL TABLE MOMENT */}
          <View style={styles.tableMomentSection}>
            <View style={styles.editorialWideInner}>
              <View style={styles.tableMomentGrid}>
                <View style={styles.tableMomentCopy}>
                  <Text style={styles.editorialEyebrow}>
                    CHRISTOFFEL / AT THE TABLE
                  </Text>
                  <Text style={styles.tableMomentTitle}>
                    Plates worth
                    <Text style={styles.tableMomentItalic}> staying for.</Text>
                  </Text>
                  <Text style={styles.tableMomentDescription}>
                    A visual pause between courses. The menu is designed to
                    feel as good as the table around it.
                  </Text>
                </View>

                <Hoverable style={styles.tableMomentImageFrame}>
                  <Image
                    source={{ uri: mains[3]?.image || mains[0]?.image }}
                    style={styles.tableMomentImage}
                  />
                  <View style={styles.tableMomentImageShade} />
                  <View style={styles.tableMomentImageCaption}>
                    <Text style={styles.tableMomentImageCaptionSmall}>
                      CHRISTOFFEL
                    </Text>
                    <Text style={styles.tableMomentImageCaptionLarge}>
                      THE TABLE
                    </Text>
                  </View>
                </Hoverable>
              </View>
            </View>
          </View>

          {/* SEASONAL MENU */}
          <View style={styles.seasonalSection}>
            <View style={styles.seasonalInner}>
              <View>
                <Text style={styles.seasonalEyebrow}>
                  THE CURRENT EDIT · 2026
                </Text>
                <Text style={styles.seasonalTitle}>
                  A new season
                  <Text style={styles.seasonalItalic}> at the table.</Text>
                </Text>
              </View>

              <View style={styles.seasonalRight}>
                <Text style={styles.seasonalText}>
                  New plates. Familiar table. A changing selection from the
                  Christoffel kitchen.
                </Text>

                <Hoverable style={styles.seasonalLink}>
                  <Text style={styles.seasonalLinkText}>
                    VIEW THE SEASONAL EDIT
                  </Text>
                  <Text style={styles.seasonalArrow}>→</Text>
                </Hoverable>
              </View>
            </View>
          </View>

          {/* RESTAURANT INFORMATION */}
          <View style={styles.infoStripSection}>
            <View style={styles.editorialWideInner}>
              <View style={styles.infoStrip}>
                <View style={styles.infoBrand}>
                  <Text style={styles.infoBrandName}>CHRISTOFFEL</Text>
                  <Text style={styles.infoBrandSub}>
                    GOOD FOOD · GREAT PEOPLE · ALWAYS HERE
                  </Text>
                </View>

                <View style={styles.infoColumn}>
                  <Text style={styles.infoHeading}>DINING</Text>
                  <Text style={styles.infoText}>LUNCH · DINNER</Text>
                  <Text style={styles.infoText}>PRIVATE DINING</Text>
                </View>

                <View style={styles.infoColumn}>
                  <Text style={styles.infoHeading}>HOURS</Text>
                  <Text style={styles.infoText}>MON–THU · 10:00–22:00</Text>
                  <Text style={styles.infoText}>FRI–SAT · 10:00–23:00</Text>
                </View>

                <View style={styles.infoColumn}>
                  <Text style={styles.infoHeading}>CONTACT</Text>
                  <Text style={styles.infoText}>RESERVATIONS</Text>
                  <Text style={styles.infoText}>EVENTS · ENQUIRIES</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* ====================================================
            NEXT COURSE
            ==================================================== */}

        <View style={styles.nextCourseSection}>

          <Text style={styles.nextCourseEyebrow}>
            SAVE ROOM FOR WHAT COMES NEXT
          </Text>

          <Text style={styles.nextCourseTitle}>
            Something sweet
            <Text style={styles.nextCourseItalic}>
              awaits.
            </Text>
          </Text>

          <Text style={styles.nextCourseText}>
            Your main course is only one part of the
            experience. Continue through the menu
            and discover the desserts and drinks
            waiting for you.
          </Text>

          <View style={styles.nextCourseButtons}>

            <Hoverable
              style={styles.nextCourseButton}
              onPress={onDesserts}
            >
              <Text style={styles.nextCourseButtonText}>
                EXPLORE DESSERTS
              </Text>

              <Text style={styles.nextCourseArrow}>
                →
              </Text>
            </Hoverable>

            <Hoverable
              style={styles.nextCourseSecondary}
              onPress={onDrinks}
            >
              <Text
                style={styles.nextCourseSecondaryText}
              >
                EXPLORE DRINKS
              </Text>
            </Hoverable>

          </View>

        </View>

        {/* ====================================================
            FOOTER
            ==================================================== */}

        <View style={styles.footer}>

          <View style={styles.footerMain}>

            {/* BRAND */}

            <View style={styles.footerBrandSection}>

              <View style={styles.footerLogoRow}>

                <Text style={styles.footerLogoIcon}>
                  ♨
                </Text>

                <View>

                  <Text style={styles.footerLogoText}>
                    CHRISTOFFEL
                  </Text>

                  <View style={styles.footerMenuRow}>

                    <View style={styles.footerLogoLine} />

                    <Text style={styles.footerMenuText}>
                      MENU
                    </Text>

                    <View style={styles.footerLogoLine} />

                  </View>

                </View>

              </View>

              <Text style={styles.footerTagline}>
                GOOD FOOD  •  GREAT PEOPLE  •  ALWAYS HERE
              </Text>

              <Text style={styles.footerDescription}>
                At Christoffel, great food brings people
                together. Fresh ingredients, incredible
                flavours and a warm atmosphere — every
                visit feels like home.
              </Text>

              <Hoverable
                style={styles.footerOrderButton}
                onPress={onSelection}
              >
                <Text style={styles.footerOrderText}>
                  Order Now
                </Text>

                <Text style={styles.footerOrderArrow}>
                  →
                </Text>
              </Hoverable>

              <View style={styles.socialRow}>

                <Hoverable style={styles.socialButton}>
                  <Text style={styles.socialText}>
                    f
                  </Text>
                </Hoverable>

                <Hoverable style={styles.socialButton}>
                  <Text style={styles.socialText}>
                    ◎
                  </Text>
                </Hoverable>

                <Hoverable style={styles.socialButton}>
                  <Text style={styles.socialText}>
                    𝕏
                  </Text>
                </Hoverable>

                <Hoverable style={styles.socialButton}>
                  <Text style={styles.socialText}>
                    ▶
                  </Text>
                </Hoverable>

              </View>

            </View>

            {/* MENU */}

            <View style={styles.footerColumn}>

              <Text style={styles.footerColumnTitle}>
                MENU
              </Text>

              <Hoverable onPress={onHome}>
                <Text style={styles.footerLink}>
                  Home
                </Text>
              </Hoverable>

              <Hoverable onPress={onStarters}>
                <Text style={styles.footerLink}>
                  Starters
                </Text>
              </Hoverable>

              <Hoverable>
                <Text
                  style={[
                    styles.footerLink,
                    styles.footerActiveLink,
                  ]}
                >
                  Mains
                </Text>
              </Hoverable>

              <Hoverable onPress={onDesserts}>
                <Text style={styles.footerLink}>
                  Desserts
                </Text>
              </Hoverable>

              <Hoverable onPress={onDrinks}>
                <Text style={styles.footerLink}>
                  Drinks
                </Text>
              </Hoverable>

              <Hoverable onPress={onSelection}>
                <Text style={styles.footerLink}>
                  My Selection
                </Text>
              </Hoverable>

            </View>

            {/* CONTACT */}

            <View style={styles.footerColumn}>

              <Text style={styles.footerColumnTitle}>
                CONTACT US
              </Text>

              <View style={styles.contactRow}>

                <Text style={styles.contactIcon}>
                  ●
                </Text>

                <Text style={styles.contactText}>
                  123 Restaurant Street{'\n'}
                  Durban, KZN 4001{'\n'}
                  South Africa
                </Text>

              </View>

              <View style={styles.contactRow}>

                <Text style={styles.contactIcon}>
                  ☎
                </Text>

                <Text style={styles.contactText}>
                  +27 31 123 4567
                </Text>

              </View>

              <View style={styles.contactRow}>

                <Text style={styles.contactIcon}>
                  ✉
                </Text>

                <Text style={styles.contactText}>
                  info@christoffel.co.za
                </Text>

              </View>

            </View>

            {/* HOURS */}

            <View style={styles.footerColumn}>

              <Text style={styles.footerColumnTitle}>
                OPENING HOURS
              </Text>

              <View style={styles.hoursRow}>

                <Text style={styles.hoursDay}>
                  Mon - Thu
                </Text>

                <Text style={styles.hoursTime}>
                  10:00 - 22:00
                </Text>

              </View>

              <View style={styles.hoursRow}>

                <Text style={styles.hoursDay}>
                  Fri - Sat
                </Text>

                <Text style={styles.hoursTime}>
                  10:00 - 23:00
                </Text>

              </View>

              <View style={styles.hoursRow}>

                <Text style={styles.hoursDay}>
                  Sunday
                </Text>

                <Text style={styles.hoursTime}>
                  10:00 - 21:00
                </Text>

              </View>

              <Text style={styles.stayConnectedTitle}>
                STAY CONNECTED
              </Text>

              <Text style={styles.newsletterText}>
                Get the latest menu updates,
                specials and exclusive offers.
              </Text>

              <View style={styles.newsletterBox}>

                <Text style={styles.newsletterPlaceholder}>
                  Your email address
                </Text>

                <Hoverable
                  style={styles.newsletterButton}
                >
                  <Text style={styles.newsletterArrow}>
                    →
                  </Text>
                </Hoverable>

              </View>

            </View>

          </View>

          <View style={styles.footerDivider} />

          <View style={styles.footerBottom}>

            <View style={styles.downloadSection}>

              <Text style={styles.downloadTitle}>
                DOWNLOAD OUR APP
              </Text>

              <Text style={styles.downloadSubtitle}>
                Order faster. Enjoy more.
              </Text>

              <View style={styles.appButtons}>

                <Hoverable style={styles.appButton}>

                  <Ionicons
                    name="logo-google-playstore"
                    size={23}
                    color="#F5F1E8"
                    style={styles.appButtonIcon}
                  />

                  <View>

                    <Text style={styles.appButtonSmall}>
                      GET IT ON
                    </Text>

                    <Text style={styles.appButtonLarge}>
                      Google Play
                    </Text>

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

                    <Text style={styles.appButtonSmall}>
                      Download on the
                    </Text>

                    <Text style={styles.appButtonLarge}>
                      App Store
                    </Text>

                  </View>

                </Hoverable>

              </View>

            </View>

            <View style={styles.valuesSection}>

              <Hoverable style={styles.valueItem}>
                <Text style={styles.valueIcon}>
                  ♧
                </Text>

                <Text style={styles.valueTitle}>
                  FRESH
                </Text>

                <Text style={styles.valueSubtitle}>
                  INGREDIENTS
                </Text>
              </Hoverable>

              <Hoverable style={styles.valueItem}>
                <Text style={styles.valueIcon}>
                  ♡
                </Text>

                <Text style={styles.valueTitle}>
                  GREAT
                </Text>

                <Text style={styles.valueSubtitle}>
                  PEOPLE
                </Text>
              </Hoverable>

              <Hoverable style={styles.valueItem}>
                <Text style={styles.valueIcon}>
                  ☆
                </Text>

                <Text style={styles.valueTitle}>
                  EXCEPTIONAL
                </Text>

                <Text style={styles.valueSubtitle}>
                  SERVICE
                </Text>
              </Hoverable>

            </View>

            <View style={styles.footerSlogan}>

              <Text style={styles.footerSloganLine}>
                Good Food
              </Text>

              <Text style={styles.footerSloganLine}>
                Brighter Days
              </Text>

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
     GLOBAL
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
    backgroundColor: 'rgba(3, 12, 8, 0.72)',
  },

  scrollView: {
    flex: 1,
  },

  pageContent: {
    paddingBottom: 0,
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
     DEALS
     ========================================================= */

  dealsBanner: {
    height: 48,
    overflow: 'hidden',
    backgroundColor: '#0B1711',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'rgba(212, 175, 55, 0.35)',
    borderBottomColor: 'rgba(212, 175, 55, 0.35)',
    justifyContent: 'center',
  },

  dealsTrack: {
    flexDirection: 'row',
    width: 2000,
  },

  dealsText: {
    color: '#D4AF37',
    fontSize: 11,
    letterSpacing: 2,
  },

  /* =========================================================
     HERO
     ========================================================= */

  heroSection: {
    minHeight: 650,
    paddingHorizontal: 78,
    paddingVertical: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 65,
  },

  heroCopy: {
    width: '38%',
    maxWidth: 520,
  },

  eyebrow: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 3.5,
    marginBottom: 20,
  },

  heroTitle: {
    color: '#F5F1E8',
    fontSize: 64,
    lineHeight: 70,
    fontWeight: '400',
    marginBottom: 20,
  },

  heroSubtitle: {
    color: '#D3CDC0',
    fontSize: 21,
    lineHeight: 31,
    maxWidth: 480,
  },

  heroLine: {
    width: 75,
    height: 2,
    backgroundColor: '#D4AF37',
    marginVertical: 28,
  },

  heroDescription: {
    color: '#9FA8A1',
    fontSize: 14,
    lineHeight: 24,
    maxWidth: 470,
  },

  heroMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 38,
  },

  heroMeta: {
    alignItems: 'flex-start',
  },

  heroMetaNumber: {
    color: '#D4AF37',
    fontSize: 22,
    fontWeight: '500',
  },

  heroMetaLabel: {
    color: '#818A83',
    fontSize: 8,
    letterSpacing: 1.8,
    marginTop: 5,
  },

  heroMetaDivider: {
    width: 1,
    height: 42,
    backgroundColor: 'rgba(212, 175, 55, 0.35)',
    marginHorizontal: 25,
  },

  livingTableSide: {
    width: '43%',
    maxWidth: 560,
    height: 510,
    position: 'relative',
  },

  livingTableFrame: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#07130F',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.42)',
  },

  livingTableImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  livingTableShade: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(3, 10, 7, 0.30)',
  },

  livingTableTopLabel: {
    position: 'absolute',
    top: 22,
    left: 22,
    paddingVertical: 8,
    paddingHorizontal: 11,
    backgroundColor: 'rgba(3, 10, 7, 0.78)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.5)',
  },

  livingTableTopLabelText: {
    color: '#D4AF37',
    fontSize: 7,
    letterSpacing: 2,
    fontWeight: '700',
  },

  livingTableCaption: {
    position: 'absolute',
    left: 25,
    right: 25,
    bottom: 25,
  },

  livingTableCaptionEyebrow: {
    color: '#D4AF37',
    fontSize: 8,
    letterSpacing: 2.2,
    fontWeight: '700',
    marginBottom: 8,
  },

  livingTableCaptionTitle: {
    color: '#F5F1E8',
    fontSize: 31,
    lineHeight: 37,
    fontWeight: '400',
  },

  livingTableCaptionLine: {
    width: 48,
    height: 1,
    backgroundColor: '#D4AF37',
    marginVertical: 12,
  },

  livingTableCaptionNumber: {
    color: '#D8D2C7',
    fontSize: 8,
    letterSpacing: 2,
  },

  livingTableFrameOffset: {
    position: 'absolute',
    top: 17,
    right: -17,
    bottom: -17,
    left: 17,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.45)',
    pointerEvents: 'none',
  },

  /* =========================================================
     SELECTION BAR
     ========================================================= */

  selectionBar: {
    marginHorizontal: 78,
    marginBottom: 30,
    paddingHorizontal: 24,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.35)',
    backgroundColor: 'rgba(212, 175, 55, 0.06)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  selectionBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  selectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D4AF37',
    marginRight: 12,
  },

  selectionBarText: {
    color: '#D8D2C7',
    fontSize: 13,
    letterSpacing: 0.4,
  },

  viewSelectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 12,
  },

  viewSelectionText: {
    color: '#D4AF37',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },

  viewSelectionArrow: {
    color: '#D4AF37',
    fontSize: 19,
    marginLeft: 10,
  },

  /* =========================================================
     COLLECTION
     ========================================================= */

  collectionSection: {
    paddingHorizontal: 78,
    paddingTop: 70,
    paddingBottom: 95,
  },

  collectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    maxWidth: 1180,
    width: '100%',
    alignSelf: 'center',
  },

  sectionEyebrow: {
    color: '#D4AF37',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 3,
    marginBottom: 13,
  },

  collectionTitle: {
    color: '#F5F1E8',
    fontSize: 47,
    fontWeight: '400',
  },

  collectionCount: {
    alignItems: 'flex-end',
  },

  collectionCountNumber: {
    color: '#D4AF37',
    fontSize: 28,
    fontWeight: '300',
  },

  collectionCountLabel: {
    color: '#737C75',
    fontSize: 8,
    letterSpacing: 2,
    marginTop: 3,
  },

  collectionDivider: {
    width: '100%',
    maxWidth: 1180,
    height: 1,
    backgroundColor: 'rgba(212, 175, 55, 0.24)',
    marginTop: 27,
    marginBottom: 38,
    alignSelf: 'center',
  },

  mainList: {
    width: '100%',
    maxWidth: 1180,
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 25,
    justifyContent: 'center',
  },

  mainCard: {
    width: 395,
    minHeight: 470,
    backgroundColor: 'rgba(5, 16, 11, 0.96)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.24)',
    overflow: 'hidden',
  },

  cardImageWrap: {
    width: '100%',
    height: 255,
    position: 'relative',
    overflow: 'hidden',
  },

  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  cardNumber: {
    position: 'absolute',
    top: 15,
    left: 15,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(3, 10, 7, 0.78)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardNumberText: {
    color: '#D4AF37',
    fontSize: 10,
    letterSpacing: 1,
  },

  cardQuantity: {
    position: 'absolute',
    top: 15,
    right: 15,
    minWidth: 34,
    height: 34,
    paddingHorizontal: 8,
    borderRadius: 17,
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardQuantityText: {
    color: '#07130F',
    fontSize: 12,
    fontWeight: '800',
  },

  cardContent: {
    padding: 24,
    flex: 1,
  },

  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 18,
  },

  cardName: {
    flex: 1,
    color: '#F5F1E8',
    fontSize: 23,
    lineHeight: 28,
    fontWeight: '400',
  },

  cardPrice: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 3,
  },

  cardDescription: {
    color: '#9DA69F',
    fontSize: 13,
    lineHeight: 21,
    marginTop: 13,
    minHeight: 63,
  },

  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 22,
  },

  cardTag: {
    color: '#6E7870',
    fontSize: 8,
    letterSpacing: 2,
  },

  cardAddButton: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardAddPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.93 }],
  },

  cardQuantityButtonText: {
    color: '#07130F',
    fontSize: 15,
    fontWeight: '800',
  },

  /* =========================================================
     KITCHEN PULSE
     ========================================================= */

  kitchenPulseSection: {
    paddingHorizontal: 78,
    paddingVertical: 105,
    backgroundColor: 'rgba(2, 9, 6, 0.82)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'rgba(212, 175, 55, 0.12)',
    borderBottomColor: 'rgba(212, 175, 55, 0.12)',
  },

  kitchenPulseInner: {
    width: '100%',
    maxWidth: 1180,
    alignSelf: 'center',
  },

  kitchenPulseHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  kitchenPulseEyebrow: {
    color: '#D4AF37',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3.2,
    marginBottom: 13,
  },

  kitchenPulseTitle: {
    color: '#F5F1E8',
    fontSize: 47,
    lineHeight: 54,
    fontWeight: '400',
  },

  kitchenPulseItalic: {
    color: '#D4AF37',
    fontStyle: 'italic',
  },

  kitchenPulseCounter: {
    color: '#7D877F',
    fontSize: 10,
    letterSpacing: 2,
    paddingBottom: 5,
  },

  kitchenPulseDivider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(212, 175, 55, 0.24)',
    marginTop: 27,
    marginBottom: 45,
  },

  kitchenPulseStage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 85,
  },

  kitchenPulseVisual: {
    width: '51%',
    maxWidth: 600,
    height: 430,
    position: 'relative',
  },

  kitchenPulseImageFrame: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: '#07130F',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.38)',
  },

  kitchenPulseImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  kitchenPulseStamp: {
    position: 'absolute',
    left: 22,
    bottom: 22,
    minWidth: 82,
    paddingVertical: 12,
    paddingHorizontal: 13,
    alignItems: 'center',
    backgroundColor: 'rgba(3, 10, 7, 0.88)',
    borderWidth: 1,
    borderColor: '#D4AF37',
  },

  kitchenPulseStampSmall: {
    color: '#D4AF37',
    fontSize: 6,
    letterSpacing: 2,
    fontWeight: '700',
  },

  kitchenPulseStampLarge: {
    color: '#F5F1E8',
    fontSize: 19,
    letterSpacing: 3,
    marginVertical: 4,
  },

  kitchenPulseCopy: {
    width: '38%',
    maxWidth: 420,
  },

  kitchenPulseNumber: {
    color: '#D4AF37',
    fontSize: 13,
    letterSpacing: 3,
    marginBottom: 17,
  },

  kitchenPulseDish: {
    color: '#F5F1E8',
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '400',
  },

  kitchenPulseDescription: {
    color: '#969F99',
    fontSize: 14,
    lineHeight: 23,
    marginTop: 20,
  },

  kitchenPulsePriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 27,
  },

  kitchenPulsePrice: {
    color: '#D4AF37',
    fontSize: 18,
    fontWeight: '700',
  },

  kitchenPulseTag: {
    color: '#6E7870',
    fontSize: 8,
    letterSpacing: 2,
    marginLeft: 18,
  },

  kitchenPulseProgressTrack: {
    width: '100%',
    height: 1,
    marginTop: 32,
    backgroundColor: 'rgba(245, 241, 232, 0.12)',
    overflow: 'hidden',
  },

  kitchenPulseProgress: {
    height: 1,
    backgroundColor: '#D4AF37',
  },

  kitchenPulseHint: {
    color: '#69736C',
    fontSize: 7,
    letterSpacing: 2,
    marginTop: 11,
  },


  /* =========================================================
     EDITORIAL WEBSITE SECTIONS
     ========================================================= */

  editorialWebsiteSections: {
    width: '100%',
  },

  editorialPhotoRail: {
    width: '100%',
    marginBottom: 62,
    flexDirection: 'row',
    gap: 16,
  },

  editorialPhotoCard: {
    flex: 1,
    height: 235,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.24)',
    backgroundColor: 'rgba(3, 10, 7, 0.10)',
  },

  editorialPhotoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  editorialPhotoShade: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(3, 10, 7, 0.34)',
  },

  editorialPhotoLabel: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 19,
  },

  editorialPhotoNumber: {
    color: '#D4AF37',
    fontSize: 9,
    letterSpacing: 2,
    marginBottom: 6,
  },

  editorialPhotoName: {
    color: '#F5F1E8',
    fontSize: 19,
    fontWeight: '400',
  },

  editorialPhotoMeta: {
    color: '#C4C0B5',
    fontSize: 7,
    letterSpacing: 1.6,
    marginTop: 6,
  },

  tableMomentSection: {
    paddingHorizontal: 78,
    paddingVertical: 105,
    backgroundColor: 'rgba(3, 10, 7, 0.07)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'rgba(212, 175, 55, 0.12)',
    borderBottomColor: 'rgba(212, 175, 55, 0.12)',
  },

  tableMomentGrid: {
    width: '100%',
    minHeight: 470,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 75,
  },

  tableMomentCopy: {
    flex: 0.9,
  },

  tableMomentTitle: {
    color: '#F5F1E8',
    fontSize: 48,
    lineHeight: 55,
    fontWeight: '400',
    maxWidth: 500,
  },

  tableMomentItalic: {
    color: '#D4AF37',
    fontStyle: 'italic',
  },

  tableMomentDescription: {
    color: '#8B958E',
    fontSize: 13,
    lineHeight: 22,
    maxWidth: 410,
    marginTop: 25,
  },

  tableMomentImageFrame: {
    flex: 1,
    height: 470,
    maxWidth: 570,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.35)',
    backgroundColor: 'rgba(3, 10, 7, 0.12)',
  },

  tableMomentImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  tableMomentImageShade: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(3, 10, 7, 0.28)',
  },

  tableMomentImageCaption: {
    position: 'absolute',
    left: 24,
    bottom: 23,
  },

  tableMomentImageCaptionSmall: {
    color: '#D4AF37',
    fontSize: 8,
    letterSpacing: 2.5,
    marginBottom: 7,
  },

  tableMomentImageCaptionLarge: {
    color: '#F5F1E8',
    fontSize: 29,
    letterSpacing: 3,
  },

  editorialWideInner: {
    width: '100%',
    maxWidth: 1180,
    alignSelf: 'center',
  },

  editorialSectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  editorialEyebrow: {
    color: '#D4AF37',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3.1,
    marginBottom: 13,
  },

  editorialLargeTitle: {
    color: '#F5F1E8',
    fontSize: 48,
    lineHeight: 55,
    fontWeight: '400',
  },

  editorialHeaderNote: {
    color: '#737C75',
    fontSize: 8,
    letterSpacing: 2,
    paddingBottom: 7,
  },

  editorialRule: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(212, 175, 55, 0.25)',
    marginTop: 28,
    marginBottom: 38,
  },

  menuIndexSection: {
    paddingHorizontal: 78,
    paddingVertical: 95,
    backgroundColor: 'rgba(3, 10, 7, 0.16)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'rgba(212, 175, 55, 0.12)',
    borderBottomColor: 'rgba(212, 175, 55, 0.12)',
  },

  menuIndexGrid: {
    width: '100%',
  },

  menuIndexRow: {
    minHeight: 78,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 175, 55, 0.16)',
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuIndexRowActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.045)',
    borderLeftWidth: 2,
    borderLeftColor: '#D4AF37',
  },

  menuIndexNumber: {
    width: 72,
    color: '#D4AF37',
    fontSize: 11,
    letterSpacing: 2,
  },

  menuIndexName: {
    flex: 1,
    color: '#F5F1E8',
    fontSize: 22,
    letterSpacing: 2.4,
    fontWeight: '400',
  },

  menuIndexNameActive: {
    color: '#D4AF37',
  },

  menuIndexCount: {
    color: '#7F8981',
    fontSize: 9,
    letterSpacing: 2,
    marginRight: 35,
  },

  menuIndexArrow: {
    width: 35,
    color: '#D4AF37',
    fontSize: 22,
    textAlign: 'right',
  },

  whatsMovingSection: {
    paddingHorizontal: 78,
    paddingVertical: 100,
    backgroundColor: 'rgba(3, 10, 7, 0.08)',
  },

  movingRow: {
    minHeight: 82,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 175, 55, 0.14)',
    flexDirection: 'row',
    alignItems: 'center',
  },

  movingRank: {
    width: 70,
    color: '#D4AF37',
    fontSize: 11,
    letterSpacing: 1.5,
  },

  movingMainCopy: {
    flex: 1,
  },

  movingName: {
    color: '#F5F1E8',
    fontSize: 20,
    fontWeight: '400',
  },

  movingMeta: {
    color: '#6F7972',
    fontSize: 7,
    letterSpacing: 2,
    marginTop: 6,
  },

  movingPrice: {
    width: 105,
    color: '#D4AF37',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
    marginRight: 35,
  },

  movingStars: {
    color: '#D4AF37',
    fontSize: 9,
    letterSpacing: 2,
  },

  statisticsSection: {
    paddingHorizontal: 78,
    paddingVertical: 105,
    backgroundColor: 'rgba(3, 10, 7, 0.18)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'rgba(212, 175, 55, 0.12)',
    borderBottomColor: 'rgba(212, 175, 55, 0.12)',
  },

  statisticsTitle: {
    color: '#F5F1E8',
    fontSize: 45,
    lineHeight: 54,
    fontWeight: '400',
    maxWidth: 700,
  },

  statisticsItalic: {
    color: '#D4AF37',
    fontStyle: 'italic',
  },

  statisticsGrid: {
    marginTop: 58,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.18)',
  },

  statItem: {
    width: '33.333%',
    minHeight: 145,
    paddingHorizontal: 25,
    paddingVertical: 24,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.18)',
    justifyContent: 'space-between',
  },

  statNumber: {
    color: '#D4AF37',
    fontSize: 43,
    fontWeight: '300',
  },

  statLabel: {
    color: '#777F79',
    fontSize: 8,
    letterSpacing: 2,
  },

  locationsSection: {
    paddingHorizontal: 78,
    paddingVertical: 105,
    backgroundColor: 'rgba(3, 10, 7, 0.10)',
  },

  locationIntro: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  locationTitle: {
    color: '#F5F1E8',
    fontSize: 48,
    lineHeight: 55,
    fontWeight: '400',
  },

  locationItalic: {
    color: '#D4AF37',
    fontStyle: 'italic',
  },

  locationDescription: {
    width: 330,
    color: '#8E9891',
    fontSize: 13,
    lineHeight: 21,
    paddingBottom: 5,
  },

  locationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
  },

  locationCard: {
    flex: 1,
    minWidth: 245,
    minHeight: 235,
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.22)',
    backgroundColor: 'rgba(3, 10, 7, 0.14)',
    justifyContent: 'space-between',
  },

  locationNumber: {
    color: '#D4AF37',
    fontSize: 10,
    letterSpacing: 2,
  },

  locationCity: {
    color: '#F5F1E8',
    fontSize: 27,
    letterSpacing: 1.8,
    fontWeight: '400',
  },

  locationRegion: {
    color: '#7D8780',
    fontSize: 8,
    letterSpacing: 1.7,
    marginTop: 5,
  },

  locationCoordinates: {
    color: '#D4AF37',
    fontSize: 8,
    letterSpacing: 1.5,
  },

  locationBottomLine: {
    marginTop: 28,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: 'rgba(212, 175, 55, 0.18)',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  locationBottomText: {
    color: '#6F7972',
    fontSize: 8,
    letterSpacing: 2,
  },

  editSection: {
    paddingHorizontal: 78,
    paddingVertical: 100,
    backgroundColor: 'rgba(3, 10, 7, 0.07)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'rgba(212, 175, 55, 0.10)',
    borderBottomColor: 'rgba(212, 175, 55, 0.10)',
  },

  editTop: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  editIssue: {
    color: '#737C75',
    fontSize: 8,
    letterSpacing: 2,
    paddingBottom: 7,
  },

  editGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
  },

  editCard: {
    flex: 1,
    minWidth: 245,
    minHeight: 225,
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.20)',
    backgroundColor: 'rgba(3, 10, 7, 0.055)',
  },

  editNumber: {
    color: '#D4AF37',
    fontSize: 10,
    letterSpacing: 2,
  },

  editTitle: {
    color: '#F5F1E8',
    fontSize: 21,
    letterSpacing: 2.4,
    marginTop: 43,
  },

  editDescription: {
    color: '#7F8981',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 12,
    maxWidth: 230,
  },

  editArrow: {
    color: '#D4AF37',
    fontSize: 22,
    marginTop: 25,
  },

  seasonalSection: {
    paddingHorizontal: 78,
    paddingVertical: 68,
    backgroundColor: 'rgba(212, 175, 55, 0.035)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'rgba(212, 175, 55, 0.22)',
    borderBottomColor: 'rgba(212, 175, 55, 0.22)',
  },

  seasonalInner: {
    width: '100%',
    maxWidth: 1180,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 60,
  },

  seasonalEyebrow: {
    color: '#D4AF37',
    fontSize: 8,
    letterSpacing: 2.5,
    marginBottom: 12,
  },

  seasonalTitle: {
    color: '#F5F1E8',
    fontSize: 36,
    lineHeight: 43,
    fontWeight: '400',
  },

  seasonalItalic: {
    color: '#D4AF37',
    fontStyle: 'italic',
  },

  seasonalRight: {
    width: 390,
  },

  seasonalText: {
    color: '#8A948D',
    fontSize: 13,
    lineHeight: 21,
  },

  seasonalLink: {
    alignSelf: 'flex-start',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  seasonalLinkText: {
    color: '#D4AF37',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.8,
  },

  seasonalArrow: {
    color: '#D4AF37',
    fontSize: 19,
    marginLeft: 12,
  },

  infoStripSection: {
    paddingHorizontal: 78,
    paddingVertical: 58,
    backgroundColor: 'rgba(3, 10, 7, 0.12)',
  },

  infoStrip: {
    minHeight: 145,
    paddingVertical: 28,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.20)',
    backgroundColor: 'rgba(3, 10, 7, 0.13)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 45,
  },

  infoBrand: {
    flex: 1.25,
  },

  infoBrandName: {
    color: '#F5F1E8',
    fontSize: 22,
    letterSpacing: 4,
  },

  infoBrandSub: {
    color: '#D4AF37',
    fontSize: 7,
    letterSpacing: 1.8,
    marginTop: 8,
  },

  infoColumn: {
    flex: 1,
    paddingLeft: 25,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(212, 175, 55, 0.18)',
  },

  infoHeading: {
    color: '#D4AF37',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 10,
  },

  infoText: {
    color: '#828C85',
    fontSize: 8,
    letterSpacing: 1,
    lineHeight: 17,
  },

  /* =========================================================
     NEXT COURSE
     ========================================================= */

  nextCourseSection: {
    paddingHorizontal: 30,
    paddingVertical: 105,
    alignItems: 'center',
    textAlign: 'center',
  },

  nextCourseEyebrow: {
    color: '#D4AF37',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
    marginBottom: 18,
    textAlign: 'center',
  },

  nextCourseTitle: {
    color: '#F5F1E8',
    fontSize: 48,
    fontWeight: '400',
    textAlign: 'center',
  },

  nextCourseItalic: {
    color: '#D4AF37',
    fontStyle: 'italic',
  },

  nextCourseText: {
    color: '#9EA7A0',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 580,
    marginTop: 20,
  },

  nextCourseButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 32,
  },

  nextCourseButton: {
    height: 48,
    paddingHorizontal: 25,
    backgroundColor: '#D4AF37',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  nextCourseButtonText: {
    color: '#07130F',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  nextCourseArrow: {
    color: '#07130F',
    fontSize: 19,
    marginLeft: 12,
  },

  nextCourseSecondary: {
    height: 48,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  nextCourseSecondaryText: {
    color: '#D4AF37',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },

  /* =========================================================
     FOOTER
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
    letterSpacing: 2,
    marginTop: 20,
  },

  footerDescription: {
    color: '#858F88',
    fontSize: 13,
    lineHeight: 21,
    marginTop: 16,
  },

  footerOrderButton: {
    marginTop: 24,
    alignSelf: 'flex-start',
    height: 44,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#D4AF37',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  footerOrderText: {
    color: '#D4AF37',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },

  footerOrderArrow: {
    color: '#D4AF37',
    fontSize: 18,
    marginLeft: 12,
  },

  socialRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 25,
  },

  socialButton: {
    width: 34,
    height: 34,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  socialText: {
    color: '#D4AF37',
    fontSize: 14,
  },

  footerColumn: {
    flex: 1,
  },

  footerColumnTitle: {
    color: '#D4AF37',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 20,
  },

  footerLink: {
    color: '#858F88',
    fontSize: 13,
    marginBottom: 12,
  },

  footerActiveLink: {
    color: '#D4AF37',
  },

  contactRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },

  contactIcon: {
    color: '#D4AF37',
    fontSize: 10,
    width: 25,
  },

  contactText: {
    color: '#858F88',
    fontSize: 12,
    lineHeight: 19,
  },

  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  hoursDay: {
    color: '#858F88',
    fontSize: 11,
  },

  hoursTime: {
    color: '#D4AF37',
    fontSize: 10,
  },

  stayConnectedTitle: {
    color: '#D4AF37',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
    marginTop: 25,
    marginBottom: 10,
  },

  newsletterText: {
    color: '#777F79',
    fontSize: 11,
    lineHeight: 17,
    marginBottom: 14,
  },

  newsletterBox: {
    height: 42,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 13,
  },

  newsletterPlaceholder: {
    color: '#626A64',
    fontSize: 10,
  },

  newsletterButton: {
    width: 42,
    height: 42,
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
  },

  newsletterArrow: {
    color: '#07130F',
    fontSize: 18,
  },

  footerDivider: {
    height: 1,
    backgroundColor: 'rgba(212, 175, 55, 0.16)',
    marginHorizontal: 70,
  },

  footerBottom: {
    paddingHorizontal: 70,
    paddingVertical: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 40,
  },

  downloadSection: {
    flex: 1,
  },

  downloadTitle: {
    color: '#D4AF37',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
  },

  downloadSubtitle: {
    color: '#777F79',
    fontSize: 11,
    marginTop: 6,
  },

  appButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },

  appButton: {
    minWidth: 145,
    height: 48,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 241, 232, 0.18)',
    flexDirection: 'row',
    alignItems: 'center',
  },

  appButtonIcon: {
    marginRight: 9,
  },

  appButtonSmall: {
    color: '#777F79',
    fontSize: 7,
    letterSpacing: 1,
  },

  appButtonLarge: {
    color: '#F5F1E8',
    fontSize: 12,
    marginTop: 2,
  },

  valuesSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 28,
  },

  valueItem: {
    alignItems: 'center',
    minWidth: 85,
  },

  valueIcon: {
    color: '#D4AF37',
    fontSize: 22,
    marginBottom: 7,
  },

  valueTitle: {
    color: '#F5F1E8',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1.3,
  },

  valueSubtitle: {
    color: '#6E7870',
    fontSize: 7,
    letterSpacing: 1.2,
    marginTop: 3,
  },

  footerSlogan: {
    alignItems: 'flex-end',
    minWidth: 150,
  },

  footerSloganLine: {
    color: '#F5F1E8',
    fontSize: 20,
    fontWeight: '300',
  },

  sloganUnderline: {
    width: 45,
    height: 2,
    backgroundColor: '#D4AF37',
    marginTop: 9,
    alignSelf: 'flex-end',
  },

  copyrightBar: {
    minHeight: 52,
    paddingHorizontal: 70,
    borderTopWidth: 1,
    borderTopColor: 'rgba(212, 175, 55, 0.12)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  copyrightText: {
    color: '#5F6862',
    fontSize: 9,
  },

  copyrightTagline: {
    color: '#5F6862',
    fontSize: 8,
    letterSpacing: 1.5,
  },

  hoverEffect: {
    opacity: 0.72,
    backgroundColor: 'rgba(212, 175, 55, 0.075)',
    borderColor: 'rgba(212, 175, 55, 0.52)',
    transform: [{ translateY: -3 }],
    shadowColor: '#000000',
    shadowOpacity: 0.28,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },

});