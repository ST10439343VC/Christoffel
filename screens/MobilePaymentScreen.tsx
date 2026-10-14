import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
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

export default function MobilePaymentScreen({
  onBack,
  onPaymentSuccess,
  selected,
  menuItems,
}: {
  onBack: () => void;
  onPaymentSuccess: () => void;
  selected: { [key: string]: number };
  menuItems: MenuItem[];
}) {

  const [mobileNumber, setMobileNumber] = useState('');
  const [reference, setReference] = useState('');

  /* ==========================================================
     SELECTED ITEMS
  ========================================================== */

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

  const totalItems = Object.values(selected).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

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
            HEADER
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

          {/* CHRISTOFFEL BRANDING */}

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

            <Text
              style={styles.pageTitle}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.70}
            >
              Mobile Payment
            </Text>

            <Text
              style={styles.pageSubtitle}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.70}
            >
              Enter your mobile payment details
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
          keyboardShouldPersistTaps="handled"
        >

          {/* =================================================
              AMOUNT TO PAY
          ================================================= */}

          <View style={styles.totalCard}>

            <Text style={styles.totalEyebrow}>
              AMOUNT TO PAY
            </Text>

            <Text style={styles.totalAmount}>
              R{total.toFixed(2)}
            </Text>

            <Text style={styles.totalItems}>
              {totalItems}{' '}
              {totalItems === 1
                ? 'selected item'
                : 'selected items'}
            </Text>

          </View>

          {/* =================================================
              SELECTED MEALS
          ================================================= */}

          <View style={styles.orderCard}>

            <Text style={styles.orderEyebrow}>
              YOUR ORDER
            </Text>

            <Text style={styles.orderTitle}>
              Selected Meals
            </Text>

            {selectedItems.map(item => (

              <View
                key={item.id}
                style={styles.orderItem}
              >

                {/* FOOD PICTURE */}

                <Image
                  source={{
                    uri: item.image,
                  }}
                  style={styles.orderImage}
                  resizeMode="cover"
                />

                {/* DETAILS */}

                <View style={styles.orderDetails}>

                  <Text
                    style={styles.orderItemName}
                    numberOfLines={2}
                  >
                    {item.name}
                  </Text>

                  <Text style={styles.orderItemQuantity}>
                    × {selected[item.name]}
                  </Text>

                </View>

                {/* ITEM TOTAL */}

                <Text style={styles.orderItemPrice}>
                  R{(
                    item.price *
                    selected[item.name]
                  ).toFixed(2)}
                </Text>

              </View>

            ))}

          </View>

          {/* =================================================
              MOBILE PAYMENT DETAILS
          ================================================= */}

          <View style={styles.paymentSection}>

            <Text style={styles.sectionEyebrow}>
              SECURE PAYMENT
            </Text>

            <Text style={styles.sectionTitle}>
              Mobile Payment Details
            </Text>

            {/* MOBILE NUMBER */}

            <Text style={styles.label}>
              Mobile Number
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter mobile number"
              placeholderTextColor="#777E78"
              keyboardType="phone-pad"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              maxLength={10}
            />

            {/* PAYMENT PROVIDER */}

            <Text style={styles.label}>
              Payment Provider
            </Text>

            <View style={styles.providerCard}>

              <View style={styles.providerIcon}>

                <Text style={styles.providerIconText}>
                  M
                </Text>

              </View>

              <View style={styles.providerDetails}>

                <Text style={styles.providerTitle}>
                  Mobile Wallet
                </Text>

                <Text style={styles.providerSubtitle}>
                  Secure mobile payment
                </Text>

              </View>

              <View style={styles.providerCheck}>

                <Text style={styles.checkText}>
                  ✓
                </Text>

              </View>

            </View>

            {/* PAYMENT REFERENCE */}

            <Text style={styles.label}>
              Payment Reference
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter payment reference"
              placeholderTextColor="#777E78"
              value={reference}
              onChangeText={setReference}
              autoCapitalize="characters"
            />

          </View>

          {/* =================================================
              ORDER SUMMARY
          ================================================= */}

          <View style={styles.summaryCard}>

            <Text style={styles.summaryEyebrow}>
              ORDER TOTAL
            </Text>

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
                Service Fee (10%)
              </Text>

              <Text style={styles.summaryValue}>
                R{serviceFee.toFixed(2)}
              </Text>

            </View>

            <View style={styles.divider} />

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

          <Text style={styles.demoText}>
            This is a simulated mobile payment for demonstration purposes.
          </Text>

        </ScrollView>

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
    fontSize: s(39),
    fontWeight: '400',
    lineHeight: s(45),
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
    paddingBottom: s(30),
  },

  /* ==========================================================
     TOTAL CARD
  ========================================================== */

  totalCard: {
    width: '100%',
    backgroundColor: 'rgba(8, 20, 14, 0.96)',
    borderRadius: s(18),
    borderWidth: 2,
    borderColor: '#5A512D',
    paddingVertical: s(18),
    paddingHorizontal: s(15),
    alignItems: 'center',
    marginBottom: s(12),
  },

  totalEyebrow: {
    color: '#D4AF37',
    fontSize: s(9),
    fontWeight: '700',
    letterSpacing: s(2),
    marginBottom: s(4),
  },

  totalAmount: {
    color: '#D4AF37',
    fontFamily: 'serif',
    fontSize: s(32),
    fontWeight: '500',
  },

  totalItems: {
    color: '#8F8B80',
    fontFamily: 'serif',
    fontSize: s(11),
    marginTop: s(4),
  },

  /* ==========================================================
     ORDER CARD
  ========================================================== */

  orderCard: {
    width: '100%',
    backgroundColor: 'rgba(8, 20, 14, 0.96)',
    borderRadius: s(18),
    borderWidth: 2,
    borderColor: '#5A512D',
    padding: s(16),
    marginBottom: s(12),
  },

  orderEyebrow: {
    color: '#D4AF37',
    fontSize: s(9),
    fontWeight: '700',
    letterSpacing: s(2),
  },

  orderTitle: {
    color: '#F4F0E7',
    fontFamily: 'serif',
    fontSize: s(21),
    fontWeight: '400',
    marginTop: s(3),
    marginBottom: s(12),
  },

  orderItem: {
    width: '100%',
    minHeight: s(74),
    backgroundColor: 'rgba(14, 22, 17, 0.92)',
    borderRadius: s(12),
    borderWidth: 1,
    borderColor: '#3E3B27',
    flexDirection: 'row',
    alignItems: 'center',
    padding: s(7),
    marginBottom: s(8),
  },

  orderImage: {
    width: s(62),
    height: s(60),
    borderRadius: s(9),
  },

  orderDetails: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: s(10),
    minWidth: 0,
  },

  orderItemName: {
    color: '#F4F0E7',
    fontFamily: 'serif',
    fontSize: s(15),
    lineHeight: s(19),
  },

  orderItemQuantity: {
    color: '#99958A',
    fontFamily: 'serif',
    fontSize: s(10),
    marginTop: s(4),
  },

  orderItemPrice: {
    color: '#D4AF37',
    fontFamily: 'serif',
    fontSize: s(14),
    fontWeight: '500',
    paddingRight: s(6),
  },

  /* ==========================================================
     MOBILE PAYMENT SECTION
  ========================================================== */

  paymentSection: {
    width: '100%',
    backgroundColor: 'rgba(8, 20, 14, 0.96)',
    borderRadius: s(18),
    borderWidth: 2,
    borderColor: '#5A512D',
    padding: s(17),
    marginBottom: s(12),
  },

  sectionEyebrow: {
    color: '#D4AF37',
    fontSize: s(9),
    fontWeight: '700',
    letterSpacing: s(2),
    marginBottom: s(3),
  },

  sectionTitle: {
    color: '#F4F0E7',
    fontFamily: 'serif',
    fontSize: s(22),
    fontWeight: '400',
    marginBottom: s(16),
  },

  label: {
    color: '#C8C4BA',
    fontFamily: 'serif',
    fontSize: s(12),
    marginBottom: s(6),
  },

  input: {
    height: s(48),
    backgroundColor: '#080C09',
    borderWidth: 1,
    borderColor: '#3E3B27',
    borderRadius: s(11),
    paddingHorizontal: s(13),
    color: '#F1EEE6',
    fontFamily: 'serif',
    fontSize: s(13),
    marginBottom: s(14),
  },

  /* ==========================================================
     PROVIDER
  ========================================================== */

  providerCard: {
    width: '100%',
    height: s(70),
    backgroundColor: '#080C09',
    borderWidth: 1.5,
    borderColor: '#D4AF37',
    borderRadius: s(13),
    paddingHorizontal: s(12),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: s(15),
  },

  providerIcon: {
    width: s(44),
    height: s(44),
    borderRadius: s(22),
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: s(12),
  },

  providerIconText: {
    color: '#080B09',
    fontSize: s(22),
    fontWeight: '500',
  },

  providerDetails: {
    flex: 1,
  },

  providerTitle: {
    color: '#F1EEE6',
    fontFamily: 'serif',
    fontSize: s(16),
  },

  providerSubtitle: {
    color: '#8F8B80',
    fontFamily: 'serif',
    fontSize: s(10),
    marginTop: s(3),
  },

  providerCheck: {
    width: s(24),
    height: s(24),
    borderRadius: s(12),
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkText: {
    color: '#080B09',
    fontSize: s(14),
    fontWeight: '700',
  },

  /* ==========================================================
     SUMMARY
  ========================================================== */

  summaryCard: {
    width: '100%',
    backgroundColor: 'rgba(8, 20, 14, 0.96)',
    borderRadius: s(18),
    borderWidth: 2,
    borderColor: '#5A512D',
    padding: s(17),
    marginBottom: s(4),
  },

  summaryEyebrow: {
    color: '#D4AF37',
    fontSize: s(9),
    fontWeight: '700',
    letterSpacing: s(2),
    marginBottom: s(14),
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: s(11),
  },

  summaryLabel: {
    color: '#C8C4BA',
    fontFamily: 'serif',
    fontSize: s(13),
  },

  summaryValue: {
    color: '#F1EEE6',
    fontFamily: 'serif',
    fontSize: s(14),
  },

  divider: {
    height: 1,
    backgroundColor: '#39372A',
    marginVertical: s(10),
  },

  finalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
     PAY BUTTON
  ========================================================== */

  payButton: {
    width: '100%',
    height: s(52),
    backgroundColor: '#D4AF37',
    borderRadius: s(26),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: s(12),
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

  demoText: {
    color: '#77736A',
    fontFamily: 'serif',
    fontSize: s(10),
    textAlign: 'center',
    lineHeight: s(15),
    marginTop: s(13),
  },

});