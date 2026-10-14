import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  ImageBackground,
} from 'react-native';

const { width, height } = Dimensions.get('window');

type SignedInAccount = {
  email: string;
};

type HomeScreenProps = {
  onViewMenu: () => void;
  onManageMenu: () => void;
  onMyOrders: () => void;
  onSignIn: () => void;
  onCreateAccount: () => void;
  onHelpSupport: () => void;
  onAbout: () => void;
  signedInAccount: SignedInAccount | null;
  onSignOut: () => void;
};

export default function HomeScreen({
  onViewMenu,
  onManageMenu,
  onMyOrders,
  onSignIn,
  onCreateAccount,
  onHelpSupport,
  onAbout,
  signedInAccount,
  onSignOut,
}: HomeScreenProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const isSignedIn = !!signedInAccount;

  return (
    <SafeAreaView style={styles.container}>

      {/* BACKGROUND IMAGE */}
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
        }}
        style={styles.background}
        resizeMode="cover"
      >

        {/* DARK GREEN OVERLAY */}
        <View style={styles.overlay} />

        <View style={styles.content}>

          {/* PROFILE */}
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => setShowProfileMenu(true)}
            activeOpacity={0.85}
          >
            <Text style={styles.profileIcon}>♙</Text>
          </TouchableOpacity>

          {/* PROFILE DROPDOWN */}
          {showProfileMenu && (
            <>
              <TouchableOpacity
                style={styles.profileBackdrop}
                onPress={() => setShowProfileMenu(false)}
                activeOpacity={1}
              />

              <View style={styles.profileDropdown}>

                {isSignedIn ? (
                  <>
                    <Text style={styles.profileSignedIn}>
                      SIGNED IN
                    </Text>

                    <Text
                      style={styles.profileEmail}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {signedInAccount.email}
                    </Text>

                    <Text style={styles.profileWelcome}>
                      Welcome back to Christoffel
                    </Text>

                    <View style={styles.profileDivider} />

                    <TouchableOpacity
                      style={styles.profileMenuItem}
                      onPress={() => {
                        setShowProfileMenu(false);
                      }}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.profileMenuTitle}>
                        MY PROFILE
                      </Text>

                      <Text style={styles.profileMenuSubtitle}>
                        View your account
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.profileMenuItem}
                      onPress={() => {
                        setShowProfileMenu(false);
                        onMyOrders();
                      }}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.profileMenuTitle}>
                        ORDER HISTORY
                      </Text>

                      <Text style={styles.profileMenuSubtitle}>
                        View your orders
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.profileSimpleItem}
                      onPress={() => {
                        setShowProfileMenu(false);
                        onSignOut();
                      }}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.profileSignOutText}>
                        SIGN OUT
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text style={styles.profileGuest}>
                      GUEST
                    </Text>

                    <Text style={styles.profileWelcome}>
                      Welcome to Christoffel
                    </Text>

                    <View style={styles.profileDivider} />

                    <TouchableOpacity
                      style={styles.profileMenuItem}
                      onPress={() => {
                        setShowProfileMenu(false);
                        onSignIn();
                      }}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.profileMenuTitle}>
                        SIGN IN
                      </Text>

                      <Text style={styles.profileMenuSubtitle}>
                        Access your account
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.profileMenuItem}
                      onPress={() => {
                        setShowProfileMenu(false);
                        onCreateAccount();
                      }}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.profileMenuTitle}>
                        CREATE ACCOUNT
                      </Text>

                      <Text style={styles.profileMenuSubtitle}>
                        Join Christoffel
                      </Text>
                    </TouchableOpacity>
                  </>
                )}

                <TouchableOpacity
                  style={styles.profileSimpleItem}
                  onPress={() => {
                    setShowProfileMenu(false);
                    onHelpSupport();
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.profileSimpleText}>
                    HELP & SUPPORT
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.profileSimpleItem}
                  onPress={() => {
                    setShowProfileMenu(false);
                    onAbout();
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.profileSimpleText}>
                    ABOUT
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.profileCloseButton}
                  onPress={() => setShowProfileMenu(false)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.profileCloseText}>
                    CLOSE
                  </Text>
                </TouchableOpacity>

              </View>
            </>
          )}

          {/* TOP BRANDING */}
          <View style={styles.logoArea}>

            <Text style={styles.chefIcon}>♨</Text>

            <Text style={styles.title}>
              CHRISTOFFEL
            </Text>

            <View style={styles.brandLineRow}>

              <View style={styles.smallGoldLine} />

              <Text style={styles.menu}>
                MENU
              </Text>

              <View style={styles.smallGoldLine} />

            </View>

          </View>

          {/* TAGLINE */}
          <Text style={styles.tagline}>
            GOOD FOOD  •  GREAT PEOPLE  •  ALWAYS HERE
          </Text>

          {/* WELCOME */}
          <View style={styles.welcomeArea}>

            <Text style={styles.welcome}>
              WELCOME
            </Text>

            <Text style={styles.mainText}>
              Delicious food,
            </Text>

            <Text style={styles.mainText}>
              made with <Text style={styles.goldText}>love.</Text>
            </Text>

            <Text style={styles.description}>
              Fresh ingredients. Incredible flavours.
            </Text>

            <Text style={styles.description}>
              A better dining experience, every time.
            </Text>

          </View>

          {/* FEATURED FOOD */}
          <View style={styles.foodSection}>

            <View style={styles.foodContainer}>

              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
                }}
                style={styles.foodImage}
              />

            </View>

            {/* SIDE BADGE */}
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

          </View>

          {/* BUTTONS */}
          <View style={styles.buttons}>

            {/* VIEW MENU */}
            <TouchableOpacity
              style={styles.viewButton}
              onPress={onViewMenu}
              activeOpacity={0.85}
            >

              <Text style={styles.viewIcon}>
                ♜
              </Text>

              <Text style={styles.viewText}>
                View Menu
              </Text>

              <Text style={styles.arrow}>
                ›
              </Text>

            </TouchableOpacity>

            {/* MANAGE MENU */}
            <TouchableOpacity
              style={styles.manageButton}
              onPress={onManageMenu}
              activeOpacity={0.85}
            >

              <Text style={styles.gear}>
                ⚙
              </Text>

              <Text style={styles.manageText}>
                Manage Menu
              </Text>

              <Text style={styles.goldArrow}>
                ›
              </Text>

            </TouchableOpacity>

            {/* MY ORDERS */}
            <TouchableOpacity
              style={styles.ordersButton}
              onPress={onMyOrders}
              activeOpacity={0.85}
            >

              <Text style={styles.ordersIcon}>
                ◉
              </Text>

              <Text style={styles.ordersText}>
                My Orders
              </Text>

              <Text style={styles.goldArrow}>
                ›
              </Text>

            </TouchableOpacity>

          </View>

          {/* FOOTER */}
          <View style={styles.footer}>

            <View style={styles.footerLine} />

            <Text style={styles.footerBrand}>
              CHRISTOFFEL
            </Text>

            <View style={styles.footerLine} />

            <Text style={styles.footerSmall}>
              EST. 2024
            </Text>

          </View>

        </View>

      </ImageBackground>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0B100D',
  },

  background: {
    flex: 1,
  },

  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(5, 18, 11, 0.82)',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 28,
  },

  /* PROFILE */

  profileButton: {
    position: 'absolute',
    top: 42,
    left: 18,
    width: 56,
    height: 50,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#D4AF37',
    backgroundColor: 'rgba(10, 18, 13, 0.88)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    zIndex: 10,
  },

  profileIcon: {
    color: '#D4AF37',
    fontSize: 30,
    fontWeight: '500',
  },

  profileBackdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(3, 8, 5, 0.68)',
    zIndex: 20,
  },

  profileDropdown: {
    position: 'absolute',
    top: 78,
    left: 18,
    width: Math.min(width * 0.82, 350),
    padding: 24,
    borderWidth: 1,
    borderColor: '#53645A',
    borderRadius: 20,
    backgroundColor: '#0B100D',
    zIndex: 21,
    elevation: 12,
  },

  profileGuest: {
    color: '#D4AF37',
    fontSize: 12,
    letterSpacing: 4,
    marginBottom: 6,
  },

  profileSignedIn: {
    color: '#D4AF37',
    fontSize: 12,
    letterSpacing: 4,
    marginBottom: 8,
  },

  profileEmail: {
    color: '#F5F1E8',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },

  profileWelcome: {
    color: '#A5ADA7',
    fontSize: 13,
  },

  profileDivider: {
    height: 1,
    backgroundColor: '#304239',
    marginVertical: 17,
  },

  profileMenuItem: {
    paddingVertical: 10,
  },

  profileMenuTitle: {
    color: '#D4AF37',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 2,
  },

  profileMenuSubtitle: {
    color: '#A5ADA7',
    fontSize: 11,
    marginTop: 4,
  },

  profileSimpleItem: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E2A22',
  },

  profileSimpleText: {
    color: '#F1EEE5',
    fontSize: 13,
    letterSpacing: 1.5,
  },

  profileSignOutText: {
    color: '#D4AF37',
    fontSize: 13,
    letterSpacing: 1.5,
    fontWeight: '600',
  },

  profileCloseButton: {
    marginTop: 12,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#304239',
    alignItems: 'center',
  },

  profileCloseText: {
    color: '#D4AF37',
    fontSize: 11,
    letterSpacing: 3,
  },

  /* BRANDING */

  logoArea: {
    alignItems: 'center',
    marginTop: height * 0.018,
  },

  chefIcon: {
    color: '#D4AF37',
    fontSize: 42,
    marginBottom: 2,
  },

  title: {
    color: '#F5F1E8',
    fontSize: 30,
    fontWeight: '500',
    letterSpacing: 4,
  },

  brandLineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  smallGoldLine: {
    width: 42,
    height: 1,
    backgroundColor: '#D4AF37',
    opacity: 0.8,
    marginHorizontal: 12,
  },

  menu: {
    color: '#D4AF37',
    fontSize: 17,
    letterSpacing: 6,
  },

  /* TAGLINE */

  tagline: {
    color: '#A6AEA8',
    fontSize: 8.5,
    letterSpacing: 2.2,
    marginTop: height * 0.022,
    textAlign: 'center',
  },

  /* WELCOME */

  welcomeArea: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: height * 0.035,
  },

  welcome: {
    color: '#D4AF37',
    fontSize: 13,
    letterSpacing: 5,
    marginBottom: 9,
  },

  mainText: {
    color: '#F5F1E8',
    fontSize: 35,
    fontWeight: '400',
    lineHeight: 40,
  },

  goldText: {
    color: '#D4AF37',
  },

  description: {
    color: '#A5ADA7',
    fontSize: 11.5,
    lineHeight: 18,
    marginTop: 4,
  },

  /* FOOD */

  foodSection: {
    width: '100%',
    height: width * 0.51,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.018,
  },

  foodContainer: {
    width: width * 0.48,
    height: width * 0.48,
    borderRadius: width * 0.24,
    borderWidth: 3,
    borderColor: '#D4AF37',
    padding: 6,
    backgroundColor: '#111712',
  },

  foodImage: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.24,
  },

  /* BADGE */

  foodBadge: {
    position: 'absolute',
    right: 3,
    top: width * 0.025,
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 1.5,
    borderColor: '#D4AF37',
    backgroundColor: 'rgba(13, 19, 15, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeText: {
    color: '#D9D5CA',
    fontSize: 8,
    letterSpacing: 2,
    lineHeight: 12,
  },

  badgeGoldText: {
    color: '#D4AF37',
    fontSize: 8,
    letterSpacing: 2,
    lineHeight: 12,
  },

  badgeLine: {
    width: 24,
    height: 1,
    backgroundColor: '#D4AF37',
    marginTop: 5,
  },

  /* BUTTONS */

  buttons: {
    width: '100%',
    marginTop: height * 0.015,
  },

  viewButton: {
    height: 55,
    backgroundColor: '#D4AF37',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },

  viewIcon: {
    color: '#0B100D',
    fontSize: 18,
    marginRight: 12,
  },

  viewText: {
    flex: 1,
    color: '#0B100D',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 2,
    textAlign: 'center',
    marginLeft: 12,
  },

  arrow: {
    color: '#0B100D',
    fontSize: 30,
    fontWeight: '300',
    marginLeft: 8,
  },

  manageButton: {
    height: 52,
    marginTop: 9,
    borderWidth: 1.5,
    borderColor: '#D4AF37',
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(10, 18, 13, 0.55)',
  },

  gear: {
    color: '#D4AF37',
    fontSize: 19,
    marginRight: 12,
  },

  manageText: {
    flex: 1,
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1.5,
    textAlign: 'center',
  },

  goldArrow: {
    color: '#D4AF37',
    fontSize: 28,
    fontWeight: '300',
    marginLeft: 8,
  },

  ordersButton: {
    height: 52,
    marginTop: 9,
    borderWidth: 1.5,
    borderColor: '#304239',
    backgroundColor: 'rgba(21, 30, 24, 0.82)',
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },

  ordersIcon: {
    color: '#D4AF37',
    fontSize: 17,
    marginRight: 12,
  },

  ordersText: {
    flex: 1,
    color: '#F1EEE5',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1.5,
    textAlign: 'center',
  },

  /* FOOTER */

  footer: {
    position: 'absolute',
    bottom: 7,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  footerLine: {
    width: 48,
    height: 1,
    backgroundColor: '#D4AF37',
    opacity: 0.65,
    marginHorizontal: 14,
  },

  footerBrand: {
    color: '#D4AF37',
    fontSize: 9,
    letterSpacing: 4,
    fontWeight: '500',
  },

  footerSmall: {
    position: 'absolute',
    top: 16,
    color: '#6E756F',
    fontSize: 7,
    letterSpacing: 3,
  },

});
