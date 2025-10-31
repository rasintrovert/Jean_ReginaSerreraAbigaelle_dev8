import { ThemedInput } from './ThemedComponents';
import { useTheme } from '@/theme';
import React, { useState } from 'react';
import { Platform, Pressable, Modal, View, StyleSheet } from 'react-native';
import { ThemedText, ThemedView } from './ThemedComponents';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

interface TimeInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  variant?: 'default' | 'error' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  style?: any;
  onBlur?: () => void;
}

export function TimeInput({
  value,
  onChangeText,
  placeholder = 'HH:MM',
  variant = 'default',
  size = 'md',
  fullWidth = false,
  style,
  onBlur,
}: TimeInputProps) {
  const theme = useTheme();
  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState<Date | null>(
    value ? parseTime(value) : null
  );

  function parseTime(timeStr: string): Date | null {
    if (!timeStr) return null;
    
    try {
      const parts = timeStr.split(':');
      if (parts.length === 2) {
        const hours = parseInt(parts[0], 10);
        const minutes = parseInt(parts[1], 10);
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        return date;
      }
    } catch {
      return null;
    }
    return null;
  }

  function formatTimeValue(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  const handleTimeChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }

    if (date) {
      setSelectedTime(date);
      const formattedTime = formatTimeValue(date);
      onChangeText?.(formattedTime);
    }
  };

  const handleOpenPicker = () => {
    if (!selectedTime) {
      setSelectedTime(new Date());
    }
    setShowPicker(true);
  };

  const displayValue = value || (selectedTime ? formatTimeValue(selectedTime) : '');

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
                value={selectedTime || new Date()}
                mode="time"
                display="spinner"
                onChange={handleTimeChange}
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
          value={selectedTime || new Date()}
          mode="time"
          display="default"
          onChange={handleTimeChange}
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

