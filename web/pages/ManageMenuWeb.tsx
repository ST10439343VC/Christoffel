import React, { useState } from 'react';
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

import { MenuItem, Course } from '../../data/menuData';

const RESTAURANT_BACKGROUND =
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85';

const DEFAULT_FOOD_IMAGE =
  'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80';

type ManageMenuWebProps = {
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

export default function ManageMenuWeb({
  onBack,
  menuItems,
  onAddMenuItem,
  onUpdateMenuItem,
  onDeleteMenuItem,
}: ManageMenuWebProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState<Course>('Starter');
  const [image, setImage] = useState('');
  const [successVisible, setSuccessVisible] = useState(false);
  const [successTitle, setSuccessTitle] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [dishToDelete, setDishToDelete] = useState<MenuItem | null>(null);

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

  const pickImage = () => {
    // Web-friendly image picker using file input
    if (typeof window !== 'undefined') {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setImage(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    } else {
      // Fallback for non-web environments
      setImage(DEFAULT_FOOD_IMAGE);
    }
  };

  const saveDish = () => {
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    const numericPrice = Number(price);

    if (!trimmedName) {
      Alert.alert('Missing Dish Name', 'Please enter a dish name.');
      return;
    }

    if (!trimmedDescription) {
      Alert.alert('Missing Description', 'Please enter a description.');
      return;
    }

    if (!price.trim() || isNaN(numericPrice) || numericPrice <= 0) {
      Alert.alert('Invalid Price', 'Please enter a valid price.');
      return;
    }

    const dishImage = image || DEFAULT_FOOD_IMAGE;

    if (editingId) {
      onUpdateMenuItem(editingId, trimmedName, trimmedDescription, course, numericPrice, dishImage);
      setSuccessTitle('Dish Updated');
      setSuccessMessage(`${trimmedName} has been updated.`);
    } else {
      onAddMenuItem(trimmedName, trimmedDescription, course, numericPrice, dishImage);
      setSuccessTitle('Dish Added');
      setSuccessMessage(`${trimmedName} has been added to the menu.`);
    }

    resetForm();
    setSuccessVisible(true);
  };

  const confirmDelete = (item: MenuItem) => {
    setDishToDelete(item);
    setDeleteVisible(true);
  };

  const handleDelete = () => {
    if (!dishToDelete) return;
    onDeleteMenuItem(dishToDelete.id);
    setDeleteVisible(false);
    setDishToDelete(null);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: RESTAURANT_BACKGROUND }}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={showForm ? resetForm : onBack}
            activeOpacity={0.8}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <View style={styles.headerTitleContainer}>
            <Text style={styles.chefIcon}>♨</Text>
            <Text style={styles.eyebrow}>CHRISTOFFEL</Text>
            <View style={styles.brandLineRow}>
              <View style={styles.smallGoldLine} />
              <Text style={styles.menu}>MENU</Text>
              <View style={styles.smallGoldLine} />
            </View>
            <Text style={styles.title}>Manage Menu</Text>
            <Text style={styles.subtitle}>Add, edit and manage dishes</Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.goldLine} />

        {/* ADD NEW DISH BUTTON */}
        {!showForm && (
          <TouchableOpacity
            style={styles.addNewButton}
            onPress={openAddForm}
            activeOpacity={0.85}
          >
            <Text style={styles.addIcon}>+</Text>
            <Text style={styles.addNewButtonText}>ADD NEW DISH</Text>
            <Text style={styles.addArrow}>›</Text>
          </TouchableOpacity>
        )}

        {/* FORM */}
        {showForm && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.formContainer}
          >
            <View style={styles.form}>
              <Text style={styles.formTitle}>
                {editingId ? 'Edit Dish' : 'Add New Dish'}
              </Text>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Dish Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter dish name"
                  placeholderTextColor="#858F88"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Enter dish description"
                  placeholderTextColor="#858F88"
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={4}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Price (R)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  placeholderTextColor="#858F88"
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Course</Text>
                <View style={styles.courseOptions}>
                  {(['Starter', 'Main Course', 'Dessert', 'Drink'] as Course[]).map((c) => (
                    <TouchableOpacity
                      key={c}
                      style={[
                        styles.courseOption,
                        course === c && styles.courseOptionActive,
                      ]}
                      onPress={() => setCourse(c)}
                    >
                      <Text
                        style={[
                          styles.courseOptionText,
                          course === c && styles.courseOptionTextActive,
                        ]}
                      >
                        {c}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Image</Text>
                <TouchableOpacity
                  style={styles.imagePicker}
                  onPress={pickImage}
                  activeOpacity={0.8}
                >
                  {image ? (
                    <Image source={{ uri: image }} style={styles.previewImage} />
                  ) : (
                    <View style={styles.imagePlaceholder}>
                      <Text style={styles.imagePlaceholderIcon}>📷</Text>
                      <Text style={styles.imagePlaceholderText}>Tap to select image</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.formActions}>
                <TouchableOpacity style={styles.cancelButton} onPress={resetForm}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={saveDish}>
                  <Text style={styles.saveButtonText}>
                    {editingId ? 'Update Dish' : 'Add Dish'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}

        {/* MENU ITEMS LIST */}
        {!showForm && (
          <ScrollView
            style={styles.itemsList}
            showsVerticalScrollIndicator={false}
          >
            {menuItems.map((item) => (
              <View key={item.id} style={styles.menuItem}>
                <Image source={{ uri: item.image }} style={styles.menuItemImage} />
                <View style={styles.menuItemInfo}>
                  <Text style={styles.menuItemName}>{item.name}</Text>
                  <Text style={styles.menuItemDescription}>{item.description}</Text>
                  <View style={styles.menuItemMeta}>
                    <Text style={styles.menuItemPrice}>R{item.price.toFixed(2)}</Text>
                    <Text style={styles.menuItemCourse}>{item.course}</Text>
                  </View>
                </View>
                <View style={styles.menuItemActions}>
                  <TouchableOpacity style={styles.editButton} onPress={() => openEditForm(item)}>
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteIconButton}
                    onPress={() => confirmDelete(item)}
                  >
                    <Text style={styles.deleteIcon}>🗑</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </ImageBackground>

      {/* SUCCESS MODAL */}
      <Modal
        visible={successVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSuccessVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.successIcon}>✓</Text>
            <Text style={styles.successTitle}>{successTitle}</Text>
            <Text style={styles.successMessage}>{successMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setSuccessVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal
        visible={deleteVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDeleteVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.deleteWarningIcon}>⚠</Text>
            <Text style={styles.deleteTitle}>Delete Dish?</Text>
            <Text style={styles.deleteMessage}>
              Are you sure you want to delete {dishToDelete?.name}? This action cannot be undone.
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setDeleteVisible(false)}
              >
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalDeleteButton} onPress={handleDelete}>
                <Text style={styles.modalDeleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
  header: {
    height: 135,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  backButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    color: '#D4AF37',
    fontSize: 28,
    fontWeight: '300',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  chefIcon: {
    color: '#D4AF37',
    fontSize: 24,
    marginBottom: 6,
  },
  eyebrow: {
    color: '#D4AF37',
    fontSize: 10,
    letterSpacing: 3,
    marginBottom: 4,
  },
  brandLineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  smallGoldLine: {
    width: 24,
    height: 1,
    backgroundColor: '#D4AF37',
  },
  menu: {
    color: '#D4AF37',
    fontSize: 9,
    letterSpacing: 3,
    marginHorizontal: 8,
  },
  title: {
    color: '#F5F1E8',
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 4,
  },
  subtitle: {
    color: '#A8B0AA',
    fontSize: 11,
  },
  headerSpacer: {
    width: 42,
  },
  goldLine: {
    height: 1,
    backgroundColor: 'rgba(212, 175, 55, 0.3)',
    marginBottom: 20,
  },
  addNewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 8,
    marginHorizontal: 18,
    marginBottom: 20,
  },
  addIcon: {
    color: '#D4AF37',
    fontSize: 20,
    marginRight: 10,
  },
  addNewButtonText: {
    color: '#D4AF37',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
    marginRight: 6,
  },
  addArrow: {
    color: '#D4AF37',
    fontSize: 18,
  },
  formContainer: {
    paddingHorizontal: 18,
    paddingBottom: 30,
  },
  form: {
    backgroundColor: 'rgba(3, 10, 7, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    borderRadius: 12,
    padding: 20,
  },
  formTitle: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    color: '#D4AF37',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(7, 19, 15, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#F5F1E8',
    fontSize: 14,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  courseOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  courseOption: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    borderRadius: 6,
    backgroundColor: 'rgba(7, 19, 15, 0.9)',
  },
  courseOptionActive: {
    backgroundColor: '#D4AF37',
    borderColor: '#D4AF37',
  },
  courseOptionText: {
    color: '#A8B0AA',
    fontSize: 12,
  },
  courseOptionTextActive: {
    color: '#07130F',
    fontWeight: '600',
  },
  imagePicker: {
    height: 120,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    borderRadius: 8,
    backgroundColor: 'rgba(7, 19, 15, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    alignItems: 'center',
  },
  imagePlaceholderIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  imagePlaceholderText: {
    color: '#858F88',
    fontSize: 11,
  },
  formActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    height: 42,
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: '#D4AF37',
    fontSize: 13,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    height: 42,
    backgroundColor: '#D4AF37',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#07130F',
    fontSize: 13,
    fontWeight: '700',
  },
  itemsList: {
    flex: 1,
    paddingHorizontal: 18,
    paddingBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(3, 10, 7, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.25)',
    borderRadius: 12,
    marginBottom: 14,
    overflow: 'hidden',
  },
  menuItemImage: {
    width: 100,
    height: 100,
  },
  menuItemInfo: {
    flex: 1,
    padding: 14,
  },
  menuItemName: {
    color: '#F5F1E8',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  menuItemDescription: {
    color: '#A8B0AA',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 10,
  },
  menuItemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemPrice: {
    color: '#D4AF37',
    fontSize: 14,
    fontWeight: '600',
  },
  menuItemCourse: {
    color: '#7D877F',
    fontSize: 10,
    letterSpacing: 1,
  },
  menuItemActions: {
    padding: 14,
    alignItems: 'center',
    gap: 10,
  },
  editButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    borderRadius: 6,
  },
  editButtonText: {
    color: '#D4AF37',
    fontSize: 11,
    fontWeight: '600',
  },
  deleteIconButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#0B100D',
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 16,
    padding: 28,
    minWidth: 280,
    alignItems: 'center',
  },
  successIcon: {
    fontSize: 40,
    marginBottom: 14,
  },
  successTitle: {
    color: '#D4AF37',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  successMessage: {
    color: '#F5F1E8',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 20,
  },
  deleteWarningIcon: {
    fontSize: 40,
    marginBottom: 14,
  },
  deleteTitle: {
    color: '#F5F1E8',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  deleteMessage: {
    color: '#A8B0AA',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  modalCancelButton: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#4A5568',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelButtonText: {
    color: '#F5F1E8',
    fontSize: 13,
    fontWeight: '600',
  },
  modalDeleteButton: {
    flex: 1,
    height: 40,
    backgroundColor: '#D4AF37',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalDeleteButtonText: {
    color: '#07130F',
    fontSize: 13,
    fontWeight: '700',
  },
  modalButton: {
    height: 40,
    paddingHorizontal: 28,
    backgroundColor: '#D4AF37',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    color: '#07130F',
    fontSize: 13,
    fontWeight: '700',
  },
});
