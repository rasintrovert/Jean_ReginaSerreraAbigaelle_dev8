import {
  ThemedCard,
  ThemedInput,
  ThemedText,
  ThemedView
} from '@/components/ThemedComponents';
import { PressableButton } from '@/components/PressableButton';
import { useResponsive } from '@/hooks/useResponsive';
import { useTranslation } from '@/hooks/useTranslation';
import { useTheme } from '@/theme';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { format, parse } from 'date-fns';
import { fr } from 'date-fns/locale';

type TabType = 'all' | 'pregnancy' | 'birth';
type PeriodFilter = 'thisWeek' | 'thisMonth' | 'lastMonth';

interface Record {
  id: string;
  type: 'pregnancy' | 'birth';
  referenceNumber: string;
  date: string;
  recordedBy: string;
  recordedByTitle: string;
  childName?: string;
  motherName?: string;
  fatherName?: string;
}

export default function HospitalHistoryScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { isTablet } = useResponsive();
  const t = useTranslation();
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('thisWeek');
  const [searchQuery, setSearchQuery] = useState('');

  // Données simulées - formatées selon les spécifications
  const mockRecords: Record[] = [
    {
      id: '1',
      type: 'pregnancy',
      referenceNumber: 'PR-2025-001',
      date: '2025-10-28',
      recordedBy: 'Dr. Marie Jean',
      recordedByTitle: 'Médecin',
      motherName: 'Sophie Laurent',
    },
    {
      id: '2',
      type: 'birth',
      referenceNumber: 'INPR-2025-10-28-001',
      date: '2025-10-28',
      recordedBy: 'Dr. Jean Baptiste',
      recordedByTitle: 'Gynécologue',
      childName: 'Marie Sophie',
      motherName: 'Sophie Laurent',
      fatherName: 'Pierre Jean',
    },
    {
      id: '3',
      type: 'pregnancy',
      referenceNumber: 'PR-2025-002',
      date: '2025-10-27',
      recordedBy: 'Dr. Marie Jean',
      recordedByTitle: 'Médecin',
      motherName: 'Claire Antoine',
    },
    {
      id: '4',
      type: 'birth',
      referenceNumber: 'INPR-2025-10-27-002',
      date: '2025-10-27',
      recordedBy: 'Dr. Jean Baptiste',
      recordedByTitle: 'Gynécologue',
      childName: 'Pierre Jean',
      motherName: 'Claire Antoine',
      fatherName: 'Marc Antoine',
    },
    {
      id: '5',
      type: 'pregnancy',
      referenceNumber: 'PR-2025-003',
      date: '2025-10-26',
      recordedBy: 'Dr. Marie Joseph',
      recordedByTitle: 'Médecin',
      motherName: 'Anne Marie',
    },
    {
      id: '6',
      type: 'birth',
      referenceNumber: 'INPR-2025-10-26-003',
      date: '2025-10-26',
      recordedBy: 'Dr. Marie Joseph',
      recordedByTitle: 'Gynécologue',
      childName: 'Sophie Claire',
      motherName: 'Anne Marie',
      fatherName: 'Jean Paul',
    },
    {
      id: '7',
      type: 'pregnancy',
      referenceNumber: 'PR-2025-004',
      date: '2025-10-25',
      recordedBy: 'Dr. Marie Jean',
      recordedByTitle: 'Médecin',
      motherName: 'Lucie Pierre',
    },
  ];

  const filteredRecords = mockRecords.filter(record => {
    const matchesSearch = searchQuery === '' || 
      record.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.motherName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.childName?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'all' || record.type === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const pregnancyRecords = filteredRecords.filter(r => r.type === 'pregnancy');
  const birthRecords = filteredRecords.filter(r => r.type === 'birth');
  const totalCount = filteredRecords.length;

  const formatDate = (dateString: string) => {
    try {
      const date = parse(dateString, 'yyyy-MM-dd', new Date());
      // Utiliser le format avec fr pour les deux langues
      // Pour le créole, on pourrait adapter le format si nécessaire
      return format(date, 'd MMM yyyy', { locale: fr });
    } catch {
      return dateString;
    }
  };

  const renderPregnancyCard = (record: Record) => (
    <Pressable
      key={record.id}
      onPress={() => {
        // TODO: Ouvrir la fiche détaillée
        console.log('Ouvrir fiche grossesse:', record.id);
      }}
    >
      <ThemedCard style={styles.recordCard}>
        <ThemedView variant="transparent" style={styles.recordHeader}>
          <ThemedView 
            variant="transparent" 
            style={[styles.recordIcon, { backgroundColor: theme.colors.success + '20' }]}
          >
            <FontAwesome 
              name="user" 
              size={20} 
              color={theme.colors.success} 
            />
          </ThemedView>
          <ThemedView variant="transparent" style={styles.recordContent}>
            <ThemedText size="base" weight="bold" style={styles.recordName} numberOfLines={1}>
              {record.motherName}
            </ThemedText>
            <ThemedText variant="secondary" size="sm" style={styles.recordId}>
              {record.referenceNumber}
            </ThemedText>
            <ThemedText variant="secondary" size="sm" style={styles.recordProfessional}>
              {record.recordedBy}
            </ThemedText>
            <ThemedView variant="transparent" style={styles.recordDateRow}>
              <FontAwesome name="calendar" size={12} color={theme.colors.textSecondary} />
              <ThemedText variant="secondary" size="sm" style={styles.recordDate}>
                {t('hospital.history.recorded')}: {formatDate(record.date)}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedCard>
    </Pressable>
  );

  const renderBirthCard = (record: Record) => (
    <Pressable
      key={record.id}
      onPress={() => {
        // TODO: Ouvrir la fiche détaillée
        console.log('Ouvrir fiche naissance:', record.id);
      }}
    >
      <ThemedCard style={styles.recordCard}>
        <ThemedView variant="transparent" style={styles.recordHeader}>
          <ThemedView 
            variant="transparent" 
            style={[styles.recordIcon, { backgroundColor: theme.colors.primary + '20' }]}
          >
            <FontAwesome 
              name="child" 
              size={20} 
              color={theme.colors.primary} 
            />
          </ThemedView>
          <ThemedView variant="transparent" style={styles.recordContent}>
            <ThemedText size="base" weight="bold" style={styles.recordName} numberOfLines={1}>
              {record.childName}
            </ThemedText>
            {record.motherName && record.fatherName && (
              <ThemedText variant="secondary" size="sm" style={styles.recordParents}>
                {record.motherName} & {record.fatherName}
              </ThemedText>
            )}
            <ThemedText variant="secondary" size="sm" style={styles.recordId}>
              {record.referenceNumber}
            </ThemedText>
            <ThemedText variant="secondary" size="sm" style={styles.recordProfessional}>
              {record.recordedBy}
            </ThemedText>
            <ThemedView variant="transparent" style={styles.recordDateRow}>
              <FontAwesome name="calendar" size={12} color={theme.colors.textSecondary} />
              <ThemedText variant="secondary" size="sm" style={styles.recordDate}>
                {t('hospital.history.recorded')}: {formatDate(record.date)}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedCard>
    </Pressable>
  );

  return (
    <ThemedView style={styles.container}>
      {/* 1️⃣ PARTIE 1: HEADER (Sticky) */}
      <ThemedView style={styles.headerSection}>
        {/* Barre supérieure */}
        <ThemedView style={styles.topBar}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <FontAwesome
              name="arrow-left"
              size={20}
              color={theme.colors.text}
            />
          </Pressable>
          <ThemedView variant="transparent" style={styles.headerText}>
            <ThemedText size="xl" weight="bold" style={styles.headerTitle}>
              {t('hospital.history.title')}
            </ThemedText>
            <ThemedText variant="secondary" size="xs" style={styles.headerSubtitle}>
              {t('hospital.history.subtitle')}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Carte de résumé */}
        <ThemedCard style={styles.summaryCard}>
          <ThemedView variant="transparent" style={styles.summaryContent}>
            <ThemedText size="2xl" weight="bold" style={styles.summaryNumber}>
              {totalCount}
            </ThemedText>
            <ThemedText variant="secondary" size="sm" style={styles.summaryLabel}>
              {t('hospital.history.total')}
            </ThemedText>
          </ThemedView>
        </ThemedCard>

        {/* Filtres temporels */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.periodFilters}
          contentContainerStyle={styles.periodFiltersContent}
        >
          <PressableButton
            variant={periodFilter === 'thisWeek' ? 'primary' : 'outline'}
            size="sm"
            onPress={() => setPeriodFilter('thisWeek')}
            style={styles.periodFilterButton}
          >
            <FontAwesome 
              name="clock-o" 
              size={14} 
              color={periodFilter === 'thisWeek' ? '#fff' : theme.colors.primary} 
            />
            <ThemedText
              size="sm"
              style={{
                color: periodFilter === 'thisWeek' ? '#fff' : theme.colors.primary,
                marginLeft: 6,
              }}
            >
              {t('hospital.history.thisWeek')}
            </ThemedText>
          </PressableButton>

          <PressableButton
            variant={periodFilter === 'thisMonth' ? 'primary' : 'outline'}
            size="sm"
            onPress={() => setPeriodFilter('thisMonth')}
            style={styles.periodFilterButton}
          >
            <FontAwesome 
              name="calendar" 
              size={14} 
              color={periodFilter === 'thisMonth' ? '#fff' : theme.colors.primary} 
            />
            <ThemedText
              size="sm"
              style={{
                color: periodFilter === 'thisMonth' ? '#fff' : theme.colors.primary,
                marginLeft: 6,
              }}
            >
              {t('hospital.history.thisMonth')}
            </ThemedText>
          </PressableButton>

          <PressableButton
            variant={periodFilter === 'lastMonth' ? 'primary' : 'outline'}
            size="sm"
            onPress={() => setPeriodFilter('lastMonth')}
            style={styles.periodFilterButton}
          >
            <FontAwesome 
              name="trending-up" 
              size={14} 
              color={periodFilter === 'lastMonth' ? '#fff' : theme.colors.primary} 
            />
            <ThemedText
              size="sm"
              style={{
                color: periodFilter === 'lastMonth' ? '#fff' : theme.colors.primary,
                marginLeft: 6,
              }}
            >
              {t('hospital.history.lastMonth')}
            </ThemedText>
          </PressableButton>
        </ScrollView>

        {/* Barre de recherche */}
        <ThemedCard style={styles.searchCard}>
          <ThemedView variant="transparent" style={styles.searchContainer}>
            <FontAwesome 
              name="search" 
              size={16} 
              color={theme.colors.textSecondary} 
              style={styles.searchIcon}
            />
            <ThemedInput
              placeholder={t('hospital.history.searchPlaceholder')}
              value={searchQuery}
              onChangeText={setSearchQuery}
              size="md"
              style={styles.searchInput}
            />
          </ThemedView>
        </ThemedCard>
      </ThemedView>

      {/* 2️⃣ PARTIE 2: CONTENU PRINCIPAL */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          isTablet && styles.scrollContentTablet
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Onglets de catégories */}
        <ThemedView style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'all' && {
                backgroundColor: theme.colors.primary + '15',
                borderBottomWidth: 2,
                borderBottomColor: theme.colors.primary,
              }
            ]}
            onPress={() => setActiveTab('all')}
          >
            <ThemedText
              size="base"
              weight={activeTab === 'all' ? 'semibold' : 'normal'}
              style={{
                color: activeTab === 'all' ? theme.colors.primary : theme.colors.textSecondary,
              }}
            >
              {t('hospital.history.tabAll')}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'pregnancy' && {
                backgroundColor: theme.colors.success + '15',
                borderBottomWidth: 2,
                borderBottomColor: theme.colors.success,
              }
            ]}
            onPress={() => setActiveTab('pregnancy')}
          >
            <ThemedText
              size="base"
              weight={activeTab === 'pregnancy' ? 'semibold' : 'normal'}
              style={{
                color: activeTab === 'pregnancy' ? theme.colors.success : theme.colors.textSecondary,
              }}
            >
              {t('hospital.history.tabPregnancies')} ({pregnancyRecords.length})
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'birth' && {
                backgroundColor: theme.colors.primary + '15',
                borderBottomWidth: 2,
                borderBottomColor: theme.colors.primary,
              }
            ]}
            onPress={() => setActiveTab('birth')}
          >
            <ThemedText
              size="base"
              weight={activeTab === 'birth' ? 'semibold' : 'normal'}
              style={{
                color: activeTab === 'birth' ? theme.colors.primary : theme.colors.textSecondary,
              }}
            >
              {t('hospital.history.tabBirths')} ({birthRecords.length})
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Liste des enregistrements */}
        {activeTab === 'all' ? (
          <>
            {pregnancyRecords.length > 0 && (
              <>
                <ThemedText size="lg" weight="semibold" style={styles.sectionHeader}>
                  {t('hospital.history.pregnancies')}
                </ThemedText>
                {pregnancyRecords.map(renderPregnancyCard)}
              </>
            )}
            {birthRecords.length > 0 && (
              <>
                <ThemedText 
                  size="lg" 
                  weight="semibold" 
                  style={[styles.sectionHeader, { marginTop: pregnancyRecords.length > 0 ? 24 : 0 }]}
                >
                  {t('hospital.history.births')}
                </ThemedText>
                {birthRecords.map(renderBirthCard)}
              </>
            )}
          </>
        ) : activeTab === 'pregnancy' ? (
          pregnancyRecords.length > 0 ? (
            pregnancyRecords.map(renderPregnancyCard)
          ) : (
            <ThemedCard style={styles.emptyCard}>
              <ThemedView variant="transparent" style={styles.emptyContent}>
                <FontAwesome name="heart" size={48} color={theme.colors.textSecondary} />
                <ThemedText variant="secondary" size="base" style={styles.emptyText}>
                  {t('hospital.history.noPregnancies')}
                </ThemedText>
              </ThemedView>
            </ThemedCard>
          )
        ) : (
          birthRecords.length > 0 ? (
            birthRecords.map(renderBirthCard)
          ) : (
            <ThemedCard style={styles.emptyCard}>
              <ThemedView variant="transparent" style={styles.emptyContent}>
                <FontAwesome name="child" size={48} color={theme.colors.textSecondary} />
                <ThemedText variant="secondary" size="base" style={styles.emptyText}>
                  {t('hospital.history.noBirths')}
                </ThemedText>
              </ThemedView>
            </ThemedCard>
          )
        )}

        {filteredRecords.length === 0 && (
          <ThemedCard style={styles.emptyCard}>
            <ThemedView variant="transparent" style={styles.emptyContent}>
              <FontAwesome name="file-text-o" size={48} color={theme.colors.textSecondary} />
              <ThemedText variant="secondary" size="base" style={styles.emptyText}>
                {t('hospital.history.noRecords')}
              </ThemedText>
            </ThemedView>
          </ThemedCard>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // PARTIE 1: HEADER
  headerSection: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 12,
  },
  backButton: {
    padding: 6,
    borderRadius: 8,
  },
  headerText: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    marginBottom: 2,
    textAlign: 'center',
  },
  headerSubtitle: {
    textAlign: 'center',
  },
  summaryCard: {
    marginBottom: 10,
    alignItems: 'center',
    padding: 6,
    alignSelf: 'center',
    minWidth: 80,
    maxWidth: 120,
  },
  summaryContent: {
    alignItems: 'center',
  },
  summaryNumber: {
    marginBottom: 2,
  },
  summaryLabel: {},
  periodFilters: {
    marginBottom: 10,
  },
  periodFiltersContent: {
    gap: 8,
    paddingHorizontal: 4,
  },
  periodFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchCard: {
    marginBottom: 0,
    paddingHorizontal: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  searchInput: {
    paddingLeft: 48,
    paddingRight: 16,
    flex: 1,
  },
  // PARTIE 2: CONTENU
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  scrollContentTablet: {
    paddingHorizontal: 32,
    maxWidth: 800,
    alignSelf: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 0,
  },
  sectionHeader: {
    marginBottom: 12,
    marginTop: 8,
  },
  recordCard: {
    marginBottom: 12,
    borderRadius: 12,
  },
  recordHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  recordIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  recordContent: {
    flex: 1,
    minWidth: 0,
  },
  recordName: {
    marginBottom: 6,
  },
  recordId: {
    marginBottom: 4,
  },
  recordParents: {
    marginBottom: 4,
    fontStyle: 'italic',
  },
  recordProfessional: {
    marginBottom: 4,
  },
  recordDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  recordDate: {},
  emptyCard: {
    marginTop: 24,
    padding: 48,
    alignItems: 'center',
  },
  emptyContent: {
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 16,
    textAlign: 'center',
  },
});
