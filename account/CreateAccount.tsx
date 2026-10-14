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

type CreateAccountProps = {
  onBack: () => void;
  onAccountCreated?: (email: string) => void;
};

const RESTAURANT_BACKGROUND =
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85';

export default function CreateAccount({
  onBack,
  onAccountCreated,
}: CreateAccountProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateAccount = () => {
    setErrorMessage('');

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password || !confirmPassword) {
      setErrorMessage('Please complete all fields.');
      return;
    }

    const emailIsValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!emailIsValid) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsCreating(true);

    setTimeout(() => {
      setIsCreating(false);
      setIsCreated(true);
    }, 3000);
  };

  if (isCreated) {
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
              SUCCESSFULLY CREATED
            </Text>

            <Text style={styles.successSubheading}>
              Your Christoffel account is ready.
            </Text>

            <TouchableOpacity
              style={styles.successButton}
              onPress={() => {
                onAccountCreated?.(email.trim());
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

  if (isCreating) {
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

            <Text style={styles.loadingHeading}>CREATING ACCOUNT</Text>
            <Text style={styles.loadingSubheading}>
              Please wait while we create your Christoffel account.
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
              <Text style={styles.heading}>CREATE ACCOUNT</Text>
              <Text style={styles.subheading}>
                Join Christoffel and enjoy a better dining experience.
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
                placeholder="Create a password"
                placeholderTextColor="#777F79"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />

              <Text style={styles.label}>CONFIRM PASSWORD</Text>

              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your password"
                placeholderTextColor="#777F79"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />

              {errorMessage ? (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              ) : null}

              {/* CREATE ACCOUNT */}
              <TouchableOpacity
                style={styles.createButton}
                onPress={handleCreateAccount}
                activeOpacity={0.85}
              >
                <Text style={styles.createButtonText}>CREATE ACCOUNT</Text>
                <Text style={styles.buttonArrow}>›</Text>
              </TouchableOpacity>

              {/* SIGN IN */}
              <View style={styles.signInArea}>
                <Text style={styles.haveAccount}>ALREADY HAVE AN ACCOUNT?</Text>

                <TouchableOpacity onPress={onBack} activeOpacity={0.8}>
                  <Text style={styles.signInText}>SIGN IN</Text>
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

  errorMessage: {
    color: '#D9A441',
    fontSize: 11,
    lineHeight: 17,
    marginBottom: 14,
  },

  createButton: {
    height: 56,
    borderRadius: 28,
    backgroundColor: '#D4AF37',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  createButtonText: {
    flex: 1,
    color: '#0B100D',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2.2,
    textAlign: 'center',
    marginLeft: 28,
  },

  buttonArrow: {
    color: '#0B100D',
    fontSize: 29,
    fontWeight: '300',
  },

  signInArea: {
    alignItems: 'center',
    marginTop: 27,
  },

  haveAccount: {
    color: '#A5ADA7',
    fontSize: 10,
    letterSpacing: 1.5,
    marginBottom: 8,
  },

  signInText: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
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
    textAlign: 'center',
  },

  loadingSubheading: {
    color: '#A5ADA7',
    fontSize: 11,
    marginTop: 9,
    textAlign: 'center',
    lineHeight: 17,
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

  footer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 34,
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
});
