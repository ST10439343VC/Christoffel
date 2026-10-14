import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

type SignInProps = {
  onBack: () => void;
  onSignedIn?: (email: string) => void;
  onCreateAccount?: () => void;
  onForgotPassword?: () => void;
};

const RESTAURANT_BACKGROUND =
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85';

export default function SignIn({
  onBack,
  onSignedIn,
  onCreateAccount,
  onForgotPassword,
}: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = () => {
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter your email address and password.');
      return;
    }

    const emailIsValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    if (!emailIsValid) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSigningIn(true);

    setTimeout(() => {
      setIsSigningIn(false);
      setIsSignedIn(true);
    }, 3000);
  };

  if (isSignedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={{ uri: RESTAURANT_BACKGROUND }}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.overlay} />

          <View style={styles.loadingScreen}>
            <View style={styles.successCircle}>
              <Text style={styles.successCheck}>✓</Text>
            </View>

            <Text style={styles.loadingTitle}>CHRISTOFFEL</Text>

            <View style={styles.loadingLineRow}>
              <View style={styles.loadingGoldLine} />
              <Text style={styles.loadingAccount}>ACCOUNT</Text>
              <View style={styles.loadingGoldLine} />
            </View>

            <Text style={styles.successHeading}>
              SUCCESSFULLY SIGNED IN
            </Text>

            <Text style={styles.successSubheading}>
              Welcome back to Christoffel.
            </Text>

            <TouchableOpacity
              style={styles.successButton}
              onPress={() => {
                onSignedIn?.(email.trim());
                onBack();
              }}
              activeOpacity={0.85}
            >
              <Text style={styles.successButtonText}>CONTINUE</Text>
              <Text style={styles.buttonArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  if (isSigningIn) {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={{ uri: RESTAURANT_BACKGROUND }}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.overlay} />

          <View style={styles.loadingScreen}>
            <Text style={styles.loadingChefIcon}>♨</Text>
            <Text style={styles.loadingTitle}>CHRISTOFFEL</Text>

            <View style={styles.loadingLineRow}>
              <View style={styles.loadingGoldLine} />
              <Text style={styles.loadingAccount}>ACCOUNT</Text>
              <View style={styles.loadingGoldLine} />
            </View>

            <ActivityIndicator
              size="large"
              color="#D4AF37"
              style={styles.loadingSpinner}
            />

            <Text style={styles.loadingHeading}>SIGNING YOU IN</Text>
            <Text style={styles.loadingSubheading}>
              Please wait while we check your account.
            </Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: RESTAURANT_BACKGROUND }}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <KeyboardAvoidingView
          style={styles.keyboard}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* BACK */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={onBack}
              activeOpacity={0.8}
            >
              <Text style={styles.backArrow}>‹</Text>
            </TouchableOpacity>

            {/* BRANDING */}
            <View style={styles.branding}>
              <Text style={styles.chefIcon}>♨</Text>

              <Text style={styles.title}>CHRISTOFFEL</Text>

              <View style={styles.brandLineRow}>
                <View style={styles.smallGoldLine} />
                <Text style={styles.menu}>ACCOUNT</Text>
                <View style={styles.smallGoldLine} />
              </View>
            </View>

            {/* HEADER */}
            <View style={styles.header}>
              <Text style={styles.heading}>WELCOME BACK</Text>
              <Text style={styles.subheading}>
                Sign in to continue to Christoffel.
              </Text>
            </View>

            {/* FORM */}
            <View style={styles.form}>
              <Text style={styles.label}>EMAIL ADDRESS</Text>

              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="#777F79"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />

              <Text style={styles.label}>PASSWORD</Text>

              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#777F79"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />

              {/* REMEMBER / FORGOT */}
              <View style={styles.optionsRow}>
                <TouchableOpacity
                  style={styles.rememberRow}
                  onPress={() => setRememberMe(!rememberMe)}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.checkbox,
                      rememberMe && styles.checkboxSelected,
                    ]}
                  >
                    {rememberMe && <Text style={styles.checkmark}>✓</Text>}
                  </View>

                  <Text style={styles.rememberText}>Remember Me</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={onForgotPassword}
                  activeOpacity={0.8}
                >
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              {errorMessage ? (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              ) : null}

              {/* SIGN IN */}
              <TouchableOpacity
                style={styles.signInButton}
                onPress={handleSignIn}
                activeOpacity={0.85}
>
                <Text style={styles.signInText}>SIGN IN</Text>
                <Text style={styles.buttonArrow}>›</Text>
              </TouchableOpacity>

              {/* DIVIDER */}
              <View style={styles.dividerRow}>
                <View style={styles.divider} />
                <Text style={styles.orText}>OR CONTINUE WITH</Text>
                <View style={styles.divider} />
              </View>

              {/* SOCIAL */}
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => {}}
                activeOpacity={0.85}
              >
                <Text style={styles.socialIcon}>G</Text>
                <Text style={styles.socialText}>CONTINUE WITH GOOGLE</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => {}}
                activeOpacity={0.85}
              >
                <Text style={styles.socialIcon}>●</Text>
                <Text style={styles.socialText}>CONTINUE WITH APPLE</Text>
              </TouchableOpacity>

              {/* CREATE ACCOUNT */}
              <View style={styles.createArea}>
                <Text style={styles.noAccount}>DON'T HAVE AN ACCOUNT?</Text>

                <TouchableOpacity
                  onPress={onCreateAccount}
                  activeOpacity={0.8}
                >
                  <Text style={styles.createText}>CREATE ACCOUNT</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* FOOTER */}
            <View style={styles.footer}>
              <View style={styles.footerLine} />
              <Text style={styles.footerBrand}>CHRISTOFFEL</Text>
              <View style={styles.footerLine} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
    backgroundColor: 'rgba(5, 18, 11, 0.88)',
  },

  keyboard: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 14,
    paddingBottom: 28,
  },

  /* BACK */

  backButton: {
    position: 'absolute',
    left: 18,
    top: 54,
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: '#D4AF37',
    backgroundColor: 'rgba(4, 9, 6, 0.78)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },

  backArrow: {
    color: '#D4AF37',
    fontSize: 42,
    fontWeight: '300',
    lineHeight: 42,
    marginTop: -5,
  },

  /* BRANDING */

  branding: {
    alignItems: 'center',
    marginTop: 8,
  },

  chefIcon: {
    color: '#D4AF37',
    fontSize: 35,
    marginBottom: 2,
  },

  title: {
    color: '#F5F1E8',
    fontSize: 28,
    fontWeight: '500',
    letterSpacing: 4,
  },

  brandLineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  smallGoldLine: {
    width: 34,
    height: 1,
    backgroundColor: '#D4AF37',
    opacity: 0.75,
    marginHorizontal: 10,
  },

  menu: {
    color: '#D4AF37',
    fontSize: 12,
    letterSpacing: 4,
  },

  /* HEADER */

  header: {
    width: '100%',
    marginTop: 34,
    marginBottom: 24,
  },

  heading: {
    color: '#F5F1E8',
    fontSize: 27,
    fontWeight: '400',
    letterSpacing: 1.5,
  },

  subheading: {
    color: '#A5ADA7',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
  },

  /* FORM */

  form: {
    width: '100%',
  },

  label: {
    color: '#D4AF37',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 2,
    marginBottom: 8,
  },

  input: {
    height: 54,
    borderWidth: 1,
    borderColor: '#53645A',
    borderRadius: 12,
    backgroundColor: 'rgba(14, 22, 17, 0.9)',
    color: '#F5F1E8',
    paddingHorizontal: 16,
    fontSize: 14,
    marginBottom: 19,
  },

  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -2,
    marginBottom: 22,
  },

  rememberRow: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#68756D',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  checkboxSelected: {
    backgroundColor: '#D4AF37',
    borderColor: '#D4AF37',
  },

  checkmark: {
    color: '#0B100D',
    fontSize: 14,
    fontWeight: '700',
  },

  rememberText: {
    color: '#B7BDB8',
    fontSize: 11,
  },

  forgotText: {
    color: '#D4AF37',
    fontSize: 11,
    minHeight: 44,
    textAlignVertical: 'center',
  },

  signInButton: {
    height: 56,
    borderRadius: 28,
    backgroundColor: '#D4AF37',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  signInText: {
    flex: 1,
    color: '#0B100D',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 2.5,
    textAlign: 'center',
    marginLeft: 28,
  },

  buttonArrow: {
    color: '#0B100D',
    fontSize: 29,
    fontWeight: '300',
  },

  errorMessage: {
    color: '#D9A441',
    fontSize: 11,
    lineHeight: 17,
    marginBottom: 14,
  },

  successCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 1.5,
    borderColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },

  successCheck: {
    color: '#D4AF37',
    fontSize: 42,
    fontWeight: '300',
    lineHeight: 46,
  },

  successHeading: {
    color: '#F5F1E8',
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 2,
    marginTop: 48,
    textAlign: 'center',
  },

  successSubheading: {
    color: '#A5ADA7',
    fontSize: 11,
    marginTop: 9,
    textAlign: 'center',
  },

  successButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    backgroundColor: '#D4AF37',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 34,
  },

  successButtonText: {
    flex: 1,
    color: '#0B100D',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2.5,
    textAlign: 'center',
    marginLeft: 28,
  },

  loadingScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },

  loadingChefIcon: {
    color: '#D4AF37',
    fontSize: 42,
    marginBottom: 6,
  },

  loadingTitle: {
    color: '#F5F1E8',
    fontSize: 30,
    fontWeight: '500',
    letterSpacing: 5,
  },

  loadingLineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  loadingGoldLine: {
    width: 38,
    height: 1,
    backgroundColor: '#D4AF37',
    opacity: 0.75,
    marginHorizontal: 10,
  },

  loadingAccount: {
    color: '#D4AF37',
    fontSize: 11,
    letterSpacing: 4,
  },

  loadingSpinner: {
    marginTop: 54,
    marginBottom: 28,
  },

  loadingHeading: {
    color: '#F5F1E8',
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 2.5,
  },

  loadingSubheading: {
    color: '#A5ADA7',
    fontSize: 11,
    marginTop: 8,
    textAlign: 'center',
  },

  /* DIVIDER */

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#304239',
  },

  orText: {
    color: '#777F79',
    fontSize: 8,
    letterSpacing: 1.5,
    marginHorizontal: 10,
  },

  /* SOCIAL */

  socialButton: {
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#53645A',
    backgroundColor: 'rgba(14, 22, 17, 0.88)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginBottom: 10,
  },

  socialIcon: {
    width: 26,
    color: '#F5F1E8',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginRight: 10,
  },

  socialText: {
    flex: 1,
    color: '#E4E1D8',
    fontSize: 11,
    letterSpacing: 1.2,
    textAlign: 'center',
  },

  /* CREATE ACCOUNT */

  createArea: {
    alignItems: 'center',
    marginTop: 25,
  },

  noAccount: {
    color: '#777F79',
    fontSize: 9,
    letterSpacing: 1.5,
    marginBottom: 8,
  },

  createText: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
  },

  /* FOOTER */

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
  },

  footerLine: {
    width: 38,
    height: 1,
    backgroundColor: '#D4AF37',
    opacity: 0.55,
    marginHorizontal: 11,
  },

  footerBrand: {
    color: '#D4AF37',
    fontSize: 8,
    letterSpacing: 3.5,
    fontWeight: '500',
  },
});
