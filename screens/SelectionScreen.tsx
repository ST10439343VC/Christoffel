import React from 'react';

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

const { width } = Dimensions.get('window');

const scale = Math.min(width / 393, 1.15);

const s = (value: number) => Math.round(value * scale);

const BACKGROUND_IMAGE =
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85';

export default function SelectionScreen({
  menuItems,
  onHome,
  onStarters,
  onMains,
  onDesserts,
  onDrinks,
  onPayment,
  selected,
  removeItem,
  addItem,
  totalSelected,
}: {
  menuItems: MenuItem[];
  onHome: () => void;
  onStarters: () => void;
  onMains: () => void;
  onDesserts: () => void;
  onDrinks: () => void;
  onPayment: () => void;
  selected: { [key: string]: number };
  removeItem: (name: string) => void;
  addItem: (name: string) => void;
  totalSelected: number;
}) {
  const selectedItems = menuItems.filter(
    item => selected[item.name]
  );

  const clearItem = (name: string) => {
    const quantity = selected[name] || 0;

    for (let i = 0; i < quantity; i++) {
      removeItem(name);
    }
  };

  const subtotal = selectedItems.reduce(
    (total, item) =>
      total + item.price * selected[item.name],
    0
  );

  const serviceFee = subtotal * 0.10;

  const total = subtotal + serviceFee;

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top', 'bottom']}
    >
      <ImageBackground
        source={{
          uri: BACKGROUND_IMAGE,
        }}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.backgroundOverlay} />

        {/* =====================================================
            COMPACT CHRISTOFFEL HEADER
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
              Your Selection
            </Text>

            <Text
              style={styles.pageSubtitle}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.82}
            >
              Review your selected meals
            </Text>

            <View style={styles.titleDivider} />

          </View>

        </View>

        {totalSelected === 0 ? (

          /* =====================================================
             EMPTY SELECTION
          ===================================================== */

          <View style={styles.emptyContainer}>

            <View style={styles.emptyIconCircle}>

              <Text style={styles.emptyCart}>
                🛒
              </Text>

            </View>

            <Text style={styles.emptyTitle}>
              Your Selection is Empty
            </Text>

            <Text style={styles.emptyText}>
              Please select at least 1 item from the menu
              {'\n'}
              before proceeding to payment.
            </Text>

            <TouchableOpacity
              style={styles.browseButton}
              onPress={onStarters}
              activeOpacity={0.8}
            >
              <Text style={styles.browseButtonText}>
                BROWSE MENU
              </Text>
            </TouchableOpacity>

          </View>

        ) : (

          /* =====================================================
             SELECTED ITEMS
          ===================================================== */

          <ScrollView
            style={styles.menuScroll}
            contentContainerStyle={styles.menuContent}
            showsVerticalScrollIndicator={false}
            bounces={true}
          >

            {/* ORDER LABEL */}

            <View style={styles.orderHeader}>

              <Text style={styles.orderEyebrow}>
                YOUR ORDER
              </Text>

              <Text style={styles.orderCount}>
                {totalSelected}{' '}
                {totalSelected === 1 ? 'ITEM' : 'ITEMS'}
              </Text>

            </View>

            {/* =================================================
                SELECTED FOOD CARDS
            ================================================= */}

            {selectedItems.map(item => {

              const quantity =
                selected[item.name] || 0;

              const itemTotal =
                item.price * quantity;

              return (
                <View
                  key={item.id}
                  style={styles.card}
                >

                  {/* FOOD IMAGE */}

                  <Image
                    source={{
                      uri: item.image,
                    }}
                    style={styles.foodImage}
                    resizeMode="cover"
                  />

                  {/* CONTENT */}

                  <View style={styles.cardContent}>

                    <Text
                      style={styles.dishName}
                      numberOfLines={2}
                    >
                      {item.name}
                    </Text>

                    <Text
                      style={styles.course}
                      numberOfLines={1}
                    >
                      {item.course}
                    </Text>

                    <Text
                      style={styles.description}
                      numberOfLines={1}
                    >
                      R{item.price.toFixed(2)} each
                    </Text>

                  </View>

                  {/* RIGHT SIDE */}

                  <View style={styles.cardRight}>

                    {/* DELETE */}

                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() =>
                        clearItem(item.name)
                      }
                      activeOpacity={0.8}
                    >
                      <Text style={styles.deleteIcon}>
                        ×
                      </Text>
                    </TouchableOpacity>

                    {/* TOTAL */}

                    <Text style={styles.itemTotal}>
                      R{itemTotal.toFixed(2)}
                    </Text>

                    {/* QUANTITY */}

                    <View style={styles.quantityContainer}>

                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() =>
                          removeItem(item.name)
                        }
                        activeOpacity={0.8}
                      >
                        <Text style={styles.quantityText}>
                          −
                        </Text>
                      </TouchableOpacity>

                      <Text style={styles.quantity}>
                        {quantity}
                      </Text>

                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() =>
                          addItem(item.name)
                        }
                        activeOpacity={0.8}
                      >
                        <Text style={styles.quantityText}>
                          +
                        </Text>
                      </TouchableOpacity>

                    </View>

                  </View>

                </View>
              );
            })}

            {/* =================================================
                ORDER SUMMARY
            ================================================= */}

            <View style={styles.summaryCard}>

              <Text style={styles.summaryEyebrow}>
                CHRISTOFFEL
              </Text>

              <Text style={styles.summaryTitle}>
                Order Summary
              </Text>

              <View style={styles.summaryDivider} />

              <View style={styles.summaryRow}>

                <Text style={styles.summaryLabel}>
                  Items
                </Text>

                <Text style={styles.summaryValue}>
                  {totalSelected}
                </Text>

              </View>

              <View style={styles.summaryRow}>

                <Text style={styles.summaryLabel}>
                  Subtotal
                </Text>

                <Text style={styles.summaryValue}>
                  R{subtotal.toFixed(2)}
                </Text>

              </View>

              <View style={styles.summaryRow}>

                <Text style={styles.summaryLabel}>
                  Service Fee
                </Text>

                <Text style={styles.summaryValue}>
                  R{serviceFee.toFixed(2)}
                </Text>

              </View>

              <Text style={styles.serviceNote}>
                10% service fee
              </Text>

              <View style={styles.summaryDivider} />

              <View style={styles.totalRow}>

                <View>

                  <Text style={styles.totalCaption}>
                    TOTAL
                  </Text>

                  <Text style={styles.totalLabel}>
                    Amount Due
                  </Text>

                </View>

                <Text style={styles.totalValue}>
                  R{total.toFixed(2)}
                </Text>

              </View>

              {/* PAYMENT */}

              <TouchableOpacity
                style={styles.paymentButton}
                onPress={onPayment}
                activeOpacity={0.8}
              >
                <Text style={styles.paymentButtonText}>
                  PROCEED TO PAYMENT
                </Text>

                <Text style={styles.paymentArrow}>
                  →
                </Text>

              </TouchableOpacity>

            </View>

            <Text style={styles.bottomNote}>
              Thank you for dining with Christoffel.
            </Text>

          </ScrollView>
        )}

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
              ○
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
          {/* DRINKS */}

          <TouchableOpacity
            style={styles.navItem}
            onPress={onDrinks}
            activeOpacity={0.8}
          >
            <Text style={styles.navIcon}>
              ◉
            </Text>

            <Text style={styles.navText}>
              Drinks
            </Text>
          </TouchableOpacity>


          {/* SELECTION */}

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={1}
          >
            <Text
              style={[
                styles.navIcon,
                styles.activeIcon,
              ]}
            >
              □
            </Text>

            <Text
              style={[
                styles.navText,
                styles.activeText,
              ]}
            >
              Selection
            </Text>

          </TouchableOpacity>

        </View>

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
     ORDER HEADER
  ========================================================== */

  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: s(10),
    paddingHorizontal: s(3),
  },

  orderEyebrow: {
    color: '#D4AF37',
    fontSize: s(10),
    fontWeight: '600',
    letterSpacing: s(2),
  },

  orderCount: {
    color: '#C8C4BA',
    fontSize: s(10),
    fontWeight: '600',
    letterSpacing: s(1.5),
  },

  /* ==========================================================
     EMPTY STATE
  ========================================================== */

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(25),
    paddingBottom: s(30),
  },

  emptyIconCircle: {
    width: s(92),
    height: s(92),
    borderRadius: s(46),
    borderWidth: 1.5,
    borderColor: '#5A512D',
    backgroundColor: 'rgba(4, 9, 6, 0.78)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: s(25),
  },

  emptyCart: {
    fontSize: s(38),
  },

  emptyTitle: {
    color: '#F5F1E8',
    fontFamily: 'serif',
    fontSize: s(25),
    fontWeight: '400',
    textAlign: 'center',
  },

  emptyText: {
    color: '#C8C4BA',
    fontFamily: 'serif',
    fontSize: s(13),
    lineHeight: s(21),
    textAlign: 'center',
    marginTop: s(16),
  },

  browseButton: {
    minWidth: s(190),
    height: s(48),
    backgroundColor: '#D4AF37',
    borderRadius: s(24),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: s(32),
  },

  browseButtonText: {
    color: '#080B09',
    fontSize: s(12),
    fontWeight: '700',
    letterSpacing: s(1.4),
  },

  /* ==========================================================
     MENU / SELECTION
  ========================================================== */

  menuScroll: {
    flex: 1,
  },

  menuContent: {
    paddingHorizontal: s(18),
    paddingTop: 0,
    paddingBottom: s(20),
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
    justifyContent: 'center',
    minWidth: 0,
  },

  dishName: {
    color: '#F4F0E7',
    fontFamily: 'serif',
    fontSize: s(18),
    fontWeight: '500',
    lineHeight: s(22),
  },

  course: {
    color: '#D4AF37',
    fontFamily: 'serif',
    fontSize: s(11),
    marginTop: s(7),
    textTransform: 'uppercase',
    letterSpacing: s(0.6),
  },

  description: {
    color: '#C8C4BA',
    fontFamily: 'serif',
    fontSize: s(11),
    lineHeight: s(16),
    marginTop: s(5),
  },

  /* ==========================================================
     RIGHT SIDE
  ========================================================== */

  cardRight: {
    width: s(78),
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingVertical: s(9),
    paddingRight: s(10),
  },

  deleteButton: {
    width: s(30),
    height: s(30),
    borderRadius: s(15),
    borderWidth: 1,
    borderColor: '#5A512D',
    backgroundColor: 'rgba(4, 9, 6, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteIcon: {
    color: '#D4AF37',
    fontSize: s(20),
    fontWeight: '300',
    lineHeight: s(21),
  },

  itemTotal: {
    color: '#D4AF37',
    fontFamily: 'serif',
    fontSize: s(16),
    fontWeight: '600',
  },

  /* ==========================================================
     QUANTITY
  ========================================================== */

  quantityContainer: {
    height: s(36),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: s(18),
    borderWidth: 1.5,
    borderColor: '#D4AF37',
    backgroundColor: '#080C09',
    overflow: 'hidden',
  },

  quantityButton: {
    width: s(30),
    height: s(34),
    alignItems: 'center',
    justifyContent: 'center',
  },

  quantityText: {
    color: '#D4AF37',
    fontSize: s(20),
    fontWeight: '300',
    lineHeight: s(22),
  },

  quantity: {
    color: '#F3EFE6',
    fontSize: s(13),
    fontWeight: '600',
    minWidth: s(20),
    textAlign: 'center',
  },

  /* ==========================================================
     ORDER SUMMARY
  ========================================================== */

  summaryCard: {
    width: '100%',
    backgroundColor: 'rgba(8, 20, 14, 0.96)',
    borderRadius: s(18),
    borderWidth: 2,
    borderColor: '#5A512D',
    padding: s(18),
    marginTop: s(6),
  },

  summaryEyebrow: {
    color: '#D4AF37',
    fontSize: s(10),
    fontWeight: '600',
    letterSpacing: s(2.5),
  },

  summaryTitle: {
    color: '#F4F0E7',
    fontFamily: 'serif',
    fontSize: s(23),
    fontWeight: '400',
    marginTop: s(3),
  },

  summaryDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#3B392A',
    marginVertical: s(15),
  },

  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: s(12),
  },

  summaryLabel: {
    color: '#C8C4BA',
    fontFamily: 'serif',
    fontSize: s(13),
  },

  summaryValue: {
    color: '#F3EFE6',
    fontFamily: 'serif',
    fontSize: s(14),
  },

  serviceNote: {
    alignSelf: 'flex-start',
    color: '#8E8A7C',
    fontFamily: 'serif',
    fontSize: s(10),
    marginTop: -s(3),
  },

  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: s(18),
  },

  totalCaption: {
    color: '#D4AF37',
    fontSize: s(9),
    fontWeight: '700',
    letterSpacing: s(2),
    marginBottom: s(3),
  },

  totalLabel: {
    color: '#F4F0E7',
    fontFamily: 'serif',
    fontSize: s(16),
  },

  totalValue: {
    color: '#D4AF37',
    fontFamily: 'serif',
    fontSize: s(25),
    fontWeight: '600',
  },

  /* ==========================================================
     PAYMENT BUTTON
  ========================================================== */

  paymentButton: {
    width: '100%',
    height: s(50),
    borderRadius: s(25),
    backgroundColor: '#D4AF37',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  paymentButtonText: {
    color: '#080B09',
    fontSize: s(12),
    fontWeight: '700',
    letterSpacing: s(1.1),
  },

  paymentArrow: {
    color: '#080B09',
    fontSize: s(20),
    marginLeft: s(10),
    marginTop: -s(2),
  },

  bottomNote: {
    color: '#8E8A7C',
    fontFamily: 'serif',
    fontSize: s(10),
    textAlign: 'center',
    marginTop: s(16),
    letterSpacing: s(0.3),
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

  activeNavItem: {
    backgroundColor: 'rgba(212, 175, 55, 0.07)',
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