import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
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

export default function PaymentScreen({
  onBack,
  onHome,
  onStarters,
  onMains,
  onDesserts,
  onPaymentSuccess,
  onCardPayment,
  onMobilePayment,
  selected,
  totalSelected,
  menuItems,
}: {
  onBack: () => void;
  onHome: () => void;
  onStarters: () => void;
  onMains: () => void;
  onDesserts: () => void;
  onPaymentSuccess: () => void;
  onCardPayment: () => void;
  onMobilePayment: () => void;
  selected: { [key: string]: number };
  totalSelected: number;
  menuItems: MenuItem[];
}) {

  const [paymentMethod, setPaymentMethod] = useState('Cash');

  const selectedItems = menuItems.filter(
    item => selected[item.name]
  );

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
            CHRISTOFFEL HEADER
        ===================================================== */}

        <View style={styles.header}>

          {/* BACK BUTTON */}

          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
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
              Payment
            </Text>

            <Text
              style={styles.pageSubtitle}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.75}
            >
              Choose your preferred payment method
            </Text>

            <View style={styles.titleDivider} />

          </View>

        </View>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >

          {/* =================================================
              ORDER SUMMARY
          ================================================= */}

          <View style={styles.summaryCard}>

            <Text style={styles.summaryEyebrow}>
              CHRISTOFFEL
            </Text>

            <Text style={styles.sectionTitle}>
              Order Summary
            </Text>

            {/* SELECTED FOOD */}

            {selectedItems.map(item => (

              <View
                style={styles.itemCard}
                key={item.name}
              >

                {/* FOOD IMAGE */}

                <Image
                  source={{
                    uri: item.image,
                  }}
                  style={styles.itemImage}
                  resizeMode="cover"
                />

                {/* ITEM DETAILS */}

                <View style={styles.itemDetails}>

                  <Text
                    style={styles.itemName}
                    numberOfLines={2}
                  >
                    {item.name}
                  </Text>

                  <Text style={styles.itemQuantity}>
                    × {selected[item.name]}
                  </Text>

                </View>

                {/* ITEM PRICE */}

                <Text style={styles.itemPrice}>
                  R{(
                    item.price *
                    selected[item.name]
                  ).toFixed(2)}
                </Text>

              </View>

            ))}

            <View style={styles.divider} />

            {/* SUBTOTAL */}

            <View style={styles.totalRow}>

              <Text style={styles.totalLabel}>
                Subtotal
              </Text>

              <Text style={styles.totalValue}>
                R{subtotal.toFixed(2)}
              </Text>

            </View>

            {/* SERVICE FEE */}

            <View style={styles.totalRow}>

              <Text style={styles.totalLabel}>
                Service Fee (10%)
              </Text>

              <Text style={styles.totalValue}>
                R{serviceFee.toFixed(2)}
              </Text>

            </View>

            <View style={styles.divider} />

            {/* TOTAL */}

            <View style={styles.finalRow}>

              <View>

                <Text style={styles.finalCaption}>
                  TOTAL
                </Text>

                <Text style={styles.finalLabel}>
                  Amount Due
                </Text>

              </View>

              <Text style={styles.finalValue}>
                R{total.toFixed(2)}
              </Text>

            </View>

          </View>

          {/* =================================================
              PAYMENT METHOD
          ================================================= */}

          <Text style={styles.paymentTitle}>
            Payment Method
          </Text>

          {/* CASH */}

          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'Cash' &&
                styles.selectedPayment,
            ]}
            onPress={() =>
              setPaymentMethod('Cash')
            }
            activeOpacity={0.8}
          >

            <View style={styles.paymentIconBox}>

              <Text style={styles.paymentIcon}>
                💵
              </Text>

            </View>

            <View style={styles.paymentDetails}>

              <Text style={styles.paymentText}>
                Cash
              </Text>

              <Text style={styles.paymentSubtext}>
                Pay at the restaurant
              </Text>

            </View>

            <View
              style={[
                styles.radio,
                paymentMethod === 'Cash' &&
                  styles.radioSelected,
              ]}
            />

          </TouchableOpacity>

          {/* CARD */}

          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'Card' &&
                styles.selectedPayment,
            ]}
            onPress={() => {
              setPaymentMethod('Card');
              onCardPayment();
            }}
            activeOpacity={0.8}
          >

            <View style={styles.paymentIconBox}>

              <Text style={styles.paymentIcon}>
                💳
              </Text>

            </View>

            <View style={styles.paymentDetails}>

              <Text style={styles.paymentText}>
                Card
              </Text>

              <Text style={styles.paymentSubtext}>
                Pay securely by card
              </Text>

            </View>

            <View
              style={[
                styles.radio,
                paymentMethod === 'Card' &&
                  styles.radioSelected,
              ]}
            />

          </TouchableOpacity>

          {/* MOBILE PAYMENT */}

          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'Mobile Payment' &&
                styles.selectedPayment,
            ]}
            onPress={() => {
              setPaymentMethod('Mobile Payment');
              onMobilePayment();
            }}
            activeOpacity={0.8}
          >

            <View style={styles.paymentIconBox}>

              <Text style={styles.paymentIcon}>
                📱
              </Text>

            </View>

            <View style={styles.paymentDetails}>

              <Text style={styles.paymentText}>
                Mobile Payment
              </Text>

              <Text style={styles.paymentSubtext}>
                Pay using your mobile device
              </Text>

            </View>

            <View
              style={[
                styles.radio,
                paymentMethod === 'Mobile Payment' &&
                  styles.radioSelected,
              ]}
            />

          </TouchableOpacity>

          {/* =================================================
              PAY NOW
          ================================================= */}

          <TouchableOpacity
            style={styles.payButton}
            onPress={onPaymentSuccess}
            activeOpacity={0.8}
          >

            <Text style={styles.payText}>
              PAY NOW
            </Text>

            <Text style={styles.payArrow}>
              →
            </Text>

          </TouchableOpacity>

          <Text style={styles.secureNote}>
            Your order is ready to be processed.
          </Text>

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

          {/* SELECTION */}

          <TouchableOpacity
            style={styles.navItem}
            onPress={onBack}
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
     SCROLL
  ========================================================== */

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: s(18),
    paddingTop: 0,
    paddingBottom: s(24),
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
    padding: s(17),
    marginBottom: s(18),
  },

  summaryEyebrow: {
    color: '#D4AF37',
    fontSize: s(10),
    fontWeight: '600',
    letterSpacing: s(2.5),
  },

  sectionTitle: {
    color: '#F4F0E7',
    fontFamily: 'serif',
    fontSize: s(23),
    fontWeight: '400',
    marginTop: s(3),
    marginBottom: s(14),
  },

  /* ==========================================================
     FOOD ITEM
  ========================================================== */

  itemCard: {
    width: '100%',
    minHeight: s(78),
    backgroundColor: 'rgba(14, 22, 17, 0.92)',
    borderRadius: s(13),
    borderWidth: 1,
    borderColor: '#3E3B27',
    flexDirection: 'row',
    alignItems: 'center',
    padding: s(7),
    marginBottom: s(8),
  },

  itemImage: {
    width: s(68),
    height: s(64),
    borderRadius: s(10),
  },

  itemDetails: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: s(11),
    minWidth: 0,
  },

  itemName: {
    color: '#F4F0E7',
    fontFamily: 'serif',
    fontSize: s(16),
    lineHeight: s(20),
  },

  itemQuantity: {
    color: '#AAA69B',
    fontFamily: 'serif',
    fontSize: s(11),
    marginTop: s(5),
  },

  itemPrice: {
    color: '#D4AF37',
    fontFamily: 'serif',
    fontSize: s(14),
    fontWeight: '500',
    paddingRight: s(7),
  },

  /* ==========================================================
     DIVIDER
  ========================================================== */

  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#39372A',
    marginVertical: s(13),
  },

  /* ==========================================================
     TOTALS
  ========================================================== */

  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: s(11),
  },

  totalLabel: {
    color: '#C8C4BA',
    fontFamily: 'serif',
    fontSize: s(13),
  },

  totalValue: {
    color: '#F1EEE6',
    fontFamily: 'serif',
    fontSize: s(14),
  },

  finalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  finalCaption: {
    color: '#D4AF37',
    fontSize: s(9),
    fontWeight: '700',
    letterSpacing: s(2),
    marginBottom: s(3),
  },

  finalLabel: {
    color: '#F4F0E7',
    fontFamily: 'serif',
    fontSize: s(16),
  },

  finalValue: {
    color: '#D4AF37',
    fontFamily: 'serif',
    fontSize: s(25),
    fontWeight: '600',
  },

  /* ==========================================================
     PAYMENT METHOD
  ========================================================== */

  paymentTitle: {
    color: '#D4AF37',
    fontFamily: 'serif',
    fontSize: s(22),
    fontWeight: '400',
    marginBottom: s(10),
    paddingHorizontal: s(2),
  },

  paymentOption: {
    width: '100%',
    minHeight: s(70),
    backgroundColor: 'rgba(8, 20, 14, 0.94)',
    borderRadius: s(16),
    borderWidth: 1.5,
    borderColor: '#3E3B27',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(14),
    marginBottom: s(10),
  },

  selectedPayment: {
    borderColor: '#D4AF37',
    backgroundColor: 'rgba(13, 22, 16, 0.98)',
  },

  paymentIconBox: {
    width: s(44),
    height: s(44),
    borderRadius: s(22),
    borderWidth: 1,
    borderColor: '#51492B',
    backgroundColor: '#0B100D',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: s(12),
  },

  paymentIcon: {
    fontSize: s(21),
  },

  paymentDetails: {
    flex: 1,
  },

  paymentText: {
    color: '#F1EEE6',
    fontFamily: 'serif',
    fontSize: s(16),
  },

  paymentSubtext: {
    color: '#8F8B80',
    fontFamily: 'serif',
    fontSize: s(10),
    marginTop: s(3),
  },

  radio: {
    width: s(21),
    height: s(21),
    borderRadius: s(11),
    borderWidth: 1.8,
    borderColor: '#89857A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioSelected: {
    borderColor: '#D4AF37',
    backgroundColor: '#D4AF37',
  },

  /* ==========================================================
     PAY NOW
  ========================================================== */

  payButton: {
    width: '100%',
    height: s(52),
    backgroundColor: '#D4AF37',
    borderRadius: s(26),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: s(8),
  },

  payText: {
    color: '#080B09',
    fontSize: s(13),
    fontWeight: '700',
    letterSpacing: s(1.4),
  },

  payArrow: {
    color: '#080B09',
    fontSize: s(21),
    marginLeft: s(11),
    marginTop: -s(2),
  },

  secureNote: {
    color: '#77736A',
    fontFamily: 'serif',
    fontSize: s(10),
    textAlign: 'center',
    marginTop: s(13),
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

  navIcon: {
    color: '#E8E5DD',
    fontSize: s(23),
    height: s(27),
  },

  navText: {
    color: '#E8E5DD',
    fontSize: s(11),
    marginTop: s(2),
  },

});