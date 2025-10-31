import { PressableButton } from '@/components/PressableButton';
import {
  ThemedCard,
  ThemedText,
  ThemedView
} from '@/components/ThemedComponents';
import { useResponsive } from '@/hooks/useResponsive';
import { useTranslation } from '@/hooks/useTranslation';
import { useTheme } from '@/theme';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';

type TabType = 'faq' | 'guide' | 'contact';

export default function HelpScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { isTablet } = useResponsive();
  const t = useTranslation();
  const [activeTab, setActiveTab] = useState<TabType>('faq');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());

  const toggleQuestion = (index: number) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedQuestions(newExpanded);
  };

  const handleContact = (type: 'phone' | 'email' | 'whatsapp') => {
    switch (type) {
      case 'phone':
        Linking.openURL(`tel:${t('agent.help.contactPhoneValue')}`);
        break;
      case 'email':
        Linking.openURL(`mailto:${t('agent.help.contactEmailValue')}`);
        break;
      case 'whatsapp':
        Linking.openURL(`https://wa.me/${t('agent.help.contactWhatsAppValue').replace(/\s/g, '')}`);
        break;
    }
  };

  const faqQuestions = [
    {
      question: t('agent.help.faqQ1'),
      answer: t('agent.help.faqA1'),
    },
    {
      question: t('agent.help.faqQ2'),
      answer: t('agent.help.faqA2'),
    },
    {
      question: t('agent.help.faqQ3'),
      answer: t('agent.help.faqA3'),
    },
    {
      question: t('agent.help.faqQ4'),
      answer: t('agent.help.faqA4'),
    },
    {
      question: t('agent.help.faqQ5'),
      answer: t('agent.help.faqA5'),
    },
    {
      question: t('agent.help.faqQ6'),
      answer: t('agent.help.faqA6'),
    },
  ];

  const guideCards = [
    {
      icon: 'heart' as const,
      title: t('agent.help.guideRegisterPregnancy'),
      description: t('agent.help.guideRegisterPregnancyDesc'),
    },
    {
      icon: 'child' as const,
      title: t('agent.help.guideRegisterBirth'),
      description: t('agent.help.guideRegisterBirthDesc'),
    },
    {
      icon: 'file-text' as const,
      title: t('agent.help.guideGenerateProof'),
      description: t('agent.help.guideGenerateProofDesc'),
    },
    {
      icon: 'history' as const,
      title: t('agent.help.guideHistory'),
      description: t('agent.help.guideHistoryDesc'),
    },
  ];

  const renderFAQ = () => (
    <ThemedCard style={styles.contentCard}>
      {faqQuestions.map((item, index) => {
        const isExpanded = expandedQuestions.has(index);
        return (
          <View key={index}>
            <Pressable
              style={[
                styles.faqItem,
                {
                  borderBottomWidth: index < faqQuestions.length - 1 ? 1 : 0,
                  borderBottomColor: theme.colors.border,
                }
              ]}
              onPress={() => toggleQuestion(index)}
              accessibilityLabel={item.question}
              accessibilityRole="button"
              accessibilityHint={isExpanded ? 'Fermer la réponse' : 'Ouvrir la réponse'}
            >
              <ThemedText size="base" weight="medium" style={styles.faqQuestion}>
                {item.question}
              </ThemedText>
              <FontAwesome
                name={isExpanded ? 'chevron-up' : 'chevron-down'}
                size={16}
                color={theme.colors.textSecondary}
              />
            </Pressable>
            {isExpanded && (
              <ThemedView variant="transparent" style={styles.faqAnswer}>
                <ThemedText variant="secondary" size="sm" style={styles.answerText}>
                  {item.answer}
                </ThemedText>
              </ThemedView>
            )}
          </View>
        );
      })}
    </ThemedCard>
  );

  const renderGuide = () => (
    <>
      <View style={styles.guideCardsContainer}>
        {guideCards.map((card, index) => (
          <ThemedCard key={index} style={styles.guideCard}>
            <ThemedView variant="transparent" style={styles.guideCardContent}>
              <FontAwesome
                name={card.icon}
                size={24}
                color={theme.colors.primary}
                style={styles.guideIcon}
              />
              <ThemedView variant="transparent" style={styles.guideCardText}>
                <ThemedText size="base" weight="semibold" style={styles.guideCardTitle}>
                  {card.title}
                </ThemedText>
                <ThemedText variant="secondary" size="sm" style={styles.guideCardDesc}>
                  {card.description}
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedCard>
        ))}
      </View>

      {/* Bloc vidéo */}
      <ThemedCard style={styles.videoCard}>
        <ThemedView variant="transparent" style={styles.videoCardContent}>
          <FontAwesome
            name="play-circle"
            size={48}
            color={theme.colors.primary}
            style={styles.videoIcon}
          />
          <ThemedText size="base" weight="medium" style={styles.videoTitle}>
            {t('agent.help.guideVideoTitle')}
          </ThemedText>
          <PressableButton
            variant="outline"
            size="md"
            onPress={() => {
              // TODO: Ouvrir la vidéo
              console.log('Ouvrir vidéo');
            }}
            accessibilityLabel={t('agent.help.guideVideoButton')}
          >
            <FontAwesome name="play" size={16} color={theme.colors.primary} />
            <ThemedText size="sm" style={{ color: theme.colors.primary, marginLeft: 8 }}>
              {t('agent.help.guideVideoButton')}
            </ThemedText>
          </PressableButton>
        </ThemedView>
      </ThemedCard>
    </>
  );

  const renderContact = () => (
    <>
      <ThemedCard style={styles.contactCard}>
        {/* Téléphone */}
        <Pressable
          style={styles.contactItem}
          onPress={() => handleContact('phone')}
          accessibilityLabel={`${t('agent.help.contactPhoneLabel')}: ${t('agent.help.contactPhoneValue')}`}
          accessibilityRole="button"
        >
          <FontAwesome name="phone" size={20} color={theme.colors.primary} style={styles.contactIcon} />
          <ThemedView variant="transparent" style={styles.contactTextContainer}>
            <ThemedText variant="secondary" size="sm">
              {t('agent.help.contactPhoneLabel')}
            </ThemedText>
            <ThemedText size="base" weight="medium">
              {t('agent.help.contactPhoneValue')}
            </ThemedText>
          </ThemedView>
        </Pressable>

        {/* E-mail */}
        <Pressable
          style={[
            styles.contactItem,
            {
              borderTopWidth: 1,
              borderTopColor: theme.colors.border,
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.border,
            }
          ]}
          onPress={() => handleContact('email')}
          accessibilityLabel={`${t('agent.help.contactEmailLabel')}: ${t('agent.help.contactEmailValue')}`}
          accessibilityRole="button"
        >
          <FontAwesome name="envelope" size={20} color={theme.colors.primary} style={styles.contactIcon} />
          <ThemedView variant="transparent" style={styles.contactTextContainer}>
            <ThemedText variant="secondary" size="sm">
              {t('agent.help.contactEmailLabel')}
            </ThemedText>
            <ThemedText size="base" weight="medium">
              {t('agent.help.contactEmailValue')}
            </ThemedText>
          </ThemedView>
        </Pressable>

        {/* WhatsApp */}
        <Pressable
          style={styles.contactItem}
          onPress={() => handleContact('whatsapp')}
          accessibilityLabel={`${t('agent.help.contactWhatsAppLabel')}: ${t('agent.help.contactWhatsAppValue')}`}
          accessibilityRole="button"
        >
          <FontAwesome name="whatsapp" size={20} color={theme.colors.success} style={styles.contactIcon} />
          <ThemedView variant="transparent" style={styles.contactTextContainer}>
            <ThemedText variant="secondary" size="sm">
              {t('agent.help.contactWhatsAppLabel')}
            </ThemedText>
            <ThemedText size="base" weight="medium">
              {t('agent.help.contactWhatsAppValue')}
            </ThemedText>
          </ThemedView>
        </Pressable>
      </ThemedCard>

      {/* Bloc informatif */}
      <ThemedCard style={styles.infoCard}>
        <ThemedView variant="transparent" style={styles.infoCardContent}>
          <FontAwesome name="clock-o" size={20} color={theme.colors.info} style={styles.infoIcon} />
          <ThemedText variant="secondary" size="sm" style={styles.infoText}>
            {t('agent.help.contactAvailable')}
          </ThemedText>
        </ThemedView>
      </ThemedCard>
    </>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView 
        variant="transparent"
        style={StyleSheet.flatten([styles.header, { backgroundColor: theme.colors.primary }])}
      >
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityLabel={t('common.back')}
          accessibilityRole="button"
        >
          <FontAwesome
            name="arrow-left"
            size={20}
            color="#fff"
          />
        </Pressable>
        <ThemedView variant="transparent" style={styles.headerText}>
          <ThemedText 
            size="xl" 
            weight="bold" 
            style={StyleSheet.flatten([styles.headerTitle, { color: '#fff' }])}
          >
            {t('agent.help.title')}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Sous-menu d'onglets */}
      <ThemedView style={styles.tabsContainer}>
        <Pressable
          style={[
            styles.tab,
            activeTab === 'faq' && {
              backgroundColor: theme.colors.primary + '15',
              borderBottomWidth: 2,
              borderBottomColor: theme.colors.primary,
            }
          ]}
          onPress={() => setActiveTab('faq')}
          accessibilityLabel={t('agent.help.tabFAQ')}
          accessibilityRole="button"
        >
          <FontAwesome
            name="question-circle"
            size={16}
            color={activeTab === 'faq' ? theme.colors.primary : theme.colors.textSecondary}
            style={styles.tabIcon}
          />
          <ThemedText
            size="sm"
            weight={activeTab === 'faq' ? 'semibold' : 'normal'}
            style={{
              color: activeTab === 'faq' ? theme.colors.primary : theme.colors.textSecondary,
            }}
          >
            {t('agent.help.tabFAQ')}
          </ThemedText>
        </Pressable>

        <Pressable
          style={[
            styles.tab,
            activeTab === 'guide' && {
              backgroundColor: theme.colors.primary + '15',
              borderBottomWidth: 2,
              borderBottomColor: theme.colors.primary,
            }
          ]}
          onPress={() => setActiveTab('guide')}
          accessibilityLabel={t('agent.help.tabGuide')}
          accessibilityRole="button"
        >
          <FontAwesome
            name="book"
            size={16}
            color={activeTab === 'guide' ? theme.colors.primary : theme.colors.textSecondary}
            style={styles.tabIcon}
          />
          <ThemedText
            size="sm"
            weight={activeTab === 'guide' ? 'semibold' : 'normal'}
            style={{
              color: activeTab === 'guide' ? theme.colors.primary : theme.colors.textSecondary,
            }}
          >
            {t('agent.help.tabGuide')}
          </ThemedText>
        </Pressable>

        <Pressable
          style={[
            styles.tab,
            activeTab === 'contact' && {
              backgroundColor: theme.colors.primary + '15',
              borderBottomWidth: 2,
              borderBottomColor: theme.colors.primary,
            }
          ]}
          onPress={() => setActiveTab('contact')}
          accessibilityLabel={t('agent.help.tabContact')}
          accessibilityRole="button"
        >
          <FontAwesome
            name="phone"
            size={16}
            color={activeTab === 'contact' ? theme.colors.primary : theme.colors.textSecondary}
            style={styles.tabIcon}
          />
          <ThemedText
            size="sm"
            weight={activeTab === 'contact' ? 'semibold' : 'normal'}
            style={{
              color: activeTab === 'contact' ? theme.colors.primary : theme.colors.textSecondary,
            }}
          >
            {t('agent.help.tabContact')}
          </ThemedText>
        </Pressable>
      </ThemedView>

      {/* Contenu */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          isTablet && styles.scrollContentTablet
        ]}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'faq' && renderFAQ()}
        {activeTab === 'guide' && renderGuide()}
        {activeTab === 'contact' && renderContact()}
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
    // No specific styles needed
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
  },
  tabIcon: {
    marginRight: 0,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  scrollContentTablet: {
    paddingHorizontal: 32,
    maxWidth: 800,
    alignSelf: 'center',
  },
  // FAQ Styles
  contentCard: {
    marginBottom: 16,
  },
  faqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  faqQuestion: {
    flex: 1,
    marginRight: 12,
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingLeft: 32,
  },
  answerText: {
    lineHeight: 20,
  },
  // Guide Styles
  guideCardsContainer: {
    gap: 16,
    marginBottom: 16,
  },
  guideCard: {
    marginBottom: 0,
  },
  guideCardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  guideIcon: {
    marginTop: 2,
  },
  guideCardText: {
    flex: 1,
  },
  guideCardTitle: {
    marginBottom: 8,
  },
  guideCardDesc: {
    lineHeight: 20,
  },
  videoCard: {
    marginBottom: 16,
  },
  videoCardContent: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  videoIcon: {
    marginBottom: 16,
  },
  videoTitle: {
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  // Contact Styles
  contactCard: {
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 16,
  },
  contactIcon: {
    // Icon styling
  },
  contactTextContainer: {
    flex: 1,
  },
  infoCard: {
    marginBottom: 16,
  },
  infoCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  infoIcon: {
    // Icon styling
  },
  infoText: {
    flex: 1,
    textAlign: 'center',
  },
});
