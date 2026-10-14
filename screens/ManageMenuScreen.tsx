import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  Modal,
  ImageBackground,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  MenuItem,
  Course,
} from '../data/menuData';

type ManageMenuScreenProps = {
  onBack: () => void;

  menuItems: MenuItem[];

  onAddMenuItem: (
    name: string,
    description: string,
    course: Course,
    price: number,
    image: string
  ) => void;

  onUpdateMenuItem: (
    id: string,
    name: string,
    description: string,
    course: Course,
    price: number,
    image: string
  ) => void;

  onDeleteMenuItem: (id: string) => void;
};

const RESTAURANT_BACKGROUND =
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85';

const DEFAULT_FOOD_IMAGE =
  'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80';

export default function ManageMenuScreen({
  onBack,
  menuItems,
  onAddMenuItem,
  onUpdateMenuItem,
  onDeleteMenuItem,
}: ManageMenuScreenProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] =
    useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] =
    useState<Course>('Starter');

  const [image, setImage] = useState('');

  const [successVisible, setSuccessVisible] =
    useState(false);

  const [successTitle, setSuccessTitle] =
    useState('');

  const [successMessage, setSuccessMessage] =
    useState('');

  const [deleteVisible, setDeleteVisible] =
    useState(false);

  const [dishToDelete, setDishToDelete] =
    useState<MenuItem | null>(null);

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setCourse('Starter');
    setImage('');
    setEditingId(null);
    setShowForm(false);
  };

  const openAddForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setCourse('Starter');
    setImage('');
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (item: MenuItem) => {
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price.toString());
    setCourse(item.course);
    setImage(item.image);
    setEditingId(item.id);
    setShowForm(true);
  };

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Permission Required',
        'Please allow photo library access to choose a dish image.'
      );
      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const saveDish = () => {
    const trimmedName = name.trim();

    const trimmedDescription =
      description.trim();

    const numericPrice = Number(price);

    if (!trimmedName) {
      Alert.alert(
        'Missing Dish Name',
        'Please enter a dish name.'
      );
      return;
    }

    if (!trimmedDescription) {
      Alert.alert(
        'Missing Description',
        'Please enter a description.'
      );
      return;
    }

    if (
      !price.trim() ||
      isNaN(numericPrice) ||
      numericPrice <= 0
    ) {
      Alert.alert(
        'Invalid Price',
        'Please enter a valid price.'
      );
      return;
    }

    const dishImage = image || DEFAULT_FOOD_IMAGE;

    if (editingId) {
      onUpdateMenuItem(
        editingId,
        trimmedName,
        trimmedDescription,
        course,
        numericPrice,
        dishImage
      );

      setSuccessTitle('Dish Updated');

      setSuccessMessage(
        `${trimmedName} has been updated.`
      );
    } else {
      onAddMenuItem(
        trimmedName,
        trimmedDescription,
        course,
        numericPrice,
        dishImage
      );

      setSuccessTitle('Dish Added');

      setSuccessMessage(
        `${trimmedName} has been added to the menu.`
      );
    }

    resetForm();
    setSuccessVisible(true);
  };

  const confirmDelete = (item: MenuItem) => {
    setDishToDelete(item);
    setDeleteVisible(true);
  };

  const handleDelete = () => {
    if (!dishToDelete) {
      return;
    }

    onDeleteMenuItem(dishToDelete.id);

    setDeleteVisible(false);
    setDishToDelete(null);
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top', 'bottom']}
    >
      <ImageBackground
        source={{
          uri: RESTAURANT_BACKGROUND,
        }}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        {/* =========================
            HEADER
        ========================= */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={
              showForm
                ? resetForm
                : onBack
            }
            activeOpacity={0.8}
          >
            <Text style={styles.backText}>
              ‹
            </Text>
          </TouchableOpacity>

          <View style={styles.headerTitleContainer}>
            <Text style={styles.chefIcon}>
              ♨
            </Text>

            <Text style={styles.eyebrow}>
              CHRISTOFFEL
            </Text>

            <View style={styles.brandLineRow}>
              <View style={styles.smallGoldLine} />

              <Text style={styles.menu}>
                MENU
              </Text>

              <View style={styles.smallGoldLine} />
            </View>

            <Text style={styles.title}>
              Manage Menu
            </Text>

            <Text style={styles.subtitle}>
              Add, edit and manage dishes
            </Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.goldLine} />

        {/* =========================
            ADD NEW DISH
        ========================= */}

        {!showForm && (
          <TouchableOpacity
            style={styles.addNewButton}
            onPress={openAddForm}
            activeOpacity={0.85}
          >
            <Text style={styles.addIcon}>
              +
            </Text>

            <Text style={styles.addNewButtonText}>
              ADD NEW DISH
            </Text>

            <Text style={styles.addArrow}>
              ›
            </Text>
          </TouchableOpacity>
        )}

        {/* =========================
            FORM
        ========================= */}

        {showForm && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              styles.formContainer
            }
          >
            <View style={styles.formCard}>
              <View style={styles.formHeading}>
                <Text style={styles.formEyebrow}>
                  CHRISTOFFEL MENU
                </Text>

                <Text style={styles.formTitle}>
                  {editingId
                    ? 'EDIT DISH'
                    : 'ADD NEW DISH'}
                </Text>

                <View
                  style={styles.formGoldLine}
                />
              </View>

              {/* DISH NAME */}

              <Text style={styles.label}>
                DISH NAME
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Enter dish name"
                placeholderTextColor="#777F79"
                value={name}
                onChangeText={setName}
              />

              {/* DESCRIPTION */}

              <Text style={styles.label}>
                DESCRIPTION
              </Text>

              <TextInput
                style={[
                  styles.input,
                  styles.descriptionInput,
                ]}
                placeholder="Enter dish description"
                placeholderTextColor="#777F79"
                value={description}
                onChangeText={setDescription}
                multiline
              />

              {/* PRICE */}

              <Text style={styles.label}>
                PRICE
              </Text>

              <View style={styles.priceInputWrapper}>
                <Text style={styles.currency}>
                  R
                </Text>

                <TextInput
                  style={styles.priceInput}
                  placeholder="0.00"
                  placeholderTextColor="#777F79"
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="numeric"
                />
              </View>

              {/* DISH IMAGE */}

              <Text style={styles.label}>
                DISH IMAGE
              </Text>

              <View style={styles.imagePickerContainer}>
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={styles.imagePreview}
                  />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <Text style={styles.imagePlaceholderIcon}>
                      ♨
                    </Text>

                    <Text style={styles.imagePlaceholderText}>
                      NO IMAGE SELECTED
                    </Text>
                  </View>
                )}

                <TouchableOpacity
                  style={styles.imagePickerButton}
                  onPress={pickImage}
                  activeOpacity={0.85}
                >
                  <Text style={styles.imagePickerIcon}>
                    {image ? '✎' : '+'}
                  </Text>

                  <Text style={styles.imagePickerButtonText}>
                    {image
                      ? 'CHANGE IMAGE'
                      : 'CHOOSE DISH IMAGE'}
                  </Text>

                  <Text style={styles.imagePickerArrow}>
                    ›
                  </Text>
                </TouchableOpacity>
              </View>

              {/* COURSE */}

              <Text style={styles.label}>
                COURSE
              </Text>

              <View style={styles.courseContainer}>
                <TouchableOpacity
                  style={[
                    styles.courseButton,
                    course === 'Starter' &&
                      styles.selectedCourse,
                  ]}
                  onPress={() =>
                    setCourse('Starter')
                  }
                  activeOpacity={0.85}
                >
                  <Text
                    style={[
                      styles.courseText,
                      course === 'Starter' &&
                        styles.selectedCourseText,
                    ]}
                  >
                    STARTER
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.courseButton,
                    course === 'Main Course' &&
                      styles.selectedCourse,
                  ]}
                  onPress={() =>
                    setCourse('Main Course')
                  }
                  activeOpacity={0.85}
                >
                  <Text
                    style={[
                      styles.courseText,
                      course === 'Main Course' &&
                        styles.selectedCourseText,
                    ]}
                  >
                    MAIN COURSE
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.courseButton,
                    course === 'Dessert' &&
                      styles.selectedCourse,
                  ]}
                  onPress={() =>
                    setCourse('Dessert')
                  }
                  activeOpacity={0.85}
                >
                  <Text
                    style={[
                      styles.courseText,
                      course === 'Dessert' &&
                        styles.selectedCourseText,
                    ]}
                  >
                    DESSERT
                  </Text>
                </TouchableOpacity>
              </View>

              {/* SAVE */}

              <TouchableOpacity
                style={styles.saveButton}
                onPress={saveDish}
                activeOpacity={0.85}
              >
                <Text style={styles.saveIcon}>
                  ✓
                </Text>

                <Text style={styles.saveButtonText}>
                  {editingId
                    ? 'UPDATE DISH'
                    : 'ADD DISH'}
                </Text>

                <Text style={styles.saveArrow}>
                  ›
                </Text>
              </TouchableOpacity>

              {/* CANCEL */}

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={resetForm}
                activeOpacity={0.85}
              >
                <Text style={styles.cancelButtonText}>
                  CANCEL
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}

        {/* =========================
            CURRENT MENU
        ========================= */}

        {!showForm && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              styles.listContainer
            }
          >
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionEyebrow}>
                  CHRISTOFFEL
                </Text>

                <Text style={styles.sectionTitle}>
                  CURRENT MENU
                </Text>

                <Text style={styles.sectionSubtitle}>
                  {menuItems.length}{' '}
                  {menuItems.length === 1
                    ? 'dish'
                    : 'dishes'}{' '}
                  available
                </Text>
              </View>

              <View style={styles.menuCountBadge}>
                <Text style={styles.menuCountText}>
                  {menuItems.length}
                </Text>
              </View>
            </View>

            {menuItems.map(item => (
              <View
                key={item.id}
                style={styles.menuCard}
              >
                {/* IMAGE */}

                <View style={styles.imageWrapper}>
                  <Image
                    source={{
                      uri: item.image,
                    }}
                    style={styles.menuImage}
                  />

                  <View
                    style={styles.imageOverlay}
                  />

                  <View
                    style={styles.courseBadge}
                  >
                    <Text
                      style={
                        styles.courseBadgeText
                      }
                    >
                      {item.course}
                    </Text>
                  </View>
                </View>

                {/* INFORMATION */}

                <View style={styles.menuContent}>
                  <Text
                    style={styles.menuName}
                    numberOfLines={2}
                  >
                    {item.name}
                  </Text>

                  <Text
                    style={styles.menuDescription}
                    numberOfLines={3}
                  >
                    {item.description}
                  </Text>

                  <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>
                      PRICE
                    </Text>

                    <Text style={styles.menuPrice}>
                      R{item.price.toFixed(2)}
                    </Text>
                  </View>

                  {/* ACTIONS */}

                  <View style={styles.actions}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() =>
                        openEditForm(item)
                      }
                      activeOpacity={0.8}
                    >
                      <Text style={styles.editActionIcon}>
                        ✎
                      </Text>

                      <Text style={styles.editText}>
                        EDIT
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() =>
                        confirmDelete(item)
                      }
                      activeOpacity={0.8}
                    >
                      <Text
                        style={styles.deleteActionIcon}
                      >
                        ×
                      </Text>

                      <Text
                        style={styles.deleteText}
                      >
                        DELETE
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}

            {/* EMPTY MENU */}

            {menuItems.length === 0 && (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyIcon}>
                  ♨
                </Text>

                <Text style={styles.emptyTitle}>
                  NO DISHES YET
                </Text>

                <Text style={styles.emptyText}>
                  Add your first dish to begin
                  building the Christoffel menu.
                </Text>
              </View>
            )}

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
          </ScrollView>
        )}

        {/* =========================
            DELETE CONFIRMATION MODAL
        ========================= */}

        <Modal
          visible={deleteVisible}
          transparent
          animationType="fade"
          onRequestClose={() => {
            setDeleteVisible(false);
            setDishToDelete(null);
          }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <View
                style={styles.deleteIconCircle}
              >
                <Text style={styles.deleteIcon}>
                  ×
                </Text>
              </View>

              <Text style={styles.modalEyebrow}>
                CHRISTOFFEL MENU
              </Text>

              <Text style={styles.modalTitle}>
                Delete Dish
              </Text>

              <Text style={styles.modalMessage}>
                Are you sure you want to delete
              </Text>

              <Text style={styles.modalDishName}>
                {dishToDelete?.name}?
              </Text>

              <View
                style={styles.modalDivider}
              />

              <View
                style={styles.modalButtons}
              >
                <TouchableOpacity
                  style={
                    styles.modalCancelButton
                  }
                  onPress={() => {
                    setDeleteVisible(false);
                    setDishToDelete(null);
                  }}
                  activeOpacity={0.85}
                >
                  <Text
                    style={styles.modalCancelText}
                  >
                    CANCEL
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={
                    styles.modalDeleteButton
                  }
                  onPress={handleDelete}
                  activeOpacity={0.85}
                >
                  <Text
                    style={styles.modalDeleteText}
                  >
                    DELETE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* =========================
            SUCCESS MODAL
        ========================= */}

        <Modal
          visible={successVisible}
          transparent
          animationType="fade"
          onRequestClose={() =>
            setSuccessVisible(false)
          }
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <View
                style={styles.successIconCircle}
              >
                <Text style={styles.successIcon}>
                  ✓
                </Text>
              </View>

              <Text style={styles.modalEyebrow}>
                CHRISTOFFEL MENU
              </Text>

              <Text style={styles.modalTitle}>
                {successTitle}
              </Text>

              <Text style={styles.modalMessage}>
                {successMessage}
              </Text>

              <View
                style={styles.modalDivider}
              />

              <TouchableOpacity
                style={styles.modalOkButton}
                onPress={() =>
                  setSuccessVisible(false)
                }
                activeOpacity={0.85}
              >
                <Text style={styles.modalOkText}>
                  CONTINUE
                </Text>

                <Text
                  style={styles.modalOkArrow}
                >
                  ›
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /* =========================
     BASE
  ========================= */

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
    backgroundColor:
      'rgba(5, 18, 11, 0.82)',
  },

  /* =========================
     HEADER
  ========================= */

  header: {
    height: 135,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: '#D4AF37',
    backgroundColor:
      'rgba(10, 18, 13, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backText: {
    color: '#D4AF37',
    fontSize: 36,
    fontWeight: '300',
    lineHeight: 38,
    marginTop: -3,
  },

  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 8,
  },

  headerSpacer: {
    width: 42,
  },

  chefIcon: {
    color: '#D4AF37',
    fontSize: 29,
    marginBottom: 0,
  },

  eyebrow: {
    color: '#D4AF37',
    fontSize: 8.5,
    letterSpacing: 3,
    fontWeight: '600',
  },

  brandLineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },

  smallGoldLine: {
    width: 30,
    height: 1,
    backgroundColor: '#D4AF37',
    opacity: 0.8,
    marginHorizontal: 9,
  },

  menu: {
    color: '#D4AF37',
    fontSize: 10,
    letterSpacing: 4,
  },

  title: {
    color: '#F5F1E8',
    fontSize: 25,
    fontWeight: '400',
    marginTop: 7,
  },

  subtitle: {
    color: '#A5ADA7',
    fontSize: 11,
    marginTop: 3,
  },

  goldLine: {
    height: 1,
    backgroundColor: '#D4AF37',
    opacity: 0.55,
    marginHorizontal: 18,
  },

  /* =========================
     ADD BUTTON
  ========================= */

  addNewButton: {
    height: 55,
    marginHorizontal: 18,
    marginTop: 16,
    borderRadius: 28,
    backgroundColor: '#D4AF37',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 19,
  },

  addIcon: {
    color: '#0B100D',
    fontSize: 25,
    fontWeight: '300',
    marginRight: 10,
    marginTop: -2,
  },

  addNewButtonText: {
    flex: 1,
    color: '#0B100D',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.6,
    textAlign: 'center',
  },

  addArrow: {
    color: '#0B100D',
    fontSize: 29,
    fontWeight: '300',
    marginLeft: 10,
  },

  /* =========================
     MENU LIST
  ========================= */

  listContainer: {
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 70,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  sectionEyebrow: {
    color: '#A5ADA7',
    fontSize: 8,
    letterSpacing: 3,
    marginBottom: 3,
  },

  sectionTitle: {
    color: '#D4AF37',
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 1.8,
  },

  sectionSubtitle: {
    color: '#8E968F',
    fontSize: 10.5,
    marginTop: 4,
  },

  menuCountBadge: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor:
      'rgba(11, 16, 13, 0.75)',
    borderWidth: 1,
    borderColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
  },

  menuCountText: {
    color: '#D4AF37',
    fontSize: 15,
    fontWeight: '600',
  },

  /* =========================
     MENU CARD
  ========================= */

  menuCard: {
    minHeight: 166,
    backgroundColor:
      'rgba(11, 17, 13, 0.91)',
    borderRadius: 18,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 13,
    borderWidth: 1,
    borderColor: '#35443A',
  },

  imageWrapper: {
    width: 116,
    minHeight: 166,
    position: 'relative',
    backgroundColor: '#0B100D',
  },

  menuImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  imageOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor:
      'rgba(5, 18, 11, 0.15)',
  },

  courseBadge: {
    position: 'absolute',
    left: 9,
    bottom: 9,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor:
      'rgba(11, 16, 13, 0.9)',
    borderWidth: 1,
    borderColor: '#D4AF37',
  },

  courseBadgeText: {
    color: '#D4AF37',
    fontSize: 7.5,
    fontWeight: '600',
    letterSpacing: 0.8,
  },

  menuContent: {
    flex: 1,
    paddingHorizontal: 13,
    paddingVertical: 13,
  },

  menuName: {
    color: '#F5F1E8',
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 21,
  },

  menuDescription: {
    color: '#A5ADA7',
    fontSize: 10.5,
    lineHeight: 15,
    marginTop: 5,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 7,
  },

  priceLabel: {
    color: '#737D76',
    fontSize: 7.5,
    letterSpacing: 1.5,
  },

  menuPrice: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: '600',
  },

  /* =========================
     ACTIONS
  ========================= */

  actions: {
    flexDirection: 'row',
    marginTop: 9,
    gap: 8,
  },

  editButton: {
    flex: 1,
    height: 32,
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  editActionIcon: {
    color: '#D4AF37',
    fontSize: 12,
    marginRight: 5,
  },

  editText: {
    color: '#D4AF37',
    fontSize: 9.5,
    fontWeight: '600',
    letterSpacing: 0.8,
  },

  deleteButton: {
    flex: 1,
    height: 32,
    borderWidth: 1,
    borderColor: '#704646',
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  deleteActionIcon: {
    color: '#D98989',
    fontSize: 17,
    fontWeight: '300',
    marginRight: 4,
    marginTop: -2,
  },

  deleteText: {
    color: '#D98989',
    fontSize: 9.5,
    fontWeight: '600',
    letterSpacing: 0.8,
  },

  /* =========================
     EMPTY STATE
  ========================= */

  emptyCard: {
    borderWidth: 1,
    borderColor: '#35443A',
    borderRadius: 20,
    backgroundColor:
      'rgba(11, 16, 13, 0.8)',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 40,
    marginTop: 5,
  },

  emptyIcon: {
    color: '#D4AF37',
    fontSize: 34,
    marginBottom: 10,
  },

  emptyTitle: {
    color: '#D4AF37',
    fontSize: 15,
    letterSpacing: 2,
    fontWeight: '600',
  },

  emptyText: {
    color: '#8E9891',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 17,
    marginTop: 8,
  },

  /* =========================
     FORM
  ========================= */

  formContainer: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 60,
  },

  formCard: {
    backgroundColor:
      'rgba(11, 17, 13, 0.94)',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#39483E',
    padding: 18,
  },

  formHeading: {
    alignItems: 'center',
    marginBottom: 4,
  },

  formEyebrow: {
    color: '#8F9992',
    fontSize: 8,
    letterSpacing: 2.5,
  },

  formTitle: {
    color: '#D4AF37',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 1.8,
    marginTop: 5,
  },

  formGoldLine: {
    width: 55,
    height: 1,
    backgroundColor: '#D4AF37',
    opacity: 0.7,
    marginTop: 9,
  },

  label: {
    color: '#D4AF37',
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 7,
    marginTop: 14,
  },

  input: {
    backgroundColor:
      'rgba(5, 12, 8, 0.84)',
    borderWidth: 1,
    borderColor: '#2F3D34',
    borderRadius: 12,
    color: '#F5F1E8',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
  },

  descriptionInput: {
    minHeight: 95,
    textAlignVertical: 'top',
  },

  priceInputWrapper: {
    backgroundColor:
      'rgba(5, 12, 8, 0.84)',
    borderWidth: 1,
    borderColor: '#2F3D34',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 14,
  },

  currency: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: '600',
  },

  priceInput: {
    flex: 1,
    color: '#F5F1E8',
    paddingHorizontal: 9,
    paddingVertical: 12,
    fontSize: 14,
  },

  imagePickerContainer: {
    backgroundColor:
      'rgba(5, 12, 8, 0.84)',
    borderWidth: 1,
    borderColor: '#2F3D34',
    borderRadius: 14,
    overflow: 'hidden',
  },

  imagePreview: {
    width: '100%',
    height: 190,
  },

  imagePlaceholder: {
    height: 145,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:
      'rgba(11, 17, 13, 0.9)',
  },

  imagePlaceholderIcon: {
    color: '#D4AF37',
    fontSize: 32,
    marginBottom: 7,
  },

  imagePlaceholderText: {
    color: '#737D76',
    fontSize: 8,
    fontWeight: '600',
    letterSpacing: 1.5,
  },

  imagePickerButton: {
    height: 48,
    backgroundColor: '#D4AF37',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  imagePickerIcon: {
    color: '#0B100D',
    fontSize: 18,
    marginRight: 9,
  },

  imagePickerButtonText: {
    flex: 1,
    color: '#0B100D',
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 1.1,
    textAlign: 'center',
  },

  imagePickerArrow: {
    color: '#0B100D',
    fontSize: 26,
    fontWeight: '300',
    marginLeft: 9,
  },

  courseContainer: {
    gap: 9,
  },

  courseButton: {
    height: 45,
    borderWidth: 1,
    borderColor: '#2F3D34',
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:
      'rgba(5, 12, 8, 0.84)',
  },

  selectedCourse: {
    backgroundColor: '#D4AF37',
    borderColor: '#D4AF37',
  },

  courseText: {
    color: '#A5ADA7',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
  },

  selectedCourseText: {
    color: '#0B100D',
  },

  saveButton: {
    height: 55,
    backgroundColor: '#D4AF37',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    flexDirection: 'row',
    paddingHorizontal: 18,
  },

  saveIcon: {
    color: '#0B100D',
    fontSize: 17,
    marginRight: 10,
  },

  saveButtonText: {
    flex: 1,
    color: '#0B100D',
    fontSize: 12.5,
    fontWeight: '700',
    letterSpacing: 1.5,
    textAlign: 'center',
  },

  saveArrow: {
    color: '#0B100D',
    fontSize: 29,
    fontWeight: '300',
    marginLeft: 10,
  },

  cancelButton: {
    height: 48,
    borderWidth: 1,
    borderColor: '#46564C',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  cancelButtonText: {
    color: '#A5ADA7',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
  },

  /* =========================
     FOOTER
  ========================= */

  footer: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
    paddingBottom: 15,
  },

  footerLine: {
    width: 42,
    height: 1,
    backgroundColor: '#D4AF37',
    opacity: 0.55,
    marginHorizontal: 12,
  },

  footerBrand: {
    color: '#D4AF37',
    fontSize: 8,
    letterSpacing: 3.5,
    fontWeight: '500',
  },

  footerSmall: {
    position: 'absolute',
    top: 16,
    color: '#606A63',
    fontSize: 7,
    letterSpacing: 2.5,
  },

  /* =========================
     MODALS
  ========================= */

  modalOverlay: {
    flex: 1,
    backgroundColor:
      'rgba(0, 0, 0, 0.82)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  modalCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#0B100D',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#3B493F',
    paddingHorizontal: 22,
    paddingVertical: 28,
    alignItems: 'center',
  },

  modalEyebrow: {
    color: '#8E9891',
    fontSize: 8,
    letterSpacing: 2.5,
    marginBottom: 5,
  },

  deleteIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1.5,
    borderColor: '#8F4B4B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  deleteIcon: {
    color: '#D98989',
    fontSize: 38,
    fontWeight: '200',
    marginTop: -4,
  },

  successIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1.5,
    borderColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  successIcon: {
    color: '#D4AF37',
    fontSize: 39,
    fontWeight: '300',
    marginTop: -4,
  },

  modalTitle: {
    color: '#F5F1E8',
    fontSize: 25,
    fontWeight: '400',
    textAlign: 'center',
  },

  modalMessage: {
    color: '#A5ADA7',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 12,
  },

  modalDishName: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 3,
  },

  modalDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#27332B',
    marginTop: 22,
    marginBottom: 18,
  },

  modalButtons: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
  },

  modalCancelButton: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalCancelText: {
    color: '#D4AF37',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
  },

  modalDeleteButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8F4444',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalDeleteText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },

  modalOkButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 18,
  },

  modalOkText: {
    flex: 1,
    color: '#0B100D',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.3,
    textAlign: 'center',
  },

  modalOkArrow: {
    color: '#0B100D',
    fontSize: 27,
    fontWeight: '300',
  },
});