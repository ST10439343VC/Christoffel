import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';

import { useWebSelection } from '../context/WebSelectionContext';
import { MenuItem } from '../../data/menuData';

const backgroundImage = require('../../assets/christoffel-background.png');

type PaymentWebProps = {
  onBack: () => void;
  onHome: () => void;
  onPaymentSuccess: (paymentMethod: string) => void;
  menuItems: MenuItem[];
};

export default function PaymentWeb({
  onBack,
  onHome,
  onPaymentSuccess,
  menuItems,
}: PaymentWebProps) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const imageStripX = useRef(new Animated.Value(0)).current;
  const processingSpin = useRef(new Animated.Value(0)).current;

  const { selection, subtotal } = useWebSelection();

  const galleryImages = menuItems.filter((item) => item.image).slice(0, 6);

  useEffect(() => {
    if (galleryImages.length === 0) return;
    const distance = galleryImages.length * 232;
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(imageStripX, {
          toValue: -distance,
          duration: 18000,
          useNativeDriver: true,
        }),
        Animated.timing(imageStripX, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [galleryImages.length, imageStripX]);

  useEffect(() => {
    if (!isProcessing) {
      processingSpin.setValue(0);
      return;
    }

    const animation = Animated.loop(
      Animated.timing(processingSpin, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    );

    animation.start();

    return () => animation.stop();
  }, [isProcessing, processingSpin]);

  const serviceFee = subtotal * 0.10;
  const total = subtotal + serviceFee;

  const handlePayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess(paymentMethod);
    }, 3000);
  };

  if (isProcessing) {
    const spin = processingSpin.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <ImageBackground
        source={backgroundImage}
        style={styles.processingContainer}
        resizeMode="cover"
      >
        <View style={styles.processingOverlay} />

        <View style={styles.processingContent}>
          <Animated.View
            style={[
              styles.processingSpinner,
              {
                transform: [{ rotate: spin }],
              },
            ]}
          />

          <Text style={styles.processingEyebrow}>
            CHRISTOFFEL RESTAURANT
          </Text>

          <Text style={styles.processingTitle}>
            Payment Processing
          </Text>

          <Text style={styles.processingSubtitle}>
            Please wait while we securely process your payment.
          </Text>

          <View style={styles.processingLine} />

          <Text style={styles.processingOrderText}>
            YOUR ORDER IS BEING CONFIRMED
          </Text>
        </View>
      </ImageBackground>
    );
  }

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
        showsVerticalScrollIndicator={false}
      >
        {/* WEBSITE HEADER */}
        <View style={styles.header}>
          <Pressable
            onPress={onHome}
            style={styles.logoArea}
          >
            <Text style={styles.logo}>CHRISTOFFEL</Text>
            <Text style={styles.logoSub}>
              RESTAURANT &amp; KITCHEN
            </Text>
          </Pressable>

          <View style={styles.headerRight}>
            <Pressable
              onPress={onHome}
              style={styles.navButton}
            >
              <Text style={styles.navText}>HOME</Text>
            </Pressable>

            <Pressable
              onPress={onBack}
              style={styles.navButton}
            >
              <Text style={styles.navText}>MENU</Text>
            </Pressable>

            <View style={styles.currentPage}>
              <Text style={styles.currentPageText}>
                CHECKOUT
              </Text>
            </View>
          </View>
        </View>

        {/* MAIN WEBSITE CONTENT */}
        <View style={styles.content}>

          {/* INTRO */}
          <View style={styles.intro}>
            <View style={styles.introLeft}>
              <Text style={styles.eyebrow}>
                CHRISTOFFEL RESTAURANT
              </Text>

              <Text style={styles.title}>
                Complete Your Order
              </Text>

              <Text style={styles.subtitle}>
                Review your selection and choose your preferred
                payment method.
              </Text>

              <View style={styles.goldLine} />
            </View>

            {/* MINIMAL CHECKOUT PROGRESS — fills the hero space without adding another nav */}
            <View style={styles.introProgress}>
              <View style={styles.progressLine} />

              <View style={styles.progressStep}>
                <Text style={styles.progressNumber}>01</Text>
                <Text style={styles.progressLabel}>REVIEW ORDER</Text>
              </View>

              <View style={styles.progressStep}>
                <Text style={styles.progressNumber}>02</Text>
                <Text style={styles.progressLabel}>CHOOSE PAYMENT</Text>
              </View>

              <View style={styles.progressStep}>
                <Text style={styles.progressNumber}>03</Text>
                <Text style={styles.progressLabel}>CONFIRM ORDER</Text>
              </View>
            </View>
          </View>

          {/* DESKTOP CHECKOUT GRID */}
          <View style={styles.checkoutGrid}>

            {/* LEFT — ORDER */}
            <View style={styles.orderColumn}>
              <View style={styles.sectionHeading}>
                <Text style={styles.sectionNumber}>01</Text>

                <View>
                  <Text style={styles.sectionTitle}>
                    YOUR ORDER
                  </Text>

                  <Text style={styles.sectionCaption}>
                    Selected dishes
                  </Text>
                </View>
              </View>

              <View style={styles.orderPanel}>

                {selection.length === 0 ? (
                  <View style={styles.emptyOrder}>
                    <Text style={styles.emptyOrderTitle}>
                      YOUR SELECTION IS EMPTY
                    </Text>

                    <Text style={styles.emptyOrderText}>
                      Return to the menu to add dishes to your order.
                    </Text>

                    <Pressable
                      onPress={onBack}
                      style={styles.returnButton}
                    >
                      <Text style={styles.returnButtonText}>
                        RETURN TO MENU
                      </Text>
                    </Pressable>
                  </View>
                ) : (
                  <>
                    {selection.map(({ item, quantity }, index) => (
                      <View
                        key={item.id}
                        style={[
                          styles.orderItem,
                          index !== selection.length - 1 &&
                            styles.orderItemBorder,
                        ]}
                      >
                        {/* IMAGE */}
                        <Image
                          source={{ uri: item.image }}
                          style={styles.orderItemImage}
                          resizeMode="cover"
                        />

                        {/* INFO */}
                        <View style={styles.orderItemInfo}>
                          <Text style={styles.courseLabel}>
                            {item.course === 'Main Course'
                              ? 'MAIN COURSE'
                              : item.course.toUpperCase()}
                          </Text>

                          <Text style={styles.orderItemName}>
                            {item.name}
                          </Text>

                          <Text style={styles.orderItemQuantity}>
                            QUANTITY&nbsp;&nbsp;× {quantity}
                          </Text>
                        </View>

                        {/* PRICE */}
                        <View style={styles.orderItemPriceArea}>
                          <Text style={styles.orderItemPrice}>
                            R{(item.price * quantity).toFixed(2)}
                          </Text>
                        </View>
                      </View>
                    ))}

                    {/* TOTALS */}
                    <View style={styles.totals}>
                      <View style={styles.totalLine}>
                        <Text style={styles.totalLabel}>
                          SUBTOTAL
                        </Text>

                        <Text style={styles.totalAmount}>
                          R{subtotal.toFixed(2)}
                        </Text>
                      </View>

                      <View style={styles.totalLine}>
                        <Text style={styles.totalLabel}>
                          SERVICE FEE
                        </Text>

                        <Text style={styles.totalAmount}>
                          R{serviceFee.toFixed(2)}
                        </Text>
                      </View>

                      <View style={styles.totalDivider} />

                      <View style={styles.grandTotal}>
                        <Text style={styles.grandTotalLabel}>
                          TOTAL
                        </Text>

                        <Text style={styles.grandTotalAmount}>
                          R{total.toFixed(2)}
                        </Text>
                      </View>
                    </View>
                  </>
                )}
              </View>
            </View>

            {/* RIGHT — PAYMENT */}
            <View style={styles.paymentColumn}>

              <View style={styles.sectionHeading}>
                <Text style={styles.sectionNumber}>02</Text>

                <View>
                  <Text style={styles.sectionTitle}>
                    PAYMENT
                  </Text>

                  <Text style={styles.sectionCaption}>
                    Choose payment method
                  </Text>
                </View>
              </View>

              <View style={styles.paymentPanel}>

                {/* CARD */}
                <Pressable
                  onPress={() => setPaymentMethod('card')}
                  style={[
                    styles.paymentOption,
                    paymentMethod === 'card' &&
                      styles.paymentOptionActive,
                  ]}
                >
                  <View
                    style={[
                      styles.radio,
                      paymentMethod === 'card' &&
                        styles.radioActive,
                    ]}
                  >
                    {paymentMethod === 'card' && (
                      <View style={styles.radioInner} />
                    )}
                  </View>

                  <View style={styles.paymentTextArea}>
                    <Text style={styles.paymentName}>
                      Card Payment
                    </Text>

                    <Text style={styles.paymentDescription}>
                      Credit or debit card
                    </Text>
                  </View>

                  <Text style={styles.paymentArrow}>
                    →
                  </Text>
                </Pressable>

                {/* MOBILE */}
                <Pressable
                  onPress={() => setPaymentMethod('mobile')}
                  style={[
                    styles.paymentOption,
                    paymentMethod === 'mobile' &&
                      styles.paymentOptionActive,
                  ]}
                >
                  <View
                    style={[
                      styles.radio,
                      paymentMethod === 'mobile' &&
                        styles.radioActive,
                    ]}
                  >
                    {paymentMethod === 'mobile' && (
                      <View style={styles.radioInner} />
                    )}
                  </View>

                  <View style={styles.paymentTextArea}>
                    <Text style={styles.paymentName}>
                      Mobile Payment
                    </Text>

                    <Text style={styles.paymentDescription}>
                      SnapScan, Zapper, or EFT
                    </Text>
                  </View>

                  <Text style={styles.paymentArrow}>
                    →
                  </Text>
                </Pressable>

                {/* CASH */}
                <Pressable
                  onPress={() => setPaymentMethod('cash')}
                  style={[
                    styles.paymentOption,
                    paymentMethod === 'cash' &&
                      styles.paymentOptionActive,
                  ]}
                >
                  <View
                    style={[
                      styles.radio,
                      paymentMethod === 'cash' &&
                        styles.radioActive,
                    ]}
                  >
                    {paymentMethod === 'cash' && (
                      <View style={styles.radioInner} />
                    )}
                  </View>

                  <View style={styles.paymentTextArea}>
                    <Text style={styles.paymentName}>
                      Cash on Collection
                    </Text>

                    <Text style={styles.paymentDescription}>
                      Pay when you collect
                    </Text>
                  </View>

                  <Text style={styles.paymentArrow}>
                    →
                  </Text>
                </Pressable>

                {/* PAYMENT ACTION */}
                <View style={styles.paymentAction}>
                  <Text style={styles.secureText}>
                    🔒&nbsp;&nbsp; SECURE PAYMENT PROCESSING
                  </Text>

                  <Pressable
                    onPress={handlePayment}
                    disabled={isProcessing || selection.length === 0}
                    style={[
                      styles.payButton,
                      (isProcessing || selection.length === 0) &&
                        styles.payButtonDisabled,
                    ]}
                  >
                    <Text style={styles.payButtonText}>
                      {isProcessing
                        ? 'PROCESSING...'
                        : `PAY R${total.toFixed(2)}`}
                    </Text>

                    {!isProcessing && (
                      <Text style={styles.payButtonArrow}>
                        →
                      </Text>
                    )}
                  </Pressable>

                  <Pressable
                    onPress={onBack}
                    style={styles.backToMenu}
                  >
                    <Text style={styles.backToMenuText}>
                      ← BACK TO MENU
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>

          {/* BOTTOM BRAND / MOVING IMAGE STRIP */}
          <View style={styles.gallerySection}>
            <View style={styles.galleryHeader}>
              <Text style={styles.galleryEyebrow}>FROM OUR KITCHEN</Text>
              <Text style={styles.galleryCaption}>GOOD FOOD. GOOD COMPANY.</Text>
            </View>

            <View style={styles.galleryViewport}>
              <Animated.View style={[styles.galleryTrack, { transform: [{ translateX: imageStripX }] }]}>
                {[...galleryImages, ...galleryImages].map((item, index) => (
                  <View key={`${item.id}-${index}`} style={styles.galleryCard}>
                    <Image source={{ uri: item.image }} style={styles.galleryImage} resizeMode="cover" />
                    <View style={styles.galleryImageOverlay} />
                    <View style={styles.galleryCardLabel}>
                      <Text style={styles.galleryCardCourse}>{item.course === 'Main Course' ? 'MAIN COURSE' : item.course.toUpperCase()}</Text>
                      <Text style={styles.galleryCardName}>{item.name}</Text>
                    </View>
                  </View>
                ))}
              </Animated.View>
            </View>

            <View style={styles.bottomStrip}>
              <Text style={styles.bottomStripText}>CHRISTOFFEL</Text>
              <View style={styles.bottomStripLine} />
              <Text style={styles.bottomStripCaption}>RESTAURANT &amp; KITCHEN</Text>
            </View>
          </View>

        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  processingContainer: {
    flex: 1,
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#07130F',
    alignItems: 'center',
    justifyContent: 'center',
  },

  processingOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(3, 12, 8, 0.82)',
  },

  processingContent: {
    width: '90%',
    maxWidth: 620,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  processingSpinner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: 'rgba(212, 175, 55, 0.22)',
    borderTopColor: '#D4AF37',
    marginBottom: 34,
  },

  processingEyebrow: {
    color: '#D4AF37',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 4,
    marginBottom: 16,
    textAlign: 'center',
  },

  processingTitle: {
    color: '#F5F1E8',
    fontSize: 42,
    fontWeight: '400',
    letterSpacing: 1,
    textAlign: 'center',
  },

  processingSubtitle: {
    color: '#9BA49D',
    fontSize: 13,
    lineHeight: 21,
    marginTop: 14,
    maxWidth: 430,
    textAlign: 'center',
  },

  processingLine: {
    width: 58,
    height: 2,
    backgroundColor: '#D4AF37',
    marginTop: 28,
    marginBottom: 20,
  },

  processingOrderText: {
    color: '#68736B',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 2,
    textAlign: 'center',
  },

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
    paddingBottom: 80,
  },

  /* =========================
     WEBSITE HEADER
  ========================= */

  header: {
    height: 92,
    paddingHorizontal: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(3, 10, 7, 0.82)',

    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 175, 55, 0.18)',
  },

  logoArea: {
    justifyContent: 'center',
  },

  logo: {
    color: '#F5F1E8',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 4,
  },

  logoSub: {
    color: '#D4AF37',
    fontSize: 8,
    letterSpacing: 2.5,
    marginTop: 5,
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 34,
  },

  navButton: {
    paddingVertical: 10,
  },

  navText: {
    color: '#A8B0AA',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2,
  },

  currentPage: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D4AF37',
  },

  currentPageText: {
    color: '#D4AF37',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
  },

  /* =========================
     MAIN CONTENT
  ========================= */

  content: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
    paddingHorizontal: 70,
  },

  intro: {
    paddingTop: 92,
    paddingBottom: 68,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 70,
  },

  introLeft: {
    flex: 1,
  },

  introProgress: {
    width: 330,
    paddingRight: 18,
    paddingVertical: 8,
    position: 'relative',
  },

  progressLine: {
    position: 'absolute',
    left: 2,
    top: 20,
    bottom: 20,
    width: 1,
    backgroundColor: 'rgba(212, 175, 55, 0.32)',
  },

  progressStep: {
    minHeight: 62,
    paddingLeft: 26,
    justifyContent: 'center',
  },

  progressNumber: {
    color: '#D4AF37',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 6,
  },

  progressLabel: {
    color: '#9BA49D',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 2,
  },

  eyebrow: {
    color: '#D4AF37',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 4,
    marginBottom: 18,
  },

  title: {
    color: '#F5F1E8',
    fontSize: 56,
    fontWeight: '400',
    letterSpacing: -1,
  },

  subtitle: {
    color: '#AEB6AF',
    fontSize: 15,
    lineHeight: 24,
    marginTop: 14,
    maxWidth: 560,
  },

  goldLine: {
    width: 64,
    height: 2,
    backgroundColor: '#D4AF37',
    marginTop: 30,
  },

  /* =========================
     CHECKOUT GRID
  ========================= */

  checkoutGrid: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 44,
  },

  orderColumn: {
    flex: 1.25,
  },

  paymentColumn: {
    flex: 0.9,
  },

  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },

  sectionNumber: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    marginRight: 14,
  },

  sectionTitle: {
    color: '#F5F1E8',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2.5,
  },

  sectionCaption: {
    color: '#707A73',
    fontSize: 11,
    marginTop: 5,
    letterSpacing: 0.5,
  },

  /* =========================
     ORDER PANEL
  ========================= */

  orderPanel: {
    backgroundColor: 'rgba(3, 10, 7, 0.48)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.18)',
    paddingHorizontal: 24,
  },

  orderItem: {
    minHeight: 112,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },

  orderItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(245, 241, 232, 0.08)',
  },

  orderItemImage: {
    width: 88,
    height: 88,
    borderRadius: 4,
    marginRight: 20,
  },

  orderItemInfo: {
    flex: 1,
    justifyContent: 'center',
  },

  courseLabel: {
    color: '#D4AF37',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 7,
  },

  orderItemName: {
    color: '#F5F1E8',
    fontSize: 17,
    fontWeight: '500',
  },

  orderItemQuantity: {
    color: '#737D76',
    fontSize: 10,
    letterSpacing: 1.2,
    marginTop: 9,
  },

  orderItemPriceArea: {
    paddingLeft: 20,
  },

  orderItemPrice: {
    color: '#D4AF37',
    fontSize: 15,
    fontWeight: '600',
  },

  /* =========================
     TOTALS
  ========================= */

  totals: {
    paddingTop: 24,
    paddingBottom: 24,
  },

  totalLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  totalLabel: {
    color: '#7D877F',
    fontSize: 10,
    letterSpacing: 1.5,
  },

  totalAmount: {
    color: '#C6CCC7',
    fontSize: 13,
  },

  totalDivider: {
    height: 1,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    marginVertical: 15,
  },

  grandTotal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  grandTotalLabel: {
    color: '#F5F1E8',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
  },

  grandTotalAmount: {
    color: '#D4AF37',
    fontSize: 25,
    fontWeight: '700',
  },

  /* =========================
     EMPTY ORDER
  ========================= */

  emptyOrder: {
    paddingVertical: 55,
    alignItems: 'center',
  },

  emptyOrderTitle: {
    color: '#F5F1E8',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
  },

  emptyOrderText: {
    color: '#7D877F',
    fontSize: 12,
    marginTop: 10,
  },

  returnButton: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#D4AF37',
    paddingHorizontal: 22,
    paddingVertical: 12,
  },

  returnButtonText: {
    color: '#D4AF37',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },

  /* =========================
     PAYMENT PANEL
  ========================= */

  paymentPanel: {
    flex: 1,
    backgroundColor: 'rgba(3, 10, 7, 0.48)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.18)',
    padding: 24,
  },

  paymentOption: {
    minHeight: 82,
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 16,

    borderWidth: 1,
    borderColor: 'rgba(245, 241, 232, 0.10)',

    marginBottom: 10,

    backgroundColor: 'rgba(3, 10, 7, 0.28)',
  },

  paymentOptionActive: {
    borderColor: 'rgba(212, 175, 55, 0.65)',
    backgroundColor: 'rgba(212, 175, 55, 0.055)',
  },

  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,

    borderWidth: 1,
    borderColor: '#69736C',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 16,
  },

  radioActive: {
    borderColor: '#D4AF37',
  },

  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D4AF37',
  },

  paymentTextArea: {
    flex: 1,
  },

  paymentName: {
    color: '#F5F1E8',
    fontSize: 14,
    fontWeight: '500',
  },

  paymentDescription: {
    color: '#737D76',
    fontSize: 11,
    marginTop: 5,
  },

  paymentArrow: {
    color: '#D4AF37',
    fontSize: 17,
    marginLeft: 10,
  },

  /* =========================
     PAYMENT ACTION
  ========================= */

  paymentAction: {
    paddingTop: 25,
    marginTop: 20,
  },

  secureText: {
    color: '#667169',
    fontSize: 9,
    letterSpacing: 1.5,
    marginBottom: 17,
  },

  payButton: {
    height: 58,

    backgroundColor: '#D4AF37',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: 24,
  },

  payButtonDisabled: {
    opacity: 0.55,
  },

  payButtonText: {
    color: '#07130F',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
  },

  payButtonArrow: {
    color: '#07130F',
    fontSize: 19,
    marginLeft: 14,
  },

  backToMenu: {
    alignItems: 'center',
    paddingVertical: 18,
  },

  backToMenuText: {
    color: '#8D968F',
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1.5,
  },

  /* =========================
     MOVING FOOD GALLERY
  ========================= */

  gallerySection: {
    marginTop: 100,
  },

  galleryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  galleryEyebrow: {
    color: '#D4AF37',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2.5,
  },

  galleryCaption: {
    color: '#626D65',
    fontSize: 9,
    letterSpacing: 2,
  },

  galleryViewport: {
    width: '100%',
    overflow: 'hidden',
    height: 190,
  },

  galleryTrack: {
    flexDirection: 'row',
  },

  galleryCard: {
    width: 220,
    height: 190,
    marginRight: 12,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#07130F',
  },

  galleryImage: {
    width: '100%',
    height: '100%',
  },

  galleryImageOverlay: {
    position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
    backgroundColor: 'rgba(3, 12, 8, 0.35)',
  },

  galleryCardLabel: {
    position: 'absolute', left: 16, right: 16, bottom: 15,
  },

  galleryCardCourse: {
    color: '#D4AF37', fontSize: 7, fontWeight: '700', letterSpacing: 1.8, marginBottom: 5,
  },

  galleryCardName: {
    color: '#F5F1E8', fontSize: 13, fontWeight: '500',
  },

  /* =========================
     BOTTOM BRAND
  ========================= */

  bottomStrip: {
    marginTop: 100,
    paddingTop: 28,
    borderTopWidth: 1,
    borderTopColor: 'rgba(212, 175, 55, 0.15)',

    flexDirection: 'row',
    alignItems: 'center',
  },

  bottomStripText: {
    color: '#D4AF37',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
  },

  bottomStripLine: {
    width: 45,
    height: 1,
    backgroundColor: 'rgba(212, 175, 55, 0.4)',
    marginHorizontal: 18,
  },

  bottomStripCaption: {
    color: '#626D65',
    fontSize: 9,
    letterSpacing: 2,
  },
});