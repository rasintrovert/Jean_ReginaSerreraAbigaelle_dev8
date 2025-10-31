import { ThemedInput } from './ThemedComponents';
import { useTheme } from '@/theme';
import React, { useState } from 'react';
import { Platform, Pressable, Modal, View, StyleSheet } from 'react-native';
import { ThemedText, ThemedView } from './ThemedComponents';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format as formatDate } from 'date-fns';
import { fr } from 'date-fns/locale';

interface DateInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  variant?: 'default' | 'error' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  style?: any;
  onBlur?: () => void;
  mode?: 'date' | 'month';
  maximumDate?: Date;
  minimumDate?: Date;
}

export function DateInput({
  value,
  onChangeText,
  placeholder,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  style,
  onBlur,
  mode = 'date',
  maximumDate,
  minimumDate,
}: DateInputProps) {
  const theme = useTheme();
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? parseDate(value, mode) : null
  );

  function parseDate(dateStr: string, dateMode: 'date' | 'month'): Date | null {
    if (!dateStr) return null;
    
    try {
      if (dateMode === 'date') {
        // Format JJ/MM/AAAA
        const parts = dateStr.split('/');
        if (parts.length === 3) {
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10) - 1;
          const year = parseInt(parts[2], 10);
          return new Date(year, month, day);
        }
      } else {
        // Format MM/AAAA
        const parts = dateStr.split('/');
        if (parts.length === 2) {
          const month = parseInt(parts[0], 10) - 1;
          const year = parseInt(parts[1], 10);
          return new Date(year, month, 1);
        }
      }
    } catch {
      return null;
    }
    return null;
  }

  function formatDateValue(date: Date, dateMode: 'date' | 'month'): string {
    if (dateMode === 'date') {
      return formatDate(date, 'dd/MM/yyyy', { locale: fr });
    } else {
      // Pour le mode mois, on prend seulement le mois et l'année
      return formatDate(date, 'MM/yyyy', { locale: fr });
    }
  }

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    
    if (date) {
      setSelectedDate(date);
      const formattedDate = formatDateValue(date, mode);
      onChangeText?.(formattedDate);
    }
  };

  const handleOpenPicker = () => {
    if (!selectedDate) {
      setSelectedDate(new Date());
    }
    setShowPicker(true);
  };

  const displayValue = value || (selectedDate ? formatDateValue(selectedDate, mode) : '');

  if (Platform.OS === 'ios') {
    return (
      <View>
        <Pressable onPress={handleOpenPicker}>
          <ThemedInput
            value={displayValue}
            placeholder={placeholder}
            variant={variant}
            size={size}
            fullWidth={fullWidth}
            style={style}
            editable={false}
            onBlur={onBlur}
            pointerEvents="none"
          />
        </Pressable>
        
        <Modal
          visible={showPicker}
          transparent
          animationType="slide"
          onRequestClose={() => setShowPicker(false)}
        >
          <View style={styles.modalOverlay}>
            <ThemedView style={styles.modalContent}>
              <ThemedView variant="transparent" style={styles.modalHeader}>
                <Pressable onPress={() => setShowPicker(false)} style={styles.closeButton}>
                  <ThemedText size="base" weight="semibold" style={{ color: theme.colors.primary }}>
                    Fermer
                  </ThemedText>
                </Pressable>
              </ThemedView>
              
              <DateTimePicker
                value={selectedDate || new Date()}
                mode={mode === 'month' ? 'date' : 'date'}
                display="spinner"
                onChange={handleDateChange}
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                locale="fr_FR"
              />
            </ThemedView>
          </View>
        </Modal>
      </View>
    );
  }

  // Android
  return (
    <View>
      <Pressable onPress={handleOpenPicker}>
        <ThemedInput
          value={displayValue}
          placeholder={placeholder}
          variant={variant}
          size={size}
          fullWidth={fullWidth}
          style={style}
          editable={false}
          onBlur={onBlur}
          pointerEvents="none"
        />
      </Pressable>
      
      {showPicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode={mode === 'month' ? 'date' : 'date'}
          display="default"
          onChange={handleDateChange}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  closeButton: {
    padding: 8,
  },
});

