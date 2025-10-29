import {
  ThemedButton,
  ThemedCard,
  ThemedInput,
  ThemedText,
  ThemedView
} from '@/components/ThemedComponents';
import { useResponsive } from '@/hooks/useResponsive';
import { useTheme } from '@/theme';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

// Types pour les données
interface Proof {
  id: string;
  type: 'pregnancy' | 'birth';
  referenceNumber: string;
  generationDate: string;
  agentName: string;
  status: 'valid' | 'pending';
}

export default function AgentHistory() {
  const router = useRouter();
  const theme = useTheme();
  const { isTablet } = useResponsive();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'pregnancy' | 'birth'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'valid' | 'pending'>('all');

  // Données simulées - Preuves générées
  const mockProofs: Proof[] = [
    {
      id: '1',
      type: 'birth',
      referenceNumber: 'INPR-2025-01-15-001',
      generationDate: '15/01/2025',
      agentName: 'Jean Dupont',
      status: 'valid',
    },
    {
      id: '2',
      type: 'pregnancy',
      referenceNumber: 'INPR-2025-01-14-002',
      generationDate: '14/01/2025',
      agentName: 'Jean Dupont',
      status: 'valid',
    },
    {
      id: '3',
      type: 'birth',
      referenceNumber: 'INPR-2025-01-13-003',
      generationDate: '13/01/2025',
      agentName: 'Jean Dupont',
      status: 'pending',
    },
    {
      id: '4',
      type: 'pregnancy',
      referenceNumber: 'INPR-2025-01-12-004',
      generationDate: '12/01/2025',
      agentName: 'Jean Dupont',
      status: 'valid',
    },
  ];

  const filteredProofs = mockProofs.filter(proof => {
    const matchesSearch = proof.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         proof.generationDate.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || proof.type === filterType;
    const matchesStatus = filterStatus === 'all' || proof.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeIcon = (type: Proof['type']) => {
    return type === 'pregnancy' ? 'heart' : 'child';
  };

  const getTypeColor = (type: Proof['type']) => {
    return type === 'pregnancy' ? theme.colors.success : theme.colors.primary;
  };

  const getTypeLabel = (type: Proof['type']) => {
    return type === 'pregnancy' ? 'Preuve de Grossesse' : 'Preuve de Naissance';
  };

  const getStatusColor = (status: Proof['status']) => {
    return status === 'valid' ? theme.colors.success : theme.colors.warning;
  };

  const getStatusLabel = (status: Proof['status']) => {
    return status === 'valid' ? 'Valide' : 'En attente';
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleFilterPress = () => {
    setShowFilterModal(true);
  };

  const handleViewProof = (proof: Proof) => {
    Alert.alert(
      'Preuve',
      `Type: ${getTypeLabel(proof.type)}\n` +
      `Référence: ${proof.referenceNumber}\n` +
      `Date: ${proof.generationDate}\n` +
      `Statut: ${getStatusLabel(proof.status)}`,
      [
        { text: 'Fermer', style: 'cancel' },
        { 
          text: 'Télécharger', 
          onPress: () => {
            // TODO: Télécharger la preuve
            console.log('Télécharger preuve:', proof.id);
            Alert.alert('Succès', 'Preuve téléchargée !');
          }
        }
      ]
    );
  };

  const handleFilterApply = () => {
    setShowFilterModal(false);
  };

  return (
    <ThemedView style={styles.container}>
      {/* 1️⃣ En-tête et barre de navigation supérieure */}
      <ThemedView style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          accessibilityLabel="Retour"
          accessibilityHint="Retourner à la page précédente"
        >
          <FontAwesome 
            name="arrow-left" 
            size={isTablet ? 24 : 20} 
            color={theme.colors.text} 
          />
        </TouchableOpacity>
        
        <ThemedText 
          size="lg" 
          weight="bold" 
          style={styles.headerTitle}
        >
          Prèv Mwen yo
        </ThemedText>
        
        <TouchableOpacity
          style={styles.filterButton}
          onPress={handleFilterPress}
          accessibilityLabel="Filtrer"
          accessibilityHint="Ouvrir les options de filtrage"
        >
          <FontAwesome 
            name="filter" 
            size={isTablet ? 24 : 20} 
            color={theme.colors.text} 
          />
        </TouchableOpacity>
      </ThemedView>

      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          isTablet && styles.scrollContentTablet
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* 2️⃣ Zone de recherche */}
        <ThemedCard style={styles.searchCard}>
          <ThemedView style={styles.searchContainer}>
            <FontAwesome 
              name="search" 
              size={16} 
              color={theme.colors.textSecondary} 
              style={styles.searchIcon}
            />
            <ThemedInput
              placeholder="Chache..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              size="md"
              style={styles.searchInput}
              accessibilityLabel="Rechercher"
              accessibilityHint="Rechercher dans les preuves"
            />
          </ThemedView>
        </ThemedCard>

        {/* 3️⃣ Section de liste - Aperçu des preuves générées */}
        <ThemedView style={styles.proofsSection}>
          <ThemedText 
            size="base" 
            weight="semibold" 
            style={styles.sectionTitle}
          >
            Resan ({filteredProofs.length})
          </ThemedText>
          
          {filteredProofs.length === 0 ? (
            <ThemedCard style={styles.emptyCard}>
              <FontAwesome 
                name="file-text-o" 
                size={48} 
                color={theme.colors.textSecondary} 
                style={styles.emptyIcon}
              />
              <ThemedText 
                variant="secondary" 
                size="base"
                style={styles.emptyText}
              >
                Aucune preuve trouvée
              </ThemedText>
              <ThemedText 
                variant="secondary" 
                size="sm"
                style={styles.emptySubtext}
              >
                Modifiez vos critères de recherche
              </ThemedText>
            </ThemedCard>
          ) : (
            filteredProofs.map((proof) => (
              <ThemedCard 
                key={proof.id} 
                style={styles.proofCard}
              >
                {/* a) En-tête de la carte */}
                <ThemedView style={styles.proofHeader}>
                  <ThemedView style={{ ...styles.proofIcon, backgroundColor: getTypeColor(proof.type) + '20' }}>
                    <FontAwesome 
                      name={getTypeIcon(proof.type)} 
                      size={isTablet ? 24 : 20} 
                      color={getTypeColor(proof.type)} 
                    />
                  </ThemedView>
                  <ThemedView style={styles.proofTypeContainer}>
                    <ThemedText 
                      size="base" 
                      weight="semibold"
                      style={styles.proofTypeLabel}
                    >
                      {getTypeLabel(proof.type)}
                    </ThemedText>
                    <ThemedView style={{ ...styles.statusBadge, backgroundColor: getStatusColor(proof.status) + '20' }}>
                      <ThemedText 
                        size="xs" 
                        weight="semibold"
                        style={{ color: getStatusColor(proof.status) }}
                      >
                        {getStatusLabel(proof.status)}
                      </ThemedText>
                    </ThemedView>
                  </ThemedView>
                </ThemedView>

                {/* b) Contenu principal (données essentielles) */}
                <ThemedView style={styles.proofContent}>
                  <ThemedView style={styles.proofInfoRow}>
                    <FontAwesome 
                      name="hashtag" 
                      size={14} 
                      color={theme.colors.textSecondary} 
                      style={styles.infoIcon}
                    />
                    <ThemedText 
                      variant="secondary" 
                      size="sm"
                      style={styles.infoText}
                    >
                      {proof.referenceNumber}
                    </ThemedText>
                  </ThemedView>
                  
                  <ThemedView style={styles.proofInfoRow}>
                    <FontAwesome 
                      name="calendar" 
                      size={14} 
                      color={theme.colors.textSecondary} 
                      style={styles.infoIcon}
                    />
                    <ThemedText 
                      variant="secondary" 
                      size="sm"
                      style={styles.infoText}
                    >
                      Générée le {proof.generationDate}
                    </ThemedText>
                  </ThemedView>
                  
                  <ThemedView style={styles.proofInfoRow}>
                    <FontAwesome 
                      name="user" 
                      size={14} 
                      color={theme.colors.textSecondary} 
                      style={styles.infoIcon}
                    />
                    <ThemedText 
                      variant="secondary" 
                      size="sm"
                      style={styles.infoText}
                    >
                      Agent: {proof.agentName}
                    </ThemedText>
                  </ThemedView>
                </ThemedView>

                {/* c) Bouton d'action */}
                <ThemedView style={styles.proofActions}>
                  <ThemedButton
                    variant="outline"
                    size="sm"
                    onPress={() => handleViewProof(proof)}
                    accessibilityLabel="Voir la preuve"
                    accessibilityHint="Ouvrir la preuve complète"
                    style={styles.viewProofButton}
                  >
                    <FontAwesome name="eye" size={12} color={theme.colors.primary} />
                    <ThemedText size="xs" style={{ color: theme.colors.primary, marginLeft: 6 }}>
                      Gade Prèv
                    </ThemedText>
                  </ThemedButton>
                </ThemedView>
              </ThemedCard>
            ))
          )}
        </ThemedView>
      </ScrollView>

      {/* Modal de filtrage */}
      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <ThemedView style={styles.modalOverlay}>
          <ThemedView style={styles.modalContent}>
            <ThemedText 
              size="lg" 
              weight="bold" 
              style={styles.modalTitle}
            >
              Filtrer les preuves
            </ThemedText>
            
            <ThemedView style={styles.filterSection}>
              <ThemedText 
                size="base" 
                weight="semibold" 
                style={styles.filterSectionTitle}
              >
                Type
              </ThemedText>
              <ThemedView style={styles.filterButtons}>
                {[
                  { key: 'all', label: 'Tous' },
                  { key: 'pregnancy', label: 'Grossesse' },
                  { key: 'birth', label: 'Naissance' },
                ].map((filter) => (
                  <ThemedButton
                    key={filter.key}
                    variant={filterType === filter.key ? 'primary' : 'outline'}
                    size="sm"
                    onPress={() => setFilterType(filter.key as any)}
                    style={styles.modalFilterButton}
                  >
                    <ThemedText 
                      size="xs" 
                      weight="semibold"
                      style={{ 
                        color: filterType === filter.key ? '#fff' : theme.colors.primary 
                      }}
                    >
                      {filter.label}
                    </ThemedText>
                  </ThemedButton>
                ))}
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.filterSection}>
              <ThemedText 
                size="base" 
                weight="semibold" 
                style={styles.filterSectionTitle}
              >
                Statut
              </ThemedText>
              <ThemedView style={styles.filterButtons}>
                {[
                  { key: 'all', label: 'Tous' },
                  { key: 'valid', label: 'Valide' },
                  { key: 'pending', label: 'En attente' },
                ].map((filter) => (
                  <ThemedButton
                    key={filter.key}
                    variant={filterStatus === filter.key ? 'primary' : 'outline'}
                    size="sm"
                    onPress={() => setFilterStatus(filter.key as any)}
                    style={styles.modalFilterButton}
                  >
                    <ThemedText 
                      size="xs" 
                      weight="semibold"
                      style={{ 
                        color: filterStatus === filter.key ? '#fff' : theme.colors.primary 
                      }}
                    >
                      {filter.label}
                    </ThemedText>
                  </ThemedButton>
                ))}
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.modalActions}>
              <ThemedButton
                variant="outline"
                size="md"
                onPress={() => setShowFilterModal(false)}
                style={styles.modalCancelButton}
              >
                <ThemedText size="sm" style={{ color: theme.colors.textSecondary }}>
                  Annuler
                </ThemedText>
              </ThemedButton>
              <ThemedButton
                variant="primary"
                size="md"
                onPress={handleFilterApply}
                style={styles.modalApplyButton}
              >
                <ThemedText size="sm" style={{ color: '#fff' }}>
                  Appliquer
                </ThemedText>
              </ThemedButton>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  scrollContentTablet: {
    paddingHorizontal: 32,
    maxWidth: 800,
    alignSelf: 'center',
  },
  
  // 1️⃣ En-tête et barre de navigation supérieure
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(108, 117, 125, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(108, 117, 125, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // 2️⃣ Zone de recherche
  searchCard: {
    marginBottom: 16,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingVertical: 0,
  },
  
  // 3️⃣ Section de liste - Aperçu des preuves générées
  proofsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  
  // 🪪 Structure d'une carte de preuve
  proofCard: {
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // a) En-tête de la carte
  proofHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  proofIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  proofTypeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  proofTypeLabel: {
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  
  // b) Contenu principal (données essentielles)
  proofContent: {
    marginBottom: 16,
    gap: 8,
  },
  proofInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 8,
    width: 16,
  },
  infoText: {
    flex: 1,
    lineHeight: 16,
  },
  
  // c) Bouton d'action
  proofActions: {
    alignItems: 'flex-end',
  },
  viewProofButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  
  // Empty State
  emptyCard: {
    padding: 32,
    alignItems: 'center',
    marginTop: 20,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    textAlign: 'center',
    lineHeight: 16,
  },
  
  // Modal de filtrage
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 24,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterSectionTitle: {
    marginBottom: 12,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  modalFilterButton: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  modalCancelButton: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  modalApplyButton: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});

