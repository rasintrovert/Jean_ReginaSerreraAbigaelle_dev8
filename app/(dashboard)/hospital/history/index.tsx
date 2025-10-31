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
import { Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

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

  // Données simulées
  const mockRecords: Record[] = [
    {
      id: '1',
      type: 'pregnancy',
      referenceNumber: 'HOS-2025-01-15-001',
      date: '15/01/2025',
      recordedBy: 'Dr. Marie Joseph',
      recordedByTitle: 'Médecin',
      motherName: 'Sophie Pierre',
    },
    {
      id: '2',
      type: 'birth',
      referenceNumber: 'HOS-2025-01-14-002',
      date: '14/01/2025',
      recordedBy: 'Dr. Jean Baptiste',
      recordedByTitle: 'Gynécologue',
      childName: 'Marie Sophie',
      motherName: 'Sophie Pierre',
      fatherName: 'Jean Paul',
    },
    {
      id: '3',
      type: 'pregnancy',
      referenceNumber: 'HOS-2025-01-13-003',
      date: '13/01/2025',
      recordedBy: 'Dr. Marie Joseph',
      recordedByTitle: 'Médecin',
      motherName: 'Claire Antoine',
    },
    {
      id: '4',
      type: 'birth',
      referenceNumber: 'HOS-2025-01-12-004',
      date: '12/01/2025',
      recordedBy: 'Dr. Jean Baptiste',
      recordedByTitle: 'Gynécologue',
      childName: 'Pierre Jean',
      motherName: 'Claire Antoine',
      fatherName: 'Marc Antoine',
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

  const getTypeIcon = (type: Record['type']) => {
    return type === 'pregnancy' ? 'heart' : 'child';
  };

  const getTypeColor = (type: Record['type']) => {
    return type === 'pregnancy' ? theme.colors.success : theme.colors.primary;
  };

  const renderRecordCard = (record: Record) => (
    <ThemedCard key={record.id} style={styles.recordCard}>
      <ThemedView variant="transparent" style={styles.recordHeader}>
        <ThemedView 
          variant="transparent" 
          style={[styles.recordIcon, { backgroundColor: getTypeColor(record.type) + '20' }]}
        >
          <FontAwesome 
            name={getTypeIcon(record.type)} 
            size={16} 
            color={getTypeColor(record.type)} 
          />
        </ThemedView>
        <ThemedView variant="transparent" style={styles.recordContent}>
          <ThemedText size="base" weight="semibold" style={styles.recordName} numberOfLines={1}>
            {record.type === 'birth' ? record.childName : record.motherName}
          </ThemedText>
          <ThemedText variant="secondary" size="xs" style={styles.recordId}>
            {record.referenceNumber} • {record.recordedBy} ({record.recordedByTitle})
          </ThemedText>
          {record.type === 'birth' && record.motherName && record.fatherName && (
            <ThemedText variant="secondary" size="xs" style={styles.recordParents}>
              {t('hospital.history.mother')}: {record.motherName} • {t('hospital.history.father')}: {record.fatherName}
            </ThemedText>
          )}
          <ThemedView variant="transparent" style={styles.recordDateRow}>
            <FontAwesome name="calendar" size={12} color={theme.colors.textSecondary} />
            <ThemedText variant="secondary" size="xs" style={styles.recordDate}>
              {record.date}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedCard>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Header Sticky */}
      <ThemedView style={styles.header}>
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
            {t('hospital.history.title') || t('agent.history.title')}
          </ThemedText>
          <ThemedText variant="secondary" size="sm" style={styles.headerSubtitle}>
            {t('hospital.history.subtitle') || 'Historique des enregistrements'}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          isTablet && styles.scrollContentTablet
        ]}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        {/* Carte résumé total */}
        <ThemedCard style={styles.summaryCard}>
          <ThemedView variant="transparent" style={styles.summaryContent}>
            <ThemedText size="3xl" weight="bold" style={styles.summaryNumber}>
              {totalCount}
            </ThemedText>
            <ThemedText variant="secondary" size="base" style={styles.summaryLabel}>
              {t('hospital.history.total') || 'Total'}
            </ThemedText>
          </ThemedView>
        </ThemedCard>

        {/* Filtres de période */}
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
            <FontAwesome name="clock-o" size={14} color={periodFilter === 'thisWeek' ? '#fff' : theme.colors.primary} />
            <ThemedText
              size="sm"
              style={{
                color: periodFilter === 'thisWeek' ? '#fff' : theme.colors.primary,
                marginLeft: 6,
              }}
            >
              {t('hospital.history.thisWeek') || 'Cette Semaine'}
            </ThemedText>
          </PressableButton>

          <PressableButton
            variant={periodFilter === 'thisMonth' ? 'primary' : 'outline'}
            size="sm"
            onPress={() => setPeriodFilter('thisMonth')}
            style={styles.periodFilterButton}
          >
            <FontAwesome name="calendar" size={14} color={periodFilter === 'thisMonth' ? '#fff' : theme.colors.primary} />
            <ThemedText
              size="sm"
              style={{
                color: periodFilter === 'thisMonth' ? '#fff' : theme.colors.primary,
                marginLeft: 6,
              }}
            >
              {t('hospital.history.thisMonth') || 'Ce Mois'}
            </ThemedText>
          </PressableButton>

          <PressableButton
            variant={periodFilter === 'lastMonth' ? 'primary' : 'outline'}
            size="sm"
            onPress={() => setPeriodFilter('lastMonth')}
            style={styles.periodFilterButton}
          >
            <FontAwesome name="trending-up" size={14} color={periodFilter === 'lastMonth' ? '#fff' : theme.colors.primary} />
            <ThemedText
              size="sm"
              style={{
                color: periodFilter === 'lastMonth' ? '#fff' : theme.colors.primary,
                marginLeft: 6,
              }}
            >
              {t('hospital.history.lastMonth') || 'Mois Dernier'}
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
              placeholder={t('hospital.history.searchPlaceholder') || t('agent.history.searchPlaceholder')}
              value={searchQuery}
              onChangeText={setSearchQuery}
              size="md"
              style={styles.searchInput}
            />
          </ThemedView>
        </ThemedCard>

        {/* Onglets */}
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
              {t('hospital.history.tabAll') || 'Tous'}
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
              {t('hospital.history.tabPregnancies') || 'Grossesses'} ({pregnancyRecords.length})
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
              {t('hospital.history.tabBirths') || 'Naissances'} ({birthRecords.length})
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Contenu */}
        {activeTab === 'all' ? (
          <>
            {pregnancyRecords.length > 0 && (
              <>
                <ThemedText size="lg" weight="semibold" style={styles.sectionHeader}>
                  {t('hospital.history.pregnancies') || 'Grossesses'}
                </ThemedText>
                {pregnancyRecords.map(renderRecordCard)}
              </>
            )}
            {birthRecords.length > 0 && (
              <>
                <ThemedText 
                  size="lg" 
                  weight="semibold" 
                  style={[styles.sectionHeader, { marginTop: pregnancyRecords.length > 0 ? 24 : 0 }]}
                >
                  {t('hospital.history.births') || 'Naissances'}
                </ThemedText>
                {birthRecords.map(renderRecordCard)}
              </>
            )}
          </>
        ) : activeTab === 'pregnancy' ? (
          pregnancyRecords.length > 0 ? (
            pregnancyRecords.map(renderRecordCard)
          ) : (
            <ThemedCard style={styles.emptyCard}>
              <ThemedView variant="transparent" style={styles.emptyContent}>
                <FontAwesome name="heart" size={48} color={theme.colors.textSecondary} />
                <ThemedText variant="secondary" size="base" style={styles.emptyText}>
                  {t('hospital.history.noPregnancies') || 'Aucune grossesse enregistrée'}
                </ThemedText>
              </ThemedView>
            </ThemedCard>
          )
        ) : (
          birthRecords.length > 0 ? (
            birthRecords.map(renderRecordCard)
          ) : (
            <ThemedCard style={styles.emptyCard}>
              <ThemedView variant="transparent" style={styles.emptyContent}>
                <FontAwesome name="child" size={48} color={theme.colors.textSecondary} />
                <ThemedText variant="secondary" size="base" style={styles.emptyText}>
                  {t('hospital.history.noBirths') || 'Aucune naissance enregistrée'}
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
                {t('hospital.history.noRecords') || 'Aucun enregistrement trouvé'}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    marginBottom: 4,
  },
  headerSubtitle: {},
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  scrollContentTablet: {
    paddingHorizontal: 32,
    maxWidth: 800,
    alignSelf: 'center',
  },
  summaryCard: {
    marginBottom: 16,
    alignItems: 'center',
    padding: 24,
  },
  summaryContent: {
    alignItems: 'center',
  },
  summaryNumber: {
    marginBottom: 8,
  },
  summaryLabel: {},
  periodFilters: {
    marginBottom: 16,
  },
  periodFiltersContent: {
    gap: 12,
    paddingHorizontal: 4,
  },
  periodFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchCard: {
    marginBottom: 16,
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
  },
  recordHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  recordIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  recordContent: {
    flex: 1,
    minWidth: 0,
  },
  recordName: {
    marginBottom: 4,
  },
  recordId: {
    marginBottom: 2,
  },
  recordParents: {
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

