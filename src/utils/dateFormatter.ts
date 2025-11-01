export const formatLastSeen = (lastSeen: string | null | undefined): string => {
  if (!lastSeen) return 'غير متصل';

  const now = new Date();
  const lastSeenDate = new Date(lastSeen);
  const diffMs = now.getTime() - lastSeenDate.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMinutes < 5) {
    return 'متصل الآن';
  } else if (diffMinutes < 60) {
    return `منذ ${diffMinutes} دقيقة`;
  } else if (diffHours < 24) {
    return `منذ ${diffHours} ساعة`;
  } else if (diffDays === 1) {
    return 'منذ يوم واحد';
  } else if (diffDays < 7) {
    return `منذ ${diffDays} أيام`;
  } else {
    return lastSeenDate.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
};
