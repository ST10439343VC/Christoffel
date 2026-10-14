import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const BACKGROUND_IMAGE =
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85';

type HelpSupportProps = {
  onBack: () => void;
  onHome: () => void;
};

type HelpView =
  | 'home'
  | 'faq'
  | 'faqAnswer'
  | 'contact'
  | 'sending'
  | 'sent'
  | 'response';

type FAQCategory = {
  title: string;
  icon: string;
  questions: string[];
};

const faqCategories: FAQCategory[] = [
  {
    title: 'Orders & Payments',
    icon: '›',
    questions: [
      'How do I place an order?',
      'What payment methods are accepted?',
      'Can I cancel my order?',
      'How long does delivery take?',
      'Will I receive a notification when my order is ready?',
    ],
  },
  {
    title: 'Menu & Items',
    icon: '›',
    questions: [
      'How do I view the menu?',
      'Can I change an item in my selection?',
      'How do I remove an item from my order?',
      'Where can I see my selected items?',
    ],
  },
  {
    title: 'Account & Login',
    icon: '›',
    questions: [
      'How do I create an account?',
      'How do I sign in?',
      'How do I sign out?',
      'Is my account information saved?',
    ],
  },
  {
    title: 'Delivery & Tracking',
    icon: '›',
    questions: [
      'How do I track my order?',
      'What do the order statuses mean?',
      'When will my order be ready?',
    ],
  },
  {
    title: 'Cancellations & Refunds',
    icon: '›',
    questions: [
      'Can I cancel my order?',
      'How do refunds work?',
      'What should I do about a payment problem?',
    ],
  },
  {
    title: 'Technical Issues',
    icon: '›',
    questions: [
      'The app is not responding. What should I do?',
      'My menu is not loading.',
      'My order is not showing.',
      'What should I do if something is not working?',
    ],
  },
  {
    title: 'General',
    icon: '›',
    questions: [
      'What is Christoffel?',
      'How can I contact Christoffel Support?',
      'Where can I get help with the app?',
    ],
  },
];

const answers: Record<string, string> = {
  'How do I place an order?':
    'Browse our menu, add items to your selection, proceed to checkout, and complete your payment. You will receive an order number once your payment is successful.',
  'What payment methods are accepted?':
    'Christoffel supports Cash, Card and Mobile Payment through the payment options available in the app.',
  'Can I cancel my order?':
    'Orders can be cancelled within 2 minutes of placing the order. Please contact Christoffel Support immediately within that 2-minute window if you need to cancel. After 2 minutes, cancellation may no longer be possible.',
  'How long does delivery take?':
    'Preparation time is estimated from the items in your order. Your order tracking screen shows the current status and estimated readiness.',
  'Will I receive a notification when my order is ready?':
    'You can follow your order status through Order Tracking. The order moves through received, preparing, ready and completed states.',
  'How do I view the menu?':
    'From the Home screen, select View Menu. You can then browse Starters, Mains and Desserts.',
  'Can I change an item in my selection?':
    'Yes. Use the plus and minus controls while browsing the menu or in your Selection screen to adjust quantities before payment.',
  'How do I remove an item from my order?':
    'Use the minus control beside the item. When its quantity reaches zero, it is removed from your selection.',
  'Where can I see my selected items?':
    'Open your Selection from the menu navigation to review the items and quantities before payment.',
  'How do I create an account?':
    'Open the profile menu on the Home screen, choose Create Account, complete the required information, and continue after the account is successfully created.',
  'How do I sign in?':
    'Open the profile menu on the Home screen and select Sign In. Enter your account details and continue after successful sign-in.',
  'How do I sign out?':
    'Open the profile menu while signed in and choose Sign Out. Christoffel will safely sign you out and confirm the successful sign-out.',
  'Is my account information saved?':
    'This portfolio version keeps the signed-in account state locally on the device. It does not use a production customer database.',
  'How do I track my order?':
    'Use the floating order tracker or open My Orders from the Home screen to select an order and view its current status.',
  'What do the order statuses mean?':
    'Received means the order has been created. Preparing means the order is being prepared. Ready means it is ready for collection or the next stage. Completed means the order has finished.',
  'When will my order be ready?':
    'The Order Tracking screen uses the order preparation estimate and updates the status automatically as time passes.',
  'How do refunds work?':
    'This portfolio version does not process real refunds. For assistance with a payment or order, use Contact Support.',
  'What should I do about a payment problem?':
    'Check that you selected the correct payment option and try again. For a persistent issue, contact Christoffel Support.',
  'The app is not responding. What should I do?':
    'Try returning to the Home screen and opening the feature again. When the issue continues, use Contact Support and describe what happened.',
  'My menu is not loading.':
    'Return to Home and try View Menu again. When the problem continues, report the issue through Contact Support.',
  'My order is not showing.':
    'Open My Orders from the Home screen and check your order history. When the order is still missing, contact Support with the relevant details.',
  'What should I do if something is not working?':
    'Use Report a Problem or Contact Support. Tell us which feature you were using and what happened so the issue can be investigated.',
  'What is Christoffel?':
    'Christoffel is a restaurant menu and ordering experience designed to make browsing, ordering, payment and order tracking simple.',
  'How can I contact Christoffel Support?':
    'Open Help & Support, select Contact Support, complete the form and send your message.',
  'Where can I get help with the app?':
    'The Help & Support area contains FAQs, ordering guidance, account information, technical help and Contact Support.',
};

function Header({
  title,
  subtitle,
  onBack,
}: {
  title: string;
  subtitle: string;
  onBack: () => void;
}) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
        activeOpacity={0.8}
      >
        <Text style={styles.backArrow}>‹</Text>
      </TouchableOpacity>

      <Text style={styles.chefIcon}>♨</Text>

      <Text style={styles.brandTitle}>CHRISTOFFEL</Text>

      <View style={styles.brandLineRow}>
        <View style={styles.brandLine} />
        <Text style={styles.brandMenu}>MENU</Text>
        <View style={styles.brandLine} />
      </View>

      <Text style={styles.pageTitle}>{title}</Text>
      <Text style={styles.pageSubtitle}>{subtitle}</Text>
    </View>
  );
}

function SearchBox({
  value,
  onChangeText,
  placeholder,
}: {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
}) {
  return (
    <View style={styles.searchBox}>
      <Text style={styles.searchIcon}>⌕</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9AA39C"
        style={styles.searchInput}
        autoCapitalize="none"
      />
    </View>
  );
}

function ActionCard({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.actionCard}
      onPress={onPress}
      activeOpacity={0.82}
    >
      <View style={styles.actionIconCircle}>
        <Text style={styles.actionIcon}>{icon}</Text>
      </View>

      <View style={styles.actionTextArea}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionSubtitle}>{subtitle}</Text>
      </View>

      <Text style={styles.cardArrow}>›</Text>
    </TouchableOpacity>
  );
}

function BottomButton({
  title,
  onPress,
  secondary = false,
}: {
  title: string;
  onPress: () => void;
  secondary?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.bottomButton,
        secondary && styles.bottomButtonSecondary,
      ]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text
        style={[
          styles.bottomButtonText,
          secondary && styles.bottomButtonTextSecondary,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default function HelpSupport({
  onBack,
  onHome,
}: HelpSupportProps) {
  const [view, setView] = useState<HelpView>('home');
  const [faqSearch, setFaqSearch] = useState('');
  const [helpSearch, setHelpSearch] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<FAQCategory | null>(null);
  const [selectedQuestion, setSelectedQuestion] =
    useState<string | null>(null);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');

  const filteredCategories = useMemo(() => {
    const search = faqSearch.trim().toLowerCase();

    if (!search) {
      return faqCategories;
    }

    return faqCategories.filter(category => {
      return (
        category.title.toLowerCase().includes(search) ||
        category.questions.some(question =>
          question.toLowerCase().includes(search)
        )
      );
    });
  }, [faqSearch]);

  const filteredHelpActions = useMemo(() => {
    const search = helpSearch.trim().toLowerCase();

    const actions = [
      {
        icon: '?',
        title: 'Frequently Asked Questions',
        subtitle: 'Find quick answers',
        action: () => setView('faq'),
      },
      {
        icon: '♧',
        title: 'Contact Support',
        subtitle: 'Get in touch with our team',
        action: () => {
          setFormError('');
          setView('contact');
        },
      },
      {
        icon: '▤',
        title: 'App Guide',
        subtitle: 'Learn how to use the app',
        action: () => setView('faq'),
      },
      {
        icon: '!',
        title: 'Report a Problem',
        subtitle: "Tell us what's not working",
        action: () => {
          setSubject('Report a Problem');
          setFormError('');
          setView('contact');
        },
      },
    ];

    if (!search) {
      return actions;
    }

    return actions.filter(item =>
      `${item.title} ${item.subtitle}`
        .toLowerCase()
        .includes(search)
    );
  }, [helpSearch]);

  const openCategory = (category: FAQCategory) => {
    setSelectedCategory(category);
    setSelectedQuestion(null);
    setView('faqAnswer');
  };

  const sendMessage = () => {
    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }

    if (!email.trim()) {
      setFormError('Please enter your email address.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }

    if (!subject.trim()) {
      setFormError('Please enter a subject.');
      return;
    }

    if (!message.trim()) {
      setFormError('Please enter your message.');
      return;
    }

    setFormError('');
    setView('sending');

    setTimeout(() => {
      setView('sent');
    }, 3000);
  };

  if (view === 'sending') {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={{ uri: BACKGROUND_IMAGE }}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.overlay} />

          <View style={styles.centerContent}>
            <Text style={styles.chefIcon}>♨</Text>
            <Text style={styles.brandTitle}>CHRISTOFFEL</Text>

            <View style={styles.brandLineRow}>
              <View style={styles.brandLine} />
              <Text style={styles.brandMenu}>SUPPORT</Text>
              <View style={styles.brandLine} />
            </View>

            <ActivityIndicator
              size="large"
              color="#D4AF37"
              style={styles.loadingSpinner}
            />

            <Text style={styles.statusHeading}>
              SENDING MESSAGE
            </Text>

            <Text style={styles.statusSubtitle}>
              Please wait while we send your message.
            </Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  if (view === 'sent') {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={{ uri: BACKGROUND_IMAGE }}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.overlay} />

          <View style={styles.centerContent}>
            <View style={styles.successCircle}>
              <Text style={styles.successCheck}>✓</Text>
            </View>

            <Text style={styles.brandTitle}>CHRISTOFFEL</Text>

            <View style={styles.brandLineRow}>
              <View style={styles.brandLine} />
              <Text style={styles.brandMenu}>SUPPORT</Text>
              <View style={styles.brandLine} />
            </View>

            <Text style={styles.successHeading}>
              Message Sent
            </Text>

            <Text style={styles.successHeading}>
              Successfully!
            </Text>

            <Text style={styles.statusSubtitle}>
              Thank you for contacting us.{'\n'}
              Our support team will get back to you{'\n'}
              as soon as possible, usually within{'\n'}
              24 hours.
            </Text>

            <View style={styles.buttonGroup}>
              <BottomButton
                title="BACK TO HELP & SUPPORT"
                onPress={() => setView('home')}
              />

              <BottomButton
                title="BACK TO HOME"
                secondary
                onPress={onHome}
              />
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  if (view === 'response') {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={{ uri: BACKGROUND_IMAGE }}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.overlay} />

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Header
              title="Support Response"
              subtitle="Your support request"
              onBack={() => setView('home')}
            />

            <View style={styles.responseCard}>
              <View style={styles.responseHeader}>
                <View style={styles.responseLogo}>
                  <Text style={styles.responseLogoText}>C</Text>
                </View>

                <View>
                  <Text style={styles.responseName}>
                    Christoffel Support
                  </Text>
                  <Text style={styles.responseTime}>
                    Today, 14:32
                  </Text>
                </View>
              </View>

              <View style={styles.responseDivider} />

              <Text style={styles.responseText}>
                Hi {fullName.trim() || 'there'},
                {'\n\n'}
                Thanks for reaching out.
                {'\n\n'}
                Your issue has been received and is being
                looked into. We'll update you as soon as
                possible.
                {'\n\n'}
                If you have any further questions, feel free
                to reply to this message.
                {'\n\n'}
                Kind regards,{'\n'}
                The Christoffel Team
              </Text>
            </View>

            <BottomButton
              title="BACK TO HOME"
              secondary
              onPress={onHome}
            />
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  if (view === 'faqAnswer' && selectedCategory) {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={{ uri: BACKGROUND_IMAGE }}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.overlay} />

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Header
              title={selectedCategory.title}
              subtitle="Find answers to common questions."
              onBack={() => setView('faq')}
            />

            {selectedCategory.questions.map(question => {
              const expanded = selectedQuestion === question;

              return (
                <View
                  key={question}
                  style={[
                    styles.faqQuestionCard,
                    expanded && styles.faqQuestionCardExpanded,
                  ]}
                >
                  <TouchableOpacity
                    style={styles.faqQuestionButton}
                    onPress={() =>
                      setSelectedQuestion(
                        expanded ? null : question
                      )
                    }
                    activeOpacity={0.82}
                  >
                    <Text style={styles.faqQuestionText}>
                      {question}
                    </Text>

                    <Text style={styles.faqQuestionArrow}>
                      {expanded ? '⌃' : '›'}
                    </Text>
                  </TouchableOpacity>

                  {expanded && (
                    <Text style={styles.faqAnswerText}>
                      {answers[question] ||
                        'Please contact Christoffel Support for assistance with this question.'}
                    </Text>
                  )}
                </View>
              );
            })}

            <BottomButton
              title="CONTACT SUPPORT"
              onPress={() => {
                setFormError('');
                setView('contact');
              }}
            />
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  if (view === 'faq') {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={{ uri: BACKGROUND_IMAGE }}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.overlay} />

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Header
              title="Frequently Asked Questions"
              subtitle="Find answers to common questions."
              onBack={() => setView('home')}
            />

            <SearchBox
              value={faqSearch}
              onChangeText={setFaqSearch}
              placeholder="Search FAQs..."
            />

            {filteredCategories.map(category => (
              <TouchableOpacity
                key={category.title}
                style={styles.categoryCard}
                onPress={() => openCategory(category)}
                activeOpacity={0.82}
              >
                <Text style={styles.categoryTitle}>
                  {category.title}
                </Text>

                <Text style={styles.cardArrow}>
                  {category.icon}
                </Text>
              </TouchableOpacity>
            ))}

            {filteredCategories.length === 0 && (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyTitle}>
                  No FAQs found
                </Text>
                <Text style={styles.emptySubtitle}>
                  Try a different search.
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.urgentCard}
              onPress={() => {
                setFormError('');
                setView('contact');
              }}
              activeOpacity={0.82}
            >
              <View style={styles.urgentIcon}>
                <Text style={styles.urgentIconText}>•••</Text>
              </View>

              <View style={styles.urgentTextArea}>
                <Text style={styles.urgentTitle}>
                  Still need help?
                </Text>
                <Text style={styles.urgentSubtitle}>
                  Contact Support
                </Text>
              </View>

              <Text style={styles.cardArrow}>›</Text>
            </TouchableOpacity>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  if (view === 'contact') {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={{ uri: BACKGROUND_IMAGE }}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.overlay} />

          <KeyboardAvoidingView
            style={styles.keyboard}
            behavior={
              Platform.OS === 'ios' ? 'padding' : undefined
            }
          >
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <Header
                title="Contact Support"
                subtitle="Send us a message and we'll get back to you as soon as possible."
                onBack={() => setView('home')}
              />

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>
                  FULL NAME
                </Text>
                <TextInput
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="e.g. Brian Johns"
                  placeholderTextColor="#7E8981"
                  style={styles.input}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>
                  EMAIL ADDRESS
                </Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="e.g. brian@example.com"
                  placeholderTextColor="#7E8981"
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>
                  SUBJECT
                </Text>
                <TextInput
                  value={subject}
                  onChangeText={setSubject}
                  placeholder="e.g. Issue with payment"
                  placeholderTextColor="#7E8981"
                  style={styles.input}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>
                  MESSAGE
                </Text>
                <TextInput
                  value={message}
                  onChangeText={setMessage}
                  placeholder="Describe your issue..."
                  placeholderTextColor="#7E8981"
                  style={[styles.input, styles.messageInput]}
                  multiline
                  textAlignVertical="top"
                />
              </View>

              {!!formError && (
                <Text style={styles.errorText}>
                  {formError}
                </Text>
              )}

              <BottomButton
                title="SEND MESSAGE"
                onPress={sendMessage}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: BACKGROUND_IMAGE }}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Header
            title="Help & Support"
            subtitle="We're here for you. Get the help you need, anytime."
            onBack={onBack}
          />

          <SearchBox
            value={helpSearch}
            onChangeText={setHelpSearch}
            placeholder="Search for help..."
          />

          {filteredHelpActions.map(item => (
            <ActionCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              onPress={item.action}
            />
          ))}

          <TouchableOpacity
            style={styles.urgentCard}
            onPress={() => {
              setFormError('');
              setView('contact');
            }}
            activeOpacity={0.82}
          >
            <View style={styles.urgentIcon}>
              <Text style={styles.urgentIconText}>•••</Text>
            </View>

            <View style={styles.urgentTextArea}>
              <Text style={styles.urgentTitle}>
                Need urgent help?
              </Text>
              <Text style={styles.urgentSubtitle}>
                Contact us directly
              </Text>
            </View>

            <Text style={styles.cardArrow}>›</Text>
          </TouchableOpacity>

          <BottomButton
            title="SUPPORT RESPONSE EXAMPLE"
            secondary
            onPress={() => setView('response')}
          />
        </ScrollView>
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
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(5, 18, 11, 0.88)',
  },

  keyboard: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 110,
  },

  header: {
    alignItems: 'center',
    paddingTop: 42,
    paddingBottom: 22,
  },

  backButton: {
    position: 'absolute',
    left: 0,
    top: 40,
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

  chefIcon: {
    color: '#D4AF37',
    fontSize: 38,
    marginBottom: 2,
  },

  brandTitle: {
    color: '#F5F1E8',
    fontSize: 25,
    fontWeight: '500',
    letterSpacing: 4,
    textAlign: 'center',
  },

  brandLineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },

  brandLine: {
    width: 35,
    height: 1,
    backgroundColor: '#D4AF37',
    opacity: 0.75,
    marginHorizontal: 9,
  },

  brandMenu: {
    color: '#D4AF37',
    fontSize: 9,
    letterSpacing: 3.5,
  },

  pageTitle: {
    color: '#F5F1E8',
    fontSize: 25,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 25,
    maxWidth: 340,
  },

  pageSubtitle: {
    color: '#A5ADA7',
    fontSize: 11,
    lineHeight: 17,
    textAlign: 'center',
    marginTop: 7,
    maxWidth: 330,
  },

  searchBox: {
    height: 48,
    borderWidth: 1,
    borderColor: '#385045',
    borderRadius: 9,
    backgroundColor: 'rgba(7, 19, 13, 0.78)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 12,
  },

  searchIcon: {
    color: '#F5F1E8',
    fontSize: 25,
    marginRight: 9,
    marginTop: -4,
  },

  searchInput: {
    flex: 1,
    color: '#F5F1E8',
    fontSize: 12,
    paddingVertical: 0,
  },

  actionCard: {
    minHeight: 66,
    borderWidth: 1,
    borderColor: '#385045',
    borderRadius: 10,
    backgroundColor: 'rgba(7, 19, 13, 0.82)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 9,
  },

  actionIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: '#D4AF37',
    backgroundColor: '#101A13',
    alignItems: 'center',
    justifyContent: 'center',
  },

  actionIcon: {
    color: '#D4AF37',
    fontSize: 20,
    fontWeight: '600',
  },

  actionTextArea: {
    flex: 1,
    marginLeft: 13,
  },

  actionTitle: {
    color: '#F1EEE5',
    fontSize: 12.5,
    fontWeight: '500',
  },

  actionSubtitle: {
    color: '#89938C',
    fontSize: 9.5,
    marginTop: 3,
  },

  cardArrow: {
    color: '#D4AF37',
    fontSize: 27,
    fontWeight: '300',
    marginLeft: 8,
  },

  categoryCard: {
    minHeight: 49,
    borderWidth: 1,
    borderColor: '#385045',
    borderRadius: 9,
    backgroundColor: 'rgba(7, 19, 13, 0.82)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 7,
  },

  categoryTitle: {
    flex: 1,
    color: '#F1EEE5',
    fontSize: 12,
  },

  faqQuestionCard: {
    borderWidth: 1,
    borderColor: '#385045',
    borderRadius: 10,
    backgroundColor: 'rgba(7, 19, 13, 0.82)',
    marginBottom: 8,
    overflow: 'hidden',
  },

  faqQuestionCardExpanded: {
    borderColor: '#D4AF37',
  },

  faqQuestionButton: {
    minHeight: 51,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },

  faqQuestionText: {
    flex: 1,
    color: '#F1EEE5',
    fontSize: 11.5,
    lineHeight: 17,
  },

  faqQuestionArrow: {
    color: '#D4AF37',
    fontSize: 21,
    marginLeft: 8,
  },

  faqAnswerText: {
    color: '#A5ADA7',
    fontSize: 10.5,
    lineHeight: 17,
    paddingHorizontal: 14,
    paddingBottom: 15,
  },

  urgentCard: {
    minHeight: 60,
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 10,
    backgroundColor: 'rgba(11, 23, 15, 0.88)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 10,
    marginBottom: 28,
  },

  urgentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
  },

  urgentIconText: {
    color: '#D4AF37',
    fontSize: 15,
    letterSpacing: 2,
  },

  urgentTextArea: {
    flex: 1,
    marginLeft: 13,
  },

  urgentTitle: {
    color: '#F1EEE5',
    fontSize: 11.5,
  },

  urgentSubtitle: {
    color: '#A5ADA7',
    fontSize: 9.5,
    marginTop: 3,
  },

  inputGroup: {
    marginBottom: 13,
  },

  inputLabel: {
    color: '#D4AF37',
    fontSize: 8.5,
    letterSpacing: 1.8,
    marginBottom: 6,
  },

  input: {
    minHeight: 47,
    borderWidth: 1,
    borderColor: '#385045',
    borderRadius: 9,
    backgroundColor: 'rgba(7, 19, 13, 0.82)',
    color: '#F1EEE5',
    fontSize: 11.5,
    paddingHorizontal: 13,
    paddingVertical: 11,
  },

  messageInput: {
    minHeight: 125,
  },

  errorText: {
    color: '#E5B84A',
    fontSize: 10.5,
    marginBottom: 10,
    textAlign: 'center',
  },

  bottomButton: {
    minHeight: 53,
    borderRadius: 27,
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    marginTop: 12,
  },

  bottomButtonSecondary: {
    backgroundColor: 'rgba(7, 19, 13, 0.82)',
    borderWidth: 1.5,
    borderColor: '#D4AF37',
  },

  bottomButtonText: {
    color: '#0B100D',
    fontSize: 11.5,
    fontWeight: '700',
    letterSpacing: 1.5,
  },

  bottomButtonTextSecondary: {
    color: '#F1EEE5',
  },

  buttonGroup: {
    width: '100%',
    marginTop: 20,
  },

  emptyCard: {
    borderWidth: 1,
    borderColor: '#385045',
    borderRadius: 10,
    padding: 22,
    alignItems: 'center',
  },

  emptyTitle: {
    color: '#F1EEE5',
    fontSize: 13,
  },

  emptySubtitle: {
    color: '#A5ADA7',
    fontSize: 10,
    marginTop: 5,
  },

  loadingSpinner: {
    marginTop: 55,
    marginBottom: 28,
  },

  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },

  statusHeading: {
    color: '#F5F1E8',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 2.2,
    textAlign: 'center',
    marginTop: 10,
  },

  statusSubtitle: {
    color: '#A5ADA7',
    fontSize: 11,
    lineHeight: 17,
    textAlign: 'center',
    marginTop: 10,
  },

  successCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 1.5,
    borderColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },

  successCheck: {
    color: '#D4AF37',
    fontSize: 45,
    fontWeight: '300',
  },

  successHeading: {
    color: '#F5F1E8',
    fontSize: 23,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 7,
  },

  responseCard: {
    borderWidth: 1,
    borderColor: '#385045',
    borderRadius: 11,
    backgroundColor: 'rgba(7, 19, 13, 0.88)',
    padding: 16,
    marginTop: 5,
  },

  responseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  responseLogo: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  responseLogoText: {
    color: '#D4AF37',
    fontSize: 20,
    fontWeight: '500',
  },

  responseName: {
    color: '#F1EEE5',
    fontSize: 11.5,
  },

  responseTime: {
    color: '#7F8982',
    fontSize: 8.5,
    marginTop: 3,
  },

  responseDivider: {
    height: 1,
    backgroundColor: '#304239',
    marginVertical: 13,
  },

  responseText: {
    color: '#C4CAC5',
    fontSize: 10.5,
    lineHeight: 17,
  },
});
