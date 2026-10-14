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

import { MenuItem } from '../data/menuData';

import { useWebSelection } from './context/WebSelectionContext';
import CartDropdown from './components/CartDropdown';

const backgroundImage = require('../assets/christoffel-background.png');

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

type DessertsWebProps = {
  menuItems: MenuItem[];
  onHome?: () => void;
  onStarters?: () => void;
  onMains?: () => void;
  onDrinks?: () => void;
  onSelection?: () => void;
  onCheckout?: () => void;
};

export default function DessertsWeb({
  menuItems,
  onHome,
  onStarters,
  onMains,
  onDrinks,
  onSelection,
  onCheckout,
}: DessertsWebProps) {
  const [showCartDropdown, setShowCartDropdown] = useState(false);

  const {
    addToSelection,
    getQuantity,
    totalItems,
  } = useWebSelection();

  const desserts: MenuItem[] =
    menuItems.filter(
      item => item.course === 'Dessert'
    );

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

            <Hoverable onPress={onMains}>
              <Text style={styles.navItem}>
                MAINS
              </Text>
            </Hoverable>

            <Hoverable>
              <Text style={[styles.navItem, styles.activeNav]}>
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
            STARTERS
            ==================================================== */}
        <View style={styles.content}>

          <Text style={styles.label}>
            CHRISTOFFEL MENU
          </Text>

          <Text style={styles.title}>
            Desserts
          </Text>

          <Text style={styles.subtitle}>
            Finish your Christoffel experience with
            something exceptional.
          </Text>

          <View style={styles.line} />

          {totalItems > 0 && (
            <View style={styles.selectionStatus}>
              <Text style={styles.selectionStatusText}>
                {totalItems}{' '}
                {totalItems === 1
                  ? 'item'
                  : 'items'}{' '}
                selected
              </Text>
            </View>
          )}

          <View style={styles.menuGrid}>
            {desserts.map(item => {
              const quantity =
                getQuantity(item.id);

              return (
                <View
                  key={item.id}
                  style={styles.menuCard}
                >
                  <Image
                    source={{
                      uri: item.image,
                    }}
                    style={styles.menuImage}
                  />

                  <View style={styles.menuDetails}>

                    <Text style={styles.menuName}>
                      {item.name}
                    </Text>

                    <Text style={styles.menuDescription}>
                      {item.description}
                    </Text>

                    <View style={styles.bottomRow}>

                      <Text style={styles.menuPrice}>
                        R{item.price.toFixed(2)}
                      </Text>

                      <Pressable
                        onPress={() =>
                          addToSelection(item)
                        }
                        style={({ pressed }) => [
                          styles.addButton,
                          pressed &&
                            styles.addButtonPressed,
                        ]}
                      >
                        {quantity > 0 ? (
                          <Text
                            style={
                              styles.quantityText
                            }
                          >
                            {quantity}
                          </Text>
                        ) : (
                          <Text
                            style={
                              styles.addButtonText
                            }
                          >
                            +
                          </Text>
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
            CHRISTOFFEL FOOTER
            ==================================================== */}
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
    width: 1800,
  },

  dealsText: {
    color: '#D4AF37',
    fontSize: 11,
    letterSpacing: 2,
  },

  content: {
    minHeight: 700,
    paddingHorizontal: 80,
    paddingTop: 65,
    paddingBottom: 80,
    alignItems: 'center',
  },

  label: {
    color: '#D4AF37',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 3,
    marginBottom: 18,
  },

  title: {
    color: '#F5F1E8',
    fontSize: 56,
    fontWeight: '400',
    marginBottom: 18,
  },

  subtitle: {
    color: '#CFC8B8',
    fontSize: 17,
    textAlign: 'center',
    maxWidth: 650,
    lineHeight: 28,
  },

  line: {
    width: 70,
    height: 2,
    backgroundColor: '#D4AF37',
    marginVertical: 35,
  },

  selectionStatus: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.35)',
    borderRadius: 30,
    backgroundColor: 'rgba(212, 175, 55, 0.08)',
  },

  selectionStatusText: {
    color: '#D4AF37',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  menuGrid: {
    width: '100%',
    maxWidth: 1180,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
  },

  menuCard: {
    width: 350,
    backgroundColor: 'rgba(7, 19, 15, 0.96)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.28)',
    borderRadius: 16,
    overflow: 'hidden',
  },

  menuImage: {
    width: '100%',
    height: 225,
  },

  menuDetails: {
    padding: 24,
  },

  menuName: {
    color: '#F5F1E8',
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 10,
  },

  menuDescription: {
    color: '#AFA99D',
    fontSize: 15,
    lineHeight: 23,
    minHeight: 46,
    marginBottom: 20,
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  menuPrice: {
    color: '#D4AF37',
    fontSize: 18,
    fontWeight: '700',
  },

  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.94 }],
  },

  addButtonText: {
    color: '#07110C',
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 30,
  },

  quantityText: {
    color: '#07110C',
    fontSize: 17,
    fontWeight: '800',
  },

  hoverEffect: {
    backgroundColor: 'rgba(212, 175, 55, 0.18)',
    borderColor: '#F2D35E',
    opacity: 1,
    transform: [{ translateY: -3 }],
  },

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


  /* =========================================================
     SHARED HOVER EFFECT
     ========================================================= */



});
