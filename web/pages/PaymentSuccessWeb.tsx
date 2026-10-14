import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';

import { MenuItem } from '../../data/menuData';

const backgroundImage = require('../../assets/christoffel-background.png');

type OrderStatus = 'received' | 'preparing' | 'ready' | 'completed';

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

type PaymentSuccessWebProps = {
  order: Order;
  menuItems: MenuItem[];
  onHome: () => void;
  onContinueShopping: () => void;
  onTrackOrder: () => void;
};

export default function PaymentSuccessWeb({
  order,
  menuItems,
  onHome,
  onContinueShopping,
  onTrackOrder,
}: PaymentSuccessWebProps) {
  const orderedItems = Object.entries(order.items)
    .map(([name, quantity]) => {
      const item = menuItems.find(menuItem => menuItem.name === name);
      return item ? { item, quantity } : null;
    })
    .filter(Boolean) as { item: MenuItem; quantity: number }[];

  const totalItems = orderedItems.reduce(
    (sum, entry) => sum + entry.quantity,
    0
  );

  const paymentLabel =
    order.paymentMethod === 'mobile'
      ? 'MOBILE PAYMENT'
      : order.paymentMethod === 'cash'
        ? 'CASH ON COLLECTION'
        : 'CARD PAYMENT';

  const statusLabel =
    order.status === 'received'
      ? 'ORDER RECEIVED'
      : order.status === 'preparing'
        ? 'PREPARING'
        : order.status === 'ready'
          ? 'READY FOR COLLECTION'
          : 'COMPLETED';

  const estimatedMinutes = Math.max(
    0,
    Math.ceil((order.estimatedReadyAt - order.createdAt) / 60000)
  );

  const estimatedTime = `${Math.max(1, estimatedMinutes - 5)}–${estimatedMinutes} MINUTES`;

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
        <View style={styles.header}>
          <Pressable onPress={onHome} style={styles.logoArea}>
            <Text style={styles.logo}>CHRISTOFFEL</Text>
            <Text style={styles.logoSub}>RESTAURANT &amp; KITCHEN</Text>
          </Pressable>

          <View style={styles.headerRight}>
            <Pressable onPress={onHome} style={styles.navButton}>
              <Text style={styles.navText}>HOME</Text>
            </Pressable>

            <Pressable onPress={onContinueShopping} style={styles.navButton}>
              <Text style={styles.navText}>MENU</Text>
            </Pressable>

            <View style={styles.currentPage}>
              <Text style={styles.currentPageText}>CONFIRMED</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.intro}>
            <Text style={styles.eyebrow}>CHRISTOFFEL RESTAURANT</Text>
            <Text style={styles.title}>Order Confirmed</Text>
            <Text style={styles.orderNumber}>#{order.id}</Text>
            <Text style={styles.subtitle}>
              Thank you for your order. We're preparing your food and will
              have it ready for collection soon.
            </Text>
            <View style={styles.goldLine} />
          </View>

          <View style={styles.confirmationGrid}>
            <View style={styles.orderColumn}>
              <View style={styles.sectionHeading}>
                <Text style={styles.sectionNumber}>01</Text>
                <View>
                  <Text style={styles.sectionTitle}>YOUR ORDER</Text>
                  <Text style={styles.sectionCaption}>
                    {totalItems} {totalItems === 1 ? 'item' : 'items'} confirmed
                  </Text>
                </View>
              </View>

              <View style={styles.orderPanel}>
                {orderedItems.map(({ item, quantity }, index) => (
                  <View
                    key={item.id}
                    style={[
                      styles.orderItem,
                      index !== orderedItems.length - 1 && styles.orderItemBorder,
                    ]}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={styles.orderItemImage}
                      resizeMode="cover"
                    />

                    <View style={styles.orderItemInfo}>
                      <Text style={styles.courseLabel}>
                        {item.course === 'Main Course'
                          ? 'MAIN COURSE'
                          : item.course.toUpperCase()}
                      </Text>
                      <Text style={styles.orderItemName}>{item.name}</Text>
                      <Text style={styles.orderItemQuantity}>
                        QUANTITY&nbsp;&nbsp;× {quantity}
                      </Text>
                    </View>

                    <Text style={styles.orderItemPrice}>
                      R{(item.price * quantity).toFixed(2)}
                    </Text>
                  </View>
                ))}

                <View style={styles.totals}>
                  <View style={styles.totalLine}>
                    <Text style={styles.totalLabel}>SUBTOTAL</Text>
                    <Text style={styles.totalAmount}>
                      R{order.subtotal.toFixed(2)}
                    </Text>
                  </View>

                  <View style={styles.totalLine}>
                    <Text style={styles.totalLabel}>SERVICE FEE</Text>
                    <Text style={styles.totalAmount}>
                      R{order.serviceFee.toFixed(2)}
                    </Text>
                  </View>

                  <View style={styles.totalDivider} />

                  <View style={styles.grandTotal}>
                    <Text style={styles.grandTotalLabel}>TOTAL</Text>
                    <Text style={styles.grandTotalAmount}>
                      R{order.total.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.statusColumn}>
              <View style={styles.sectionHeading}>
                <Text style={styles.sectionNumber}>02</Text>
                <View>
                  <Text style={styles.sectionTitle}>ORDER STATUS</Text>
                  <Text style={styles.sectionCaption}>Your order is in the kitchen</Text>
                </View>
              </View>

              <View style={styles.statusPanel}>
                <View style={styles.successCircle}>
                  <Text style={styles.successCheck}>✓</Text>
                </View>

                <Text style={styles.confirmedTitle}>ORDER RECEIVED</Text>
                <Text style={styles.confirmedText}>
                  Your order has been successfully placed.
                </Text>

                <View style={styles.statusDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>STATUS</Text>
                    <Text style={styles.detailValueSuccess}>{statusLabel}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>PAYMENT</Text>
                    <Text style={styles.detailValue}>{paymentLabel}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>ESTIMATED TIME</Text>
                    <Text style={styles.detailValue}>{estimatedTime}</Text>
                  </View>
                </View>

                <Pressable onPress={onTrackOrder} style={styles.trackButton}>
                  <Text style={styles.trackButtonText}>TRACK MY ORDER</Text>
                  <Text style={styles.trackButtonArrow}>→</Text>
                </Pressable>

                <Pressable onPress={onContinueShopping} style={styles.continueButton}>
                  <Text style={styles.continueButtonText}>CONTINUE SHOPPING</Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.footerStrip}>
            <Text style={styles.footerBrand}>CHRISTOFFEL</Text>
            <View style={styles.footerLine} />
            <Text style={styles.footerCaption}>GOOD FOOD. GOOD COMPANY.</Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, minHeight: 700, backgroundColor: '#07130F' },
  overlay: {
    position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
    backgroundColor: 'rgba(3, 12, 8, 0.78)',
  },
  scrollView: { flex: 1 },
  pageContent: { paddingBottom: 80 },
  header: {
    height: 92, paddingHorizontal: 72, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: 'rgba(3, 10, 7, 0.82)',
    borderBottomWidth: 1, borderBottomColor: 'rgba(212, 175, 55, 0.18)',
  },
  logoArea: { justifyContent: 'center' },
  logo: { color: '#F5F1E8', fontSize: 18, fontWeight: '700', letterSpacing: 4 },
  logoSub: { color: '#D4AF37', fontSize: 8, letterSpacing: 2.5, marginTop: 5 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 34 },
  navButton: { paddingVertical: 10 },
  navText: { color: '#A8B0AA', fontSize: 11, fontWeight: '600', letterSpacing: 2 },
  currentPage: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#D4AF37' },
  currentPageText: { color: '#D4AF37', fontSize: 11, fontWeight: '700', letterSpacing: 2 },
  content: { width: '100%', maxWidth: 1280, alignSelf: 'center', paddingHorizontal: 70 },
  intro: { paddingTop: 76, paddingBottom: 58 },
  eyebrow: { color: '#D4AF37', fontSize: 11, fontWeight: '700', letterSpacing: 4, marginBottom: 16 },
  title: { color: '#F5F1E8', fontSize: 56, fontWeight: '400' },
  orderNumber: { color: '#D4AF37', fontSize: 20, fontWeight: '700', letterSpacing: 3, marginTop: 12 },
  subtitle: { color: '#AEB6AF', fontSize: 15, lineHeight: 24, marginTop: 14, maxWidth: 560 },
  goldLine: { width: 64, height: 2, backgroundColor: '#D4AF37', marginTop: 28 },
  confirmationGrid: { flexDirection: 'row', gap: 44, alignItems: 'stretch' },
  orderColumn: { flex: 1.25 },
  statusColumn: { flex: 0.9 },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', marginBottom: 22 },
  sectionNumber: { color: '#D4AF37', fontSize: 12, fontWeight: '700', letterSpacing: 2, marginRight: 14 },
  sectionTitle: { color: '#F5F1E8', fontSize: 14, fontWeight: '700', letterSpacing: 2.5 },
  sectionCaption: { color: '#707A73', fontSize: 11, marginTop: 5, letterSpacing: 0.5 },
  orderPanel: {
    flex: 1, backgroundColor: 'rgba(3, 10, 7, 0.48)', paddingHorizontal: 24,
    borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'rgba(212, 175, 55, 0.18)',
  },
  orderItem: { minHeight: 112, flexDirection: 'row', alignItems: 'center', paddingVertical: 20 },
  orderItemBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(245, 241, 232, 0.08)' },
  orderItemImage: { width: 88, height: 88, borderRadius: 4, marginRight: 20 },
  orderItemInfo: { flex: 1, justifyContent: 'center' },
  courseLabel: { color: '#D4AF37', fontSize: 8, fontWeight: '700', letterSpacing: 2, marginBottom: 7 },
  orderItemName: { color: '#F5F1E8', fontSize: 17, fontWeight: '500' },
  orderItemQuantity: { color: '#737D76', fontSize: 10, letterSpacing: 1.2, marginTop: 9 },
  orderItemPrice: { color: '#D4AF37', fontSize: 15, fontWeight: '600', paddingLeft: 20 },
  totals: { paddingTop: 24, paddingBottom: 24, marginTop: 'auto' },
  totalLine: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  totalLabel: { color: '#7D877F', fontSize: 10, letterSpacing: 1.5 },
  totalAmount: { color: '#C6CCC7', fontSize: 13 },
  totalDivider: { height: 1, backgroundColor: 'rgba(212, 175, 55, 0.2)', marginVertical: 15 },
  grandTotal: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  grandTotalLabel: { color: '#F5F1E8', fontSize: 14, fontWeight: '700', letterSpacing: 2 },
  grandTotalAmount: { color: '#D4AF37', fontSize: 25, fontWeight: '700' },
  statusPanel: {
    flex: 1, minHeight: 430, backgroundColor: 'rgba(3, 10, 7, 0.48)',
    borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'rgba(212, 175, 55, 0.18)',
    padding: 28, alignItems: 'center', justifyContent: 'center',
  },
  successCircle: { width: 76, height: 76, borderRadius: 38, backgroundColor: '#D4AF37', alignItems: 'center', justifyContent: 'center', marginBottom: 22 },
  successCheck: { color: '#07130F', fontSize: 42, fontWeight: '300' },
  confirmedTitle: { color: '#F5F1E8', fontSize: 18, fontWeight: '700', letterSpacing: 2, textAlign: 'center' },
  confirmedText: { color: '#7D877F', fontSize: 12, marginTop: 9, textAlign: 'center' },
  statusDetails: { width: '100%', marginTop: 30, borderTopWidth: 1, borderTopColor: 'rgba(245, 241, 232, 0.08)', paddingTop: 20 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  detailLabel: { color: '#707A73', fontSize: 9, letterSpacing: 1.5 },
  detailValue: { color: '#C6CCC7', fontSize: 10, fontWeight: '600', letterSpacing: 0.8, textAlign: 'right', maxWidth: 180 },
  detailValueSuccess: { color: '#D4AF37', fontSize: 10, fontWeight: '700', letterSpacing: 0.8, textAlign: 'right' },
  trackButton: { width: '100%', height: 56, backgroundColor: '#D4AF37', marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  trackButtonText: { color: '#07130F', fontSize: 11, fontWeight: '700', letterSpacing: 2 },
  trackButtonArrow: { color: '#07130F', fontSize: 18, marginLeft: 13 },
  continueButton: { paddingVertical: 17, alignItems: 'center' },
  continueButtonText: { color: '#8D968F', fontSize: 9, fontWeight: '600', letterSpacing: 1.5 },
  footerStrip: { marginTop: 82, paddingTop: 28, borderTopWidth: 1, borderTopColor: 'rgba(212, 175, 55, 0.15)', flexDirection: 'row', alignItems: 'center' },
  footerBrand: { color: '#D4AF37', fontSize: 10, fontWeight: '700', letterSpacing: 3 },
  footerLine: { width: 45, height: 1, backgroundColor: 'rgba(212, 175, 55, 0.4)', marginHorizontal: 18 },
  footerCaption: { color: '#626D65', fontSize: 9, letterSpacing: 2 },
});
