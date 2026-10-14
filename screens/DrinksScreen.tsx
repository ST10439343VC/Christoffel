import React, { useEffect, useRef, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { MenuItem } from '../data/menuData';
import CartPreviewModal from '../Components/CartPreviewModal';

const { width } = Dimensions.get('window');

const scale = Math.min(width / 393, 1.15);

const s = (value: number) => Math.round(value * scale);

export default function DrinksScreen({
  menuItems,
  onHome,
  onStarters,
  onMains,
  onDesserts,
  onDrinks,
  onSelection,
  selected,
  addItem,
  removeItem,
  totalSelected,
}: {
  menuItems: MenuItem[];
  onHome: () => void;
  onStarters: () => void;
  onMains: () => void;
  onDesserts: () => void;
  onDrinks: () => void;
  onSelection: () => void;
  selected: { [key: string]: number };
  addItem: (name: string) => void;
  removeItem: (name: string) => void;
  totalSelected: number;
}) {
  const [cartVisible, setCartVisible] = useState(false);

  const scrollRef = useRef<ScrollView>(null);

  const drinks = menuItems.filter(
    item => item.course === 'Drink'
  );

  const alcoholicCategories = [
    {
      title: 'BEER',
      items: drinks.filter(item =>
        [
          'Castle Lager',
          'Heineken',
          'Stella Artois',
          'Corona',
        ].includes(item.name)
      ),
    },
    {
      title: 'WINE',
      items: drinks.filter(item =>
        [
          'Chardonnay',
          'Sauvignon Blanc',
          'Cabernet Sauvignon',
          'Merlot',
        ].includes(item.name)
      ),
    },
    {
      title: 'COCKTAILS',
      items: drinks.filter(item =>
        [
          'Mojito',
          'Margarita',
          'Cosmopolitan',
          'Piña Colada',
        ].includes(item.name)
      ),
    },
    {
      title: 'WHISKY',
      items: drinks.filter(item =>
        [
          'Jameson',
          "Jack Daniel's",
          'Johnnie Walker Black Label',
          'Chivas Regal',
        ].includes(item.name)
      ),
    },
    {
      title: 'COGNAC / BRANDY',
      items: drinks.filter(item =>
        [
          'Hennessy VS',
          'Hennessy VSOP',
          'Rémy Martin VSOP',
          'Courvoisier',
        ].includes(item.name)
      ),
    },
  ];

  const nonAlcoholicCategories = [
    {
      title: 'WATER',
      items: drinks.filter(item =>
        [
          'Still Water',
          'Sparkling Water',
          'Flavoured Still Water',
          'Flavoured Sparkling Water',
        ].includes(item.name)
      ),
    },
    {
      title: 'JUICES',
      items: drinks.filter(item =>
        [
          'Orange Juice',
          'Apple Juice',
          'Pineapple Juice',
          'Cranberry Juice',
        ].includes(item.name)
      ),
    },
    {
      title: 'MILKSHAKES',
      items: drinks.filter(item =>
        [
          'Chocolate Milkshake',
          'Vanilla Milkshake',
          'Strawberry Milkshake',
          'Oreo Milkshake',
        ].includes(item.name)
      ),
    },
  ];

  useEffect(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: false,
      });
    });
  }, []);

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top', 'bottom']}
    >
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
        }}
        style={styles.background}
        resizeMode="cover"
      >

        <View style={styles.backgroundOverlay} />

        {/* =====================================================
            COMPACT MENU HEADER
        ===================================================== */}

        <View style={styles.header}>

          {/* BACK BUTTON */}

          <TouchableOpacity
            style={styles.backButton}
            onPress={onHome}
            activeOpacity={0.8}
          >
            <Text style={styles.backIcon}>
              ‹
            </Text>
          </TouchableOpacity>

          {/* CART */}

          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => setCartVisible(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.cartIcon}>
              🛒
            </Text>

            {totalSelected > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>
                  {totalSelected}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* CENTER BRAND */}

          <View style={styles.branding}>

            <Text style={styles.chefIcon}>
              ♨
            </Text>

            <Text
              style={styles.brandName}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.72}
            >
              CHRISTOFFEL
            </Text>

            <View style={styles.brandLineRow}>

              <View style={styles.smallGoldLine} />

              <Text style={styles.menuText}>
                MENU
              </Text>

              <View style={styles.smallGoldLine} />

            </View>

          </View>

          {/* PAGE HEADING */}

          <View style={styles.pageHeading}>

            <Text style={styles.pageTitle}>
              Drinks
            </Text>

            <Text
              style={styles.pageSubtitle}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.82}
            >
              Refreshing choices to enjoy with your meal
            </Text>

            <View style={styles.titleDivider} />

          </View>

        </View>

        {/* =====================================================
            MENU
        ===================================================== */}

        <ScrollView
          ref={scrollRef}
          style={styles.menuScroll}
          contentContainerStyle={styles.menuContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >

          {/* =====================================================
              ALCOHOLIC DRINKS
          ===================================================== */}

          <Text style={styles.sectionTitle}>
            ALCOHOLIC DRINKS
          </Text>

          {alcoholicCategories.map(category => (
            <React.Fragment key={category.title}>

              <Text style={styles.categoryTitle}>
                {category.title}
              </Text>

              {category.items.map(drink => {

                const quantity =
                  selected[drink.name] || 0;

                return (
                  <View
                    key={drink.id}
                    style={styles.card}
                  >

                    {/* FOOD IMAGE */}

                    <Image
                      source={{
                        uri: drink.image,
                      }}
                      style={styles.foodImage}
                      resizeMode="cover"
                    />

                    {/* CONTENT */}

                    <View style={styles.cardContent}>

                      <Text
                        style={styles.dishName}
                        numberOfLines={1}
                      >
                        {drink.name}
                      </Text>

                      <Text
                        style={styles.description}
                        numberOfLines={2}
                      >
                        {drink.description}
                      </Text>

                      <View style={styles.cardBottom}>

                        <Text style={styles.price}>
                          R{drink.price.toFixed(2)}
                        </Text>

                        {quantity === 0 ? (

                          <TouchableOpacity
                            style={styles.addButton}
                            onPress={() =>
                              addItem(drink.name)
                            }
                            activeOpacity={0.8}
                          >
                            <Text style={styles.addSymbol}>
                              +
                            </Text>
                          </TouchableOpacity>

                        ) : (

                          <View style={styles.quantityContainer}>

                            <TouchableOpacity
                              style={styles.quantityButton}
                              onPress={() =>
                                removeItem(drink.name)
                              }
                              activeOpacity={0.8}
                            >
                              <Text style={styles.quantitySymbol}>
                                −
                              </Text>
                            </TouchableOpacity>

                            <Text style={styles.quantity}>
                              {quantity}
                            </Text>

                            <TouchableOpacity
                              style={styles.quantityButton}
                              onPress={() =>
                                addItem(drink.name)
                              }
                              activeOpacity={0.8}
                            >
                              <Text style={styles.quantitySymbol}>
                                +
                              </Text>
                            </TouchableOpacity>

                          </View>

                        )}

                      </View>

                    </View>

                  </View>
                );
              })}

            </React.Fragment>
          ))}

          {/* =====================================================
              NON-ALCOHOLIC DRINKS
          ===================================================== */}

          <Text style={styles.sectionTitle}>
            NON-ALCOHOLIC DRINKS
          </Text>

          {nonAlcoholicCategories.map(category => (
            <React.Fragment key={category.title}>

              <Text style={styles.categoryTitle}>
                {category.title}
              </Text>

              {category.items.map(drink => {

                const quantity =
                  selected[drink.name] || 0;

                return (
                  <View
                    key={drink.id}
                    style={styles.card}
                  >

                    {/* FOOD IMAGE */}

                    <Image
                      source={{
                        uri: drink.image,
                      }}
                      style={styles.foodImage}
                      resizeMode="cover"
                    />

                    {/* CONTENT */}

                    <View style={styles.cardContent}>

                      <Text
                        style={styles.dishName}
                        numberOfLines={1}
                      >
                        {drink.name}
                      </Text>

                      <Text
                        style={styles.description}
                        numberOfLines={2}
                      >
                        {drink.description}
                      </Text>

                      <View style={styles.cardBottom}>

                        <Text style={styles.price}>
                          R{drink.price.toFixed(2)}
                        </Text>

                        {quantity === 0 ? (

                          <TouchableOpacity
                            style={styles.addButton}
                            onPress={() =>
                              addItem(drink.name)
                            }
                            activeOpacity={0.8}
                          >
                            <Text style={styles.addSymbol}>
                              +
                            </Text>
                          </TouchableOpacity>

                        ) : (

                          <View style={styles.quantityContainer}>

                            <TouchableOpacity
                              style={styles.quantityButton}
                              onPress={() =>
                                removeItem(drink.name)
                              }
                              activeOpacity={0.8}
                            >
                              <Text style={styles.quantitySymbol}>
                                −
                              </Text>
                            </TouchableOpacity>

                            <Text style={styles.quantity}>
                              {quantity}
                            </Text>

                            <TouchableOpacity
                              style={styles.quantityButton}
                              onPress={() =>
                                addItem(drink.name)
                              }
                              activeOpacity={0.8}
                            >
                              <Text style={styles.quantitySymbol}>
                                +
                              </Text>
                            </TouchableOpacity>

                          </View>

                        )}

                      </View>

                    </View>

                  </View>
                );
              })}

            </React.Fragment>
          ))}

        </ScrollView>

        {/* =====================================================
            BOTTOM NAVIGATION
        ===================================================== */}

        <View style={styles.bottomNav}>

          {/* HOME */}

          <TouchableOpacity
            style={styles.navItem}
            onPress={onHome}
            activeOpacity={0.8}
          >
            <Text style={styles.navIcon}>
              ⌂
            </Text>

            <Text style={styles.navText}>
              Home
            </Text>
          </TouchableOpacity>

          {/* STARTERS */}

          <TouchableOpacity
            style={styles.navItem}
            onPress={onStarters}
            activeOpacity={0.8}
          >
            <Text style={styles.navIcon}>
              ◇
            </Text>

            <Text style={styles.navText}>
              Starters
            </Text>
          </TouchableOpacity>

          {/* MAINS */}

          <TouchableOpacity
            style={styles.navItem}
            onPress={onMains}
            activeOpacity={0.8}
          >
            <Text style={styles.navIcon}>
              ♧
            </Text>

            <Text style={styles.navText}>
              Mains
            </Text>
          </TouchableOpacity>

          {/* DESSERTS */}

          <TouchableOpacity
            style={styles.navItem}
            onPress={onDesserts}
            activeOpacity={0.8}
          >
            <Text style={styles.navIcon}>
              ♢
            </Text>

            <Text style={styles.navText}>
              Desserts
            </Text>
          </TouchableOpacity>

          {/* DRINKS — ACTIVE */}

          <TouchableOpacity
            style={styles.navItem}
            onPress={onDrinks}
            activeOpacity={1}
          >
            <Text
              style={[
                styles.navIcon,
                styles.activeIcon,
              ]}
            >
              ○
            </Text>

            <Text
              style={[
                styles.navText,
                styles.activeText,
              ]}
            >
              Drinks
            </Text>
          </TouchableOpacity>

          {/* SELECTION */}

          <TouchableOpacity
            style={styles.navItem}
            onPress={onSelection}
            activeOpacity={0.8}
          >
            <Text style={styles.navIcon}>
              □
            </Text>

            <Text style={styles.navText}>
              Selection
            </Text>
          </TouchableOpacity>

        </View>

        {/* =====================================================
            CART PREVIEW
        ===================================================== */}

        <CartPreviewModal
          visible={cartVisible}
          onClose={() => setCartVisible(false)}
          selected={selected}
          menuItems={menuItems}
        />

      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  /* ==========================================================
     SCREEN
  ========================================================== */

  safeArea: {
    flex: 1,
    backgroundColor: '#0B100D',
  },

  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(5, 18, 11, 0.82)',
  },

  /* ==========================================================
     HEADER
     THIS IS THE MENU HEADER — COMPACT
  ========================================================== */

  header: {
    height: s(192),
    width: '100%',
    position: 'relative',
  },

  /* ==========================================================
     BRANDING
  ========================================================== */

  branding: {
    position: 'absolute',
    top: s(17),
    left: s(70),
    right: s(70),
    alignItems: 'center',
  },

  chefIcon: {
    color: '#D4AF37',
    fontSize: s(32),
    lineHeight: s(36),
    marginBottom: s(1),
  },

  brandName: {
    color: '#F5F1E8',
    fontSize: s(27),
    fontWeight: '500',
    letterSpacing: s(3.2),
    lineHeight: s(31),
    width: '100%',
    textAlign: 'center',
  },

  brandLineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: s(3),
  },

  smallGoldLine: {
    width: s(38),
    height: 1,
    backgroundColor: '#D4AF37',
    opacity: 0.85,
    marginHorizontal: s(8),
  },

  menuText: {
    color: '#D4AF37',
    fontSize: s(14),
    letterSpacing: s(5),
    lineHeight: s(18),
  },

  /* ==========================================================
     PAGE HEADING
     SITS DIRECTLY UNDER BRANDING
  ========================================================== */

  pageHeading: {
    position: 'absolute',
    left: s(18),
    right: s(18),
    top: s(103),
    alignItems: 'center',
  },

  pageTitle: {
    color: '#F5F1E8',
    fontFamily: 'serif',
    fontSize: s(41),
    fontWeight: '400',
    lineHeight: s(46),
    textAlign: 'center',
  },

  pageSubtitle: {
    color: '#E1DDD4',
    fontFamily: 'serif',
    fontSize: s(15),
    lineHeight: s(19),
    marginTop: s(2),
    textAlign: 'center',
    width: '100%',
  },

  titleDivider: {
    width: s(56),
    height: s(3),
    borderRadius: s(2),
    backgroundColor: '#D4AF37',
    marginTop: s(9),
  },

  /* ==========================================================
     BACK BUTTON
  ========================================================== */

  backButton: {
    position: 'absolute',
    left: s(18),
    top: s(54),
    width: s(56),
    height: s(56),
    borderRadius: s(28),
    borderWidth: 1.5,
    borderColor: '#D4AF37',
    backgroundColor: 'rgba(4, 9, 6, 0.78)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },

  backIcon: {
    color: '#D4AF37',
    fontSize: s(42),
    fontWeight: '300',
    lineHeight: s(42),
    marginTop: -s(5),
  },

  /* ==========================================================
     CART
  ========================================================== */

  cartButton: {
    position: 'absolute',
    right: s(18),
    top: s(54),
    width: s(56),
    height: s(56),
    borderRadius: s(28),
    borderWidth: 1.5,
    borderColor: '#D4AF37',
    backgroundColor: 'rgba(4, 9, 6, 0.78)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },

  cartIcon: {
    fontSize: s(26),
  },

  cartBadge: {
    position: 'absolute',
    top: -s(6),
    right: -s(4),
    width: s(27),
    height: s(27),
    borderRadius: s(14),
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E9CC68',
  },

  cartBadgeText: {
    color: '#080B09',
    fontSize: s(13),
    fontWeight: '700',
  },

  /* ==========================================================
     MENU
  ========================================================== */

  menuScroll: {
    flex: 1,
  },

  menuContent: {
    paddingHorizontal: s(18),
    paddingTop: 0,
    paddingBottom: s(16),
  },

  sectionTitle: {
    color: '#D4AF37',
    fontFamily: 'serif',
    fontSize: s(24),
    fontWeight: '500',
    letterSpacing: s(2),
    textAlign: 'center',
    marginTop: s(8),
    marginBottom: s(12),
  },

  categoryTitle: {
    color: '#F5F1E8',
    fontFamily: 'serif',
    fontSize: s(15),
    fontWeight: '500',
    letterSpacing: s(2),
    textAlign: 'left',
    marginTop: s(5),
    marginBottom: s(8),
  },

  /* ==========================================================
     FOOD CARDS
  ========================================================== */

  card: {
    width: '100%',
    height: s(120),
    flexDirection: 'row',
    backgroundColor: 'rgba(8, 20, 14, 0.95)',
    borderRadius: s(18),
    borderWidth: 2,
    borderColor: '#5A512D',
    overflow: 'hidden',
    marginBottom: s(10),
  },

  foodImage: {
    width: s(105),
    height: '100%',
  },

  cardContent: {
    flex: 1,
    paddingHorizontal: s(14),
    paddingVertical: s(10),
    justifyContent: 'space-between',
  },

  dishName: {
    color: '#F4F0E7',
    fontFamily: 'serif',
    fontSize: s(19),
    fontWeight: '500',
    lineHeight: s(23),
  },

  description: {
    color: '#C8C4BA',
    fontFamily: 'serif',
    fontSize: s(11.5),
    lineHeight: s(16),
    marginTop: s(1),
    paddingRight: s(3),
  },

  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  price: {
    color: '#D4AF37',
    fontFamily: 'serif',
    fontSize: s(17),
    fontWeight: '600',
    lineHeight: s(22),
  },

  /* ==========================================================
     ADD BUTTON
  ========================================================== */

  addButton: {
    width: s(42),
    height: s(42),
    borderRadius: s(21),
    borderWidth: 1.5,
    borderColor: '#D4AF37',
    backgroundColor: 'rgba(4, 9, 6, 0.82)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addSymbol: {
    color: '#D4AF37',
    fontSize: s(29),
    fontWeight: '300',
    lineHeight: s(31),
    marginTop: -s(2),
  },

  /* ==========================================================
     QUANTITY
  ========================================================== */

  quantityContainer: {
    height: s(42),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: s(21),
    borderWidth: 1.5,
    borderColor: '#D4AF37',
    backgroundColor: '#080C09',
    overflow: 'hidden',
  },

  quantityButton: {
    width: s(37),
    height: s(40),
    alignItems: 'center',
    justifyContent: 'center',
  },

  quantitySymbol: {
    color: '#D4AF37',
    fontSize: s(23),
    fontWeight: '300',
  },

  quantity: {
    color: '#F3EFE6',
    fontSize: s(15),
    fontWeight: '600',
    minWidth: s(22),
    textAlign: 'center',
  },

  /* ==========================================================
     BOTTOM NAVIGATION
  ========================================================== */

  bottomNav: {
    height: s(72),
    backgroundColor: '#141B17',
    borderTopWidth: 1,
    borderTopColor: '#2A332D',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  navIcon: {
    color: '#E8E5DD',
    fontSize: s(23),
    height: s(27),
  },

  activeIcon: {
    color: '#D4AF37',
  },

  navText: {
    color: '#E8E5DD',
    fontSize: s(11),
    marginTop: s(2),
  },

  activeText: {
    color: '#D4AF37',
  },

});
