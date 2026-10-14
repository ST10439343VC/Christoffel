import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type AboutProps = {
  onBack: () => void;
  onHome: () => void;
};

const BACKGROUND_IMAGE =
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85';

const KITCHEN_IMAGE =
  'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=85';

const FOOD_IMAGE =
  'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85';

function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <View style={styles.sectionTitle}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.sectionHeading}>{title}</Text>
      <View style={styles.goldShortLine} />
    </View>
  );
}

function TimelineItem({
  number,
  title,
  text,
  last = false,
}: {
  number: string;
  title: string;
  text: string;
  last?: boolean;
}) {
  return (
    <View style={styles.timelineRow}>
      <View style={styles.timelineRail}>
        <View style={styles.timelineCircle}>
          <Text style={styles.timelineNumber}>{number}</Text>
        </View>
        {!last && <View style={styles.timelineLine} />}
      </View>

      <View style={styles.timelineContent}>
        <Text style={styles.timelineTitle}>{title}</Text>
        <Text style={styles.timelineText}>{text}</Text>
      </View>
    </View>
  );
}

function RatingRow({
  label,
  rating,
}: {
  label: string;
  rating: string;
}) {
  return (
    <View style={styles.ratingRow}>
      <Text style={styles.ratingLabel}>{label}</Text>

      <View style={styles.stars}>
        <Text style={styles.starText}>★★★★★</Text>
      </View>

      <Text style={styles.ratingNumber}>{rating}</Text>
    </View>
  );
}

export default function About({ onBack, onHome }: AboutProps) {
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
              <Text style={styles.brandMenu}>ABOUT</Text>
              <View style={styles.brandLine} />
            </View>

            <Text style={styles.pageTitle}>The Story Behind Christoffel</Text>

            <Text style={styles.pageSubtitle}>
              More than a menu. A story, a table and an experience.
            </Text>
          </View>

          <View style={styles.heroCard}>
            <Image
              source={{ uri: HERO_IMAGE }}
              style={styles.heroImage}
              resizeMode="cover"
            />

            <View style={styles.heroOverlay} />

            <View style={styles.heroContent}>
              <Text style={styles.heroSmall}>ESTABLISHED 2024</Text>
              <Text style={styles.heroTitle}>FROM ONE IDEA</Text>
              <Text style={styles.heroTitle}>TO ONE TABLE</Text>
              <Text style={styles.heroDescription}>
                Christoffel began with a simple question:
                what would make people want to come back?
              </Text>
            </View>
          </View>

          <View style={styles.storyCard}>
            <SectionTitle
              eyebrow="THE BEGINNING"
              title="It started around a table."
            />

            <Text style={styles.bodyText}>
              Christoffel was born from a late-night conversation between
              people who shared the same love for food, hospitality and the
              feeling of sitting around a great table.
            </Text>

            <Text style={styles.bodyText}>
              The idea was never to create just another restaurant. The goal
              was to create a place where the food felt carefully considered,
              the atmosphere felt special and every guest could feel at home.
            </Text>

            <View style={styles.quoteCard}>
              <Text style={styles.quoteMark}>“</Text>
              <Text style={styles.quoteText}>
                What would make people want to come back?
              </Text>
              <Text style={styles.quoteCaption}>
                — The question that became the foundation of Christoffel
              </Text>
            </View>
          </View>

          <Image
            source={{ uri: KITCHEN_IMAGE }}
            style={styles.storyImage}
            resizeMode="cover"
          />

          <View style={styles.storyCard}>
            <SectionTitle
              eyebrow="THE COME-UP"
              title="From an idea to an experience."
            />

            <Text style={styles.bodyText}>
              The first days were about testing recipes, refining the menu
              and deciding what Christoffel should feel like. Every dish had
              to earn its place. Every detail had to have a reason.
            </Text>

            <Text style={styles.bodyText}>
              Little by little, the concept became a restaurant identity:
              warm hospitality, carefully prepared food, an elegant setting
              and a modern way for guests to explore the menu.
            </Text>
          </View>

          <View style={styles.timelineCard}>
            <SectionTitle
              eyebrow="THE CHRISTOFFEL JOURNEY"
              title="Five moments that shaped the brand."
            />

            <TimelineItem
              number="01"
              title="THE IDEA"
              text="A conversation about creating a restaurant people would genuinely want to return to."
            />

            <TimelineItem
              number="02"
              title="THE FIRST MENU"
              text="Recipes were tested, dishes were refined and the first Christoffel menu began taking shape."
            />

            <TimelineItem
              number="03"
              title="THE FIRST TABLE"
              text="The concept became real when the first guests sat down and experienced Christoffel for themselves."
            />

            <TimelineItem
              number="04"
              title="THE EXPERIENCE"
              text="Food, atmosphere and hospitality became the heart of the brand."
            />

            <TimelineItem
              number="05"
              title="TODAY"
              text="Christoffel brings that restaurant experience into a modern digital ordering journey."
              last
            />
          </View>

          <Image
            source={{ uri: FOOD_IMAGE }}
            style={styles.foodImage}
            resizeMode="cover"
          />

          <View style={styles.certificateCard}>
            <SectionTitle
              eyebrow="A CHRISTOFFEL MILESTONE"
              title="Certificate of Excellence"
            />

            <View style={styles.certificate}>
              <View style={styles.certificateInner}>
                <Text style={styles.certificateTop}>
                  CHRISTOFFEL
                </Text>

                <View style={styles.certificateDivider} />

                <Text style={styles.certificateHeading}>
                  CERTIFICATE
                </Text>

                <Text style={styles.certificateSubheading}>
                  OF EXCELLENCE
                </Text>

                <View style={styles.certificateSeal}>
                  <Text style={styles.certificateSealText}>C</Text>
                </View>

                <Text style={styles.certificateRecognised}>
                  RECOGNISED FOR
                </Text>

                <Text style={styles.certificateValues}>
                  FOOD • SERVICE • EXPERIENCE
                </Text>

                <Text style={styles.certificateEstablished}>
                  EST. 2024
                </Text>
              </View>
            </View>

            <Text style={styles.demoNote}>
              Christoffel brand certificate — fictional/demo content.
            </Text>
          </View>

          <View style={styles.ratingCard}>
            <SectionTitle
              eyebrow="THE GUEST VERDICT"
              title="A 4.9 experience."
            />

            <View style={styles.ratingHero}>
              <Text style={styles.bigRating}>4.9</Text>
              <Text style={styles.bigStars}>★★★★★</Text>
              <Text style={styles.ratingCaption}>
                250+ guest ratings
              </Text>
            </View>

            <RatingRow label="FOOD" rating="4.9" />
            <RatingRow label="SERVICE" rating="4.8" />
            <RatingRow label="ATMOSPHERE" rating="4.9" />
            <RatingRow label="EXPERIENCE" rating="4.9" />

            <Text style={styles.demoNote}>
              Fictional/demo ratings created for the Christoffel app experience.
            </Text>
          </View>

          <View style={styles.whyCard}>
            <SectionTitle
              eyebrow="WHY CHRISTOFFEL?"
              title="Because a restaurant should be more than a menu."
            />

            <Text style={styles.bodyText}>
              It should be the feeling when you walk through the door, the
              anticipation when the food arrives, the conversation around the
              table and the memory you take with you when you leave.
            </Text>

            <Text style={styles.bodyText}>
              Christoffel brings those ideas together with a modern ordering
              experience designed to keep the journey simple without losing
              the character of the restaurant.
            </Text>
          </View>

          <View style={styles.finalQuote}>
            <Text style={styles.finalQuoteSmall}>THE CHRISTOFFEL WAY</Text>
            <Text style={styles.finalQuoteText}>
              “Good food brings people to the table.
              Great experiences bring them back.”
            </Text>
          </View>

          <View style={styles.appInfoCard}>
            <Text style={styles.appInfoLabel}>APP INFORMATION</Text>
            <Text style={styles.appInfoName}>CHRISTOFFEL MENU</Text>
            <Text style={styles.appInfoVersion}>Version 1.0.0</Text>
            <Text style={styles.appInfoText}>
              A modern restaurant menu and ordering experience.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={onHome}
            activeOpacity={0.85}
          >
            <Text style={styles.homeButtonText}>BACK TO HOME</Text>
            <Text style={styles.homeButtonArrow}>›</Text>
          </TouchableOpacity>

          <Text style={styles.footer}>
            EST. 2024 • CHRISTOFFEL
          </Text>
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
    backgroundColor: 'rgba(5, 18, 11, 0.89)',
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 60,
  },

  header: {
    alignItems: 'center',
    paddingTop: 42,
    paddingBottom: 24,
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

  heroCard: {
    height: 300,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#D4AF37',
    marginBottom: 16,
  },

  heroImage: {
    ...StyleSheet.absoluteFill,
  },

  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(4, 12, 7, 0.52)',
  },

  heroContent: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 22,
  },

  heroSmall: {
    color: '#D4AF37',
    fontSize: 9,
    letterSpacing: 2.5,
    marginBottom: 9,
  },

  heroTitle: {
    color: '#F5F1E8',
    fontSize: 27,
    fontWeight: '400',
    letterSpacing: 2,
  },

  heroDescription: {
    color: '#D0D5D0',
    fontSize: 11,
    lineHeight: 17,
    marginTop: 11,
    maxWidth: 310,
  },

  storyCard: {
    borderWidth: 1,
    borderColor: '#385045',
    borderRadius: 12,
    backgroundColor: 'rgba(7, 19, 13, 0.84)',
    padding: 18,
    marginBottom: 16,
  },

  sectionTitle: {
    marginBottom: 15,
  },

  eyebrow: {
    color: '#D4AF37',
    fontSize: 8.5,
    letterSpacing: 2.2,
    marginBottom: 5,
  },

  sectionHeading: {
    color: '#F5F1E8',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 26,
  },

  goldShortLine: {
    width: 38,
    height: 1,
    backgroundColor: '#D4AF37',
    marginTop: 9,
  },

  bodyText: {
    color: '#B9C1BB',
    fontSize: 11,
    lineHeight: 18,
    marginBottom: 12,
  },

  quoteCard: {
    borderLeftWidth: 2,
    borderLeftColor: '#D4AF37',
    backgroundColor: 'rgba(20, 30, 23, 0.78)',
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginTop: 4,
  },

  quoteMark: {
    color: '#D4AF37',
    fontSize: 25,
    lineHeight: 24,
  },

  quoteText: {
    color: '#F5F1E8',
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '400',
  },

  quoteCaption: {
    color: '#7F8982',
    fontSize: 9,
    lineHeight: 14,
    marginTop: 7,
  },

  storyImage: {
    width: '100%',
    height: 190,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#385045',
    marginBottom: 16,
  },

  timelineCard: {
    borderWidth: 1,
    borderColor: '#385045',
    borderRadius: 12,
    backgroundColor: 'rgba(7, 19, 13, 0.84)',
    padding: 18,
    marginBottom: 16,
  },

  timelineRow: {
    flexDirection: 'row',
    minHeight: 91,
  },

  timelineRail: {
    width: 43,
    alignItems: 'center',
  },

  timelineCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#D4AF37',
    backgroundColor: '#101A13',
    alignItems: 'center',
    justifyContent: 'center',
  },

  timelineNumber: {
    color: '#D4AF37',
    fontSize: 8.5,
    letterSpacing: 0.5,
  },

  timelineLine: {
    flex: 1,
    width: 1,
    backgroundColor: '#526056',
    marginVertical: 5,
  },

  timelineContent: {
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 18,
  },

  timelineTitle: {
    color: '#F1EEE5',
    fontSize: 11.5,
    letterSpacing: 1,
    fontWeight: '500',
    marginTop: 3,
  },

  timelineText: {
    color: '#929C95',
    fontSize: 9.5,
    lineHeight: 15,
    marginTop: 5,
  },

  foodImage: {
    width: '100%',
    height: 185,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#385045',
    marginBottom: 16,
  },

  certificateCard: {
    borderWidth: 1,
    borderColor: '#385045',
    borderRadius: 12,
    backgroundColor: 'rgba(7, 19, 13, 0.84)',
    padding: 18,
    marginBottom: 16,
  },

  certificate: {
    borderWidth: 1,
    borderColor: '#D4AF37',
    padding: 7,
    backgroundColor: '#101A13',
  },

  certificateInner: {
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.55)',
    alignItems: 'center',
    paddingVertical: 23,
    paddingHorizontal: 12,
  },

  certificateTop: {
    color: '#D4AF37',
    fontSize: 11,
    letterSpacing: 3,
  },

  certificateDivider: {
    width: 55,
    height: 1,
    backgroundColor: '#D4AF37',
    marginVertical: 12,
  },

  certificateHeading: {
    color: '#F5F1E8',
    fontSize: 19,
    letterSpacing: 3,
  },

  certificateSubheading: {
    color: '#D4AF37',
    fontSize: 10,
    letterSpacing: 3,
    marginTop: 3,
  },

  certificateSeal: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 1,
    borderColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },

  certificateSealText: {
    color: '#D4AF37',
    fontSize: 27,
    fontWeight: '500',
  },

  certificateRecognised: {
    color: '#858F88',
    fontSize: 7.5,
    letterSpacing: 2,
  },

  certificateValues: {
    color: '#F1EEE5',
    fontSize: 9,
    letterSpacing: 1.2,
    marginTop: 5,
    textAlign: 'center',
  },

  certificateEstablished: {
    color: '#D4AF37',
    fontSize: 8,
    letterSpacing: 2,
    marginTop: 15,
  },

  demoNote: {
    color: '#667169',
    fontSize: 8,
    lineHeight: 12,
    textAlign: 'center',
    marginTop: 9,
  },

  ratingCard: {
    borderWidth: 1,
    borderColor: '#385045',
    borderRadius: 12,
    backgroundColor: 'rgba(7, 19, 13, 0.84)',
    padding: 18,
    marginBottom: 16,
  },

  ratingHero: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#304239',
    paddingBottom: 15,
    marginBottom: 12,
  },

  bigRating: {
    color: '#F5F1E8',
    fontSize: 42,
    fontWeight: '300',
  },

  bigStars: {
    color: '#D4AF37',
    fontSize: 17,
    letterSpacing: 2,
    marginTop: -2,
  },

  ratingCaption: {
    color: '#8B958E',
    fontSize: 9.5,
    marginTop: 5,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 35,
    borderBottomWidth: 1,
    borderBottomColor: '#26362C',
  },

  ratingLabel: {
    color: '#BFC6C0',
    fontSize: 9.5,
    width: 84,
  },

  stars: {
    flex: 1,
  },

  starText: {
    color: '#D4AF37',
    fontSize: 11,
    letterSpacing: 1,
  },

  ratingNumber: {
    color: '#F1EEE5',
    fontSize: 10,
    width: 28,
    textAlign: 'right',
  },

  whyCard: {
    borderWidth: 1,
    borderColor: '#385045',
    borderRadius: 12,
    backgroundColor: 'rgba(7, 19, 13, 0.84)',
    padding: 18,
    marginBottom: 16,
  },

  finalQuote: {
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 22,
    marginBottom: 16,
  },

  finalQuoteSmall: {
    color: '#D4AF37',
    fontSize: 8.5,
    letterSpacing: 2.5,
    marginBottom: 9,
  },

  finalQuoteText: {
    color: '#F5F1E8',
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '300',
    textAlign: 'center',
  },

  appInfoCard: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#304239',
    paddingVertical: 19,
    marginBottom: 16,
  },

  appInfoLabel: {
    color: '#D4AF37',
    fontSize: 8,
    letterSpacing: 2.2,
  },

  appInfoName: {
    color: '#F5F1E8',
    fontSize: 14,
    letterSpacing: 2,
    marginTop: 7,
  },

  appInfoVersion: {
    color: '#A5ADA7',
    fontSize: 9,
    marginTop: 4,
  },

  appInfoText: {
    color: '#667169',
    fontSize: 8.5,
    marginTop: 8,
    textAlign: 'center',
  },

  homeButton: {
    minHeight: 55,
    borderRadius: 28,
    backgroundColor: '#D4AF37',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 19,
    marginBottom: 15,
  },

  homeButtonText: {
    flex: 1,
    color: '#0B100D',
    fontSize: 11.5,
    fontWeight: '700',
    letterSpacing: 1.8,
    textAlign: 'center',
    marginLeft: 24,
  },

  homeButtonArrow: {
    color: '#0B100D',
    fontSize: 29,
    fontWeight: '300',
  },

  footer: {
    color: '#59635C',
    fontSize: 8,
    letterSpacing: 2,
    textAlign: 'center',
    paddingBottom: 8,
  },
});
