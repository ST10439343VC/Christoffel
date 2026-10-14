import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const scale = Math.min(width / 393, 1.15);

const s = (value: number) => Math.round(value * scale);

const BACKGROUND_IMAGE =
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85';

export default function PaymentSuccessScreen({
  onHome,
  onTrackOrder,
}: {
  onHome: () => void;
  onTrackOrder: () => void;
}) {
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

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >

          {/* =====================================================
              CHRISTOFFEL BRANDING
          ===================================================== */}

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

          {/* =====================================================
              SUCCESS EMBLEM
          ===================================================== */}

          <View style={styles.successOuter}>

            <View style={styles.successCircle}>

              <Text style={styles.check}>
                ✓
              </Text>

            </View>

          </View>

          {/* =====================================================
              SUCCESS TITLE
          ===================================================== */}

          <Text style={styles.title}>
            Payment Successful
          </Text>

          <View style={styles.goldLine} />

          <Text style={styles.message}>
            Thank you for choosing Christoffel.
          </Text>

          <Text style={styles.subMessage}>
            Your payment has been processed and your order
            has been sent to the kitchen.
          </Text>

          {/* =====================================================
              CONFIRMATION CARD
          ===================================================== */}

          <View style={styles.confirmationCard}>

            <Text style={styles.cardEyebrow}>
              ORDER CONFIRMED
            </Text>

            <Text style={styles.confirmationTitle}>
              Your meal is on its way
            </Text>

            <Text style={styles.confirmationText}>
              Our kitchen team has received your order and
              preparation has now begun.
            </Text>

            {/* ESTIMATED TIME */}

            <View style={styles.timeBox}>

              <View style={styles.timeIconCircle}>

                <Text style={styles.timeIcon}>
                  ◷
                </Text>

              </View>

              <View style={styles.timeDetails}>

                <Text style={styles.timeLabel}>
                  ESTIMATED PREPARATION
                </Text>

                <Text style={styles.timeValue}>
                  18–25 min
                </Text>

              </View>

            </View>

          </View>

          {/* =====================================================
              ORDER JOURNEY
          ===================================================== */}

          <View style={styles.progressCard}>

            <Text style={styles.progressEyebrow}>
              ORDER JOURNEY
            </Text>

            <Text style={styles.progressTitle}>
              We are preparing your meal
            </Text>

            {/* STEP 1 */}

            <View style={styles.stepRow}>

              <View style={styles.stepIndicatorComplete}>

                <Text style={styles.stepCheck}>
                  ✓
                </Text>

              </View>

              <View style={styles.stepContent}>

                <Text style={styles.stepTitle}>
                  Order Confirmed
                </Text>

                <Text style={styles.stepDescription}>
                  Your order and payment have been received.
                </Text>

              </View>

            </View>

            <View style={styles.verticalLine} />

            {/* STEP 2 */}

            <View style={styles.stepRow}>

              <View style={styles.stepIndicatorActive}>

                <View style={styles.activeDot} />

              </View>

              <View style={styles.stepContent}>

                <Text style={styles.stepTitleActive}>
                  Preparing Your Meal
                </Text>

                <Text style={styles.stepDescription}>
                  Our kitchen is preparing your selected dishes.
                </Text>

              </View>

            </View>

            <View style={styles.verticalLine} />

            {/* STEP 3 */}

            <View style={styles.stepRow}>

              <View style={styles.stepIndicatorPending} />

              <View style={styles.stepContent}>

                <Text style={styles.stepTitlePending}>
                  Ready for Delivery
                </Text>

                <Text style={styles.stepDescription}>
                  Your order will be ready once preparation is complete.
                </Text>

              </View>

            </View>

          </View>

          {/* =====================================================
              TRACK ORDER
          ===================================================== */}

          <TouchableOpacity
            style={styles.trackButton}
            onPress={onTrackOrder}
            activeOpacity={0.8}
          >

            <Text style={styles.trackButtonText}>
              TRACK MY ORDER
            </Text>

            <Text style={styles.trackArrow}>
              →
            </Text>

          </TouchableOpacity>

          {/* =====================================================
              BACK HOME
          ===================================================== */}

          <TouchableOpacity
            style={styles.homeButton}
            onPress={onHome}
            activeOpacity={0.8}
          >

            <Text style={styles.homeButtonText}>
              BACK TO HOME
            </Text>

          </TouchableOpacity>

          {/* =====================================================
              FOOTER
          ===================================================== */}

          <Text style={styles.footerText}>
            Thank you for dining with Christoffel.
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
    backgroundColor: 'rgba(5, 18, 11, 0.88)',
  },

  scroll: {
    flex: 1,
  },

  content: {
    paddingHorizontal: s(20),
    paddingTop: s(20),
    paddingBottom: s(35),
    alignItems: 'center',
  },

  /* ==========================================================
     BRANDING
  ========================================================== */

  branding: {
    alignItems: 'center',
    marginBottom: s(24),
  },

  chefIcon: {
    color: '#D4AF37',
    fontSize: s(31),
    lineHeight: s(35),
    marginBottom: s(1),
  },

  brandName: {
    color: '#F5F1E8',
    fontSize: s(27),
    fontWeight: '500',
    letterSpacing: s(3.2),
    lineHeight: s(31),
    textAlign: 'center',
  },

  brandLineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: s(3),
  },

  smallGoldLine: {
    width: s(36),
    height: 1,
    backgroundColor: '#D4AF37',
    opacity: 0.85,
    marginHorizontal: s(8),
  },

  menuText: {
    color: '#D4AF37',
    fontSize: s(13),
    letterSpacing: s(5),
    lineHeight: s(17),
  },

  /* ==========================================================
     SUCCESS EMBLEM
  ========================================================== */

  successOuter: {
    width: s(126),
    height: s(126),
    borderRadius: s(63),
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: s(19),
  },

  successCircle: {
    width: s(104),
    height: s(104),
    borderRadius: s(52),
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
  },

  check: {
    color: '#080C09',
    fontSize: s(61),
    fontWeight: '300',
    lineHeight: s(68),
    marginTop: -s(7),
  },

  /* ==========================================================
     TITLE
  ========================================================== */

  title: {
    color: '#D4AF37',
    fontFamily: 'serif',
    fontSize: s(30),
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: s(37),
  },

  goldLine: {
    width: s(56),
    height: s(3),
    borderRadius: s(2),
    backgroundColor: '#D4AF37',
    marginTop: s(12),
    marginBottom: s(15),
  },

  message: {
    color: '#F5F1E8',
    fontFamily: 'serif',
    fontSize: s(17),
    textAlign: 'center',
    lineHeight: s(23),
  },

  subMessage: {
    color: '#AAA69C',
    fontFamily: 'serif',
    fontSize: s(12),
    lineHeight: s(19),
    textAlign: 'center',
    marginTop: s(6),
    maxWidth: s(330),
  },

  /* ==========================================================
     CONFIRMATION CARD
  ========================================================== */

  confirmationCard: {
    width: '100%',
    backgroundColor: 'rgba(8, 20, 14, 0.96)',
    borderRadius: s(19),
    borderWidth: 2,
    borderColor: '#5A512D',
    padding: s(17),
    marginTop: s(22),
  },

  cardEyebrow: {
    color: '#D4AF37',
    fontSize: s(9),
    fontWeight: '700',
    letterSpacing: s(2),
    marginBottom: s(4),
  },

  confirmationTitle: {
    color: '#F4F0E7',
    fontFamily: 'serif',
    fontSize: s(21),
    fontWeight: '400',
    lineHeight: s(27),
  },

  confirmationText: {
    color: '#AAA69C',
    fontFamily: 'serif',
    fontSize: s(12),
    lineHeight: s(18),
    marginTop: s(5),
  },

  /* ==========================================================
     TIME
  ========================================================== */

  timeBox: {
    width: '100%',
    height: s(68),
    backgroundColor: '#0A0F0C',
    borderRadius: s(13),
    borderWidth: 1,
    borderColor: '#3E3B27',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(12),
    marginTop: s(14),
  },

  timeIconCircle: {
    width: s(43),
    height: s(43),
    borderRadius: s(22),
    borderWidth: 1.5,
    borderColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: s(12),
  },

  timeIcon: {
    color: '#D4AF37',
    fontSize: s(24),
    marginTop: -s(2),
  },

  timeDetails: {
    flex: 1,
  },

  timeLabel: {
    color: '#8F8B80',
    fontSize: s(8),
    fontWeight: '700',
    letterSpacing: s(1.5),
  },

  timeValue: {
    color: '#D4AF37',
    fontFamily: 'serif',
    fontSize: s(20),
    marginTop: s(2),
  },

  /* ==========================================================
     ORDER JOURNEY
  ========================================================== */

  progressCard: {
    width: '100%',
    backgroundColor: 'rgba(8, 20, 14, 0.96)',
    borderRadius: s(19),
    borderWidth: 2,
    borderColor: '#5A512D',
    padding: s(17),
    marginTop: s(12),
  },

  progressEyebrow: {
    color: '#D4AF37',
    fontSize: s(9),
    fontWeight: '700',
    letterSpacing: s(2),
  },

  progressTitle: {
    color: '#F4F0E7',
    fontFamily: 'serif',
    fontSize: s(20),
    fontWeight: '400',
    marginTop: s(3),
    marginBottom: s(16),
  },

  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: s(54),
  },

  stepIndicatorComplete: {
    width: s(29),
    height: s(29),
    borderRadius: s(15),
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: s(11),
  },

  stepCheck: {
    color: '#080C09',
    fontSize: s(17),
    fontWeight: '700',
    marginTop: -s(2),
  },

  stepIndicatorActive: {
    width: s(29),
    height: s(29),
    borderRadius: s(15),
    borderWidth: 2,
    borderColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: s(11),
  },

  activeDot: {
    width: s(9),
    height: s(9),
    borderRadius: s(5),
    backgroundColor: '#D4AF37',
  },

  stepIndicatorPending: {
    width: s(29),
    height: s(29),
    borderRadius: s(15),
    borderWidth: 1.5,
    borderColor: '#5C5A50',
    marginRight: s(11),
  },

  stepContent: {
    flex: 1,
    paddingTop: s(1),
  },

  stepTitle: {
    color: '#F1EEE6',
    fontFamily: 'serif',
    fontSize: s(14),
  },

  stepTitleActive: {
    color: '#D4AF37',
    fontFamily: 'serif',
    fontSize: s(14),
  },

  stepTitlePending: {
    color: '#8F8B80',
    fontFamily: 'serif',
    fontSize: s(14),
  },

  stepDescription: {
    color: '#77736A',
    fontFamily: 'serif',
    fontSize: s(10),
    lineHeight: s(15),
    marginTop: s(3),
  },

  verticalLine: {
    width: 1,
    height: s(21),
    backgroundColor: '#403D2D',
    marginLeft: s(14),
    marginVertical: -s(1),
  },

  /* ==========================================================
     TRACK BUTTON
  ========================================================== */

  trackButton: {
    width: '100%',
    height: s(54),
    backgroundColor: '#D4AF37',
    borderRadius: s(27),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: s(16),
  },

  trackButtonText: {
    color: '#080C09',
    fontSize: s(13),
    fontWeight: '700',
    letterSpacing: s(1.4),
  },

  trackArrow: {
    color: '#080C09',
    fontSize: s(21),
    marginLeft: s(11),
    marginTop: -s(2),
  },

  /* ==========================================================
     HOME BUTTON
  ========================================================== */

  homeButton: {
    width: '100%',
    height: s(52),
    backgroundColor: '#0A0F0C',
    borderRadius: s(26),
    borderWidth: 1.5,
    borderColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: s(10),
  },

  homeButtonText: {
    color: '#D4AF37',
    fontSize: s(12),
    fontWeight: '600',
    letterSpacing: s(1.2),
  },

  /* ==========================================================
     FOOTER
  ========================================================== */

  footerText: {
    color: '#66635B',
    fontFamily: 'serif',
    fontSize: s(10),
    textAlign: 'center',
    marginTop: s(17),
  },

});